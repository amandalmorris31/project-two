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

app.use(passport.initialize());
// app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Set Handlebars configuration
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
// used to bypass error https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
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
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./routes/api-routes.js")(app);

let details;

// Authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: "7b5235c21d2f080de6ee",
      clientSecret: "489579aba11175e9122f5f38f6392b2131ef66dd",
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("taco\n");
      console.log("accessToken: ", accessToken);
      // console.log("Profile: ", profile);
      details = {
        ghUsername: profile.username,
        ghImage: profile.photos[0].value,
        ghLink: profile.profileUrl,
      };
      console.log("profile: ", details);
      cb(null, profile, details);
    }
  )
);
app.get("/auth/github", passport.authenticate("github"), function (
  req,
  res
) {});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github" }),
  function (req, res) {
    console.log("line 71 ", details, "\n");
    db.User.create({
      ghUsername: details.ghUsername,
      ghImage: details.ghImage,
      ghLink: details.ghLink,
    }).then(function (data) {
      console.log(data);
      // res.json(d);
      res.redirect("/");
    });
  }
);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});
