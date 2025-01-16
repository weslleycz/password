import { useSettings } from "@/contexts/SettingsContext";
import { languages } from "@/languages";
import { Credential } from "@/model/credential.model";
import { backgroundSecondaryDark, primary } from "@/theme";
import { Chip, HStack } from "@react-native-material/core";
import React, { useEffect, useState } from "react";

type IStatus = "all" | "recent" | "favorite";

type Props = {
  all: Credential[];
  setFilterCredential: any;
};

export const Filter = ({ all, setFilterCredential }: Props) => {
  const [status, setStatus] = useState<IStatus>("all");
  const { language, theme } = useSettings();

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
          color={
            theme === "dark" ? (status == "all" ? "black" : "white") : "black"
          }
          style={
            status == "all"
              ? { backgroundColor: primary }
              : theme === "dark"
              ? { backgroundColor: backgroundSecondaryDark }
              : {}
          }
          label={languages[language].home.filter.all as string}
          onPress={() => {
            setStatus("all");
            setFilterCredential(all);
          }}
        />
        <Chip
          color={
            theme === "dark"
              ? status == "recent"
                ? "black"
                : "white"
              : "black"
          }
          style={
            status == "recent"
              ? { backgroundColor: primary }
              : theme === "dark"
              ? { backgroundColor: backgroundSecondaryDark }
              : {}
          }
          label={languages[language].home.filter.recent as string}
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
          color={
            theme === "dark"
              ? status == "favorite"
                ? "black"
                : "white"
              : "black"
          }
          style={
            status == "favorite"
              ? { backgroundColor: primary }
              : theme === "dark"
              ? { backgroundColor: backgroundSecondaryDark }
              : {}
          }
          label={languages[language].home.filter.favorite as string}
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
