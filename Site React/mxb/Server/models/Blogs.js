const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define("Blogs", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        alt_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    });

    Blogs.associate = (models) => {
        Blogs.hasMany(models.Blog_Components, {
          as: "components",
          foreignKey: "blogId",
          onDelete: "CASCADE",
        });
    };

    return Blogs;
}