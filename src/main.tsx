import {
  stages,
  athletes,
  skills,
  initial,
  type Saved,
  type Diagnosis,
} from "./data";
import {
  Range,
  Sliders,
  Classification,
  Text,
  Video,
  Court,
  Inbox,
} from "./components";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronRight,
  RotateCcw,
  Plus,
  X,
  Settings2,
  Activity,
  ScanLine,
  SlidersHorizontal,
  Mail,
  ChartNoAxesColumnIncreasing,
  Layers,
  CircleHelp,
  Clock,
  Flag,
} from "lucide-react";
import "./styles.css";
const tabs = [
  "Skill Acquisition",
  "Motor Skill Lab",
  "Athlete Diagnostic Lab",
  "Change the Challenge",
  "Coach’s Inbox",
  "Results",
];
const icons = [
  Layers,
  SlidersHorizontal,
  ScanLine,
  Activity,
  Mail,
  ChartNoAxesColumnIncreasing,
];
function App() {
  const [s, setS] = useState<Saved>(() => {
    try {
      return {
        ...initial,
        ...JSON.parse(localStorage.getItem("movement-lab-v1") || "{}"),
      };
    } catch {
      return initial;
    }
  });
  const [page, setPage] = useState(0);
  const [teacher, setTeacher] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [caseId, setCaseId] = useState(0);
  const [skillId, setSkillId] = useState(0);
  const [labVals, setLabVals] = useState([25, 50, 50, 50]);
  const [advanced, setAdvanced] = useState(0);
  const [stageFeedback, setStageFeedback] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const modalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!teacher) return;
    const previous = document.activeElement as HTMLElement | null;
    const modal = modalRef.current;
    const controls = () =>
      Array.from(
        modal?.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, [tabindex="0"]',
        ) || [],
      ).filter((el) => !el.hasAttribute("disabled"));
    controls()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTeacher(false);
      if (event.key === "Tab") {
        const items = controls();
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault();
          items.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
          event.preventDefault();
          items[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [teacher]);
  useEffect(() => {
    try {
      localStorage.setItem("movement-lab-v1", JSON.stringify(s));
    } catch {
      setNotice(
        "Browser storage is unavailable. Keep this tab open to retain your work.",
      );
    }
  }, [s]);
  const update = (v: Partial<Saved>) => setS((p) => ({ ...p, ...v }));
  const done = [
    s.stageDone,
    Object.keys(s.lab).length === 10,
    s.diagnoses.every((d) => d.submitted),
    s.challengeDone.every(Boolean),
    s.inboxDone,
  ];
  const count = done.filter(Boolean).length;
  const changeDiagnosis = (v: Partial<Diagnosis>) =>
    update({
      diagnoses: s.diagnoses.map((d, i) =>
        i === caseId ? { ...d, ...v, submitted: false } : d,
      ),
    });
  const nav = (i: number) => {
    setPage(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const a = athletes[caseId],
    d = s.diagnoses[caseId];
  return (
    <div className="app">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            nav(0);
          }}
        >
          <span className="brand-icon">
            <Activity size={25} />
          </span>
          movement<span className="brand-dot">lab</span>
        </a>
        <div className="course-label">YEAR 11 · HEALTH & MOVEMENT SCIENCE</div>
        <div className="sidebar-title">Your learning workspace</div>
        <nav>
          {tabs.map((t, i) => {
            const Icon = icons[i];
            return (
              <button
                key={t}
                className={"nav-item " + (page === i ? "active" : "")}
                onClick={() => nav(i)}
              >
                <Icon size={19} />
                <span>{t}</span>
                {done[i] ? (
                  <Check size={15} className="nav-check" />
                ) : (
                  <span className="nav-number">0{i + 1}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="progress-card">
          <div className="progress-head">
            <span>SESSION PROGRESS</span>
            <span>{count}/5</span>
          </div>
          <div className="progress-track">
            <div style={{ width: count * 20 + "%" }} />
          </div>
          <p>
            {count === 5
              ? "All activities complete. Time to reflect."
              : "Small observations. Better coaching."}
          </p>
        </div>
        <div className="sidebar-bottom">
          <span className="saved-dot" /> Progress saved on this device
          <button onClick={() => setTeacher(true)}>
            <Settings2 size={16} /> Teacher Mode
          </button>
        </div>
      </aside>
      <div className="main">
        <header>
          <div className="breadcrumb">
            Learning workspace <ChevronRight size={14} />
            <span>{tabs[page]}</span>
          </div>
          <div className="header-right">
            <span className="live-dot" /> STUDENT SESSION{" "}
            <span className="avatar">ST</span>
          </div>
        </header>
        <main key={page}>
          <div className="page-top">
            <div>
              <div className="eyebrow">
                {page === 5 ? "SESSION REVIEW" : `ACTIVITY 0${page + 1} OF 05`}
                <span />
                THE COACH’S PERSPECTIVE
              </div>
              <h1>
                {
                  [
                    "Every athlete starts somewhere.",
                    "Look beyond the movement.",
                    "Observe. Analyse. Coach.",
                    "Change the environment.",
                    "You’re the coach now.",
                    "Your observations. Your impact.",
                  ][page]
                }
              </h1>
              <p className="intro">
                {
                  [
                    "Understand how athletes learn, then decide what they need from you.",
                    "Explore how the skill—and its context—shape the way we teach it.",
                    "Step into the analyst’s seat. Use performance evidence to make better coaching decisions.",
                    "Build a practice environment that meets the athlete where they are.",
                    "Bring your analysis together in a practical response to a fellow coach.",
                    "Connect what you’ve learned to the decisions you’ll make on the field.",
                  ][page]
                }
              </p>
            </div>
            <span className="time-pill">
              <Clock size={14} />
              {[5, 10, 20, 8, 8, 3][page]} MIN ACTIVITY
            </span>
          </div>
          <div className="inquiry">
            <span className="inquiry-icon">
              <CircleHelp size={21} />
            </span>
            <div>
              <span>THE QUESTION THAT GUIDES YOUR SESSION</span>
              <strong>
                If you were the coach, how would you teach this athlete?
              </strong>
            </div>
            <ArrowUpRight size={22} />
          </div>
          {notice && (
            <p role="status" className="notice">
              {notice}
            </p>
          )}
          {page === 0 && (
            <>
              <div className="section-heading">
                <h2>Three stages. Different coaching needs.</h2>
                <span>01 / UNDERSTAND</span>
              </div>
              <div className="stage-grid">
                {stages.map((t, i) => (
                  <details className={"stage-card stage-" + i} key={t} open>
                    <summary>
                      <span className="stage-number">0{i + 1}</span>
                      <span className="stage-symbol">
                        {
                          [
                            <ArrowUpRight size={22} />,
                            <Activity size={22} />,
                            <ScanLine size={22} />,
                          ][i]
                        }
                      </span>
                      <h3>{t}</h3>
                      <p>
                        {
                          [
                            "“What do I need to do?”",
                            "“How can I do it better?”",
                            "“What’s happening around me?”",
                          ][i]
                        }
                      </p>
                    </summary>
                    <ul>
                      {[
                        [
                          "Developing an understanding of the skill",
                          "High concentration; large, frequent errors",
                          "Inconsistent performance",
                          "Needs substantial instruction and feedback",
                        ],
                        [
                          "Understands the basic movement",
                          "Refines technique with fewer errors",
                          "Increasing consistency",
                          "Begins recognising their own errors",
                        ],
                        [
                          "Movement is largely automatic",
                          "Highly consistent performance",
                          "Little conscious attention to execution",
                          "Can focus on tactics and the environment",
                        ],
                      ][i].map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <div className="coach-cue">
                      <span>COACHING FOCUS</span>
                      {
                        [
                          "Simplify. Demonstrate. Guide.",
                          "Refine. Practise. Add variety.",
                          "Challenge. Adapt. Make decisions.",
                        ][i]
                      }
                    </div>
                  </details>
                ))}
              </div>
              <div className="section-heading">
                <h2>Meet the athletes. Make the connection.</h2>
                <span>02 / APPLY</span>
              </div>
              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Who belongs where?</h3>
                    <p>
                      Drag an athlete to a stage, or select an athlete and then
                      a stage. You can also use the menus.
                    </p>
                  </div>
                  <span className="tag">3 ATHLETES</span>
                </div>
                <div className="match-athletes">
                  {["Beginner", "Developing athlete", "Expert athlete"].map(
                    (x, i) => (
                      <div
                        key={x}
                        draggable
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", String(i))
                        }
                        className={
                          "athlete-match " + (selected === i ? "selected" : "")
                        }
                      >
                        <button onClick={() => setSelected(i)}>
                          <span className="mini-avatar">
                            {["JM", "SN", "NW"][i]}
                          </span>
                          <div>
                            <strong>{x}</strong>
                            <p>
                              {
                                [
                                  "Looks down; needs step-by-step cues",
                                  "Recognises errors; technique improving",
                                  "Scans defenders while passing",
                                ][i]
                              }
                            </p>
                          </div>
                        </button>
                        <label className="sr-only" htmlFor={"match" + i}>
                          Stage for {x}
                        </label>
                        <select
                          id={"match" + i}
                          value={s.matches[i]}
                          onChange={(e) => {
                            update({
                              matches: s.matches.map((m, j) =>
                                j === i ? e.target.value : m,
                              ),
                              stageDone: false,
                            });
                            setStageFeedback(false);
                          }}
                        >
                          <option value="">Choose a stage</option>
                          {stages.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    ),
                  )}
                </div>
                <div className="drop-grid">
                  {stages.map((t) => (
                    <button
                      key={t}
                      className="drop-target"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const i = Number(e.dataTransfer.getData("text/plain"));
                        if (i >= 0 && i < 3) {
                          update({
                            matches: s.matches.map((m, j) => (j === i ? t : m)),
                            stageDone: false,
                          });
                          setStageFeedback(false);
                        }
                      }}
                      onClick={() => {
                        if (selected !== null) {
                          update({
                            matches: s.matches.map((m, i) =>
                              i === selected ? t : m,
                            ),
                            stageDone: false,
                          });
                          setSelected(null);
                          setStageFeedback(false);
                        }
                      }}
                    >
                      <Plus size={18} />
                      {t}
                      <span>
                        {s.matches
                          .map((m, i) =>
                            m === t
                              ? ["Beginner", "Developing", "Expert"][i]
                              : null,
                          )
                          .filter(Boolean)
                          .join(" · ") || "Place an athlete here"}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="panel-footer">
                  <span>
                    Think about attention and consistency, not just experience.
                  </span>
                  <button
                    className="primary"
                    disabled={s.matches.some((x) => !x)}
                    onClick={() => {
                      update({ stageDone: true });
                      setStageFeedback(true);
                    }}
                  >
                    Check my thinking <ArrowRight size={16} />
                  </button>
                </div>
                {((stageFeedback && s.feedback) || reveal) && (
                  <div className="feedback">
                    <h4>Compare your reasoning</h4>
                    {stages.map((t, i) => (
                      <p key={t}>
                        <strong>
                          {
                            [
                              "Beginner",
                              "Developing athlete",
                              "Expert athlete",
                            ][i]
                          }{" "}
                          → {t}.
                        </strong>{" "}
                        {
                          [
                            "Frequent errors and reliance on cues suggest conscious learning.",
                            "Recognising errors and refining technique suggest the associative stage.",
                            "Scanning while passing indicates spare attention for tactical information.",
                          ][i]
                        }{" "}
                        {s.matches[i] === t
                          ? "Your classification aligns."
                          : "Revisit the evidence for your choice."}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="concept">
                <Flag size={21} />
                <div>
                  <strong>Automatic doesn’t just mean excellent.</strong>
                  <p>
                    Autonomous does not simply mean ‘good’. It means the
                    execution of the movement requires relatively little
                    conscious attention.
                  </p>
                </div>
              </div>
            </>
          )}
          {page === 1 && (
            <>
              <div className="lab-layout">
                <div className="panel skill-list">
                  <div className="panel-heading">
                    <h3>Choose a movement</h3>
                    <span className="tag">{Object.keys(s.lab).length}/10</span>
                  </div>
                  {skills.map((sk, i) => (
                    <button
                      className={skillId === i ? "chosen" : ""}
                      key={sk[0]}
                      onClick={() => {
                        setSkillId(i);
                        setLabVals(s.lab[sk[0]] || [25, 50, 50, 50]);
                      }}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {sk[0]}
                      {s.lab[sk[0]] ? (
                        <Check size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <div className="eyebrow">CLASSIFY THE PERFORMANCE</div>
                  </div>
                  <div className="panel-body">
                    <h2>{skills[skillId][0]}</h2>
                    <p className="muted">
                      Position each slider where you think the skill sits.
                      Context matters.
                    </p>
                    <Sliders values={labVals} onChange={setLabVals} />
                    <button
                      className="primary"
                      onClick={() =>
                        update({
                          lab: { ...s.lab, [skills[skillId][0]]: labVals },
                        })
                      }
                    >
                      Submit classification <ArrowRight size={16} />
                    </button>
                    {((s.lab[skills[skillId][0]] && s.feedback) || reveal) && (
                      <div className="feedback">
                        <h4>Suggested classification</h4>
                        <Classification values={[...skills[skillId][1]]} />
                        <p>{skills[skillId][2]}</p>
                        <p>
                          These are reference positions, not absolute scores. A
                          justified interpretation of the context matters more
                          than an exact slider value.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="concept">
                <Flag size={20} />
                <div>
                  <strong>
                    The context can change the classification of the same
                    movement skill.
                  </strong>
                  <p>
                    Change the situation, and you change the demands on the
                    performer.
                  </p>
                </div>
              </div>
              <div className="compare-grid">
                {[
                  [
                    "Free throw",
                    "Predictable setup · Shooter initiates",
                    "Relatively closed",
                    "Self-paced",
                  ],
                  [
                    "Jump shot against a defender",
                    "Changing space · Respond to pressure",
                    "More open",
                    "Externally paced",
                  ],
                ].map((x, i) => (
                  <div className="panel context-card" key={x[0]}>
                    <span className="eyebrow">
                      SAME MOVEMENT · CONTEXT 0{i + 1}
                    </span>
                    <h3>{x[0]}</h3>
                    <p>{x[1]}</p>
                    <div className="tags">
                      <span className="tag">{x[2]}</span>
                      <span className="tag">{x[3]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="case-tabs">
                {athletes.map((x, i) => (
                  <button
                    key={x.name}
                    onClick={() => setCaseId(i)}
                    className={caseId === i ? "selected" : ""}
                  >
                    <span className="case-sport">
                      {["◉", "◈", "⬡", "≋"][i]}
                    </span>
                    <div>
                      <span>
                        CASE 0{i + 1} · {x.sport.toUpperCase()}
                      </span>
                      <strong>{x.name}</strong>
                    </div>
                    {s.diagnoses[i].submitted && <Check size={17} />}
                  </button>
                ))}
              </div>
              <div className="section-heading">
                <div>
                  <h2>{a.skill}</h2>
                  <p className="muted">
                    {a.name} · {a.level} athlete
                  </p>
                </div>
                <span className="tag">PERFORMANCE ANALYSIS</span>
              </div>
              <div className="video-layout">
                <Video
                  url={s.videos[caseId]}
                  name={a.name}
                  sport={a.sport}
                  notes={d.notes}
                  onNotes={(notes) => changeDiagnosis({ notes })}
                />
                <div className="panel evidence-panel">
                  <span className="eyebrow">ATHLETE PROFILE</span>
                  <h3>What can you observe?</h3>
                  <p>
                    Use these supplied observations as evidence while footage is
                    unavailable.
                  </p>
                  {a.facts.map((f, i) => (
                    <div className="fact" key={f}>
                      <span>0{i + 1}</span>
                      <p>{f}</p>
                    </div>
                  ))}
                  <div className="small-callout">
                    Look for what the athlete does, not simply how long they’ve
                    played.
                  </div>
                </div>
              </div>
              <form
                className="panel diagnosis"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    d.evidence.trim() &&
                    d.difficulty.trim() &&
                    d.coach.trim()
                  )
                    update({
                      diagnoses: s.diagnoses.map((x, i) =>
                        i === caseId ? { ...x, submitted: true } : x,
                      ),
                    });
                }}
              >
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">YOUR ANALYSIS</span>
                    <h2>Build your coaching diagnosis</h2>
                  </div>
                  <ScanLine size={25} />
                </div>
                <div className="diagnosis-grid">
                  <section>
                    <label className="question">
                      01 <strong>Stage of learning</strong>
                    </label>
                    <div className="stage-radio">
                      {stages.map((t) => (
                        <label key={t}>
                          <input
                            required
                            type="radio"
                            name="stage"
                            checked={d.stage === t}
                            onChange={() => changeDiagnosis({ stage: t })}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                    <Text
                      label="What evidence from the performance supports your decision?"
                      value={d.evidence}
                      onChange={(evidence) => changeDiagnosis({ evidence })}
                      placeholder="Refer to attention, consistency or error patterns…"
                      required
                    />
                    <label className="question">
                      02 <strong>Motor skill classification</strong>
                    </label>
                    <Sliders
                      values={d.values}
                      onChange={(values) => changeDiagnosis({ values })}
                    />
                  </section>
                  <section>
                    <label className="question">
                      03 <strong>Coaching diagnosis</strong>
                    </label>
                    <Text
                      label="What is currently making this skill difficult for this athlete?"
                      value={d.difficulty}
                      onChange={(difficulty) => changeDiagnosis({ difficulty })}
                      placeholder="Consider the athlete and the demands of the task…"
                      required
                    />
                    <label className="question">
                      04 <strong>Coaching decision</strong>
                    </label>
                    <Text
                      label="If you were this athlete’s coach, what would you change about their practice environment?"
                      value={d.coach}
                      onChange={(coach) => changeDiagnosis({ coach })}
                      placeholder="Describe a specific change and explain its purpose…"
                      required
                    />
                    <div className="small-callout">
                      A strong diagnosis links observable evidence to a
                      practical coaching decision.
                    </div>
                  </section>
                </div>
                <div className="panel-footer">
                  <span>
                    {d.submitted
                      ? "Diagnosis saved. Compare and reflect."
                      : "All four questions require a response."}
                  </span>
                  <button className="primary" type="submit">
                    Submit diagnosis <ArrowRight size={16} />
                  </button>
                </div>
              </form>
              {((d.submitted && s.feedback) || reveal) && (
                <div className="compare-grid analysis-compare">
                  <div className="panel">
                    <span className="eyebrow">YOUR DIAGNOSIS</span>
                    <h3>{d.stage || "Not yet selected"}</h3>
                    <p>{d.evidence || "Record your evidence first."}</p>
                    <Classification values={d.values} />
                    <h4>Practice decision</h4>
                    <p>
                      {d.coach || "Your coaching decision will appear here."}
                    </p>
                  </div>
                  <div className="panel expert">
                    <span className="eyebrow">SUGGESTED EXPERT ANALYSIS</span>
                    <h3>{stages[a.stage]}</h3>
                    <p>{a.evidence}</p>
                    <Classification values={a.values} />
                    <h4>Current challenge</h4>
                    <p>{a.difficulty}</p>
                    <h4>Practice decision</h4>
                    <p>{a.coach}</p>
                    <p className="muted">
                      What aligns with your analysis? Where would you refine
                      your reasoning? Skill characteristics depend on the exact
                      task and setting.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          {page === 3 && (
            <>
              <div className="segmented">
                {["Beginner challenge", "Advanced challenge"].map((x, i) => (
                  <button
                    className={advanced === i ? "selected" : ""}
                    onClick={() => setAdvanced(i)}
                    key={x}
                  >
                    {x}
                    {s.challengeDone[i] && <Check size={15} />}
                  </button>
                ))}
              </div>
              <div className="challenge-layout">
                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">
                        {advanced ? "AUTONOMOUS ATHLETE" : "COGNITIVE ATHLETE"}
                      </span>
                      <h2>
                        {advanced
                          ? "Elite basketball guard"
                          : "Beginner basketball player"}
                      </h2>
                      <p>
                        {advanced
                          ? "Make practice more demanding and representative of competition."
                          : "Jump shot · Current environment: active defender pressure"}
                      </p>
                    </div>
                  </div>
                  <div className="panel-body">
                    {[
                      "Defender pressure",
                      "Environmental unpredictability",
                      "Pace",
                      "Decision making",
                      "Skill complexity",
                    ].map((x, i) => (
                      <Range
                        key={x}
                        label={x}
                        ends={
                          [
                            ["None", "Maximum"],
                            ["Predictable", "Unpredictable"],
                            ["Self-paced", "Externally paced"],
                            ["Low", "High"],
                            ["Simple", "Complex"],
                          ][i]
                        }
                        value={s.challenge[advanced][i]}
                        onChange={(v) =>
                          update({
                            challenge: s.challenge.map((arr, j) =>
                              j === advanced
                                ? arr.map((n, k) => (k === i ? v : n))
                                : arr,
                            ),
                            challengeDone: s.challengeDone.map((v, j) =>
                              j === advanced ? false : v,
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Court values={s.challenge[advanced]} />
                  <form
                    className="panel rationale"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (s.reasons[advanced].trim())
                        update({
                          challengeDone: s.challengeDone.map((v, i) =>
                            i === advanced ? true : v,
                          ),
                        });
                    }}
                  >
                    <Text
                      label="Why is this environment appropriate for your athlete?"
                      required
                      value={s.reasons[advanced]}
                      onChange={(v) =>
                        update({
                          reasons: s.reasons.map((r, i) =>
                            i === advanced ? v : r,
                          ),
                          challengeDone: s.challengeDone.map((b, i) =>
                            i === advanced ? false : b,
                          ),
                        })
                      }
                      placeholder="Connect your settings to the athlete’s stage…"
                    />
                    <button className="primary">
                      Save coaching decision <Check size={16} />
                    </button>
                    {((s.challengeDone[advanced] && s.feedback) || reveal) && (
                      <div className="feedback">
                        <h4>
                          {advanced
                            ? "Build representative pressure"
                            : "Reduce the attentional load"}
                        </h4>
                        <p>
                          {advanced
                            ? "An autonomous athlete benefits from active defenders, unpredictable options and time constraints that preserve competition-like decisions. Increase demands purposefully rather than maximising every setting."
                            : "A beginner usually benefits from predictable, self-paced practice without a defender. Simplify the movement, demonstrate clearly and provide focused feedback before adding variability."}
                        </p>
                        <p>
                          Your environment is{" "}
                          {Math.round(
                            s.challenge[advanced].reduce((a, b) => a + b, 0) /
                              5,
                          )}
                          % on our approximate complexity scale. Explain
                          individual settings rather than treating this as a
                          performance score.
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="concept">
                <Flag size={22} />
                <div>
                  <strong>
                    Practice environments should develop as the athlete
                    develops.
                  </strong>
                  <p>
                    Match the demand to the learner, then increase it with
                    purpose.
                  </p>
                </div>
              </div>
              <div className="framework-mini">
                {stages.map((x, i) => (
                  <div key={x}>
                    <span>0{i + 1}</span>
                    <h3>{x}</h3>
                    <p>
                      {
                        [
                          "Simplification, consistency, instruction",
                          "Practice, refinement, increasing variability",
                          "Complexity, pressure, decision-making and representative environments",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          {page === 4 && <Inbox s={s} update={update} reveal={reveal} />}
          {page === 5 && (
            <>
              <div className="results-banner">
                <div>
                  <span className="eyebrow">YOUR LEARNING SNAPSHOT</span>
                  <h2>
                    {count === 5
                      ? "Ready to put your coaching into practice."
                      : "Every decision builds your coaching framework."}
                  </h2>
                  <p>
                    {count} of 5 activities complete · Your work stays on this
                    device.
                  </p>
                </div>
                <div className="completion-circle">
                  {count * 20}
                  <span>% COMPLETE</span>
                </div>
              </div>
              <div className="results-list">
                {tabs.slice(0, 5).map((t, i) => (
                  <button key={t} onClick={() => nav(i)}>
                    <span
                      className={"result-icon " + (done[i] ? "complete" : "")}
                    >
                      {done[i] ? <Check size={18} /> : <Clock size={18} />}
                    </span>
                    <strong>{t}</strong>
                    <span>
                      {i === 1
                        ? `${Object.keys(s.lab).length}/10 classifications`
                        : i === 2
                          ? `${s.diagnoses.filter((d) => d.submitted).length}/4 athlete analyses`
                          : done[i]
                            ? "Completed"
                            : "In progress"}
                    </span>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>
              <div className="section-heading">
                <h2>Your Coaching Framework</h2>
                <span>TAKE IT INTO PRACTICE</span>
              </div>
              <div className="framework">
                <div>
                  <span className="step">01</span>
                  <h3>WHO is performing?</h3>
                  <p>Determine their stage of learning</p>
                  <strong>Cognitive → Associative → Autonomous</strong>
                </div>
                <ArrowRight />
                <div>
                  <span className="step">02</span>
                  <h3>WHAT are they performing?</h3>
                  <p>
                    Classify muscle demands, structure, environment and pacing.
                  </p>
                  <strong>
                    Gross ↔ Fine · Closed ↔ Open
                    <br />
                    Discrete ↔ Serial ↔ Continuous
                    <br />
                    Self-paced ↔ Externally paced
                  </strong>
                </div>
                <ArrowRight />
                <div>
                  <span className="step">03</span>
                  <h3>HOW should they practise?</h3>
                  <p>
                    Modify complexity, pressure, predictability, decision-making
                    and feedback.
                  </p>
                  <strong>Create an appropriate learning environment.</strong>
                </div>
              </div>
              <div className="panel reflection">
                <Text
                  label="How does understanding both the athlete and the characteristics of the skill help a coach improve performance?"
                  value={s.reflection}
                  onChange={(reflection) => update({ reflection })}
                  placeholder="Connect WHO, WHAT and HOW in your reflection…"
                />
                <span className="muted">
                  <Check size={14} /> Reflection saves automatically.
                </span>
              </div>
            </>
          )}
          <div className="bottom-nav">
            <span>
              MOVEMENT LAB <span> / </span> OBSERVE → ANALYSE → COACH
            </span>
            {page < 5 && (
              <button onClick={() => nav(page + 1)}>
                Next: {tabs[page + 1]} <ArrowRight size={17} />
              </button>
            )}
          </div>
        </main>
      </div>
      {teacher && (
        <div className="modal-backdrop">
          <section
            className="teacher-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Teacher Mode"
          >
            <div className="panel-heading">
              <div>
                <span className="eyebrow">TEACHING TOOLS</span>
                <h2>Teacher Mode</h2>
              </div>
              <button
                aria-label="Close Teacher Mode"
                onClick={() => setTeacher(false)}
              >
                <X />
              </button>
            </div>
            <div className="panel-body">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={s.feedback}
                  onChange={(e) => update({ feedback: e.target.checked })}
                />{" "}
                Show feedback after submissions
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={reveal}
                  onChange={(e) => setReveal(e.target.checked)}
                />{" "}
                Reveal suggested analyses before submission
              </label>
              <label className="field-label">
                Jump to an activity
                <select
                  value={page}
                  onChange={(e) => {
                    nav(Number(e.target.value));
                    setTeacher(false);
                  }}
                >
                  {tabs.map((t, i) => (
                    <option value={i} key={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <h3>Athlete footage</h3>
              <p className="muted">
                Use direct HTTPS video URLs (e.g. MP4), with permission to use
                the footage. Embed pages such as YouTube are not direct video
                files.
              </p>
              {athletes.map((a, i) => (
                <label className="field-label" key={a.name}>
                  {a.name} · {a.sport}
                  <input
                    type="url"
                    placeholder="https://school.example/athlete.mp4"
                    value={s.videos[i]}
                    onChange={(e) =>
                      update({
                        videos: s.videos.map((v, j) =>
                          i === j ? e.target.value : v,
                        ),
                      })
                    }
                  />
                </label>
              ))}
              <button
                className="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Reset all student responses, notes and progress on this device? Video links and feedback settings will be retained.",
                    )
                  ) {
                    setS({
                      ...initial,
                      videos: s.videos,
                      feedback: s.feedback,
                    });
                    setStageFeedback(false);
                    setLabVals([25, 50, 50, 50]);
                    setReveal(false);
                    setTeacher(false);
                    nav(0);
                  }
                }}
              >
                <RotateCcw size={16} /> Reset student activities
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
