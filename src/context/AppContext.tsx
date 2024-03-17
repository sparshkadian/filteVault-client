import React, { SetStateAction, createContext, useState } from 'react';

type initState = {
  currentUser: boolean;
  setCurrentUser: React.Dispatch<SetStateAction<boolean>>;
  test: number;
};

const initialState: initState = {
  currentUser: true,
  setCurrentUser() {},
  test: 0,
};

const { test } = initialState;

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, test }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
