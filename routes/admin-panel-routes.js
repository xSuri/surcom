const { Sequelize, DataTypes } = require('sequelize');

const { SEQUELIZE_OPTIONS } = require('../const/index.js');

const initAccount = require('../models/accounts-model.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

const Accounts = initAccount(sequelize, DataTypes);

function getUserInfo(req, res){
    const userData = req.body;

    const nick = userData.nick;

    userInfo(nick).then(data => {
        res.status(200).send(JSON.stringify({
            status: 200,
            role: data.role
        }));
    });
};

module.exports.getUserInfo = getUserInfo;

function userInfo(nick) {
    return new Promise((resolve, reject) => {
        findUserByNickAndGetInfo(nick)
            .then((data) => resolve(data))
            .catch(() => reject('Could not found user'));
    });
};

function findUserByNickAndGetInfo(nick) {
    return Accounts.findOne({
        where: {
            name: `${nick}`,
        },
    })
        .then((res) => {
            if (res === null) {
                return false;
            }
            else {
                return res.dataValues;
            }
        });
    ;
}