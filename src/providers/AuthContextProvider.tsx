'use client';

import { UserInfoType } from '@/types/common';
import React, { createContext, useContext } from 'react';

const AuthContext = createContext<UserInfoType | null>(null);

interface Props {
  children: React.ReactNode;
  value: UserInfoType | null;
}

function AuthContextProvider({ children, value }: Props) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
