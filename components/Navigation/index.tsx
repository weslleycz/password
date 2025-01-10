import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Divider, FAB, IconButton } from "@react-native-material/core";
import { usePathname } from "expo-router";
import React, { useState } from "react";
import { primary } from "@/theme";
import { Forme } from "../Forme";

export const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Forme isOpen={isOpen} setIsOpen={setIsOpen} />
      <Divider />
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
              color={pathname === "/" ? primary : "#E9E9EB"}
              size={24}
            />
          )}
          onPress={() => alert("Home button pressed")}
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
              color={pathname === "/settings" ? primary : "#E9E9EB"}
              size={24}
            />
          )}
          onPress={() => alert("Account button pressed")}
        />
      </Box>
    </>
  );
};
