import { useAuthentication } from "@/Contexts/Authentication";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
} from "@react-native-material/core";
import React from "react";
import Icon from "react-native-ico-logos";
import { Credential } from "@/model/credential.model";

type Props = {
  credential: Credential;
};

export const ServiceIten = ({ credential }: Props) => {
  const { isAuthenticated, authenticate } = useAuthentication();
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
          <Box style={{ justifyContent: "center", width: 96 }}>
            <HStack>
              <IconButton
                icon={(props) => (
                  <MaterialIcons name="content-copy" size={24} />
                )}
              />
              <IconButton
                icon={(props) => (
                  <Entypo name="dots-three-vertical" size={24} color="black" />
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
