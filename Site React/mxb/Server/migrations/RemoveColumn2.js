module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Blogs", "author");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Blogs", "author", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
/* Commande pour le run : npx sequelize-cli db:migrate */