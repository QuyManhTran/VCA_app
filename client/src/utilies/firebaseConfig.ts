import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_CLIENT_GOOGLE_SERVICE,
});

export const onGoogleButtonPress = async (onLoading?: any) => {
  // Check if your device supports Google Play
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    onLoading();
    // Sign-in the user with the credential
    const userSignin = await auth().signInWithCredential(googleCredential);
    return {
      message: 200,
      isNewUser: userSignin.additionalUserInfo.isNewUser,
      data: {
        username: userSignin.user.displayName,
        email: userSignin.user.email,
        password: userSignin.user.uid,
        avatar: userSignin.user.photoURL,
      },
    };
    // return userSignin;
  } catch (error) {
    if (
      error?.message === "Sign in action cancelled" ||
      error?.code === "12501"
    )
      return { message: 400 };
    else {
      return { message: 404 };
    }
  }
};

export const signOutFireBase = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export default GoogleSignin;
