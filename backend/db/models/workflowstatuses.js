'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkFlowStatuses = sequelize.define('WorkFlowStatuses', {
    name: DataTypes.STRING
  }, {});
  WorkFlowStatuses.associate = function(models) {
    WorkFlowStatuses.hasMany(models.Stories, {foreignKey: 'workflowStatusId'})
  };
  return WorkFlowStatuses;
};