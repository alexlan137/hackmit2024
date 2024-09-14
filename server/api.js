const express = require("express");
const auth = require("./auth.js");

const User = require("./models/user.js");

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
