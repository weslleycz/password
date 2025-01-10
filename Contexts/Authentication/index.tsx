import React, { createContext, useContext, useState, ReactNode } from "react";
import * as LocalAuthentication from "expo-local-authentication";

interface AuthenticationContextType {
  isAuthenticated: boolean;
  authenticationFailed: boolean;
  authenticate: () => Promise<boolean>;
}

interface AuthenticationProviderProps {
  children: ReactNode; 
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationFailed, setAuthenticationFailed] = useState(false);

  async function authenticate(): Promise<boolean> {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isAvailable) {
        console.log("Device does not support biometric authentication.");
        setAuthenticationFailed(true);
        return false;
      }

      const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!hasBiometrics) {
        console.log("No biometrics are enrolled.");
        setAuthenticationFailed(true);
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirme sua identidade",
        cancelLabel: "Cancelar",
        disableDeviceFallback: false,
      });

      if (result.success) {
        console.log("Authentication successful!");
        setIsAuthenticated(true);
        setAuthenticationFailed(false); // Reseta o estado de falha
        return true;
      } else {
        console.log("Authentication failed or was canceled.");
        setAuthenticationFailed(true);
        return false;
      }
    } catch (error) {
      console.error("Error requesting authentication:", error);
      setAuthenticationFailed(true);
      return false;
    }
  }

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, authenticationFailed, authenticate }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuthentication must be used within an AuthenticationProvider");
  }
  return context;
};
