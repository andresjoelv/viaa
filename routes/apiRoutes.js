var db = require("../models");

module.exports = function(app) {
  // Get all projects
  app.get("/api/projects", function(req, res) {
    db.Project.findAll({}).then(function(dbProjects) {
      res.json(dbProjects);
    });
  });

  // Create a new project
  app.post("/api/projects", function(req, res) {
    db.Project.create(req.body).then(function(dbProject) {
      res.json(dbProject);
    });
  });

  // Delete an project by id
  app.delete("/api/projects/:id", function(req, res) {
    db.Project.destroy({ where: { id: req.params.id } }).then(function(dbProject) {
      res.json(dbProject);
    });
  });
};
