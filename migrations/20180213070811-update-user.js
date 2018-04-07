'use strict';
require("babel-polyfill");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [      
      await queryInterface.changeColumn('users', 'profileImg', {        
        type: Sequelize.TEXT('medium'),
        allowNull: true,        
      }),      
      
    ]
    
  },
  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.changeColumn('users', 'profileImg', {        
        type: Sequelize.BLOB(),
        allowNull: true,
      }),     
           
    ]  
  }    
};