'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    storyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
    Comment.belongsTo(models.Story, {foreignKey: 'storyId'})
  };
  return Comment;
};