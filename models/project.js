module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Project;
};
