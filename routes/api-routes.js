const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    /*var query = {};
    if(req.query.userID){
      query.UserId = req.query.userID
    }*/
    db.Project.findAll({
      //where: query,
      include: [db.User]
    }).then((data) => {
      res.render("index", { projects: data });
    });
  });

  //post route 
  app.post("/api/projects", function(req,res) {

    db.Project.create(req.body).then(function(dbProject){
      res.json(dbProject)
    })
  })

};