import { useAuthentication } from "@/contexts/Authentication";
import { Credential } from "@/model/credential.model";
import { CredentialService } from "@/services/credential.service";
import { primary } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
} from "@react-native-material/core";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Icon from "react-native-ico-logos";

type Props = {
  credential: Credential;
};

export const ServiceIten = ({ credential }: Props) => {
  const { isAuthenticated } = useAuthentication();
  const [isFavorite, setIsFavorite] = useState(credential.isFavorite);
    const queryClient = useQueryClient();

  const toggleFavorite = async (id: string) => {
    const credentialService = new CredentialService();
    await credentialService.upload(id, { isFavorite: !credential.isFavorite });
    queryClient.invalidateQueries({ queryKey: ["getAll"] });
  };



  return (
    <>
      <Box p={4} bg={"#ffffff"}>
        <HStack justify="between">
          <Box>
            <HStack m={4} spacing={6}>
              <Box radius={5} bg={"#fbf7f5"}>
                <Box p={7}>
                  <Icon
                    height="40"
                    width="40"
                    name={isAuthenticated ? credential?.serviceName : "null"}
                  />
                </Box>
              </Box>

              <Box>
                <Text
                  style={{
                    backgroundColor: isAuthenticated ? "#ffffff" : "#000000",
                    marginBottom: 2,
                  }}
                  variant="h4"
                >
                  {credential?.serviceName}
                </Text>
                <Text
                  style={{
                    backgroundColor: isAuthenticated ? "#ffffff" : "#000000",
                  }}
                  variant="subtitle1"
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
                    name={credential.isFavorite && isAuthenticated ? "star" : "staro"}
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
