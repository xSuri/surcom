const sharp = require('sharp');

const {
    MESSAGES,
    id,
    SEQUELIZE_OPTIONS,
    incrementId,
    getId
} = require('../const/index.js');

const { Sequelize, DataTypes } = require('sequelize');

const initImages = require('../models/rooms-image-model.js');

const sequelize = new Sequelize(SEQUELIZE_OPTIONS.database, SEQUELIZE_OPTIONS.username, SEQUELIZE_OPTIONS.password, {
    host: SEQUELIZE_OPTIONS.host,
    dialect: SEQUELIZE_OPTIONS.dialect,
    storage: SEQUELIZE_OPTIONS.storage,
});

const Images = initImages(sequelize, DataTypes);

function sendNewImage(req, res) {
    const userData = req.body;
    const { message, dataImage, room, maxViews, nick } = userData;
    console.log(userData.room)

    const image = Buffer.from(dataImage, 'base64');

    sharp(image)
        .resize(720, 1080)
        .webp()
        .toBuffer()
        .then(data => {
            addNewImage(room, message, dataImage, nick);

            createNewImage(room, nick, maxViews).then(() => {
                res.status(200).send(
                    JSON.stringify({
                        status: 200,
                        statusMessage: 'correct'
                    })
                );
            });
        });
};

module.exports.sendNewImage = sendNewImage;

function getImageViews(req, res) {
    const userData = req.body;
    const { room, id } = userData;

    Images.findOne({
        where: {
            room,
            id
        },
    })
        .then(image => console.log(image));
};

module.exports.getImageViews = getImageViews;

function incrementImageViews(req, res) {
    const userData = req.body;
    const { room, id } = userData;

    Images.findOne({
        where: {
            room,
            id
        },
    })
        .then(image => console.log(image));
};

module.exports.incrementImageViews = incrementImageViews;

function addNewImage(room, message, dataImage, nick) {
    MESSAGES[room].push({
        message,
        image: dataImage,
        id: getId(),
        isImage: true,
        nick
    });

    incrementId();
};

function deleteImage(room, id) {
    return new Promise((resolve, reject) => {
        Images.destroy({
            where: {
                room,
                id
            },
        })
            .then(() => {
                MESSAGES[room] = MESSAGES[room].filter(message => message.id != id);
                resolve();
            })
            .catch(() => reject());
    });
};

function createNewImage(room, nick, max_views) {
    return new Promise((resolve, reject) => {
        Images.create({
            room,
            nick,
            socketImageId: id - 1,
            views: 0,
            max_views
        });

        resolve();
    });
};

function resetImagesTable() {
    Images.truncate();
};

module.exports.resetImagesTable = resetImagesTable;