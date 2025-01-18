import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

interface SettingsContextProps {
  language: string;
  theme: string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("enUs");
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string>(colorScheme || "light");
  const [loading, setLoading] = useState<boolean>(true);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const storedLanguage = await AsyncStorage.getItem("language");
      const storedTheme = await AsyncStorage.getItem("theme");

      if (storedLanguage) setLanguage(storedLanguage);
      if (storedTheme) setTheme(storedTheme);
      else if (!storedTheme && colorScheme) setTheme(colorScheme);
    } catch (error) {
      console.error("Erro ao carregar configurações do AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveLanguage = async (newLanguage: string) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error("Erro ao salvar o idioma no AsyncStorage:", error);
    }
  };

  const saveTheme = async (newTheme: string) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error("Erro ao salvar o tema no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        language,
        theme,
        setLanguage: saveLanguage,
        setTheme: saveTheme,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings deve ser usado dentro de um SettingsProvider");
  }
  return context;
};
