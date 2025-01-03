import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Box,
  IconButton,
  TextInput,
} from "@react-native-material/core";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <Box style={{ flex: 1 }} bg={"#F5FBF8"}>
        <Box m={10}>
          <TextInput
            label="Buscar..."
            variant="outlined"
            style={styles.textInput}
            inputStyle={{
              boxShadow: "none",
            }}
            trailing={(props) => (
              <IconButton
                icon={(props) => <AntDesign name="search1" {...props} />}
                {...props}
                color="primary"
              />
            )}
          />
        </Box>
        <SafeAreaView></SafeAreaView>

      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    elevation: 0,
    boxShadow: "none",
    borderWidth: 0,
  },
});
