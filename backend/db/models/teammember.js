'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  TeamMember.associate = function(models) {
    TeamMember.belongsToMany(models.User, { foreignKey: 'userId' })
    TeamMember.belongsToMany(models.Project, { foreignKey: 'projectId' })
  };
  return TeamMember;
};