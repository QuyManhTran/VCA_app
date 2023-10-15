import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeContext from "./theme";
import { list } from "../../assets/img/foods";
import { EventRegister } from "react-native-event-listeners";
import { mostlySearch, notifytions } from "../../constants/fakeData";
interface GlobalContextProps {
  children: React.ReactNode;
}
const fakeData = [
  { img: list, name: "Món ngon Hà Nội", data: mostlySearch },
  { img: list, name: "Gỏi các loại", data: mostlySearch },
  { img: list, name: "Bún with love", data: mostlySearch },
  { img: list, name: "Xem sau", data: mostlySearch },
];
const GlobalContext = ({ children }: GlobalContextProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState(fakeData);
  const [notifitions, setNotifitions] = useState(notifytions);
  const setHomeNavbar = (isScrollDown: boolean) => {
    if (isScrollDown !== isHomeScrollDown) {
      setIsHomeScrollDown(isScrollDown);
    }
  };
  const onAddList = (name: string) => {
    setPersonalLists((prevLists) => [
      ...prevLists,
      { img: list, name: name, data: mostlySearch },
    ]);
  };
  const onRemoveList = (index: number) => {
    setPersonalLists((prevLists) => {
      prevLists.splice(index, 1);
      return prevLists;
    });
  };
  const onAdjustList = (position: number, newName: string) => {
    setPersonalLists((prevLists) => {
      return prevLists.map((list, index) => {
        if (index === position) {
          return { ...list, name: newName };
        } else {
          return list;
        }
      });
    });
  };
  const onRemoveBlogList = (position: number, removeList: number[]) => {
    let result;
    setPersonalLists((prevLists) => {
      return prevLists.map((list, index) => {
        if (index === position) {
          result = list.data.filter(
            (value, index) => !removeList.includes(index)
          );
          return {
            ...list,
            data: result,
          };
        }
        return list;
      });
    });
    return result;
  };

  const onRemoveUnread = (type: string, position: number, isRead: boolean) => {
    if (type === "today") {
      setNotifitions((prevNotifys) => {
        return {
          ...prevNotifys,
          today: prevNotifys.today.map((item, index) => {
            if (index === position) {
              return { ...item, isRead: isRead };
            }
            return item;
          }),
        };
      });
    } else if (type === "before") {
      setNotifitions((prevNotifys) => {
        return {
          ...prevNotifys,
          before: prevNotifys.before.map((item, index) => {
            if (index === position) {
              return { ...item, isRead: isRead };
            }
            return item;
          }),
        };
      });
    } else if (type === "read_all") {
      setNotifitions((prevNotifys) => {
        return {
          today: prevNotifys.today.map((item, index) => {
            if (!item.isRead) {
              return { ...item, isRead: true };
            }
            return item;
          }),
          before: prevNotifys.before.map((item, index) => {
            if (!item.isRead) {
              return { ...item, isRead: true };
            }
            return item;
          }),
        };
      });
    }
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
        notifitions,
        setHomeNavbar,
        onAddList,
        onRemoveList,
        onAdjustList,
        onRemoveBlogList,
        onRemoveUnread,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalContext;
