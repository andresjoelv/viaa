var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Project.findAll({}).then(function() {
      res.render("view");
    });
  });

  // Load new project page
  app.get("/new", function(req, res) {
    db.Project.findAll({}).then(function(dbExamples) {
      res.render("new", {
        tasks: dbExamples
      });
    });
  });

  // Load view project page
  app.get("/view", function(req, res) {
    res.render("view");
  });

  // Load view project page
  app.get("/calendar", function(req, res) {
    res.render("calendar");
  });

  // Load view project page
  app.get("/edit", function(req, res) {
    res.render("edit");
  });


  // Load project page and pass in an project by id
  app.get("/project/:id", function(req, res) {
    db.Project.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("project", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
