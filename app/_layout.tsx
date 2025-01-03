// @ts-nocheck
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@react-native-material/core";
import { StatusBar } from "react-native";

import { theme } from "@/theme";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#5bfcac"} />
      <ThemeProvider theme={theme}>
        <Stack screenOptions={{
          navigationBarColor:"#5bfcac",
          
        }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              navigationBarHidden: false,
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </>
  );
}
