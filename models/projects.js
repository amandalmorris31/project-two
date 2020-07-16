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
      // created_at: {
      //   type: 'TIMESTAMP',
      //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   allowNull: false
      // },
      // updated_at: {
      //   type: 'TIMESTAMP',
      //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   allowNull: false
      // }
    },
    {
      timestamps: true,
    }
  );
  Project.associate = function (models) {
    // We’re saying that a Project should belong to a User
    // A Project can’t be created without a User due to the foreign key constraint
    Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Project;
};
