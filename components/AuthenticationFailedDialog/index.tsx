import { useSettings } from "@/contexts/SettingsContext";
import { languages } from "@/languages";
import {
  backgroundSecondaryDark,
  backgroundSecondaryLight,
  primary,
} from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import React from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";

type Props = {
  isVisible: boolean;
};

export const AuthenticationFailedDialog = ({isVisible}:Props) => {
  const { theme, language } = useSettings();

  const styles = StyleSheet.create({
    dialog: {
      backgroundColor:
        theme === "dark" ? backgroundSecondaryDark : backgroundSecondaryLight,
      borderRadius: 12,
      maxWidth: 320,
      alignSelf: "center",
      minHeight: 250,
    },
    content: {
      alignItems: "center",
    },
    iconContainer: {
      marginBottom: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: theme === "dark" ? "#ffffff" : "#333",
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? "#f0f0f0" : "#555",
      textAlign: "center",
      marginBottom: 20,
      flexWrap: "wrap",
      width: "100%",
    },
    button: {
      marginTop: 10,
      width: "100%",
      borderRadius: 8,
      backgroundColor: primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <Portal>
      <Dialog visible={isVisible} style={styles.dialog} dismissable={false}>
        <Dialog.Content style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={80}
              color="#f44336"
            />
          </View>
          <Dialog.Title style={styles.title}>
            {
              languages[language].modalAuthenticationFailedDialog
                .title as string
            }
          </Dialog.Title>
          <Text style={styles.text}>
            {languages[language].modalAuthenticationFailedDialog.text as string}
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
