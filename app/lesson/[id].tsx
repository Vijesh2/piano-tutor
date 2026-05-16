import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { PianoKeyboardGuide } from "@/components/PianoKeyboardGuide";
import { Screen } from "@/components/Screen";
import { getLessonById, lessons } from "@/data/lessons";
import { playDemoNotes } from "@/lib/audio";
import { storageProvider } from "@/lib/progress";
import { Confidence, LessonStatus, ProgressRecord } from "@/types/lesson";

const resultMap: Record<string, { status: LessonStatus; confidence: Confidence }> = {
  gotIt: { status: "complete", confidence: "high" },
  needsPractice: { status: "needs-practice", confidence: "medium" },
  repeat: { status: "in-progress", confidence: "low" },
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = useMemo(() => (id ? getLessonById(id) : undefined), [id]);
  const [progress, setProgress] = useState<ProgressRecord | undefined>();

  useEffect(() => {
    if (lesson) {
      setProgress(storageProvider.getLessonProgress(lesson.id));
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <Screen>
        <Text style={styles.title}>Lesson not found</Text>
        <Link href="/" style={styles.backLink}>Back to lessons</Link>
      </Screen>
    );
  }

  function recordResult(kind: keyof typeof resultMap) {
    if (!lesson) {
      return;
    }

    const result = resultMap[kind];
    const next = storageProvider.recordLessonResult(lesson.id, result.status, result.confidence);
    setProgress(next);
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: lesson.title }} />
      <Link href="/" style={styles.backLink}>Back to lessons</Link>

      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.level}>{lesson.level}</Text>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.summary}>{lesson.summary}</Text>
        </View>
        <View style={styles.statusPanel}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={styles.statusValue}>{progress?.status ?? "not-started"}</Text>
          <Text style={styles.statusMeta}>
            {progress ? `${progress.attempts} practice checks` : "No practice checks yet"}
          </Text>
        </View>
      </View>

      <PianoKeyboardGuide guide={lesson.keyboardGuide} />

      <View style={styles.columns}>
        <View style={styles.mainColumn}>
          <Text style={styles.sectionTitle}>Learn</Text>
          {lesson.steps.map((step, index) => (
            <View key={step.id} style={styles.step}>
              <Text style={styles.stepNumber}>Step {index + 1}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.body}>{step.body}</Text>
              {step.notePrompt ? <Text style={styles.notePrompt}>{step.notePrompt}</Text> : null}
              {step.demoNotes ? (
                <View style={styles.demoRow}>
                  <Button label="Play demo notes" tone="secondary" onPress={() => playDemoNotes(step.demoNotes ?? [])} />
                </View>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.practiceColumn}>
          <Text style={styles.sectionTitle}>Practice</Text>
          {lesson.practiceTasks.map((task) => (
            <View key={task.id} style={styles.task}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.body}>{task.target}</Text>
              <View style={styles.taskMetaRow}>
                {task.tempo ? <Text style={styles.badge}>{task.tempo} bpm</Text> : null}
                {task.rhythm ? <Text style={styles.badge}>{task.rhythm}</Text> : null}
                <Text style={styles.badge}>{task.repetitions} reps</Text>
              </View>
              <Text style={styles.selfCheck}>{task.selfCheckPrompt}</Text>
            </View>
          ))}

          <View style={styles.checkPanel}>
            <Text style={styles.checkTitle}>Self-check</Text>
            <Text style={styles.body}>
              Play the practice task on your piano, then choose the result that best matches this session.
            </Text>
            <View style={styles.buttonStack}>
              <Button label="Got it" onPress={() => recordResult("gotIt")} />
              <Button label="Needs practice" tone="secondary" onPress={() => recordResult("needsPractice")} />
              <Button label="Repeat" tone="quiet" onPress={() => recordResult("repeat")} />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backLink: {
    color: "#2f4636",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 18,
    textDecorationLine: "none",
  },
  header: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 28,
  },
  headerCopy: {
    flex: 1,
    backgroundColor: "#fffaf0",
    borderWidth: 1,
    borderColor: "#dfd1b6",
    borderRadius: 8,
    padding: 26,
  },
  level: {
    color: "#7d5e2a",
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    color: "#1f2a22",
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "900",
  },
  summary: {
    color: "#4f4639",
    fontSize: 18,
    lineHeight: 27,
    marginTop: 12,
  },
  statusPanel: {
    width: 260,
    backgroundColor: "#2f4636",
    borderRadius: 8,
    padding: 22,
    justifyContent: "center",
  },
  statusLabel: {
    color: "#eadfca",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  statusValue: {
    color: "#fffaf0",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 8,
  },
  statusMeta: {
    color: "#eadfca",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },
  columns: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
  },
  mainColumn: {
    flex: 1.3,
    gap: 14,
  },
  practiceColumn: {
    flex: 1,
    gap: 14,
  },
  sectionTitle: {
    color: "#1f2a22",
    fontSize: 25,
    fontWeight: "900",
    marginBottom: 4,
  },
  step: {
    backgroundColor: "#fffaf0",
    borderWidth: 1,
    borderColor: "#dfd1b6",
    borderRadius: 8,
    padding: 22,
  },
  stepNumber: {
    color: "#7d5e2a",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  stepTitle: {
    color: "#1f2a22",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  body: {
    color: "#4f4639",
    fontSize: 16,
    lineHeight: 24,
  },
  notePrompt: {
    color: "#1f2a22",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f1e4c9",
    borderRadius: 8,
  },
  demoRow: {
    marginTop: 16,
    alignItems: "flex-start",
  },
  task: {
    backgroundColor: "#fffaf0",
    borderWidth: 1,
    borderColor: "#dfd1b6",
    borderRadius: 8,
    padding: 20,
  },
  taskTitle: {
    color: "#1f2a22",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 8,
  },
  taskMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  badge: {
    color: "#2f4636",
    backgroundColor: "#f1e4c9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: "800",
  },
  selfCheck: {
    color: "#2f4636",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    marginTop: 16,
  },
  checkPanel: {
    backgroundColor: "#e6d5b9",
    borderRadius: 8,
    padding: 20,
  },
  checkTitle: {
    color: "#1f2a22",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },
  buttonStack: {
    gap: 10,
    marginTop: 18,
  },
});
