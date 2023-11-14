import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeContext from "./theme";
import { list } from "../../assets/img/foods";
import { mostlySearch, notifytions } from "../../constants/fakeData";
import * as Network from "expo-network";
interface GlobalContextProps {
  children: React.ReactNode;
}
const fakeData = [{ img: list, name: "Xem sau", data: mostlySearch }];
const GlobalContext = ({ children }: GlobalContextProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [baseURL, setBaseURL] = useState<string | null>(null);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState(fakeData);
  const [notifitions, setNotifitions] = useState(notifytions);

  const onDarkTheme = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
  };

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
    const getIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      const url = `${process.env.EXPO_PUBLIC_API_PROTOCOL}://${ip}:${process.env.EXPO_PUBLIC_SERVER_PORT}`;
      console.log(url);
      setBaseURL(url);
    };
    getIpAddress();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        isHomeScrollDown,
        personalLists,
        notifitions,
        baseURL,
        setHomeNavbar,
        onAddList,
        onRemoveList,
        onAdjustList,
        onRemoveBlogList,
        onRemoveUnread,
        onDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalContext;
