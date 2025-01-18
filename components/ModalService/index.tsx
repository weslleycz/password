import { useCredentialSelected } from "@/contexts/CredentialSelectedContext";
import { useSettings } from "@/contexts/SettingsContext";
import { backgroundDark, backgroundSecondaryLight, primary } from "@/theme";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
} from "@react-native-material/core";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-ico-logos";
import Modal from "react-native-modal";
import { ServiceOptionsModal } from "../ServiceOptionsModal";

export const ModalService = () => {
  const { theme } = useSettings();
  const { selected, setSelected } = useCredentialSelected();
  const [isModalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    modal: {
      margin: 0,
      marginTop: 10,
      justifyContent: "flex-end",
    },
    modalContent: {
      flex: 1,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      alignItems: "center",
      justifyContent: "space-between",
    },
    menu: {
      position: "absolute",
      top: 50,
      right: 20,
      zIndex: 10,
    },
  });

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={!!selected}
        style={styles.modal}
        backdropColor="rgba(0, 0, 0, 0.5)"
      >
        <ServiceOptionsModal
          isVisible={isModalVisible}
          setIsVisible={setModalVisible}
          onClose={() => setModalVisible(false)}
        />
        {selected !== null ? (
          <Box
            bg={theme === "dark" ? backgroundDark : backgroundSecondaryLight}
            style={styles.modalContent}
          >
            <HStack style={styles.header}>
              <IconButton
                color="primary"
                onPress={() => setSelected(null)}
                icon={(props) => (
                  <AntDesign name="close" size={24} color={primary} />
                )}
              />
              <Box>
                <IconButton
                  color={theme === "dark" ? "white" : "black"}
                  onPress={() => setModalVisible(true)}
                  icon={(props) => (
                    <MaterialCommunityIcons name="dots-vertical" {...props} />
                  )}
                />
              </Box>
            </HStack>

            <Box p={4}>
              <HStack m={4} spacing={6}>
                <Box
                  radius={9}
                  p={8}
                  bg={theme === "dark" ? "#0e0e0d2d" : "#fbf7f5"}
                >
                  <Icon height="40" width="40" name={selected?.serviceName} />
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    color={theme === "dark" ? "white" : "black"}
                    style={{
                      marginBottom: 2,
                    }}
                    variant="h3"
                  >
                    {selected?.serviceName !== null &&
                      selected?.serviceName.charAt(0).toUpperCase() +
                        selected?.serviceName.slice(1)}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Divider />

            <Box mt={5}>
              <HStack style={styles.header}>
                <Box>
                  <HStack m={4} spacing={6}>
                    <Box p={2} style={{ justifyContent: "center" }}>
                      <Feather name="user" size={24} color="gray" />
                    </Box>
                    <Box>
                      <Text color={"gray"} variant="subtitle1">
                        Usuário
                      </Text>
                      <Text
                        color={theme === "dark" ? "white" : "black"}
                        variant="subtitle1"
                      >
                        {selected?.username}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box>
                  <IconButton
                    onPress={() => copyToClipboard(selected?.username)}
                    color={theme === "dark" ? "white" : "black"}
                    icon={(props) => <Feather name="copy" {...props} />}
                  />
                </Box>
              </HStack>

              <HStack style={styles.header}>
                <Box>
                  <HStack m={4} spacing={6}>
                    <Box p={2} style={{ justifyContent: "center" }}>
                      <Ionicons name="key" size={24} color="gray" />
                    </Box>
                    <Box>
                      <Text color={"gray"} variant="subtitle1">
                        Senha
                      </Text>
                      <Text
                        color={theme === "dark" ? "white" : "black"}
                        variant="subtitle1"
                      >
                        {selected?.password.replace(/./g, "*")}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box>
                  <IconButton
                    onPress={() => copyToClipboard(selected?.password)}
                    color={theme === "dark" ? "white" : "black"}
                    icon={(props) => <Feather name="copy" {...props} />}
                  />
                </Box>
              </HStack>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};
