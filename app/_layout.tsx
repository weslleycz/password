// @ts-nocheck
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@react-native-material/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";

import { theme, primary } from "@/theme";
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
  const queryClient = new QueryClient();
  return (
    <>
     <QueryClientProvider client={queryClient}>
     <StatusBar barStyle="light-content" backgroundColor={primary} />
      <ThemeProvider theme={theme}>
        <Stack screenOptions={{
          navigationBarColor:primary,
          
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
     </QueryClientProvider>
    </>
  );
}
