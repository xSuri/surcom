import style from '../public/css/add-register-room.module';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextInput, View } from 'react-native';

import { IconButton } from '../utils/button';

import showAlert, { ALERT_TYPES } from '../utils/alert';
import { ALERTS_TEXTS, API_URL, API_URLS, SCREEN_ROUTES, STATUTES, TEXTS } from '../utils/const';

import { addRoom as addRoomAction } from '../../reducers/index';
import { post, put } from '../utils/network';

function AddingRoomModal({ toggleRoomModal, store, addRoom, navigation }: any) {
    const [roomName, setRoomName] = useState('');
    const [roomPin, setRoomPin] = useState('');

    return (
        <View style={style.body}>

            <TextInput
                onChangeText={setRoomName}
                value={roomName}
                placeholder={TEXTS['text:add:room:input:room:name']}
                style={style.input}
                placeholderTextColor='whitesmoke'
            />

            <TextInput
                onChangeText={setRoomPin}
                value={roomPin}
                placeholder={TEXTS['text:add:room:input:room:pin']}
                keyboardType="numeric"
                secureTextEntry
                style={style.input}
                placeholderTextColor='whitesmoke'
            />

            <IconButton
                icon="sign-in"
                title={TEXTS['text:add:room:button:room:title']}
                backgroundColor="#fff"
                additionalStyleClass={{ color: 'black' }}
                imageColor="black"
                onPress={() => createNewRoom(roomName, roomPin, addRoom, store, toggleRoomModal, navigation)}
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

function createNewRoom(name: string, pin: string, addRoom: (arg0: any) => void, store: { rooms: any[]; nick: any; }, toggleRoomModal: ((value: unknown) => unknown) | null | undefined, navigation: any) {
    let isExists = false;

    store.rooms.map((room: any) => {
        if (room === name) {
            isExists = true;
        }
    })

    if (isExists) return;

    post({
        url: API_URL + API_URLS.room,
        body: JSON.stringify({
            name,
            pin,
            creator: store.nick,
        })
    })
        .then(res => res.json())
        .then((data) => {
            if (data.status === STATUTES['text:room:not:found']) {
                put({
                    url: API_URL + API_URLS.room,
                    body: JSON.stringify({
                        name,
                        pin,
                        creator: store.nick,
                    })
                })
                    .then(res => res.json())
                    .then(() => {
                        addRoom(name);

                        showAlert({
                            alertType: ALERT_TYPES.SUCCESS,
                            alertTitle: ALERTS_TEXTS['alert:text:add:room:not:found:success:title'],
                            alertBody: ALERTS_TEXTS['alert:text:add:room:not:found:success:body'],
                        }).then(toggleRoomModal);
                    })
                    .catch(() =>
                        showAlert({
                            alertType: ALERT_TYPES.DANGER,
                            alertTitle: ALERTS_TEXTS['alert:text:add:room::not:found:error:title'],
                            alertBody: ALERTS_TEXTS['alert:text:add:room::not:found:error:body'],
                        })
                    );
            }
            else if (data.status === STATUTES['text:room:success']) {
                addRoom(name);

                showAlert({
                    alertType: ALERT_TYPES.SUCCESS,
                    alertTitle: ALERTS_TEXTS['alert:text:add:room::success:auth:title'],
                    alertBody: ALERTS_TEXTS['alert:text:add:room::success:auth:body'],
                })
                    .then(toggleRoomModal);
            }
            else showAlert({
                alertType: ALERT_TYPES.DANGER,
                alertTitle: ALERTS_TEXTS['alert:text:add:room::error:title'],
                alertBody: data.status,
            });
        })
        .catch(() => {
            navigation.navigate(SCREEN_ROUTES['screen:home']);

            showAlert({
                alertType: ALERT_TYPES.DANGER,
                alertTitle: ALERTS_TEXTS['alert:text:add:room::network:error:title'],
                alertBody: ALERTS_TEXTS['alert:text:add:room::network:error:body'],
            });
        })
}

const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

const mapDispatchToProps = {
    addRoom: addRoomAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddingRoomModal);