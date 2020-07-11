var db = require("../models");

module.exports = function(app){

    app.get("/api/projects", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Todo.findAll({}).then(function(dbProjects) {
          // We have access to the todos as an argument inside of the callback function
          res.json(dbProjects);
        });

    });

};