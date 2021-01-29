'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let preferences = [ ]
    for (let i = 1; i < 52; i ++){
      for(let j = 1; j <=4; j++){
        const newPref = {
          userId: i,
          workflowStatusId: j,
          orderIdx: j,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        preferences.push(newPref)
      } 
    }

   return queryInterface.bulkInsert('Preferences', preferences, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Preferences', null, {});
  }
};
