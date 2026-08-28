export type Puzzle = {
  id: string;
  number: number;
  title: string;
  setup: string;
  question: string;
  code: string;
  predict: string[];
  pathChoices: string[];
  nudge: string;
};

export const puzzles: Puzzle[] = [
  {
    id: "even-marbles",
    number: 1,
    title: "Split the marbles",
    setup: "Start with one condition and one changed variable.",
    question: "Which path runs, and what remains at the end?",
    code: `marbles = 4
if marbles % 2 == 0:
    boxes = marbles // 2
else:
    boxes = marbles + 1
print(boxes)`,
    predict: ["marbles", "boxes"],
    pathChoices: ["If path", "Else path"],
    nudge: "Check the remainder after dividing marbles by 2.",
  },
  {
    id: "badge-score",
    number: 2,
    title: "Add the badge",
    setup: "A branch creates a value before the last assignment.",
    question: "Trace the badge first, then update the score.",
    code: `score = 7
if score >= 5:
    badge = 1
else:
    badge = 0
score = score + badge
print(score)`,
    predict: ["score", "badge"],
    pathChoices: ["If path", "Else path"],
    nudge: "Decide whether 7 passes the test before adding badge.",
  },
  {
    id: "signal-loop",
    number: 3,
    title: "Raise the signal",
    setup: "A short loop feeds a later condition.",
    question: "Follow each loop turn before choosing the branch.",
    code: `total = 0
for step in range(4):
    total = total + step
if total > 5:
    signal = 1
else:
    signal = 0
print(signal)`,
    predict: ["total", "signal"],
    pathChoices: ["Loop 4 times → If path", "Loop 4 times → Else path", "Loop 3 times → If path"],
    nudge: "range(4) gives 0, 1, 2, then 3.",
  },
  {
    id: "double-tickets",
    number: 4,
    title: "Double the tickets",
    setup: "The same assignment runs more than once.",
    question: "Keep the new value after each loop turn.",
    code: `tickets = 3
for turn in range(2):
    tickets = tickets * 2
print(tickets)`,
    predict: ["tickets", "turn"],
    pathChoices: ["Loop 2 times", "Loop 1 time", "Straight path"],
    nudge: "The second turn doubles the result of the first turn.",
  },
  {
    id: "cooling-room",
    number: 5,
    title: "Read the room",
    setup: "Two starting values decide which update survives.",
    question: "Test the difference, then trace only that path.",
    code: `room = 12
outside = 4
if room - outside < 6:
    room = room + 2
else:
    room = room - 3
print(room)`,
    predict: ["room", "outside"],
    pathChoices: ["If path", "Else path"],
    nudge: "Work out room minus outside before comparing it with 6.",
  },
];
