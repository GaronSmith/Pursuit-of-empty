'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
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
  Story.associate = function(models) {
    Story.belongsTo(models.WorkFlowStatus, { foreignKey: 'workflowStatusId' })
    Story.belongsTo(models.Project, { foreignKey: 'projectId' })
    Story.belongsTo(models.User, { foreignKey: 'assignedId' })
    Story.hasMany(models.Task, {foreignKey: 'storyId'})
  };
  return Story;
};