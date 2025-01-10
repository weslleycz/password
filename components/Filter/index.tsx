import { Credential } from "@/model/credential.model";
import { primary } from "@/theme";
import { Chip, HStack } from "@react-native-material/core";
import React, { useEffect, useState } from "react";

type IStatus = "all" | "recent" | "favorite";

type Props = {
  all: Credential[];
  setFilterCredential: any;
};

export const Filter = ({ all, setFilterCredential }: Props) => {
  const [status, setStatus] = useState<IStatus>("all");

  const filterRecent = (credentials: Credential[]) => {
    return credentials.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  useEffect(() => {
    if (all) {
      const sorted = [...all].sort((a, b) => {
        if (a.serviceName < b.serviceName) return -1;
        if (a.serviceName > b.serviceName) return 1;
        return 0;
      });
      setFilterCredential(sorted);
    }
  }, [all]);
  
  return (
    <>
      <HStack m={10} spacing={6}>
        <Chip
          style={status == "all" ? { backgroundColor: primary } : {}}
          label="All"
          onPress={() => {
            setStatus("all");
            setFilterCredential(all);
          }}
        />
        <Chip
          style={status == "recent" ? { backgroundColor: primary } : {}}
          label="Recentes"
          onPress={() => {
            const sorted = [...all].sort((a, b) => {
              if (a.serviceName < b.serviceName) return -1;
              if (a.serviceName > b.serviceName) return 1;
              return 0;
            });
            setFilterCredential(sorted);
            setStatus("recent");
          }}
        />
        <Chip
          style={status == "favorite" ? { backgroundColor: primary } : {}}
          label="Favoritos"
          onPress={() => {
            const filter = all.filter((credential) => credential.isFavorite);
            setFilterCredential([...filter]);
            setStatus("favorite");
          }}
        />
      </HStack>
    </>
  );
};
