import React, { useState, useEffect } from "react";
import ThemeContext from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { list } from "../../assets/img/foods";
import { mostlySearch, notifytions } from "../../constants/fakeData";
import {
  addItemListService,
  addListService,
  allListService,
  deleteItemListService,
  deleteListService,
  editNameListService,
} from "../services/listService";
interface GlobalContextProps {
  children: React.ReactNode;
  storageData: string;
}
export interface UserInforProps {
  username: string;
  avatar: string;
  email: string;
}

const fakeData = [{ img: list, name: "Xem sau", data: mostlySearch }];
const GlobalContext = ({ storageData, children }: GlobalContextProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfor, setUserInfor] = useState<UserInforProps>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [baseURL, setBaseURL] = useState<string | null>(null);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState<any[]>(fakeData);
  const [notifitions, setNotifitions] = useState(notifytions);
  const [isConnectionSocket, setIsConnectionSocket] = useState(false);

  const getIsDarkMode = async () => {
    const value = await AsyncStorage.getItem(
      process.env.EXPO_PUBLIC_DARK_MODE_KEY
    );
    if (value !== null) {
      setIsDarkMode(JSON.parse(value)?.isDarkMode || false);
    }
  };

  const onSaveDatatoStorage = async (data: string) => {
    try {
      const value = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_STORAGE_KEY
      );
      const isDarkMode = AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DARK_MODE_KEY
      );
      if (value === null) {
        await AsyncStorage.setItem(process.env.EXPO_PUBLIC_STORAGE_KEY, data);
      }
      if (isDarkMode === null) {
        await AsyncStorage.setItem(
          process.env.EXPO_PUBLIC_DARK_MODE_KEY,
          JSON.stringify({ isDarkMode: false })
        );
      }
    } catch (error) {
      console.log("Save error for unknown reasons!");
    }
  };

  const onSaveUserInforStorage = async (data: string) => {
    const value = await AsyncStorage.getItem(
      process.env.EXPO_PUBLIC_STORAGE_KEY
    );
    if (value !== null) {
      try {
        await AsyncStorage.mergeItem(process.env.EXPO_PUBLIC_STORAGE_KEY, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onLogin = () => {
    setIsLogged(true);
  };

  const onConnectSocket = () => {
    setIsConnectionSocket(true);
  };

  const onUserId = (userId: string) => {
    setUserId(userId);
  };

  const onUserInfor = (updatedData: object) => {
    setUserInfor((prev) => ({ ...prev, ...updatedData }));
  };

  const onDarkTheme = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
  };

  const setHomeNavbar = (isScrollDown: boolean) => {
    if (isScrollDown !== isHomeScrollDown) {
      setIsHomeScrollDown(isScrollDown);
    }
  };
  const onAddList = async (name: string) => {
    const response = await addListService.addList(addListService.addListPath, {
      id_user: userId,
      name: name,
    });
    if (response.message === 200) {
      console.log(response.data);
      setPersonalLists((prev) => [
        ...prev,
        { id: response.data?.id, name: response.data?.name, listFood: [] },
      ]);
    }
  };
  const onRemoveList = async (
    index: number,
    userId: string,
    listId: string
  ) => {
    const response = await deleteListService.deleteList(
      deleteListService.deleteListPath,
      {
        id_ulist: listId,
        id_user: userId,
      }
    );

    if (response.message === 200) {
      setPersonalLists((prevLists) =>
        prevLists.filter((list, Index) => Index !== index)
      );
    }
  };
  const onAdjustList = async (
    position: number,
    newName: string,
    listId: string
  ) => {
    const response = await editNameListService.editNameList(
      editNameListService.editNameListPath,
      {
        newName: newName,
        id_user: userId,
        id_ulist: listId,
      }
    );
    if (response.message === 200) {
      setPersonalLists((prevLists) => {
        return prevLists.map((list, index) => {
          if (index === position) {
            return { ...list, name: newName };
          } else {
            return list;
          }
        });
      });
    }
  };
  //Note
  const onRemoveBlogList = async (
    position: number,
    listId: string,
    removeList: string[]
  ) => {
    const response = await deleteItemListService.deleteItemList(
      deleteItemListService.deleteItemListPath,
      {
        id_foods: removeList,
        id_ulist: listId,
        id_user: userId,
      }
    );
    if (response.message === 200) {
      const response = await allListService.getAllList(
        allListService.allListPath,
        { id_user: userId }
      );
      if (response.message === 200) {
        setPersonalLists(response.data || personalLists);
        return { message: 200 };
      }
    } else {
      return { message: 200 };
    }
  };
  const onAddItemList = async (foodId: string, listsId: string[]) => {
    const response = await addItemListService.addItemList(
      addItemListService.addItemListPath,
      {
        list_id_ulist: listsId,
        id_user: userId,
        id_food: foodId,
      }
    );
    if (response.message) {
      const response = await allListService.getAllList(
        allListService.allListPath,
        { id_user: userId }
      );
      if (response.message === 200) {
        setPersonalLists(response.data || personalLists);
      }
    }
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
    getIsDarkMode();
  }, []);

  useEffect(() => {
    if (storageData) {
      const parseData = JSON.parse(storageData);
      setUserId(parseData?.userId);
      setIsLogged(parseData?.isLogged);
      setUserInfor(parseData?.userInfor);
    }
  }, [storageData]);

  useEffect(() => {
    if (userId) {
      const getAllList = async () => {
        const response = await allListService.getAllList(
          allListService.allListPath,
          { id_user: userId }
        );
        if (response.message === 200) {
          setPersonalLists(response.data || fakeData);
        }
      };
      getAllList();
    }
  }, [userId]);

  useEffect(() => {
    if (isLogged) {
      const storageData = JSON.stringify({
        isLogged,
        userId,
        userInfor,
      });
      onSaveDatatoStorage(storageData);
    }
  }, [isLogged]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.mergeItem(
        process.env.EXPO_PUBLIC_DARK_MODE_KEY,
        JSON.stringify({ isDarkMode: isDarkMode })
      );
    })();
  }, [isDarkMode]);

  useEffect(() => {
    onSaveUserInforStorage(JSON.stringify({ userInfor }));
  }, [userInfor]);

  return (
    <ThemeContext.Provider
      value={{
        isLogged,
        isDarkMode,
        isHomeScrollDown,
        personalLists,
        notifitions,
        baseURL,
        userId,
        isConnectionSocket,
        userInfor,
        onLogin,
        onUserId,
        onUserInfor,
        setHomeNavbar,
        onAddList,
        onRemoveList,
        onAdjustList,
        onRemoveBlogList,
        onAddItemList,
        onRemoveUnread,
        onDarkTheme,
        onConnectSocket,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default GlobalContext;
