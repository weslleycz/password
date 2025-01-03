import { Chip, HStack } from "@react-native-material/core";
import React, { useState } from "react";

type IStatus = "all" | "recent" | "favorite";

export const Filter = () => {
  const [status, setStatus] = useState<IStatus>("all");
  return (
    <>
      <HStack m={10} spacing={6}>
        <Chip
          style={status == "all" ? { backgroundColor: "#5bfcac" } : {}}
          label="All"
          onPress={() => setStatus("all")}
        />
        <Chip
          style={status == "recent" ? { backgroundColor: "#5bfcac" } : {}}
          label="Recentes"
          onPress={() => setStatus("recent")}
        />
        <Chip
          style={status == "favorite" ? { backgroundColor: "#5bfcac" } : {}}
          label="Favoritos"
          onPress={() => setStatus("favorite")}
        />
      </HStack>
    </>
  );
};
