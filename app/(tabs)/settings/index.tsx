import { LanguageModal } from "@/components/LanguageModal";
import { useSettings } from "@/contexts/SettingsContext";
import { languages } from "@/languages";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Box,
  HStack,
  IconButton,
  Switch,
  Text,
} from "@react-native-material/core";
import React, { useState } from "react";

const Config = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { language } = useSettings();
  return (
    <>
      <LanguageModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Text
        variant="h3"
        style={{
          margin: 20,
          fontWeight: "bold",
          fontSize: 24,
          textAlign: "center",
          color: "#333",
        }}
      >
        Configurações
      </Text>
      <Box
        m={2}
        p={4}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" spacing={4}>
          <HStack alignItems="center" spacing={4}>
            <Box
              radius={25}
              bg={"#e9f2fa"}
              p={8}
              style={{
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="globe" size={30} color={"#1c8bf3"} />
            </Box>

            <Text
              variant="h4"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginLeft: 10,
                color: "#333",
              }}
            >
              {languages[language].settings.languageText}
            </Text>
          </HStack>
          <HStack alignItems="center" spacing={4}>
            <Text style={{ color: "#888888", fontSize: 16, marginRight: 10 }}>
              {languages[language].language}
            </Text>
            <Box
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                padding: 5,
              }}
            >
              <IconButton
                onPress={() => setModalVisible(true)}
                icon={(props) => (
                  <AntDesign name="right" size={24} color="#333" />
                )}
              />
            </Box>
          </HStack>
        </HStack>
      </Box>
      <Box
        m={2}
        p={4}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" spacing={4}>
          <HStack alignItems="center" spacing={4}>
            <Box
              radius={25}
              bg={"#e9e4ff"}
              p={8}
              style={{
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="moon-sharp" size={30} color="#6c4bff" />
            </Box>

            <Text
              variant="h4"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginLeft: 10,
                color: "#333",
              }}
            >
              {languages[language].settings.themeText}
            </Text>
          </HStack>
          <HStack alignItems="center" spacing={4}>
            <Text style={{ color: "#888888", fontSize: 16, marginRight: 10 }}>
              Off
            </Text>
            <Box
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Switch />
            </Box>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default Config;
