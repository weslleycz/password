import { AuthenticationFailedDialog } from "@/components/AuthenticationFailedDialog";
import { Filter } from "@/components/Filter";
import { ServiceIten } from "@/components/ServiceIten";
import { useAuthentication } from "@/Contexts/Authentication";
import { useFocusNotifyOnChangeProps } from "@/hooks/useFocusNotifyOnChangeProps";
import { CredentialService } from "@/services/credential.service";
import { primary } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  ActivityIndicator,
  Box,
  IconButton,
  TextInput,
} from "@react-native-material/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const { data, isLoading } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () => {
      const credentialService = new CredentialService();
      return await credentialService.getAll();
    },    notifyOnChangeProps,
  });

  const { isAuthenticated, authenticate } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [isAuthenticated, authenticate]);

  const [focused, setFocused] = useState(false);

  const styles = StyleSheet.create({
    textInput: {
      elevation: 0,
      boxShadow: "none",
      borderColor: focused ? primary : "#ffffff",
      borderWidth: 1,
      backgroundColor: "#ffffff",
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
      <Box style={{ flex: 1 }} bg={"#fbf7f5"}>
      <AuthenticationFailedDialog />
        <Box m={14}>
          <TextInput
            label="Buscar..."
            variant="flat"
            style={styles.textInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
        <SafeAreaView style={styles.container}>
          <Filter />
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
                {data?.map((credential, index) => {
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
