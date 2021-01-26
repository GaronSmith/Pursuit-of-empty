'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkFlowStatuses = sequelize.define('WorkFlowStatuses', {
    name: DataTypes.STRING
  }, {});
  WorkFlowStatuses.associate = function(models) {
    // associations can be defined here
  };
  return WorkFlowStatuses;
};