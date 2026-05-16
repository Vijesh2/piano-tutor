import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  tone?: "primary" | "secondary" | "quiet";
};

export function Button({ label, onPress, tone = "primary" }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[tone],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, tone === "primary" ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  primary: {
    backgroundColor: "#2f4636",
    borderColor: "#2f4636",
  },
  secondary: {
    backgroundColor: "#fffaf0",
    borderColor: "#cdbf9f",
  },
  quiet: {
    backgroundColor: "transparent",
    borderColor: "#d8cbb0",
  },
  pressed: {
    opacity: 0.78,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  primaryLabel: {
    color: "#fffaf0",
  },
  secondaryLabel: {
    color: "#2f4636",
  },
});
