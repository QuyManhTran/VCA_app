const { comments: commentModel } = require("../../models/comment/comment");
const webSocket = require("../../bin/www");
const onComment = async (req, res) => {
  res.status(200).json();
};

const onRealTimeComment = async (socket, io) => {
  let comments = [];
  const raw = {
    avatar:
      "https://res.cloudinary.com/dxqd4odva/image/upload/v1700375687/VCA_app/avatars/avatar_s1knnr.png",
    like: 6,
    name: "Andrew",
  };
  socket.removeAllListeners();
  console.log(`userId: ${socket.id} connected!`);
  socket.on("comment", async (food) => {
    let blogComments = await commentModel.findOne({ food_id: food });
    if (blogComments === null) {
      const emptyData = new commentModel({ food_id: food, conversation: [] });
      await emptyData.save();
      comments = [];
    } else {
      comments = blogComments.conversation;
    }
    socket.join(food);
    socket.emit(food, comments);
    socket.on("newMessage", async (newMessage) => {
      await commentModel.updateOne(
        { food_id: food },
        {
          $push: {
            conversation: {
              $each: [{ ...newMessage, ...raw }],
              $position: 0,
            },
          },
        }
      );
      comments = [{ ...newMessage, ...raw }, ...comments];
      io.to(food).emit(food, comments);
    });
    socket.on("chatting", (isChatting) => {
      socket.in(food).emit("someone", { food: food, isChatting: isChatting });
    });
  });

  socket.on("disconnect", () => {
    console.log(`userId: ${socket.id} disconnected!`);
  });
};

module.exports = { onComment, onRealTimeComment };
