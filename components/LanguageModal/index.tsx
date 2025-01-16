import { useSettings } from "@/contexts/SettingsContext";
import { languages } from "@/languages";
import { backgroundSecondaryDark, backgroundSecondaryLight } from "@/theme";
import { Button } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface Language {
  code: string;
  language: string;
}

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const LanguageModal = ({ isVisible, onClose }: LanguageModalProps) => {
  const languagesArray = Object.values(languages);
  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    onClose();
  };

  const { language, setLanguage, theme } = useSettings();

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "center",
      margin: 0,
    },
    modalContent: {
      backgroundColor:
        theme === "dark" ? backgroundSecondaryDark : backgroundSecondaryLight,

      borderRadius: 15,
      padding: 20,
      alignItems: "center",
      margin: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#ffffff" : "#333",
      marginBottom: 20,
    },
    languageButton: {
      paddingVertical: 12,
      width: "100%",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#0e0e0d2d" : "#eee",
      backgroundColor: theme === "dark" ? "#0e0e0d2d" : "#f0f0f0",
      borderRadius: 8,
      marginBottom: 10,
    },
    languageText: {
      fontSize: 16,
      color: theme === "dark" ? "#ffffff" : "#555" ,
    },
    closeButtonContainer: {
      marginTop: 20,
      width: "100%",
    },
    closeButton: {
      borderRadius: 8,
      width: "100%",
    },
  });

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>
          {languages[language].modalLanguage.title}
        </Text>
        {languagesArray.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageButton}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <Text style={styles.languageText}>{lang.language}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.closeButtonContainer}>
          <Button
            onPress={onClose}
            title={languages[language].modalLanguage.btn}
            style={styles.closeButton}
          />
        </View>
      </View>
    </Modal>
  );
};
