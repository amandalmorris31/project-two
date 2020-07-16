const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define(
    "Project",
    {
      projectTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectLink: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: true,
    }
  );
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
