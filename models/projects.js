module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectLink: {
      type: DataTypes.INTEGER,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Project.associate = function (models) {
    // We’re saying that a Project should belong to an User
    // A Project can’t be created without an User due to the foreign key constraint
    Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Project;
};
