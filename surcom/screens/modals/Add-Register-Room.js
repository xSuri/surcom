import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, TextInput, View } from 'react-native';
import showAlert, { ALERT_TYPES } from '../utils/alert';
import style from '../utils/add-register-room.module.css';

import { addingRoom as addingRoomAction } from '../../reducers/index';

import { API_URL } from '../utils/const';

import { IconButton } from '../utils/button';


function AddingRoomModal({ toggleRoomModal, socket, store, addingRoom }) {
    const [roomName, setRoomName] = useState('');
    const [roomPin, setRoomPin] = useState('');

    return (
        <View style={style.body}>
            <TextInput
                onChangeText={setRoomName}
                value={roomName}
                placeholder="Write Your Room Name"
                style={style.input}
                placeholderTextColor='whitesmoke'
            />

            <TextInput
                onChangeText={setRoomPin}
                value={roomPin}
                placeholder="Write Your Room PIN"
                keyboardType="numeric"
                secureTextEntry
                style={style.input}
                placeholderTextColor='whitesmoke'
            />

            <IconButton
                icon="sign-in"
                title="Create / Auth"
                backgroundColor="#fff"
                additionalStyleClass={{ color: 'black' }}
                imageColor="black"
                onPress={() => createNewRoom(roomName, roomPin, addingRoom, store, toggleRoomModal)}
            />

            <IconButton
                icon="sign-in"
                title="Close"
                backgroundColor="red"
                onPress={toggleRoomModal}
            />

        </View>
    );
}

function createNewRoom(name, pin, addingRoom, store, toggleRoomModal) {
    let isExists = false;

    store.rooms.map(room => {
        if (room === name) {
            isExists = true;
        }
    })

    if (isExists) {
        return;
    }

    roomSendFetchWithMethod({
        name,
        pin,
        creator: store.nick,
        method: 'POST'
    })
        .then(res => res.json())
        .then((data) => {
            if (data.status === 'Could not found room') {
                roomSendFetchWithMethod({
                    name,
                    pin,
                    creator: store.nick,
                    method: 'PUT'
                })
                    .then(res => res.json())
                    .then(() => {
                        addingRoom(name);

                        showAlert({
                            alertType: ALERT_TYPES.SUCCESS,
                            alertTitle: 'New Room',
                            alertBody: 'Success added new room!',
                        }).then(toggleRoomModal);
                    })
                    .catch((err) => {
                        showAlert({
                            alertType: ALERT_TYPES.DANGER,
                            alertTitle: 'Error!',
                            alertBody: 'Something went wrong! (Please try again later)',
                        });
                    })
            }
            else if (data.status === 'Success') {
                addingRoom(name);

                showAlert({
                    alertType: ALERT_TYPES.SUCCESS,
                    alertTitle: 'Authenticated',
                    alertBody: 'Success authed to room!',
                }).then(toggleRoomModal);
            }
            else {
                showAlert({
                    alertType: ALERT_TYPES.DANGER,
                    alertTitle: 'Error!',
                    alertBody: data.status,
                });
            }
        });
}

function roomSendFetchWithMethod({ name, pin, creator, method }) {
    return fetch(API_URL + '/room', {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body: JSON.stringify(
            {
                name,
                pin,
                creator
            }
        )
    });
}

const mapStateToProps = state => ({
    store: state.user
});

const mapDispatchToProps = {
    addingRoom: addingRoomAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingRoomModal);