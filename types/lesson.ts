export type LessonLevel = "foundations" | "reading" | "coordination";

export type LessonStatus = "not-started" | "in-progress" | "needs-practice" | "complete";

export type Confidence = "low" | "medium" | "high";

export type LessonStep = {
  id: string;
  title: string;
  body: string;
  notePrompt?: string;
  demoNotes?: string[];
};

export type PracticeTask = {
  id: string;
  title: string;
  target: string;
  rhythm?: string;
  tempo?: number;
  repetitions: number;
  selfCheckPrompt: string;
};

export type KeyboardGuide = {
  firstNote: string;
  lastNote: string;
  highlightedNotes: string[];
  labeledNotes?: string[];
  caption: string;
};

export type Lesson = {
  id: string;
  title: string;
  level: LessonLevel;
  estimatedMinutes: number;
  summary: string;
  keyboardGuide: KeyboardGuide;
  steps: LessonStep[];
  practiceTasks: PracticeTask[];
};

export type ProgressRecord = {
  lessonId: string;
  status: LessonStatus;
  attempts: number;
  confidence: Confidence;
  lastPracticedAt: string;
};
