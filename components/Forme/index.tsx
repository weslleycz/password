import { servicesName } from "@/constants/servicesName";
import { useAuthentication } from "@/contexts/Authentication";
import { useSettings } from "@/contexts/SettingsContext";
import { CredentialService } from "@/services/credential.service";
import { generatePasswordService } from "@/services/generatePassword.service";
import {
  backgroundDark,
  backgroundSecondaryDark,
  backgroundSecondaryLight,
  primary,
} from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Slider from "@react-native-community/slider";
import {
  Box,
  Button,
  darkTheme,
  Divider,
  HStack,
  IconButton,
  ThemeProvider,
} from "@react-native-material/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { TextInput } from "react-native-paper";
import { languages } from "../../languages";
import { theme as themeSystem } from "@/theme";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Forme = ({ isOpen, setIsOpen }: Props) => {
  const queryClient = useQueryClient();

  const [focused, setFocused] = useState({
    serviceName: false,
    username: false,
    password: false,
  });

  const [serviceName, setServiceName] = useState("");
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [length, setLength] = useState(0);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { authenticate } = useAuthentication();

  const handleFocus = (field: string) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field: string) => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const [errors, setErrors] = useState({
    serviceName: false,
    username: false,
    password: false,
  });

  const handleServiceNameChange = (text: string) => {
    setServiceName(text);

    if (text.length > 0) {
      const filtered = servicesName.filter((service) =>
        service.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  };

  const handleServiceSelect = (service: string) => {
    setServiceName(service);
    setFilteredServices([]);
  };

  const handleGeneratePassword = () => {
    const passwordNew = generatePasswordService(length);
    setPassword(passwordNew);
  };

  const handleSubmit = async () => {
    let validationErrors = {} as any;

    if (!serviceName) {
      validationErrors.serviceName = true;
    }

    if (!username) {
      validationErrors.username = true;
    }

    if (!password) {
      validationErrors.password = true;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors({
        ...errors,
        ...validationErrors,
      });
      return;
    }

    const credentialService = new CredentialService();

    const authenticated = await authenticate();

    if (!authenticated) {
      console.log("Authentication failed. Please try again.");
      Alert.alert("Authentication failed. Please try again.")
      return;
    }

    credentialService.setItem({
      createdAt: new Date(),
      password,
      serviceName,
      username,
    });

    queryClient.invalidateQueries({ queryKey: ["getAll"] });

    setUsername("");
    setPassword("");
    setServiceName("");
    setLength(0);
    setIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: handleSubmit,
    scope: {
      id: "fetchServices",
    },
  });

  const { language, theme } = useSettings();

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
    divider: {
      marginVertical: 10,
    },
    input: {
      marginVertical: 12,
      borderRadius: 12,
      backgroundColor: "#fff",
      paddingLeft: 12,
      height: 50,
    },
    passwordInput: {
      marginVertical: 12,
      borderRadius: 12,
      backgroundColor: "#fff",
      paddingLeft: 12,
      height: 50,
    },
    passwordLength: {
      color: "#aaa",
      marginTop: 8,
    },
    passwordStrengthInput: {
      marginVertical: 12,
      height: 50,
      backgroundColor:
        theme === "dark" ? backgroundSecondaryDark : backgroundSecondaryLight,
    },
    passwordStrengthContainer: {
      marginTop: 1,
      borderRadius: 8,
      padding: 12,
      backgroundColor: theme === "dark" ? "#2e5f4a4c" : "#f0faf5",
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    passwordStrengthControls: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      marginTop: 20,
      backgroundColor: "#ffffff",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    saveButton: {
      marginTop: 20,
      backgroundColor: primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    dropdown: {
      maxHeight: 120,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#d3d3d3",
      borderRadius: 8,
      marginTop: -10,
      marginBottom: 10,
      elevation: 4,
    },
    dropdownItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#d3d3d3",
    },
    dropdownText: {
      fontSize: 14,
      color: "#333",
    },
    slider: {
      height: 40,
      marginTop: 10,
    },
  });

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isOpen}
      style={styles.modal}
      backdropColor="rgba(0, 0, 0, 0.5)"
      onBackButtonPress={() => setIsOpen(false)}
    >
      <Box
        bg={theme === "dark" ? backgroundDark : backgroundSecondaryLight}
        style={styles.modalContent}
      >
        <HStack style={styles.header}>
          <IconButton
            color="primary"
            onPress={() => setIsOpen(false)}
            icon={(props) => (
              <AntDesign name="close" size={24} color={primary} />
            )}
          />
        </HStack>

        <Divider style={styles.divider} />

        <ThemeProvider
          theme={
            theme === "dark"
              ? {
                  ...darkTheme,
                  palette: {
                    ...darkTheme.palette,
                    primary: { main: primary, on: "#ffffff" },
                  },
                }
              : themeSystem
          }
        >
          <TextInput
            label={languages[language]?.form?.serviceName as string}
            style={styles.input}
            mode="outlined"
            value={serviceName}
            error={errors.serviceName}
            onChangeText={handleServiceNameChange}
            textColor={theme === "dark" ? "#ffffff" : "#000000"}
            theme={{
              colors: {
                primary: primary,
                placeholder: "#aaa",
                background: "#fff",
              },
            }}
            outlineStyle={{
              borderWidth: 2,
              borderColor: focused.serviceName
                ? primary
                : errors.serviceName
                ? "#ff7979"
                : "#d3d3d3",
              backgroundColor: errors.serviceName
                ? "#fcc7c7"
                : theme === "dark"
                ? backgroundSecondaryDark
                : backgroundSecondaryLight,
            }}
            onFocus={() => {
              setErrors({
                ...errors,
                serviceName: false,
              });
              handleFocus("serviceName");
            }}
            onBlur={() => handleBlur("serviceName")}
          />

          {filteredServices.length > 0 && (
            <ScrollView style={styles.dropdown}>
              {filteredServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleServiceSelect(service)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{service}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <TextInput
            label={languages[language]?.form?.username}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            textColor={theme === "dark" ? "#ffffff" : "#000000"}
            theme={{
              colors: {
                primary: primary,
                placeholder: "#aaa",
                background: "#fff",
              },
            }}
            onBlur={() => handleBlur("username")}
            outlineStyle={{
              borderWidth: 2,
              borderColor: focused.username
                ? primary
                : errors.username
                ? "#ff7979"
                : "#d3d3d3",
              backgroundColor: errors.username
                ? "#fcc7c7"
                : theme === "dark"
                ? backgroundSecondaryDark
                : backgroundSecondaryLight,
            }}
            onFocus={() => {
              setErrors({
                ...errors,
                username: false,
              });
              handleFocus("username");
            }}
          />

          <TextInput
            label={languages[language]?.form?.password}
            style={styles.passwordInput}
            mode="outlined"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            textColor={theme === "dark" ? "#ffffff" : "#000000"}
            theme={{
              colors: {
                primary: primary,
                placeholder: "#aaa",
                background: "#fff",
              },
            }}
            right={
              <TextInput.Icon
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                color={errors.password ? "#ff7979" : primary}
                icon={!isPasswordVisible ? "eye-off" : "eye"}
              />
            }
            onBlur={() => handleBlur("password")}
            outlineStyle={{
              borderWidth: 2,
              borderColor: focused.password
                ? primary
                : errors.password
                ? "#ff7979"
                : "#d3d3d3",
              backgroundColor: errors.password
                ? "#fcc7c7"
                : theme === "dark"
                ? backgroundSecondaryDark
                : backgroundSecondaryLight,
            }}
            onFocus={() => {
              setErrors({
                ...errors,
                password: false,
              });
              handleFocus("password");
            }}
          />

          {focused.password && (
            <Box p={2} style={styles.passwordStrengthContainer}>
              <HStack style={styles.passwordStrengthControls}>
                <Text style={styles.passwordLength}>
                  {languages[language]?.form?.lengthText}
                </Text>
                <TextInput
                  textColor={theme === "dark" ? "#ffffff" : "#000000"}
                  cursorColor={primary}
                  onChange={(e) => {
                    const newLength = Number(e.nativeEvent.text);
                    setLength(isNaN(newLength) ? 0 : newLength);
                  }}
                  right={
                    <TextInput.Icon
                      onPress={() => setLength(length + 1)}
                      color={primary}
                      icon="plus"
                    />
                  }
                  left={
                    <TextInput.Icon
                      onPress={() =>
                        setLength(length === 0 ? length : length - 1)
                      }
                      color={primary}
                      icon="minus"
                    />
                  }
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  value={String(length)}
                  outlineStyle={{
                    borderWidth: 2,
                    borderColor: primary,
                  }}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.passwordStrengthInput}
                />
              </HStack>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={length}
                onValueChange={(value) => setLength(value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor={primary}
              />

              <Button
                title={languages[language]?.form?.btnGenerate}
                style={styles.button}
                onPress={handleGeneratePassword}
              />
            </Box>
          )}
        </ThemeProvider>

        <Button
          title={languages[language]?.form?.btnSeve}
          style={styles.saveButton}
          onPress={() => mutation.mutate()}
          loadingIndicatorPosition="overlay"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        />
      </Box>
    </Modal>
  );
};
