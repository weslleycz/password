import { useAuthentication } from "@/contexts/Authentication";
import { primary } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importando o ícone
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";

export const AuthenticationFailedDialog = () => {
  const [visible, setVisible] = useState(true);

  const { isAuthenticated, authenticate, authenticationFailed } =
    useAuthentication();

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog
        visible={authenticationFailed}
        onDismiss={hideDialog}
        style={styles.dialog}
        dismissable={false}
      >
        <Dialog.Content style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={80}
              color="#f44336"
            />
          </View>
          <Dialog.Title style={styles.title}>
            Falha na Autenticação
          </Dialog.Title>
          <Text style={styles.text}>
            A tentativa de autenticação falhou. Por favor, tente novamente.
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#fff",
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
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
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
