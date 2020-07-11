const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    db.Project.findAll({
      include: [db.User],
    }).then((data) => {
      res.render("index", { projects: data });
    });
  });

  //post route
  app.post("/api/projects", function (req, res) {
    db.Project.create(req.body).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  app.delete("/api/projects/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });
};
