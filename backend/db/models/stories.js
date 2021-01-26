'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stories = sequelize.define('Stories', {
    projectId: DataTypes.INTEGER,
    assignedId: DataTypes.INTEGER,
    workflowStatusId: DataTypes.INTEGER,
    progress: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {});
  Stories.associate = function(models) {
    Stories.belongsTo(models.WorkFlowStatuses, {foreignKey:'workflowStatusId'})
    Stories.belongsTo(models.Projects, {foreignKey: 'projectId'})
    Stories.belongsTo(models.Users, {foreignKey: 'assignedId'})
  };
  return Stories;
};