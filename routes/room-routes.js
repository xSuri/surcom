const { Sequelize, DataTypes } = require('sequelize');

const {
    SEQUELIZE_OPTIONS,
    rooms,
    MESSAGES
} = require('../const/index.js');

const { reloadSockets, reloadIoServer } = require('./messages-routes.js');
const { pinLengthIsValid } = require('./auth-routes.js');

const initRooms = require('../models/rooms-model.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

const Rooms = initRooms(sequelize, DataTypes);


function authToRoom(req, res) {
    const { pin, name } = req.body;

    if (isNaN(pin)) res.status(401).send({ status: 'Pin must be a number!!!' });

    authenticate(name, pin)
        .then(data => {
            getRoomCreators(name, pin)
                .then((creators) =>
                    res.status(200)
                        .send(
                            JSON.stringify({
                                status: data,
                                creators
                            })
                        )
                );
        })
        .catch(err => res.status(401).send({ status: err }));
};

module.exports.authToRoom = authToRoom;

function newRoom(req, res) {
    const { pin, name, creator } = req.body;

    // ! ADMINS ROOMS LIST
    if (name === 'GlobalChat') res.status(300).send({ status: 'Admin Room' });

    if (isNaN(pin)) res.status(401).send({ status: 'Pin must be a number!!!' });

    create(name, pin, creator)
        .then(data => res.status(200).send({ data }))
        .catch(err => res.status(401).send({ status: err }))
        .finally(() => {
            reloadIoServer();
            reloadRooms().then(() => reloadSockets());
        });
};

module.exports.newRoom = newRoom;

function authenticate(name, pin) {
    return new Promise((resolve, reject) => findRoomByName(name)
        .then(() => {
            roomPinIsValid(name, Number(pin))
                .then(isPinValid => isPinValid ? resolve('Success') : reject('Pin is wrong'));
        })
        .catch(() => reject('Could not found room'))
    );
};

function getRoomCreators(name, pin) {
    return new Promise((resolve, reject) => Rooms.findOne({
        where: {
            name,
            pin
        },
    })
        .then((res) => res === null ? reject() : resolve(res.creators))
    );
};

function create(name, pin, creator) {
    return new Promise((resolve, reject) => findRoomByName(name)
        .then(() => reject('Already exist!'))
        .catch(() => !pinLengthIsValid(Number(pin))
            ? reject('Length pin is not valid!')
            : createNewRoom(name, Number(pin), creator)
                .then(() => resolve('New room created!')))
    );
};

function findRoomByName(name) {
    return new Promise((resolve, reject) => Rooms.findOne({
        where: {
            name,
        },
    })
        .then(res => res === null ? reject() : resolve())
    );
};

function roomPinIsValid(name, pin) {
    return Rooms.findOne({
        where: {
            name,
            pin
        },
    })
        .then(res => res === null ? false : true);
};

function createNewRoom(name, pin, creators) {
    return new Promise((resolve, reject) => Rooms.findOne({
        where: {
            name,
        },
    })
        .then(res => res === null ?
            Rooms.create({
                name,
                pin,
                creators,
                confirmed: false,
            })
            : resolve()
        )
    );
}

function reloadRooms() {
    return new Promise((resolve, reject) => Rooms.findAll()
        .then(res => {
            res.map(room => {
                rooms.push(room.name);
                MESSAGES[room.name] = [];
            })

            resolve();
        })
    );
};

reloadRooms()
    .then(() => reloadSockets());