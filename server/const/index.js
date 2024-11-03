const APP_PORT = process.env.APP_PORT || 3000;
const PORT_FOR_SOCKET = process.env.SOCKET_PORT || 4242;
const SECRET_KEY = process.env.SECRET_KEY+'_'+process.env.SECRET_SALT;

const APP_SEND_LIMIT = '100mb';
const TIME_TO_RESTART = 8 * 60 * 60 * 1000;
const TIME_TO_DELETE_OLD_MESSAGES = 60 * 1000 * 15;

const SEQUELIZE_OPTIONS = {
    database: 'database',
    username: null,
    password: null,
    host: 'localhost',
    dialect: 'sqlite',
    storage: './accounts.sqlite',
};

let id = 1;

let rooms = [];
const MESSAGES = {
    'GlobalChat': [],
};

const getId = () => id;
const incrementId = () => id += 1;

module.exports.APP_PORT = APP_PORT;
module.exports.PORT_FOR_SOCKET = PORT_FOR_SOCKET;
module.exports.APP_SEND_LIMIT = APP_SEND_LIMIT;
module.exports.TIME_TO_RESTART = TIME_TO_RESTART;
module.exports.TIME_TO_DELETE_OLD_MESSAGES = TIME_TO_DELETE_OLD_MESSAGES;
module.exports.SEQUELIZE_OPTIONS = SEQUELIZE_OPTIONS;
module.exports.MESSAGES = MESSAGES;
module.exports.SECRET_KEY = SECRET_KEY;

module.exports.id = id;
module.exports.rooms = rooms;

module.exports.incrementId = incrementId;
module.exports.getId = getId;