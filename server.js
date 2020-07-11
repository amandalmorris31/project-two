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

// Authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: "7b5235c21d2f080de6ee",
      clientSecret: "489579aba11175e9122f5f38f6392b2131ef66dd",
      callbackURL: "/auth/github/callback",
    },
      function (accessToken, refreshToken, profile, cb) {
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log("profile: ", profile);
    }
  )
);

app.get("/auth/github/callback", passport.authenticate("github", function (accessToken, refreshToken, profile, cb) {
  console.log("accessToken: ", accessToken);
  console.log("refreshToken: ", refreshToken);
  console.log("profile: ", profile);
}))


// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});
