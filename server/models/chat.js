const mongoose = require("mongoose");
const Chat = new mongoose.Schema({
  _id: String,
  user_id: String,
  prompts: [String],
  responses: [String], //responses are html strings
  timestamp: { type: Number, default: Date.now },
});
module.exports = mongoose.model("chats", Chat);
