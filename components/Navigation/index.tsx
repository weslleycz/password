import {
  backgroundSecondaryDark,
  backgroundSecondaryLight,
  primary,
} from "@/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Divider, FAB, IconButton } from "@react-native-material/core";
import { usePathname } from "expo-router";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSettings } from "@/contexts/SettingsContext";

type Props = {
  setIsOpen: any;
};

export const Navigation = ({ setIsOpen }: Props) => {
  const pathname = usePathname();
  const { theme } = useSettings();
  return (
    <>
      {theme !== "dark" && <Divider />}

      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 7,
          backgroundColor:
            theme === "dark"
              ? backgroundSecondaryDark
              : backgroundSecondaryLight,
        }}
      >
        <IconButton
          icon={(props) => (
            <FontAwesome5
              name="key"
              {...props}
              color={
                pathname === "/"
                  ? primary
                  : theme === "dark"
                  ? "#ffffff"
                  : "#E9E9EB"
              }
              size={24}
            />
          )}
          onPress={() => router.replace("/")}
        />
        <FAB
          icon={(props) => <Icon name="plus" {...props} color="#ffffff" />}
          size="mini"
          color="primary"
          onPress={() => setIsOpen(true)}
          style={{
            boxShadow: "none",
            elevation: 0,
          }}
        />
        <IconButton
          icon={(props) => (
            <Ionicons
              name="settings-sharp"
              {...props}
              color={
                pathname === "/settings"
                  ? primary
                  : theme === "dark"
                  ? "#ffffff"
                  : "#E9E9EB"
              }
              size={24}
            />
          )}
          onPress={() => router.replace("/settings")}
        />
      </Box>
    </>
  );
};
