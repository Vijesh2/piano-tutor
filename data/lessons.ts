import { Lesson } from "@/types/lesson";

export const lessons: Lesson[] = [
  {
    id: "posture-and-middle-c",
    title: "Posture and Middle C",
    level: "foundations",
    estimatedMinutes: 8,
    summary: "Set up your bench, hands, and first landmark note before playing.",
    keyboardGuide: {
      firstNote: "C3",
      lastNote: "G4",
      highlightedNotes: ["C4"],
      labeledNotes: ["C4"],
      caption: "Middle C is highlighted. On your piano, find the C just left of the two black keys nearest the center.",
    },
    steps: [
      {
        id: "bench",
        title: "Sit for control",
        body: "Sit near the front half of the bench with relaxed shoulders. Your forearms should be roughly level with the keys.",
      },
      {
        id: "hands",
        title: "Shape your hand",
        body: "Let your fingers curve naturally, as if holding a small ball. Keep wrists loose, not collapsed.",
      },
      {
        id: "middle-c",
        title: "Find Middle C",
        body: "Find the pair of two black keys nearest the center of the piano. Middle C is the white key immediately to the left of that pair.",
        notePrompt: "Middle C",
        demoNotes: ["C4"],
      },
    ],
    practiceTasks: [
      {
        id: "find-c",
        title: "Find Middle C without looking away",
        target: "Play Middle C with right-hand finger 1, then with left-hand finger 1.",
        repetitions: 5,
        selfCheckPrompt: "Could you find Middle C quickly and play it with a relaxed wrist?",
      },
    ],
  },
  {
    id: "finger-numbers",
    title: "Finger Numbers",
    level: "foundations",
    estimatedMinutes: 10,
    summary: "Learn the finger numbering used in piano method books and practice prompts.",
    keyboardGuide: {
      firstNote: "C4",
      lastNote: "G4",
      highlightedNotes: ["C4", "D4", "E4", "F4", "G4"],
      caption: "Right-hand C position: place fingers 1 through 5 on C, D, E, F, and G.",
    },
    steps: [
      {
        id: "right-hand",
        title: "Right hand",
        body: "Thumb is 1, index is 2, middle is 3, ring is 4, pinky is 5.",
      },
      {
        id: "left-hand",
        title: "Left hand",
        body: "The same numbering applies on the left hand: thumb is 1 and pinky is 5.",
      },
      {
        id: "five-finger-position",
        title: "C five-finger position",
        body: "Place right-hand fingers 1 to 5 on C, D, E, F, and G. Keep each finger near its key.",
        notePrompt: "C D E F G",
        demoNotes: ["C4", "D4", "E4", "F4", "G4"],
      },
    ],
    practiceTasks: [
      {
        id: "right-hand-walk",
        title: "Right-hand walk",
        target: "Play C D E F G, then G F E D C with right-hand fingers 1 2 3 4 5.",
        tempo: 72,
        repetitions: 4,
        selfCheckPrompt: "Did each finger stay curved and close to the key?",
      },
    ],
  },
  {
    id: "note-names-c-to-g",
    title: "Note Names C to G",
    level: "reading",
    estimatedMinutes: 12,
    summary: "Connect the first five white keys to their names and sound.",
    keyboardGuide: {
      firstNote: "C4",
      lastNote: "G4",
      highlightedNotes: ["C4", "D4", "E4", "F4", "G4"],
      caption: "Use the highlighted five-key group to say each note name before playing it.",
    },
    steps: [
      {
        id: "alphabet",
        title: "The music alphabet",
        body: "Piano note names use A through G, then repeat. In this lesson, stay in C position: C, D, E, F, G.",
      },
      {
        id: "say-and-play",
        title: "Say and play",
        body: "Say each note name out loud before you play it. This builds the link between the key, the name, and the sound.",
        notePrompt: "C D E F G",
        demoNotes: ["C4", "D4", "E4", "F4", "G4"],
      },
    ],
    practiceTasks: [
      {
        id: "random-c-to-g",
        title: "Name check",
        target: "Play these notes slowly: C E D F G E C.",
        repetitions: 5,
        selfCheckPrompt: "Could you name each key before playing it?",
      },
    ],
  },
  {
    id: "steady-quarter-notes",
    title: "Steady Quarter Notes",
    level: "reading",
    estimatedMinutes: 10,
    summary: "Practice playing one note per beat with a steady pulse.",
    keyboardGuide: {
      firstNote: "C3",
      lastNote: "G4",
      highlightedNotes: ["C4"],
      labeledNotes: ["C4"],
      caption: "Keep returning to the highlighted Middle C while counting four steady beats.",
    },
    steps: [
      {
        id: "counting",
        title: "Count evenly",
        body: "Count 1, 2, 3, 4 at a steady speed. Each quarter note gets one count.",
      },
      {
        id: "single-note-pulse",
        title: "Play with the count",
        body: "Play Middle C once on each count. Keep the sound even and avoid rushing.",
        notePrompt: "C C C C",
        demoNotes: ["C4", "C4", "C4", "C4"],
      },
    ],
    practiceTasks: [
      {
        id: "four-beat-c",
        title: "Four steady beats",
        target: "Play C C C C while counting 1 2 3 4.",
        rhythm: "Quarter notes",
        tempo: 70,
        repetitions: 8,
        selfCheckPrompt: "Were all four notes evenly spaced?",
      },
    ],
  },
  {
    id: "first-melody",
    title: "First Melody",
    level: "coordination",
    estimatedMinutes: 15,
    summary: "Play a short right-hand melody using C, D, and E.",
    keyboardGuide: {
      firstNote: "C4",
      lastNote: "G4",
      highlightedNotes: ["C4", "D4", "E4"],
      labeledNotes: ["C4", "D4", "E4"],
      caption: "This melody only uses C, D, and E. Keep the hand still and move between the highlighted keys.",
    },
    steps: [
      {
        id: "preview",
        title: "Preview the shape",
        body: "This melody moves stepwise between C, D, and E. Keep your right hand in C position.",
        notePrompt: "C D E D C",
        demoNotes: ["C4", "D4", "E4", "D4", "C4"],
      },
      {
        id: "chunk",
        title: "Practice in chunks",
        body: "First play C D E. Then play E D C. Put the two chunks together only when each feels easy.",
      },
    ],
    practiceTasks: [
      {
        id: "melody-loop",
        title: "C-D-E melody",
        target: "Play C D E D C with right-hand fingers 1 2 3 2 1.",
        tempo: 66,
        repetitions: 6,
        selfCheckPrompt: "Did the melody stay smooth with no hand tension?",
      },
    ],
  },
  {
    id: "left-hand-root-notes",
    title: "Left-Hand Root Notes",
    level: "coordination",
    estimatedMinutes: 14,
    summary: "Add simple left-hand notes while keeping the right hand relaxed.",
    keyboardGuide: {
      firstNote: "C3",
      lastNote: "G4",
      highlightedNotes: ["C3", "C4"],
      labeledNotes: ["C3", "C4"],
      caption: "Low C for the left hand and Middle C are both highlighted so you can compare their positions.",
    },
    steps: [
      {
        id: "left-c",
        title: "Find low C",
        body: "Move your left hand to the C below Middle C. Play it with finger 5, then release.",
        notePrompt: "C3",
        demoNotes: ["C3"],
      },
      {
        id: "hands-separate",
        title: "Hands separate first",
        body: "Practice the left hand alone before combining it with any right-hand melody.",
      },
    ],
    practiceTasks: [
      {
        id: "left-c-pulse",
        title: "Left-hand pulse",
        target: "Play low C on count 1, then rest on counts 2, 3, and 4.",
        rhythm: "Whole measure pulse",
        tempo: 64,
        repetitions: 8,
        selfCheckPrompt: "Could you keep counting through the rests?",
      },
    ],
  },
];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
