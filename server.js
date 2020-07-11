var express = require("express");
var GitHubStrategy = require("passport-github").Strategy;
var passport = require("passport");
var PORT = process.env.PORT || 3000;
var app = express();

const db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Import routes and give the server access to them.
var routes = require("./routes/api-routes.js")(app);
var htmlroutes = require("./routes/html-routes.js")(app);

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
app.get("/auth/github", passport.authenticate("github"));
// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   console.log("Server listening on: http://localhost:" + PORT);
// });

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
