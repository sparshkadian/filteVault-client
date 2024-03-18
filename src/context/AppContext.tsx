import React, { SetStateAction, createContext, useState } from 'react';

type initState = {
  currentUser: boolean;
  setCurrentUser: React.Dispatch<SetStateAction<boolean>>;
};

const initialState: initState = {
  currentUser: true,
  setCurrentUser() {},
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(true);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
