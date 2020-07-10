const express = require("express");
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');


const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();


app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

passport.use(new GitHubStrategy({
  clientID: "7b5235c21d2f080de6ee",
  clientSecret: "489579aba11175e9122f5f38f6392b2131ef66dd",
  callbackURL: "/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log("accessToken: ", accessToken);
  console.log("refreshToken: ", refreshToken);
  console.log("profile: ", profile);
}
));



//db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  //});


