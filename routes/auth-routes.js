const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { SEQUELIZE_OPTIONS, SECRET_KEY } = require('../const/index.js');

const initAccount = require('../models/accounts-model.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

const Accounts = initAccount(sequelize, DataTypes);

// ! ALL STATUS TO CONST

function login(req, res) {
    const { pin, nick } = req.body;

    if (isNaN(pin)) res.status(401).send({ status: 'Pin must be a number!!!' });

    userLogin(nick, pin)
        .then(statusMessage => {
            const token = jwt.sign({ nick }, SECRET_KEY, { expiresIn: '4h' });

            res.status(200).send(
                JSON.stringify({
                    status: 200,
                    statusMessage,
                    nick,
                    token
                })
            );
        })
        .catch(err => res.status(401).send(JSON.stringify({ statusMessage: err, status: 401 })));
};

module.exports.login = login;

function me(req, res) {
    res.json({ user: req.user });
}

module.exports.me = me;

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
    //! CONST
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

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Unauthorized Token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Token do not exist!' });
    }
};

module.exports.authenticateJWT = authenticateJWT;