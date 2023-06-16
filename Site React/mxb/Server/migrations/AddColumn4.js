/* FAIRE LA COMMANDE : 'npx sequelize-cli db:migrate' et renommer le fichier pour que sa sauvegarde correctement*/

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Blogs', 'author', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Blogs', 'author');
    },
  };
  