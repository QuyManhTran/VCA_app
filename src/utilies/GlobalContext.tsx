import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeContext from "./theme";
import { list } from "../../assets/img/foods";
import { EventRegister } from "react-native-event-listeners";
interface GlobalContextProps {
  children: React.ReactNode;
}
const fakeData = [
  { img: list, name: "Món ngon Hà Nội" },
  { img: list, name: "Gỏi các loại" },
  { img: list, name: "Bún with love" },
  { img: list, name: "Xem sau" },
];
const GlobalContext = ({ children }: GlobalContextProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState(fakeData);
  const setHomeNavbar = (isScrollDown: boolean) => {
    if (isScrollDown !== isHomeScrollDown) {
      setIsHomeScrollDown(isScrollDown);
    }
  };
  const onAddList = (name: string) => {
    setPersonalLists((prevLists) => [...prevLists, { img: list, name: name }]);
  };
  const onRemoveList = (index: number) => {
    setPersonalLists((prevLists) => {
      prevLists.splice(index, 1);
      return prevLists;
    });
  };
  const onAdjustList = (
    position: number,
    newList: { img: any; name: string }
  ) => {
    setPersonalLists((prevLists) => {
      return prevLists.map((list, index) => {
        if (index === position) {
          return newList;
        } else {
          return list;
        }
      });
    });
  };
  useEffect(() => {
    LogBox.ignoreLogs([
      "new NativeEventEmitter()",
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (theme) => {
      setIsDarkMode(theme);
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, [isDarkMode]);
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        isHomeScrollDown,
        personalLists,
        setHomeNavbar,
        onAddList,
        onRemoveList,
        onAdjustList,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalContext;
