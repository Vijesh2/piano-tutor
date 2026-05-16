import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f7f1e5",
  },
  content: {
    minHeight: "100%",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  container: {
    width: "100%",
    maxWidth: 1040,
    alignSelf: "center",
  },
});
