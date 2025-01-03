import { Filter } from "@/components/Filter";
import { passwordServices } from "@/constants/passwordServices";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Box,
  IconButton,
  Text,
  TextInput
} from "@react-native-material/core";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
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
        <SafeAreaView style={styles.container}>
          <Filter />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {passwordServices.map((service) => (
              <Text>{service}</Text>
            ))}
          </ScrollView>
        </SafeAreaView>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
