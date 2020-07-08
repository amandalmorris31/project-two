const express = require("express");


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

//app.use(routes);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  