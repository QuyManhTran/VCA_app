import io from "socket.io-client";
const serverURL = process.env.EXPO_PUBLIC_API_URL;
const socket = io(serverURL, {
  autoConnect: false,
});
export default socket;
