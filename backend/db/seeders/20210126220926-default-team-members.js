'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
  const teamMembers = [];
  for(let i = 0; i<1000; i++){
    const newRelation = {
      userId: Math.random() * (50 - 1) + 1,
      projectId: Math.random() * (200 - 1) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    teamMembers.push(newRelation)
  }
   return queryInterface.bulkInsert('TeamMembers', teamMembers, {});
  },

  down: (queryInterface, Sequelize) => {
  
   return queryInterface.bulkDelete('TeamMembers', null, {});
  }
};
