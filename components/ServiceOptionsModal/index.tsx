import { useSettings } from "@/contexts/SettingsContext";
import { languages } from "@/languages";
import { backgroundSecondaryDark, backgroundSecondaryLight } from "@/theme";
import { Button } from "@react-native-material/core";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { CredentialService } from "@/services/credential.service";
import { useCredentialSelected } from "@/contexts/CredentialSelectedContext";
import { useAuthentication } from "@/contexts/Authentication";
import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  isVisible: boolean;
  setIsVisible: any;
  onClose: () => void;
}

export const ServiceOptionsModal = ({
  isVisible,
  onClose,
  setIsVisible,
}: ModalProps) => {
  const { language, theme } = useSettings();
  const { selected, setSelected } = useCredentialSelected();
  const { authenticate } = useAuthentication();
  const queryClient = useQueryClient();

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
      color: theme === "dark" ? "#ffffff" : "#555",
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

  const handleDelete = () => {
    setIsVisible(false);
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este item?",
      [
        {
          text: "Cancelar",
          onPress: () => setIsVisible(true),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            const credentialService = new CredentialService();
            console.log();
            const authenticated = await authenticate();
            if (!authenticated) {
              return;
            }
            await credentialService.deleteItem(String(selected?.id));
            queryClient.invalidateQueries({ queryKey: ["getAll"] });
            setSelected(null);
          },
        },
      ]
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Opções</Text>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleDelete()}
        >
          <Text style={styles.languageText}>Apagar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageButton}
          // onPress={() => handleLanguageSelect(lang.code)}
        >
          <Text style={styles.languageText}>Editar</Text>
        </TouchableOpacity>
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
