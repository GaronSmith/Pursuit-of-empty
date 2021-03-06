'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
   const projects = [];
   for(let i = 0; i < 200; i++){
     const newProj = {
       ownerId: Math.random() * (50 - 1) + 1,
       name: faker.company.catchPhraseDescriptor() +' ' + faker.company.catchPhraseNoun(),
       description:faker.lorem.paragraph(),
       startDate: faker.date.past(1),
       endDate: faker.date.future(1),
       active: i%2 ? true : false,
       createdAt: new Date(),
       updatedAt: new Date() 
     }
     projects.push(newProj)
   }
   return queryInterface.bulkInsert('Projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Projects', null, {});
  }
};
