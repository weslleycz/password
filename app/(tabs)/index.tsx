import { Filter } from "@/components/Filter";
import { ServiceIten } from "@/components/ServiceIten";
import { useFocusNotifyOnChangeProps } from "@/hooks/useFocusNotifyOnChangeProps";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Box, IconButton, TextInput } from "@react-native-material/core";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  // const { data } = useQuery({
  //   queryKey: ['myKey'],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       'https://api.github.com/repos/tannerlinsley/react-query',
  //     )
  //     return response.json()
  //   },
  //   notifyOnChangeProps,
  // })
  return (
    <>
      <Box style={{ flex: 1 }} bg={"#fbf7f5"}>
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
            <ServiceIten />
            <ServiceIten />
            <ServiceIten />
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
  },
  scrollContent: {
    padding: 16,
  },
});
