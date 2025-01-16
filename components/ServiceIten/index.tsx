import { useAuthentication } from "@/contexts/Authentication";
import { useSettings } from "@/contexts/SettingsContext";
import { Credential } from "@/model/credential.model";
import { CredentialService } from "@/services/credential.service";
import {
  backgroundSecondaryDark,
  backgroundSecondaryLight,
  primary,
} from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
} from "@react-native-material/core";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Icon from "react-native-ico-logos";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  credential: Credential;
};

export const ServiceIten = ({ credential }: Props) => {
  const { isAuthenticated } = useAuthentication();
  const queryClient = useQueryClient();

  const toggleFavorite = async (id: string) => {
    const credentialService = new CredentialService();
    await credentialService.upload(id, { isFavorite: !credential.isFavorite });
    queryClient.invalidateQueries({ queryKey: ["getAll"] });
  };

  const { theme } = useSettings();

  return (
    <>
      <Box
        p={4}
        bg={
          theme === "dark" ? backgroundSecondaryDark : backgroundSecondaryLight
        }
      >
        <HStack justify="between">
          <Box>
            <HStack m={4} spacing={6}>
              <Box radius={5} bg={theme === "dark" ? "#0e0e0d2d" : "#fbf7f5"}>
                <Box
                  p={7}
                >
                  {isAuthenticated ? (
                    <Icon
                      height="40"
                      width="40"
                      name={credential?.serviceName}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="lock"
                      size={40}
                      color={primary}
                    />
                  )}
                </Box>
              </Box>

              <Box>
                <Text
                  color={theme === "dark" ? "white" : "black"}
                  style={{
                    marginBottom: 2,
                    filter: isAuthenticated ? "blur(0px)" : "blur(6px)",
                  }}
                  variant="h4"
                >
                  {credential?.serviceName}
                </Text>

                <Text
                  color={theme === "dark" ? "white" : "black"}
                  variant="subtitle1"
                  style={{
                    filter: isAuthenticated ? "blur(0px)" : "blur(6px)",
                  }}
                >
                  {credential?.username}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Box>
            <HStack>
              <IconButton
                onPress={() => toggleFavorite(credential.id as string)}
                icon={(props) => (
                  <AntDesign
                    name={
                      credential.isFavorite && isAuthenticated
                        ? "star"
                        : "staro"
                    }
                    size={24}
                    color={primary}
                  />
                )}
              />
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Divider style={{ marginBottom: 5 }} />
    </>
  );
};
