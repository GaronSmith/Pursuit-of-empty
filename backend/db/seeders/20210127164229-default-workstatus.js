'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
   return queryInterface.bulkInsert('WorkFlowStatuses', [
     {name: 'My Bucket',
     createdAt:new Date(),
     updatedAt:new Date()},
     {name: 'Current Bucket',
     createdAt:new Date(),
     updatedAt:new Date()},
     {name: 'Side Bucket',
     createdAt:new Date(),
     updatedAt:new Date()},
     {name: 'Completed Bucket',
     createdAt:new Date(),
     updatedAt:new Date()}], {});
  },

  down: (queryInterface, Sequelize) => {
   
   return queryInterface.bulkDelete('WorkFlowStatuses', null, {});
  }
};
