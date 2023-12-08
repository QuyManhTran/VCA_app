//Lets load the mongoose module in our program
const mongoose = require("mongoose");

//Lets connect to our database using the DB server URL.
function connect() {
  // Kết nối đến cơ sở dữ liệu MongoDB
  mongoose.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "❌ Lỗi kết nối đến MongoDB"));
  db.once("open", () => {
    console.log("✅ Kết nối đến MongoDB thành công");
  });
}

module.exports = {
  connect,
};
