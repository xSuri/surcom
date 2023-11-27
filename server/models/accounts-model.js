module.exports = (sequelize, DataTypes) => {
    return sequelize.define('accounts', {
        name: DataTypes.STRING,
        pin: DataTypes.BIGINT,
    });
};
