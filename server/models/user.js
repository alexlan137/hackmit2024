const mongoose = require("mongoose");
const User = new mongoose.Schema({
  name: String,
  googleid: String,
  email: String,
});
module.exports = mongoose.model("users", User);
