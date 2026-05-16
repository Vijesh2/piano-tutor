import { StyleSheet, View } from "react-native";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#dfd1b6",
  },
  fill: {
    height: "100%",
    backgroundColor: "#2f4636",
  },
});
