const PORT = process.env.FIRST_APP_PORT || 3000;

let id = 1;

const messages = {
    "GlobalChat": []
};

let rooms = [];

// TO OTHER FILE ^

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const seq = require('sequelize');

const Server = require('socket.io');
const port_for_socket = process.env.SECOND_APP_PORT || 4242;
const server = require('http').Server();
let io = Server(port_for_socket);

const sequelize = new seq.Sequelize('database', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './accounts.sqlite'
});

const initAccount = require('./models/accounts-model.js');
const initRooms = require('./models/rooms-model.js');

const Accounts = initAccount(sequelize, seq.DataTypes);
const Rooms = initRooms(sequelize, seq.DataTypes);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors())

// AUTH
app.post('/api/login', (req, res) => {
    const userData = req.body;

    if(isNaN(userData.pin)){
        res.status(401).send({status: 'Pin must be a number!!!'});
        return;
    }

    login(userData.nick, userData.pin)
        .then(statusMessage => res.status(200).send(
            JSON.stringify({
                status: 200,
                statusMessage,
                nick: userData.nick
            })
        ))
        .catch((err) => res.status(401).send(JSON.stringify({ statusMessage: err, status: 401 })));

})
app.put('/api/register', (req, res) => {
    const userData = req.body;

    if(isNaN(userData.pin)){
        res.status(401).send({status: 'Pin must be a number!!!'});
        return;
    }

    register(userData.nick, userData.pin)
        .then(statusMessage => res.status(200).send(
            JSON.stringify({
                status: 200,
                statusMessage,
                nick: userData.nick
            })
        ))
        .catch((err) => res.status(401).send(JSON.stringify({ statusMessage: err, status: 401 })));
})

// ROOMS
app.post('/api/room', (req, res) => {
    const userData = req.body;

    if(isNaN(userData.pin)){
        res.status(401).send({status: 'Pin must be a number!!!'});
        return;
    }

    authToRoom(userData.name, userData.pin)
        .then((data) => {
            getRoomCreators(userData.name, userData.pin).then((creators) => {
                res.status(200).send(
                    JSON.stringify({
                        status: data,
                        creators
                    })
                )
            })
        })
        .catch((err) => res.status(401).send({
            status: err
        }));

})

app.put('/api/room', (req, res) => {
    const userData = req.body;

    if(userData.name === 'GlobalChat'){
        res.status(300).send({status: 'Admin Room'});
        return;
    }

    if(isNaN(userData.pin)){
        res.status(401).send({status: 'Pin must be a number!!!'});
        return;
    }

    newRoom(userData.name, userData.pin, userData.creator)
        .then((data) => res.status(200).send({data}))
        .catch((err) => res.status(401).send({status: err}))
        .finally(() => {
            io.close();
            server.listen(port_for_socket);
            io = Server(server);

            reloadRooms().then(() => reloadSockets());
        });
})

// ********************* MESSAGES SOCKETS ************************************
app.post('/api/room/getAllMessages', (req, res) => {
    const userData = req.body;

    const items = userData.items;
    const room = userData.room;
    const roomMessage = messages[room];

    let messagesList = roomMessage;

    if (items > 0) {
        messagesList = slicedArray(room, items);
    }

    res.status(200).send(JSON.stringify(messagesList));
});

function reloadSockets() {
    io.on('connection', function (socket) {

        console.log(`New client connected! ("${socket.id}")`);

        socket.on('GlobalChat', (msg) => {
            addNewMessage("GlobalChat", JSON.parse(msg));
            io.emit('GlobalChat', JSON.stringify(slicedArray('GlobalChat', 10)));
        })


        rooms.map(room => {
            socket.on(room, (msg) => {
                addNewMessage(room, JSON.parse(msg));
                io.emit(room, JSON.stringify(slicedArray(room, 10)));
            })
        })

    });
}

// *********************

function addNewMessage(room, message) {
    messages[room].push({
        ...message,
        id
    });

    id += 1;
}

function reloadRooms() {
    return new Promise((resolve, reject) => {
        Rooms.findAll()
            .then((res) => {
                res.map(room => {
                    rooms.push(room.name);
                    messages[room.name] = [];
                })

                resolve();
            });
    })
}

