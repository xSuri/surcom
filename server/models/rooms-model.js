module.exports = (sequelize, DataTypes) => {
    return sequelize.define("rooms", {
        name: DataTypes.STRING,
        pin: DataTypes.BIGINT,
        creators: DataTypes.JSON,
        confirmed: DataTypes.BOOLEAN,
    });
};