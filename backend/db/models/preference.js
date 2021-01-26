'use strict';
module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    userId: DataTypes.INTEGER,
    workflowStatusId: DataTypes.INTEGER,
    orderIdx: DataTypes.INTEGER
  }, {});
  Preference.associate = function(models) {
    Preference.belongsToMany(models.WorkFlowStatus, {foreignKey: 'workflowStatusId'})
    Preference.belongsToMany(models.User, {foreignKey: 'userId'})
  };
  return Preference;
};