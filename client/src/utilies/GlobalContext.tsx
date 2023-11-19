import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import ThemeContext from "./theme";
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
}

const fakeData = [{ img: list, name: "Xem sau", data: mostlySearch }];
const GlobalContext = ({ children }: GlobalContextProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [baseURL, setBaseURL] = useState<string | null>(null);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState<any[]>(fakeData);
  const [notifitions, setNotifitions] = useState(notifytions);
  const [isConnectionSocket, setIsConnectionSocket] = useState(false);

  const onConnectSocket = () => {
    setIsConnectionSocket(true);
  };

  const onUserId = (userId: string) => {
    setUserId(userId);
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
        { id: response.data?.id, name: response.data?.name },
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
    if (response) {
      return response;
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
        setPersonalLists(response.data || []);
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
    LogBox.ignoreLogs([
      "new NativeEventEmitter()",
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

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
    console.log(personalLists);
  }, [personalLists]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        isHomeScrollDown,
        personalLists,
        notifitions,
        baseURL,
        userId,
        isConnectionSocket,
        onUserId,
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
