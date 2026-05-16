import { Confidence, LessonStatus, ProgressRecord } from "@/types/lesson";

const STORAGE_KEY = "piano-tutor-progress-v1";

type StoredProgress = Record<string, ProgressRecord>;

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll(): StoredProgress {
  if (!canUseLocalStorage()) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredProgress) : {};
  } catch {
    return {};
  }
}

function writeAll(progress: StoredProgress) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export const storageProvider = {
  getProgress(): StoredProgress {
    return readAll();
  },

  getLessonProgress(lessonId: string): ProgressRecord | undefined {
    return readAll()[lessonId];
  },

  recordLessonResult(lessonId: string, status: LessonStatus, confidence: Confidence): ProgressRecord {
    const progress = readAll();
    const previous = progress[lessonId];
    const next: ProgressRecord = {
      lessonId,
      status,
      confidence,
      attempts: (previous?.attempts ?? 0) + 1,
      lastPracticedAt: new Date().toISOString(),
    };

    writeAll({ ...progress, [lessonId]: next });
    return next;
  },
};

export function getCourseStats(totalLessons: number, progress: StoredProgress) {
  const complete = Object.values(progress).filter((record) => record.status === "complete").length;
  const needsPractice = Object.values(progress).filter((record) => record.status === "needs-practice").length;
  const started = Object.values(progress).filter((record) => record.status !== "not-started").length;

  return {
    complete,
    needsPractice,
    started,
    total: totalLessons,
    percentComplete: totalLessons === 0 ? 0 : Math.round((complete / totalLessons) * 100),
  };
}
