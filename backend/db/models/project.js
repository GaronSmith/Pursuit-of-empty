'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {});
  Project.associate = function (models) {
    Project.belongsToMany(models.User, { foreignKey: 'ownerId' })
    Project.hasMany(models.TeamMember, { foreignKey: 'projectId' })
    Project.hasMany(models.Story, { foreignKey: 'projectId' })
  };
  return Project;
};