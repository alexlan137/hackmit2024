const express = require("express");
const auth = require("./auth.js");
const utilities = require("./utilities.js");

const User = require("./models/user.js");
const Chat = require("./models/chat.js");
require("dotenv").config();

const router = express.Router();

//after populateCurrentUser: req.user is either a Mongoose User doc (if logged in), or null (if logged out)
//note: req.user._id will be ObjectId type (if logged in!)
router.use(auth.populateCurrentUser);

//login and logout
router.post("/login", auth.login);
router.post("/logout", auth.logout);

//gets data of the user (based on req.user);
//sends back empty document if req.user=null (i.e. logged out)
router.get("/who_am_i", (req, res) => {
  if (!req.user) {
    res.send({});
    return;
  }
  User.findById(req.user._id).then((user_doc) => res.send(user_doc));
});

//main API endpoint; responds based on a prompt
router.post("/prompt", auth.ensureLoggedIn, async (req, res) => {
  const { prompt, chat_id } = req.body;
  console.log(prompt, chat_id);
  if (chat_id == "new_chat") {
    //chat_id cannot be "new_chat"
    res.send({});
    return;
  }
  const model_endpoint = process.env.MODEL_ENDPOINT;
  let article_link, output, data_all;
  try {
    ({ article_link, output, data_all } = await utilities.get(model_endpoint, {
      prompt: prompt,
    }));
  } catch (error) {
    console.error("Error occurred while processing prompt:", error);
    res.send({});
    return;
  }
  const response = { article_link: article_link, output: output, data_all: data_all };
  let chat = await Chat.findById(chat_id);
  if (!chat) {
    const newChat = new Chat({
      _id: chat_id,
      user_id: req.user._id,
      prompts: [],
      responses: [],
    });
    await newChat.save();
  }
  chat = await Chat.findById(chat_id);
  const { prompts, responses } = chat;
  prompts.push(prompt);
  responses.push(response);
  await Chat.updateOne({ _id: chat_id }, { $set: { prompts: prompts, responses: responses } });
  res.send({ response: response });
});

router.get("/chat", auth.ensureLoggedIn, async (req, res) => {
  const chat_id = req.query.chat_id;
  const chat = await Chat.findById(chat_id);
  if (!chat) {
    res.send({});
    return;
  }
  res.send(chat);
});

router.get("/chat_history", auth.ensureLoggedIn, async (req, res) => {
  const chats = await Chat.find({ user_id: req.user._id.toString() }).sort({
    timestamp: -1,
  });
  const chat_headers = chats.map((chat) => {
    return { chat_name: chat.timestamp.toString(), chat_id: chat._id };
  });
  res.send(chat_headers);
});

module.exports = router;