reloadRooms().then(() => reloadSockets());

function slicedArray(room, amountOfRecords) {
    return messages[room].slice(Math.max(messages[room].length - amountOfRecords, 0))
}

// ********************************************************************* AUTH FUNCTIONS


function login(nick, pin) {
    return new Promise((resolve, reject) => {
        findUserByNick(nick)
            .then((isUserExists) => {
                if (isUserExists) {
                    pinIsValid(nick, Number(pin))
                        .then((isPinValid) => {
                            if (isPinValid) {
                                resolve("Success");
                            }
                            else {
                                reject("Pin is wrong")
                            }
                        })
                }
                else {
                    reject('Could not found user');
                }
            })
    })
}

function register(nick, pin) {
    return new Promise((resolve, reject) => {
        findUserByNick(nick).then(isUserExists => {
            if (!isUserExists) {
                if (!pinLengthIsValid(Number(pin))) {
                    reject("Length pin is not valid!");
                    return;
                }

                createNewUser(nick, Number(pin));

                resolve("New user created!");
            }
            else {
                reject("Already exist!");
            }
        })
    })
}


function findUserByNick(nick) {
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
                return true;
            }
        });
}

function pinIsValid(nick, pin) {
    return Accounts.findOne({
        where: {
            name: `${nick}`,
            pin: `${pin}`
        },
    })
        .then((res) => {
            if (res === null) {
                return false;
            }
            else {
                return true;
            }
        });
}

function pinLengthIsValid(pin) {
    if (pin.toString().length < 6) {
        return false;
    }
    else if (pin.toString().length >= 12) {
        return false;
    }
    return true;
}

function createNewUser(nick, pin) {
    Accounts.findOne({
        where: {
            name: `${nick}`,
        },
    })
        .then((res) => {
            if (res === null) {
                Accounts.create({
                    name: `${nick}`,
                    pin: pin,
                });
            }
        });
}



// ********************************************************************** ROOMS FUNCTIONS

function authToRoom(name, pin) {
    return new Promise((resolve, reject) => {
        findRoomByName(name)
            .then(() => {
                roomPinIsValid(name, Number(pin))
                    .then((isPinValid) => {
                        if (isPinValid) {
                            resolve("Success");
                        }
                        else {
                            reject("Pin is wrong")
                        }
                    })
            })
            .catch(() => reject('Could not found room'));
    })
}

function getRoomCreators(name, pin) {
    return new Promise((resolve, reject) => {
        Rooms.findOne({
            where: {
                name,
                pin
            },
        })
            .then((res) => {
                if (res === null) {
                    reject();
                }
                else {
                    resolve(res.creators)
                }
            });
    })
}

function newRoom(name, pin, creator) {
    return new Promise((resolve, reject) => {

        findRoomByName(name)
            .then(() => reject("Already exist!"))
            .catch(() => {
                if (!pinLengthIsValid(Number(pin))) {
                    reject("Length pin is not valid!");
                    return;
                }

                createNewRoom(name, Number(pin), creator).then(() => resolve("New room created!"));

            });
    })
}

function findRoomByName(name) {
    return new Promise((resolve, reject) => {
        Rooms.findOne({
            where: {
                name,
            },
        })
            .then((res) => {
                if (res === null) {
                    reject();
                }
                else {
                    resolve();
                }
            });
    })
}

function roomPinIsValid(name, pin) {
    return Rooms.findOne({
        where: {
            name,
            pin
        },
    })
        .then((res) => {
            if (res === null) {
                return false;
            }
            else {
                return true;
            }
        });
}

function createNewRoom(name, pin, creators) {
    return new Promise((resolve, reject) => {
        Rooms.findOne({
            where: {
                name,
            },
        })
            .then((res) => {
                if (res === null) {
                    Rooms.create({
                        name,
                        pin,
                        creators,
                        confirmed: false,
                    });
                }

                resolve();
            });
    })

}



sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listen in port: ${PORT}`);
        });
    })
    .catch((err) => {
        throw err;
    });
