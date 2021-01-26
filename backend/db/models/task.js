'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    storyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Story, {foreignKey : 'storyId'})
  };
  return Task;
};