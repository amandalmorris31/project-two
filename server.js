// DEPENDENCIES
const express = require("express");
const GitHubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const db = require("./models");

// Set PORT
const PORT = process.env.PORT || 3000;

// Set Express App
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport
app.use(passport.initialize());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Set Handlebars configuration
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");

// used to bypass handlebars error
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
// set front end engine
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./routes/api-routes.js")(app);

// Authentication
let details;
let userId;
passport.use(
  new GitHubStrategy(
    {
      clientID: "7b5235c21d2f080de6ee",
      clientSecret: "489579aba11175e9122f5f38f6392b2131ef66dd",
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      details = {
        ghUsername: profile.username,
        ghImage: profile.photos[0].value,
        ghLink: profile.profileUrl,
      };

      cb(null, details);
    }
  )
);

// homepage URL
app.get("/auth/github", passport.authenticate("github"), function (
  req,
  res
) {});
// Callback URL
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github" }),
  function (req, res) {
    db.User.create({
      ghUsername: details.ghUsername,
      ghImage: details.ghImage,
      ghLink: details.ghLink,
    })
      .then(function (data) {
        // grabs userid of user and redirects to a route with the userid
        userId = data.dataValues.id;
        console.log("userId: ", userId);
        res.redirect("/" + userId);
      })
      .catch((err) => {
        res.redirect("/" + userId);
      });
  }
);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});
