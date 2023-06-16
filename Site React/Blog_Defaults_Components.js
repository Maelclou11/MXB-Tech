const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Blog_Defaults_Components extends Model {}
    
Blog_Defaults_Components.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Blog_Defaults_Components',
    }
);

module.exports = Blog_Defaults_Components;