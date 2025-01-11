import { useSettings } from "@/contexts/SettingsContext";
import React from "react";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  const { loading } = useSettings();
  return loading ? <></> : <>{children}</>;
};
