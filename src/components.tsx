import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  X,
  Check,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { axes, type Diagnosis, type Saved } from "./data";
export function Range({
  label,
  ends,
  value,
  onChange,
}: {
  label: string;
  ends: string[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="range">
      <div className="range-title">
        <label>
          {label}
          <input
            aria-label={label}
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            style={{ "--fill": value + "%" } as React.CSSProperties}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </label>
        <span>{value}%</span>
      </div>
      <div className="range-ends">
        {ends.map((e) => (
          <span key={e}>{e}</span>
        ))}
      </div>
    </div>
  );
}
export function Sliders({
  values,
  onChange,
}: {
  values: number[];
  onChange: (v: number[]) => void;
}) {
  return (
    <div className="sliders">
      {axes.map((ends, i) => (
        <Range
          key={i}
          label={
            [
              "Muscle involvement",
              "Movement structure",
              "Environmental stability",
              "Timing of movement",
            ][i]
          }
          ends={ends}
          value={values[i]}
          onChange={(v) => onChange(values.map((n, j) => (j === i ? v : n)))}
        />
      ))}
    </div>
  );
}
export function Classification({ values }: { values: number[] }) {
  return (
    <div className="tags">
      {values.map((v, i) => (
        <span className="tag" key={i}>
          {i === 1
            ? v < 25
              ? "Discrete"
              : v > 75
                ? "Continuous"
                : "Serial"
            : v < 35
              ? axes[i][0]
              : v > 65
                ? axes[i][1]
                : `${axes[i][0]} / ${axes[i][1]}`}
        </span>
      ))}
    </div>
  );
}
export function Text({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="text-field">
      <span>
        {label}
        {required && <small> REQUIRED</small>}
      </span>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </label>
  );
}
export function Video({
  url,
  name,
  sport,
  notes,
  onNotes,
}: {
  url: string;
  name: string;
  sport: string;
  notes: Diagnosis["notes"];
  onNotes: (n: Diagnosis["notes"]) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    setTime(0);
    setPlaying(false);
    setError(false);
  }, [url, name]);
  const stamp = (t: number) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
  return (
    <div className="panel video-panel">
      <div className="video-screen">
        {url && !error ? (
          <video
            key={url}
            ref={ref}
            src={url}
            preload="metadata"
            playsInline
            controls
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={() => {
              if (ref.current) ref.current.playbackRate = speed;
            }}
            onError={() => setError(true)}
          />
        ) : (
          <>
            <div className="video-grid" />
            <span className="footage-label">
              CASE FOOTAGE / {sport.toUpperCase()}
            </span>
            <div className="placeholder-center">
              <div className="play-placeholder">
                <Play size={28} />
              </div>
              <h3>
                {error
                  ? "Footage couldn’t be loaded"
                  : "Your observation starts here"}
              </h3>
              <p>
                {error
                  ? "Check the direct video link in Teacher Mode."
                  : "Video placeholder · Teacher footage can be added later"}
              </p>
              <span>{name}</span>
            </div>
            <span className="placeholder-tag">
              {error ? "VIDEO UNAVAILABLE" : "NO FOOTAGE CONNECTED"}
            </span>
          </>
        )}
      </div>
      <div className="video-controls">
        <button
          disabled={!url || error}
          aria-label={playing ? "Pause video" : "Play video"}
          onClick={() => {
            if (ref.current)
              playing
                ? ref.current.pause()
                : void ref.current.play().catch(() => setError(true));
          }}
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <button
          disabled={!url || error}
          aria-label="Replay video"
          onClick={() => {
            if (ref.current) {
              ref.current.currentTime = 0;
              void ref.current.play().catch(() => setError(true));
            }
          }}
        >
          <RotateCcw size={17} />
        </button>
        <span>{stamp(time)}</span>
        <div className="speed">
          <span>PLAYBACK</span>
          {[0.25, 0.5, 1].map((v) => (
            <button
              key={v}
              className={speed === v ? "selected" : ""}
              onClick={() => {
                setSpeed(v);
                if (ref.current) ref.current.playbackRate = v;
              }}
            >
              {v}×
            </button>
          ))}
        </div>
        <button
          disabled={!url || error}
          aria-label="Previous frame approximation"
          onClick={() => {
            if (ref.current) {
              ref.current.pause();
              ref.current.currentTime = Math.max(
                0,
                ref.current.currentTime - 1 / 30,
              );
            }
          }}
        >
          −1f
        </button>
        <button
          disabled={!url || error}
          aria-label="Next frame approximation"
          onClick={() => {
            if (ref.current) {
              ref.current.pause();
              ref.current.currentTime = Math.min(
                ref.current.duration,
                ref.current.currentTime + 1 / 30,
              );
            }
          }}
        >
          +1f
        </button>
      </div>
      <div className="notes">
        <div className="section-heading">
          <h3>Observation Notes</h3>
          <span>{notes.length} RECORDED</span>
        </div>
        <p className="muted">
          {url
            ? "Pause the footage and record evidence at the current time. Frame steps approximate 30 fps."
            : "No footage yet? Record evidence from the athlete profile. Notes are labelled as profile observations."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (note.trim()) {
              onNotes([
                ...notes,
                {
                  time: url && !error ? (ref.current?.currentTime ?? time) : -1,
                  text: note.trim(),
                },
              ]);
              setNote("");
            }
          }}
        >
          <label className="sr-only" htmlFor="observation">
            Observation evidence
          </label>
          <input
            id="observation"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What do you notice about the movement?"
          />
          <button
            className="icon-button"
            disabled={!note.trim()}
            aria-label="Add observation"
          >
            <Plus size={18} />
          </button>
        </form>
        {notes.map((n, i) => (
          <div className="note-row" key={i}>
            <span>{n.time < 0 ? "PROFILE" : stamp(n.time)}</span>
            <p>{n.text}</p>
            <button
              aria-label="Remove observation"
              onClick={() => onNotes(notes.filter((_, j) => j !== i))}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Court({ values }: { values: number[] }) {
  const complexity = Math.round(values.reduce((a, b) => a + b, 0) / 5);
  return (
    <div className="court-panel">
      <div className="court-top">
        <span>LIVE PRACTICE ENVIRONMENT</span>
        <span className="live-dot" />
      </div>
      <div className="court">
        <div className="court-boundary" />
        <div className="court-arc" />
        <div className="court-key" />
        <div className="hoop" />
        <div className="player shooter">A</div>
        {values[0] > 20 && (
          <div
            className="player defender"
            style={{ top: 55 - values[0] * 0.15 + "%" }}
          >
            D
          </div>
        )}
        {values[3] > 40 && (
          <>
            <div className="player teammate">T</div>
            <div className="pass-path" />
          </>
        )}
        {values[1] > 50 && <div className="uncertain">↔ VARIABLE OPTIONS</div>}
        <span className="court-caption">
          {values[2] < 40
            ? "ATHLETE SETS THE PACE"
            : "TIME-CONSTRAINED PRACTICE"}
        </span>
      </div>
      <div className="complexity">
        <div>
          <strong>Practice complexity</strong>
          <span>
            {complexity < 35
              ? "Lower"
              : complexity > 65
                ? "Higher"
                : "Moderate"}{" "}
            complexity
          </span>
        </div>
        <div className="complexity-bar">
          <span style={{ width: complexity + "%" }} />
        </div>
        <div className="range-ends">
          <span>Lower complexity</span>
          <span>Higher complexity</span>
        </div>
      </div>
    </div>
  );
}
export function Inbox({
  s,
  update,
  reveal,
}: {
  s: Saved;
  update: (v: Partial<Saved>) => void;
  reveal: boolean;
}) {
  const words = s.inbox.trim().split(/\s+/).filter(Boolean).length;
  const checks = [
    /jordan/i.test(s.inbox) &&
      /alex/i.test(s.inbox) &&
      /cognitive/i.test(s.inbox) &&
      /autonomous/i.test(s.inbox),
    /gross|fine|discrete|serial|continuous|closed|open|self.paced|externally.paced/i.test(
      s.inbox,
    ),
    /practice|defender|pressure|predictab|simplif|feedback|demonstrat|environment/i.test(
      s.inbox,
    ),
  ];
  return (
    <div className="inbox-layout">
      <div className="panel inbox-main">
        <div className="inbox-toolbar">
          <Mail size={18} />
          <span>COACHING COLLABORATION</span>
          <span className="tag">1 MESSAGE</span>
        </div>
        <div className="message">
          <div className="sender">
            <span className="mini-avatar">CT</span>
            <div>
              <strong>Coach Taylor</strong>
              <p>To: You · Subject: Same skill, different athletes</p>
            </div>
            <span>09:41 AM</span>
          </div>
          <h2>Should I teach them the same way?</h2>
          <p>Hey Coach,</p>
          <p>I’ve got two athletes learning the same basketball skill.</p>
          <p>
            <strong>Jordan</strong> has never played organised basketball
            before.
            <br />
            <strong>Alex</strong> has played representative basketball for six
            years.
          </p>
          <p>
            Should I teach them the same way?
            <br />
            What would you change for each player?
          </p>
          <p>
            Thanks,
            <br />
            Taylor
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (words >= 100 && words <= 150 && checks.every(Boolean))
              update({ inboxDone: true });
          }}
          className="reply"
        >
          <span className="eyebrow">YOUR REPLY TO COACH TAYLOR</span>
          <Text
            label="Turn your knowledge into a coaching recommendation."
            value={s.inbox}
            onChange={(inbox) => update({ inbox, inboxDone: false })}
            placeholder="Hi Taylor, I would adapt the practice for each athlete because…"
            required
          />
          <div className="panel-footer">
            <span className={words > 150 ? "word-warning" : ""}>
              {words} / 100–150 words
            </span>
            <button
              className="primary"
              disabled={words < 100 || words > 150 || !checks.every(Boolean)}
            >
              Send response <ArrowUpRight size={16} />
            </button>
          </div>
          <p className="muted small">
            This is a fictional inbox. Your response is saved locally, not
            emailed.
          </p>
          {s.inboxDone && (
            <div className="feedback" role="status">
              <h4>Response saved</h4>
              <p>
                Your coaching recommendation is ready for reflection. Check that
                each modification follows from the athlete’s observed needs.
              </p>
            </div>
          )}
          {((s.inboxDone && s.feedback) || reveal) && (
            <div className="feedback">
              <h4>Points to compare</h4>
              <p>
                Jordan likely needs cognitive-stage support: demonstration,
                simple cues and predictable, self-paced practice. Alex may be
                autonomous, but experience alone does not prove this. Observe
                attention and consistency, then add open, pressured,
                representative tasks where appropriate.
              </p>
            </div>
          )}
        </form>
      </div>
      <aside className="panel inbox-checklist">
        <span className="eyebrow">BEFORE YOU SEND</span>
        <h3>Make your reasoning count.</h3>
        <p>Your response must:</p>
        {[
          "Identify the likely stage for Jordan and Alex",
          "Refer to at least one motor-skill characteristic",
          "Recommend a change to the learning environment",
        ].map((x, i) => (
          <div className={"check-item " + (checks[i] ? "checked" : "")} key={x}>
            <span>{checks[i] ? <Check size={14} /> : i + 1}</span>
            <p>{x}</p>
          </div>
        ))}
        <div className="small-callout">
          The live checklist detects key terms, not the quality of your
          reasoning. Use the names and stage terms explicitly, then justify
          them.
        </div>
        <span className="tag">100–150 WORDS</span>
      </aside>
    </div>
  );
}
