'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMembers = sequelize.define('TeamMembers', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  TeamMembers.associate = function(models) {
    // associations can be defined here
  };
  return TeamMembers;
};