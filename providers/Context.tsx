import React, { createContext, useContext, ReactNode, ReactElement, Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  user: boolean;
  setUser: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [user, setUser] = React.useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
