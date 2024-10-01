const IoServer = require('socket.io');

const http = require('http');

const server = http.Server();

const {
    PORT_FOR_SOCKET,
    MESSAGES,
    rooms,
    getId,
    incrementId
} = require('../const/index.js');

let io = IoServer(PORT_FOR_SOCKET);

const reloadIoServer = () => {
    io.close();
    server.listen(PORT_FOR_SOCKET);
}

module.exports.io = io;
module.exports.reloadIoServer = reloadIoServer;

// ********************* MESSAGES SOCKETS ************************************
function getAllMessages(req, res) {
    const { items, room } = req.body;
    const roomMessage = MESSAGES[room];

    let messagesList = roomMessage;

    if (items > 0) {
        messagesList = slicedArray(room, items);
    }

    res.status(200).send(JSON.stringify(messagesList));
};

module.exports.getAllMessages = getAllMessages;

// ! REPAIR THAT ^ and sockets under
// SECURE RELOAD SOCKETS
function reloadSockets() {
    io.on('connection', function (socket) {

        console.log(`New client connected! ('${socket.id}')`);

        socket.on('GlobalChat', (msg) => {
            addNewMessage('GlobalChat', JSON.parse(msg));
            io.emit('GlobalChat', JSON.stringify(slicedArray('GlobalChat', 10)));
        })


        rooms.map(room => {
            socket.on(room, (msg) => {
                addNewMessage(room, JSON.parse(msg));
                // ! delete that -> for post before
                io.emit(room, JSON.stringify(slicedArray(room, 10)));
            });
        });

    });
};

module.exports.reloadSockets = reloadSockets;

// *********************

function addNewMessage(room, message) {
    MESSAGES[room].push({
        ...message,
        id: getId()
    });

    incrementId();
};

function slicedArray(room, amountOfRecords) {
    return MESSAGES[room].slice(Math.max(MESSAGES[room].length - amountOfRecords, 0));
};
//! ^