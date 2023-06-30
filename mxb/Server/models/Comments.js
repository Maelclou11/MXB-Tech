const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Comments
}