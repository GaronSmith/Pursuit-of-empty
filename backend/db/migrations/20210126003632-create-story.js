'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        allowNull: false,
        references: { model: { tableName: 'Projects' } }
      },
      assignedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'Users' } }
      },
      workflowStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'WorkFlowStatuses' } }
      },
      progress: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING(250)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      priority: {
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING(250)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories');
  }
};