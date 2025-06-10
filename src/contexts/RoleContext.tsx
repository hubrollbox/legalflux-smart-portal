import React, { createContext, useContext, useState } from 'react';

interface RoleContextProps {
  role: 'admin' | 'cliente' | 'advogado';
  setRole: (role: 'admin' | 'cliente' | 'advogado') => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'admin' | 'cliente' | 'advogado'>('cliente');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export { RoleContext };
