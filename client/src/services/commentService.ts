import * as request from "../utilies/request";
interface SocketProps {
  food_id: string;
}
interface CommentLikeProps {
  food_id: string;
  content: string;
  isLike: boolean;
}
const onSocket = async (path: string, params: SocketProps) => {
  const response = await request.get(path, params);
  return response;
};
const socketPath = "/blog/comment";

const onToggleLike = async (path: string, body: CommentLikeProps) => {
  const response = await request.patch(path, body);
  return response;
};
const commentLikePath = "/blog/comment/like";
export const commentService = { onSocket, socketPath };
export const commentLikeService = { onToggleLike, commentLikePath };
