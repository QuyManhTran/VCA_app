import * as request from "../utilies/request";
interface SocketProps {
  food_id: string;
}
const onSocket = async (path: string, params: SocketProps) => {
  const response = await request.get(path, params);
  return response;
};
const socketPath = "/blog/comment";
export const commentService = { onSocket, socketPath };
