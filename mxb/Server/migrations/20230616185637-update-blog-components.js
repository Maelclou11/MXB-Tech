module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Blog_Components", "blogId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("Blog_Components", {
      fields: ["blogId"],
      type: "foreign key",
      name: "fk_blog_component_blog",
      references: {
        table: "Blogs",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Blog_Components",
      "fk_blog_component_blog"
    );

    await queryInterface.removeColumn("Blog_Components", "blogId");
  },
};
