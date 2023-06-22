/* FAIRE LA COMMANDE : 'npx sequelize-cli db:migrate' et renommer le fichier pour que sa sauvegarde correctement*/

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Blogs', 'category', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Blogs', 'category');
    },
  };
  