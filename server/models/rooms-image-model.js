module.exports = (sequelize, DataTypes) => {
    return sequelize.define('images', {
        room: DataTypes.STRING,
        socketImageId: DataTypes.BIGINT,
        views: DataTypes.BIGINT,
        max_views: DataTypes.BIGINT,
        nick: DataTypes.STRING
    });
};