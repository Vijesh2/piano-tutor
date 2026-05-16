import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  tone?: "primary" | "secondary" | "quiet";
  disabled?: boolean;
};

export function Button({ label, onPress, tone = "primary", disabled = false }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[tone],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.label,
          tone === "primary" ? styles.primaryLabel : styles.secondaryLabel,
          disabled && styles.disabledLabel,
        ]}
      >
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
  disabled: {
    backgroundColor: "#e8ddc8",
    borderColor: "#d8cbb0",
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
  disabledLabel: {
    color: "#8a8170",
  },
});
