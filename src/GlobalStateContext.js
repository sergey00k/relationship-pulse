import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [switchControl, setSwitchControl] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Bahasa Indonesia');

  return (
    <GlobalStateContext.Provider value={{ switchControl, setSwitchControl, selectedLanguage, setSelectedLanguage }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
