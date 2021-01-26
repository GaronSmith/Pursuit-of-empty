'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkFlowStatus = sequelize.define('WorkFlowStatus', {
    name: DataTypes.STRING
  }, {});
  WorkFlowStatus.associate = function(models) {
    WorkFlowStatus.hasMany(models.Story, { foreignKey: 'workflowStatusId' })
    WorkFlowStatus.hasMany(models.Preference, { foreignKey: 'workflowStatusId' })
  };
  return WorkFlowStatus;
};