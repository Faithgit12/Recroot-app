import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ animation: 'none' }} />
      <Stack.Screen name="jobs" options={{ animation: 'none' }} />
      <Stack.Screen name="apps" options={{ animation: 'none' }} />
      <Stack.Screen name="profile/index" options={{ animation: 'none' }} />
    </Stack>
  );
}

