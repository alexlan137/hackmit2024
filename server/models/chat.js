const mongoose = require("mongoose");
const Chat = new mongoose.Schema({
  _id: String,
  user_id: String,
  prompts: [String],
  responses: [
    { article_link: String, output: String, data_all: [{ position: String, response: String }] },
  ], //responses are strings consisting of message_id
  timestamp: { type: Number, default: Date.now },
});
module.exports = mongoose.model("chats", Chat);
