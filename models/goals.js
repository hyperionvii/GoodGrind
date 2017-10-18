

module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("goals", {
    goalId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    goal: {
      type: DataTypes.STRING,
      required: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
  });


};
