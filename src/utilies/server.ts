import io from "socket.io-client";
const socket = io("http://192.168.1.188:3000", {
  autoConnect: false,
});
export default socket;
