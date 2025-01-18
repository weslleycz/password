import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Credential } from "@/model/credential.model";

interface CredentialContextType {
  selected: Credential | null;
  setSelected: (credential: Credential | null) => void;
}

const CredentialContext = createContext<CredentialContextType | undefined>(undefined);

interface CredentialSelectedProviderProps {
  children: ReactNode;
}

export const CredentialSelectedProvider: React.FC<CredentialSelectedProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<Credential | null>(null);

  return (
    <CredentialContext.Provider value={{ selected, setSelected }}>
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredentialSelected = (): CredentialContextType => {
  const context = useContext(CredentialContext);
  if (!context) {
    throw new Error('useCredential deve ser usado dentro de um CredentialProvider');
  }
  return context;
};
