module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Blog_Components', 'blogId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Blog_Components', 'blogId');
  },
};

