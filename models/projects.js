module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define(
    "Project",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      // },
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
      // authorId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
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
