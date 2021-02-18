module.exports = function(sequelize, DataTypes) {
    var Cat = sequelize.define('Cat', {
        name: DataTypes.STRING
    });

    return Cat;
};