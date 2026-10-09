export const stages = ["Cognitive", "Associative", "Autonomous"];
export const axes = [
  ["Gross", "Fine"],
  ["Discrete", "Serial", "Continuous"],
  ["Closed", "Open"],
  ["Self-paced", "Externally paced"],
];
export const athletes = [
  {
    name: "Jordan Mitchell",
    sport: "Basketball",
    level: "Beginner",
    skill: "Learning the lay-up",
    stage: 0,
    values: [12, 50, 25, 35],
    facts: [
      "Looks at their feet and the ball before moving",
      "Inconsistent footwork; sometimes jumps from the wrong foot",
      "Needs frequent instructions",
    ],
    evidence:
      "Looking down and relying on instructions suggest conscious attention to the movement. Large, inconsistent errors are typical of the cognitive stage.",
    coach:
      "Remove defenders, demonstrate the footwork and practise a short, predictable sequence. Give one clear cue and frequent specific feedback.",
    difficulty:
      "Coordinating footwork, ball handling and take-off is placing a high demand on attention.",
  },
  {
    name: "Sophie Nguyen",
    sport: "Tennis",
    level: "Developing",
    skill: "Refining the serve",
    stage: 1,
    values: [25, 50, 20, 15],
    facts: [
      "Understands the movement and is moderately consistent",
      "Sometimes identifies their own errors",
      "Technique becomes less reliable under pressure",
    ],
    evidence:
      "Self-recognition of errors and improving consistency suggest the associative stage. Pressure still disrupts execution.",
    coach:
      "Use focused repetitions with target zones, gradually add pressure and ask the player to identify errors before giving feedback.",
    difficulty:
      "Maintaining a consistent toss and movement sequence under pressure.",
  },
  {
    name: "Noah Williams",
    sport: "Soccer",
    level: "Experienced",
    skill: "Receive, scan & pass",
    stage: 2,
    values: [15, 50, 95, 90],
    facts: [
      "Scans the environment while receiving the ball",
      "Adapts rapidly to defenders",
      "Consistently executes accurate passes",
    ],
    evidence:
      "Scanning defenders and making tactical decisions while passing suggests that movement execution requires relatively little conscious attention.",
    coach:
      "Use small-sided games, variable passing options and active defenders to develop decisions under realistic time pressure.",
    difficulty:
      "Reading changing defender positions and choosing an accurate pass within limited time.",
  },
  {
    name: "Isla Thompson",
    sport: "Swimming",
    level: "Experienced",
    skill: "Freestyle efficiency",
    stage: 2,
    values: [10, 100, 10, 15],
    facts: [
      "Highly repetitive and consistent movement",
      "Efficient technique in a stable pool environment",
      "Performance appears largely automatic",
    ],
    evidence:
      "Efficient, consistent repetition suggests automatic execution. Experience alone is insufficient; look for low attention demands.",
    coach:
      "Refine pacing and efficiency with interval sets and specific technique feedback. Introduce race-pace demands progressively.",
    difficulty:
      "Maintaining efficient technique and pacing as fatigue increases.",
  },
];
export const skills = [
  [
    "Basketball free throw",
    [15, 0, 10, 10],
    "A single shot with a clear end, mainly using large muscle groups. The stationary setup is relatively predictable and the shooter initiates it within the rules.",
  ],
  [
    "Basketball jump shot in a game",
    [15, 50, 90, 90],
    "The gather, jump and release form a sequence. Defenders and time pressure make the environment open and externally paced.",
  ],
  [
    "Golf putt",
    [65, 0, 20, 10],
    "A distinct action with precision demands. The ball is stationary, but surface and weather can affect predictability.",
  ],
  [
    "Soccer pass under pressure",
    [15, 0, 95, 95],
    "A single pass uses large muscle groups. Moving defenders influence both choice and timing.",
  ],
  [
    "Swimming freestyle",
    [10, 100, 10, 15],
    "Repeated cycles have no inherent endpoint. A pool is stable; race starts and other swimmers can add external demands.",
  ],
  [
    "Gymnastics floor routine",
    [10, 50, 15, 35],
    "A planned sequence of distinct skills. The environment is stable, though music and competition timing may influence pace.",
  ],
  [
    "Tennis serve",
    [25, 50, 20, 15],
    "Toss, loading and strike form a sequence. The server initiates the action; conditions and tactical targets add variability.",
  ],
  [
    "Tennis rally",
    [20, 50, 95, 95],
    "A sequence of discrete strokes responds to an opponent. Timing and positioning are externally constrained.",
  ],
  [
    "Sprint start",
    [10, 0, 15, 100],
    "A distinct whole-body action in a predictable lane, initiated in response to an external starting signal.",
  ],
  [
    "Dribbling through defenders",
    [15, 100, 95, 95],
    "Repeated dribbling cycles combine with changing directions and decisions. Defenders determine timing and space.",
  ],
] as const;
export type Diagnosis = {
  stage: string;
  evidence: string;
  difficulty: string;
  coach: string;
  values: number[];
  submitted: boolean;
  notes: { time: number; text: string }[];
};
export type Saved = {
  matches: string[];
  stageDone: boolean;
  lab: Record<string, number[]>;
  diagnoses: Diagnosis[];
  challenge: number[][];
  reasons: string[];
  challengeDone: boolean[];
  inbox: string;
  inboxDone: boolean;
  reflection: string;
  videos: string[];
  feedback: boolean;
};
export const initial: Saved = {
  matches: ["", "", ""],
  stageDone: false,
  lab: {},
  diagnoses: athletes.map(() => ({
    stage: "",
    evidence: "",
    difficulty: "",
    coach: "",
    values: [25, 50, 50, 50],
    submitted: false,
    notes: [],
  })),
  challenge: [
    [80, 80, 80, 70, 70],
    [20, 20, 20, 20, 20],
  ],
  reasons: ["", ""],
  challengeDone: [false, false],
  inbox: "",
  inboxDone: false,
  reflection: "",
  videos: ["", "", "", ""],
  feedback: true,
};
