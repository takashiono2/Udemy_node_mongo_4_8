const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("データベースを接続中..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;