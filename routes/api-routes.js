const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    db.Project.findAll().then((data) => {
      res.render("index", { projects: data });
    });
  });

  app.get("/auth/github/callback", (req, res) => {
    db.Project.findAll().then((data) => {
      res.render("index", { projects: data });
    });
  });
};
