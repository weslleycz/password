import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, FAB, IconButton } from "@react-native-material/core";
import { usePathname } from "expo-router";
import React from "react";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <Box
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 7,
        backgroundColor: "#ffffff",
      }}
    >
      <IconButton
        icon={(props) => (
          <FontAwesome5
            name="key"
            {...props}
            color={pathname === "/" ? "#5bfcac" : "#E9E9EB"}
            size={24}
          />
        )}
        onPress={() => alert("Home button pressed")}
      />
      <FAB
        icon={(props) => <Icon name="plus" {...props} color="#ffffff" />}
        size="mini"
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
            size={24}
          />
        )}
        onPress={() => alert("Account button pressed")}
      />
    </Box>
  );
};
