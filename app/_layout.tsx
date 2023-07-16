import { TransitionPresets } from "@react-navigation/stack";
import { Slot, Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
]);

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="new-thread"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
