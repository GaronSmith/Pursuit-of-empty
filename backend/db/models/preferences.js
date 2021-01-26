'use strict';
module.exports = (sequelize, DataTypes) => {
  const Preferences = sequelize.define('Preferences', {
    userId: DataTypes.INTEGER,
    workflowStatusId: DataTypes.INTEGER,
    orderIdx: DataTypes.INTEGER
  }, {});
  Preferences.associate = function(models) {
    // associations can be defined here
  };
  return Preferences;
};