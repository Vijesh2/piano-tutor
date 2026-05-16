import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#f7f1e5" },
        headerTintColor: "#1f2a22",
        headerTitleStyle: { fontWeight: "800" },
        contentStyle: { backgroundColor: "#f7f1e5" },
      }}
    />
  );
}
