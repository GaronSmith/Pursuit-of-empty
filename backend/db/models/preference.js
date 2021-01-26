'use strict';
module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    userId: DataTypes.INTEGER,
    workflowStatusId: DataTypes.INTEGER,
    orderIdx: DataTypes.INTEGER
  }, {});
  Preference.associate = function(models) {
    Preference.belongsTo(models.WorkFlowStatus, {foreignKey: 'workflowStatusId'})
    Preference.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Preference;
};