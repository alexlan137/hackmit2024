const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user.js");

// create a new OAuth client used to verify google sign-in
//this is ok (not a security risk) because only selected URLs may access this client ID
const CLIENT_ID = "954844909530-hvosmig1l5f9j86o7vn7cmhh6r3sou05.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
//returns a promise resolving to the found/created User document
function getOrCreateUser(user) {
  //user=ticket payload
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;
    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      email: user.email,
    });
    return newUser.save();
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user_doc) => {
      // persist user in the session
      req.session.user = user_doc;
      res.send(user_doc); //user_doc gets auto-converted into an object before sending
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  //populates req.user with current user's document, then passes control to the next middleware. remember: req and res objects remain the same (in identity) throughout all the middleware!
  req.user = req.session.user;
  // if (req.user) console.log(typeof req.user, req.user);
  next();
}
//CLIENT DOES NOT HAVE ACCESS TO REQ.SESSION!
//so it's perfectly safe to directly call req.user in the server. that is guaranteed to be the actual user object.

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.send({ err: "not logged in" });
  }
  next();
}
// auth.ensureLoggedIn also ensures client is logged in and user is valid
//doesn't send an error

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};

//overall: we use Google authentication library to validate logins; use sessions to persist logins
