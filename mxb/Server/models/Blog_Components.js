const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

module.exports = (sequelize, DataTypes) => {
    const Blog_Components = sequelize.define("Blog_Components", {
        name: {
            type: DataTypes.STRING,
            allowNul: false,
        },
        componentId: {
            type: DataTypes.INTEGER,
            allowNul: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNul: false,
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNul: false,
        }
    });

    Blog_Components.associate = (models) => {
        Blog_Components.belongsTo(models.Blogs, {
          foreignKey: "blogId",
          onDelete: "CASCADE",
        });
    };

    return Blog_Components;
}