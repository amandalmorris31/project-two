module.exports = function (sequelize, DataTypes) {
    var Interest = sequelize.define(
      "Interest",
      {
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }

      },
      {
        timestamps: false,
      }
    );
    // Project.associate = function (models) {
    //   // We’re saying that a Project should belong to a User
    //   // A Project can’t be created without a User due to the foreign key constraint
    //   Project.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false,
    //     },
    //   });
    // };
    return Interest;
  };
  