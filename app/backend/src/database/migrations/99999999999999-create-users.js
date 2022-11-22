module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.string
      },
      role: {
        type: Sequelize.string
      },
      email: {
        type: Sequelize.string
      },
      password: {
        type: Sequelize.string
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
