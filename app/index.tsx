import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { lessons } from "@/data/lessons";
import { getCourseStats, storageProvider } from "@/lib/progress";
import { ProgressRecord } from "@/types/lesson";

export default function CourseDashboard() {
  const [progress, setProgress] = useState<Record<string, ProgressRecord>>({});

  useEffect(() => {
    setProgress(storageProvider.getProgress());
  }, []);

  const stats = useMemo(() => getCourseStats(lessons.length, progress), [progress]);

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Beginner course</Text>
          <Text style={styles.title}>Piano Tutor</Text>
          <Text style={styles.subtitle}>
            Open this on your iPad, sit at your electronic piano, and work through short guided lessons with self-check practice.
          </Text>
        </View>
        <View style={styles.progressPanel}>
          <Text style={styles.progressNumber}>{stats.percentComplete}%</Text>
          <Text style={styles.progressLabel}>course complete</Text>
          <ProgressBar value={stats.percentComplete} />
          <Text style={styles.progressMeta}>
            {stats.complete} complete, {stats.needsPractice} need practice
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        <Text style={styles.sectionMeta}>{stats.started} of {stats.total} started</Text>
      </View>

      <View style={styles.grid}>
        {lessons.map((lesson) => (
          <View key={lesson.id} style={styles.gridItem}>
            <LessonCard lesson={lesson} progress={progress[lesson.id]} />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    gap: 24,
    alignItems: "stretch",
    marginBottom: 32,
  },
  heroCopy: {
    flex: 1,
    minWidth: 280,
    backgroundColor: "#fffaf0",
    borderWidth: 1,
    borderColor: "#dfd1b6",
    borderRadius: 8,
    padding: 28,
  },
  eyebrow: {
    color: "#7d5e2a",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    color: "#1f2a22",
    fontSize: 46,
    lineHeight: 54,
    fontWeight: "900",
  },
  subtitle: {
    color: "#4f4639",
    fontSize: 19,
    lineHeight: 29,
    maxWidth: 650,
    marginTop: 14,
  },
  progressPanel: {
    width: 300,
    backgroundColor: "#2f4636",
    borderRadius: 8,
    padding: 24,
    justifyContent: "center",
  },
  progressNumber: {
    color: "#fffaf0",
    fontSize: 54,
    fontWeight: "900",
  },
  progressLabel: {
    color: "#eadfca",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 18,
  },
  progressMeta: {
    color: "#eadfca",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#1f2a22",
    fontSize: 26,
    fontWeight: "900",
  },
  sectionMeta: {
    color: "#665d4d",
    fontSize: 15,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItem: {
    width: "32%",
    minWidth: 280,
    flexGrow: 1,
  },
});
