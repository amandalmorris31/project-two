// model to track which users are interested in which projects
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
      },
    },
    {
      timestamps: false,
    }
  );
  return Interest;
};
