const mongoose = require("mongoose");
const Chat = new mongoose.Schema({
  user_id: String,
  prompt: String,
  response: String,
});
module.exports = mongoose.model("chats", Chat);
