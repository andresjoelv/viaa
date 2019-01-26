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

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Project.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Project.create({
      text: req.body.title,
      description: req.body.body
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Project.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Delete an project by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Project.destroy({ where: { id: req.params.id } }).then(function(dbProject) {
      res.json(dbProject);
    });
  });
};
