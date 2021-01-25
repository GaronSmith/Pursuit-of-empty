'use strict';
module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('Projects', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {});
  Projects.associate = function(models) {
    Projects.belongsToMany(models.Users, { foreignKey : 'ownerId'})
    Projects.hasMany(models.TeamMembers, { foreignKey : 'projectId'})
  };
  return Projects;
};