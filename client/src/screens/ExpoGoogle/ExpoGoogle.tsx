import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
  onGoogleButtonPress,
  signOutFireBase,
} from "../../utilies/firebaseConfig";
import auth from "@react-native-firebase/auth";
import { colors } from "../../../constants";
import { TouchableOpacity } from "react-native";
const ExpoGoogle = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>null</Text>
      </View>
    );
  }
  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{
            width: 300,
            height: 64,
            borderRadius: 10,
          }}
          onPress={onGoogleButtonPress}
        ></GoogleSigninButton>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>Google auth</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: user?.photoURL }}></Image>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          {user?.displayName}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.lightPrimary,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            minWidth: 280,
            borderRadius: 32,
          }}
          onPress={signOutFireBase}
        >
          <Text style={{ fontSize: 30 }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default ExpoGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
