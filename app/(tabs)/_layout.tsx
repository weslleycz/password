import { Tabs } from "expo-router";
import React, { useState } from "react";

import { Container } from "@/components/Container";
import { HapticTab } from "@/components/HapticTab";
import { Navigation } from "@/components/Navigation";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Forme } from "../../components/Forme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <SettingsProvider>
          <Container>
            <Forme isOpen={isOpen} setIsOpen={setIsOpen} />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                  display: "none",
                },
              }}
            >
              <Tabs.Screen name="index" />
            </Tabs>
            <Navigation setIsOpen={setIsOpen} />
          </Container>
        </SettingsProvider>
    </>
  );
}
