// @ts-nocheck

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { AuthenticationProvider } from "@/contexts/Authentication";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import { CredentialSelectedProvider } from "@/contexts/CredentialSelectedContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@react-native-material/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "@/components/Container";
import { StatusBar } from "react-native";

import { primary, theme } from "@/theme";
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
      <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
          <CredentialSelectedProvider>
          <PaperProvider>
            <StatusBar barStyle="light-content" backgroundColor={primary} />
            <ThemeProvider theme={theme}>
              <Stack
                screenOptions={{
                  navigationBarColor: primary,
                }}
              >
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
          </PaperProvider>
          </CredentialSelectedProvider>
        </QueryClientProvider>
      </AuthenticationProvider>
    </>
  );
}
