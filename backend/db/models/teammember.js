'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  TeamMember.associate = function(models) {
    TeamMember.belongsTo(models.User, { foreignKey: 'userId' })
    TeamMember.belongsTo(models.Project, { foreignKey: 'projectId' })
  };
  return TeamMember;
};