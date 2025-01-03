import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, FAB, IconButton } from "@react-native-material/core";
import { useRouter, usePathname } from "expo-router";
import React from "react";
import { Text } from "react-native";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <Box
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 9,
        backgroundColor: "#ffffff",
      }}
    >
      <IconButton
        icon={(props) => (
          <FontAwesome5
            name="key"
            {...props}
            color={pathname === "/" ? "#5bfcac" : "#E9E9EB"}
            size={30}
          />
        )}
        onPress={() => alert("Home button pressed")}
      />
      <FAB
        icon={(props) => <Icon name="plus" {...props} color="#ffffff" />}
        color="primary"
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
            color={pathname === "/settings" ? "#5bfcac" : "#E9E9EB"}
            size={30}
          />
        )}
        onPress={() => alert("Account button pressed")}
      />
    </Box>
  );
};
