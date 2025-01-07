import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Box, Divider, HStack, Text } from "@react-native-material/core";
import React from "react";
import Icon from "react-native-ico-logos";

export const ServiceIten = () => {
  return (
    <>
      <Box p={4} bg={"#ffffff"}>
        <HStack justify="between">
          <Box>
            <HStack m={4} spacing={6}>
              <Box radius={5} bg={"#fbf7f5"}>
                <Box p={7}>
                  <Icon height="40" width="40" name="facebook" />
                </Box>
              </Box>

              <Box>
                <Text variant="h4">Facebook</Text>
                <Text variant="subtitle1">user@gmail.com</Text>
              </Box>
            </HStack>
          </Box>
          <Box style={{ justifyContent: "center", width: 96 }}>
            <HStack spacing={20}>
              <MaterialIcons name="content-copy" size={24} />
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Divider style={{ marginBottom: 5 }} />
    </>
  );
};
