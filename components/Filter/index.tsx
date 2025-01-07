import { primary } from "@/theme";
import { Chip, HStack } from "@react-native-material/core";
import React, { useState } from "react";

type IStatus = "all" | "recent" | "favorite";

export const Filter = () => {
  const [status, setStatus] = useState<IStatus>("all");
  return (
    <>
      <HStack m={10} spacing={6}>
        <Chip
          style={status == "all" ? { backgroundColor: primary } : {}}
          label="All"
          onPress={() => setStatus("all")}
        />
        <Chip
          style={status == "recent" ? { backgroundColor: primary } : {}}
          label="Recentes"
          onPress={() => setStatus("recent")}
        />
        <Chip
          style={status == "favorite" ? { backgroundColor: primary } : {}}
          label="Favoritos"
          onPress={() => setStatus("favorite")}
        />
      </HStack>
    </>
  );
};
