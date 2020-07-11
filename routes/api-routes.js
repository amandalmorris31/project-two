const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    db.Project.findAll().then((data) => {
      // res.json(data);
      res.render("index", { projects: data });
    });
  });
};
