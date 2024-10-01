const { Sequelize, DataTypes } = require('sequelize');

const { SEQUELIZE_OPTIONS } = require('../const/index.js');

const initAccount = require('../models/accounts-model.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

const Accounts = initAccount(sequelize, DataTypes);

function login(req, res) {
    const { pin, nick } = req.body;

    if (isNaN(pin)) res.status(401).send({ status: 'Pin must be a number!!!' });

    userLogin(nick, pin)
        .then(statusMessage => res.status(200).send(
            JSON.stringify({
                status: 200,
                statusMessage,
                nick
            })
        ))
        .catch(err => res.status(401).send(JSON.stringify({ statusMessage: err, status: 401 })));
};

module.exports.login = login;

function register(req, res) {
    const { pin, nick } = req.body;

    if (isNaN(pin)) res.status(401).send({ status: 'Pin must be a number!!!' });

    userRegister(nick, pin)
        .then(statusMessage => res.status(200).send(
            JSON.stringify({
                status: 200,
                statusMessage,
                nick
            })
        ))
        .catch(err => res.status(401).send(JSON.stringify({ statusMessage: err, status: 401 })));
};

module.exports.register = register;

// ********************************************************************* AUTH FUNCTIONS

function userLogin(nick, pin) {
    return new Promise((resolve, reject) => findUserByNick(nick)
        .then(isUserExists =>
            isUserExists
                ? pinIsValid(nick, Number(pin))
                    .then(isPinValid => isPinValid ? resolve('Success') : reject('Pin is wrong'))
                : reject('Could not found user')
        )
    );
};

function userRegister(nick, pin) {
    return new Promise((resolve, reject) => findUserByNick(nick)
        .then(isUserExists => {
            if (!isUserExists) {
                if (!pinLengthIsValid(Number(pin))) reject('Length pin is not valid!');

                createNewUser(nick, Number(pin));
                resolve('New user created!');
            }
            else {
                reject('Already exist!');
            }
        })
    );
};


function findUserByNick(nick) {
    return Accounts.findOne({
        where: {
            name: `${nick}`,
        },
    })
        .then(res => res === null ? false : true);
}

function pinIsValid(nick, pin) {
    return Accounts.findOne({
        where: {
            name: `${nick}`,
            pin: `${pin}`
        },
    })
        .then(res => res === null ? false : true);
}

function pinLengthIsValid(pin) {
    if (pin.toString().length < 6) false;
    else if (pin.toString().length >= 12) false;
    return true;
}

module.exports.pinLengthIsValid = pinLengthIsValid;

function createNewUser(nick, pin) {
    Accounts.findOne({
        where: {
            name: `${nick}`,
        },
    })
        .then(res => res === null ?
                Accounts.create({
                    name: `${nick}`,
                    pin: pin,
                    role: 'user'
                })
            : void 0 
        );
}