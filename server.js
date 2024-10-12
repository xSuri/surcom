const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');

const { login, register, me, authenticateJWT } = require('./routes/auth-routes.js');
const { authToRoom, newRoom } = require('./routes/room-routes.js');
const { getUserInfo } = require('./routes/admin-panel-routes.js');
const { sendNewImage, getImageViews, incrementImageViews, resetImagesTable } = require('./routes/room-image-routes.js');

const {
    APP_PORT,
    APP_SEND_LIMIT,
    SEQUELIZE_OPTIONS,
    TIME_TO_RESTART
} = require('./const/index.js');
const { getAllMessages } = require('./routes/messages-routes.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

new Promise((resolve, reject) => {
    const initImages = require('./models/rooms-image-model');
    const initRooms = require('./models/rooms-model');
    const initAccount = require('./models/accounts-model');
    initImages(sequelize, DataTypes);
    initRooms(sequelize, DataTypes);
    initAccount(sequelize, DataTypes);

    resolve();
})
    .then(() => {
        const app = express();

        // app.use(cors({
        //     origin: '*',
        //     credentials: true
        // }));

        app.use(bodyParser.json({ limit: APP_SEND_LIMIT }));
        app.use(bodyParser.urlencoded({ limit: APP_SEND_LIMIT, extended: true }));

        app.get('/me', authenticateJWT, (req, res) => me(req, res));
        app.post('/api/login', (req, res) => login(req, res));
        app.put('/api/register', (req, res) => register(req, res));

        app.post('/api/room', authenticateJWT, (req, res) => authToRoom(req, res));
        app.put('/api/room', authenticateJWT, (req, res) => newRoom(req, res));

        app.post('/api/room/getAllMessages', authenticateJWT, (req, res) => getAllMessages(req, res));

        app.post('/api/room/incrementImageViews', authenticateJWT, (req, res) => incrementImageViews(req, res));
        app.put('/api/room/sendNewImage', authenticateJWT, (req, res) => sendNewImage(req, res));
        app.get('/api/room/getImageViews', authenticateJWT, (req, res) => getImageViews(req, res));

        app.post('/api/user/getInfoAboutUser', authenticateJWT, (req, res) => getUserInfo(req, res));

        sequelize.sync()
            .then(() => {
                resetImagesTable();

                app.listen(APP_PORT, () => {
                    console.log(`Server listen in port: ${APP_PORT}`);
                });

                setTimeout(() => {
                    console.log('Server restart...');
                    process.exit(0);
                }, TIME_TO_RESTART);
            })
            .catch((err) => {
                throw err;
            });

    })
    .catch((err) => err);