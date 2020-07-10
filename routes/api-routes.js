const db = require("../models");
// const projects = require("../models/projects.js");
// const users = require("../models/users.js");

module.exports = function (app) {
  app.get("/", function (req, res) {
    db.Project.findAll().then(function (result) {
      console.log(result);
      // res.render("index", {});
    });

    // app.get("/auth/github", passport.authenticate("github"));
  });
};
