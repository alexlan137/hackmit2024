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
router.get("/run", auth.ensureLoggedIn, async (req, res) => {
  const { prompt, chat_id } = req.query;
  const model_endpoint = process.env.MODEL_ENDPOINT;
  const { article_link, output, data_all } = await utilities.get(model_endpoint, {
    prompt: prompt,
  });
  const response = utilities.formatPromptResponse(article_link, output, data_all);
  let chat = await Chat.findById(chat_id);
  if (!chat) {
    const newChat = new Chat({
      _id: chat_id,
      user_id: req.user._id,
      prompts: [],
      data_all: [],
    });
    await newChat.save();
  }
  chat = await Chat.findById(chat_id);
  const { prompts, responses } = chat;
  prompts.push(prompt);
  responses.push(response);
  await Chat.updateOne({ _id: chat_id }, { $set: { prompts: prompts, responses: responses } });
  res.send(response);
});

router.get("/chat_history", auth.ensureLoggedIn, async (req, res) => {
  const chat_history = await Chat.find({ user_id: req.user._id.toString() });
  res.send(chat_history);
});

module.exports = router;
