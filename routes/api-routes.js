const db = require("../models");

module.exports = function (app) {
  //GET - renders the project cards with the project and user information via handlebars
  app.get("/:userid", (req, res) => {
    db.Project.findAll({
      raw: true,
      include: [db.User],
    }).then((data) => {
      res.render("index", { userId: req.params.userid, projects: data });
    });
  });

  // GET - returns all authenticated users
  app.get("/api/users", (req, res) => {
    db.User.findAll({}).then((dbUser) => {
      res.json(dbUser);
    });
  });

  // PUT - updates the project information when edits are submitted
  app.put("/api/projects/:id", function (req, res) {
    db.Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  // POST - Renders the posted project in a project card
  app.post("/api/projects", function (req, res) {
    console.log(req.body);
    db.Project.create(req.body).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  // DELETE - removes a project when the delete button is clicked
  app.delete("/api/projects/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbProject) {
      res.json(dbProject);
    });
  });

  //Amanda adding Interests find all route
  app.get("/api/interests", (req, res) => {
    db.Interest.findAll({}).then((dbInterest) => {
      res.json(dbInterest);
    });
  });
  //findby userid
  app.get("/api/interests/:userid", (req, res) => {
    db.Interest.findOne({
      where: {
        userId: req.params.userid,
      },
    }).then((dbInterest) => {
      res.json(dbInterest);
    });
  });

  //findby projectid

  //post route for Interests model
  app.post("/api/interests", function (req, res) {
    db.Interest.create(req.body).then(function (dbInterest) {
      res.json(dbInterest);
    });
  });
};
