import { AuthenticationFailedDialog } from "@/components/AuthenticationFailedDialog";
import { Filter } from "@/components/Filter";
import { ModalService } from "@/components/ModalService";
import { ServiceIten } from "@/components/ServiceIten";
import { useAuthentication } from "@/contexts/Authentication";
import { useSettings } from "@/contexts/SettingsContext";
import { useFocusNotifyOnChangeProps } from "@/hooks/useFocusNotifyOnChangeProps";
import { languages } from "@/languages";
import { Credential } from "@/model/credential.model";
import { CredentialService } from "@/services/credential.service";
import {
  backgroundDark,
  backgroundLight,
  backgroundSecondaryDark,
  backgroundSecondaryLight,
  primary,
  theme as themeSystem,
} from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  Box,
  IconButton,
  TextInput,
  ThemeProvider,
  darkTheme,
} from "@react-native-material/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { language, theme } = useSettings();
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const { data, isLoading } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () => {
      const credentialService = new CredentialService();
      return await credentialService.getAll();
    },
    notifyOnChangeProps,
  });

  const { isAuthenticated, authenticate, authenticationFailed, startApp } =
    useAuthentication();

  const [focused, setFocused] = useState(false);
  const [filterCredential, setFilterCredential] = useState<Credential[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [isAuthenticated, authenticate]);

  useEffect(() => {
    if (typeof data !== "undefined") {
      setFilterCredential([...data] as unknown as Credential[]);
    }
  }, [data]);

  const styles = StyleSheet.create({
    textInput: {
      elevation: 0,
      boxShadow: "none",
      borderColor: focused
        ? primary
        : theme === "dark"
        ? backgroundSecondaryDark
        : backgroundSecondaryLight,
      borderWidth: 1,
      backgroundColor:
        theme === "dark" ? backgroundSecondaryDark : backgroundSecondaryLight,
      borderRadius: 10,
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
    },
  });

  return (
    <>
      <Box
        style={{ flex: 1 }}
        bg={theme === "dark" ? backgroundDark : backgroundLight}
      >
        {!startApp && (
          <AuthenticationFailedDialog isVisible={authenticationFailed} />
        )}

        <ModalService />
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
          <Box m={14}>
            <TextInput
              label={languages[language].home.input as string}
              variant="flat"
              style={styles.textInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder=""
              inputStyle={{
                boxShadow: "none",
                outline: "none",
              }}
              trailing={(props) => (
                <IconButton
                  icon={(props) => (
                    <AntDesign
                      name="search1"
                      {...props}
                      color={focused ? primary : "#d3d3d3"}
                    />
                  )}
                  {...props}
                  color="primary"
                />
              )}
            />
          </Box>
        </ThemeProvider>
        <SafeAreaView style={styles.container}>
          <Filter
            setFilterCredential={setFilterCredential}
            all={data as Credential[]}
          />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {isLoading ? (
              <>
                <Box
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="large" />
                </Box>
              </>
            ) : (
              <>
                {filterCredential?.map((credential, index) => {
                  return <ServiceIten credential={credential} key={index} />;
                })}
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Box>
    </>
  );
}
