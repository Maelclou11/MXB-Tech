/* FAIRE LA COMMANDE : 'npx sequelize-cli db:migrate' et renommer le fichier pour que sa sauvegarde correctement*/

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Comments', 'blogId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Comments', 'blogId');
    },
  };
  