import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Lesson, ProgressRecord } from "@/types/lesson";

type LessonCardProps = {
  lesson: Lesson;
  progress?: ProgressRecord;
};

const statusLabels = {
  "not-started": "Not started",
  "in-progress": "In progress",
  "needs-practice": "Needs practice",
  complete: "Complete",
};

export function LessonCard({ lesson, progress }: LessonCardProps) {
  const status = progress?.status ?? "not-started";

  return (
    <Link href={`/lesson/${lesson.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.level}>{lesson.level}</Text>
          <Text style={[styles.status, status === "complete" && styles.complete]}>
            {statusLabels[status]}
          </Text>
        </View>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.summary}>{lesson.summary}</Text>
        <Text style={styles.meta}>{lesson.estimatedMinutes} min lesson</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 218,
    backgroundColor: "#fffaf0",
    borderColor: "#dfd1b6",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  level: {
    color: "#7d5e2a",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  status: {
    color: "#665d4d",
    fontSize: 13,
    fontWeight: "700",
  },
  complete: {
    color: "#2f6b45",
  },
  title: {
    color: "#1f2a22",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 18,
  },
  summary: {
    color: "#4f4639",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  meta: {
    color: "#665d4d",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 18,
  },
});
