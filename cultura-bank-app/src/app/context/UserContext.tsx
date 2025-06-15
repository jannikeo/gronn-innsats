'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isCulturaCustomer: boolean;
  setIsCulturaCustomer: (value: boolean) => void;
  monthlyBonusPoints: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // I en ekte app ville dette komme fra en database/API
  const [isCulturaCustomer, setIsCulturaCustomer] = useState(true); // Simulerer registrert kunde
  
  // Cultura-kunder får 20 bonus-poeng hver måned
  const monthlyBonusPoints = isCulturaCustomer ? 20 : 0;

  return (
    <UserContext.Provider value={{
      isCulturaCustomer,
      setIsCulturaCustomer,
      monthlyBonusPoints
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}