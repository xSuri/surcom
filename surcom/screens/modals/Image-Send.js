import style from '../utils/add-register-room.module.css';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput } from 'react-native';

import { IconButton } from '../utils/button';

import showAlert, { ALERT_TYPES } from '../utils/alert';
import { API_URL } from '../utils/const';
import { put } from '../utils/network';

function ImageSend({ route }) {
    const [maxViews, setMaxViews] = useState(0);
    const [newMessage, setNewMessage] = useState('');

    const { store, navigation, message, dataImage, room } = route.params;

    useEffect(() => setNewMessage(message), []);

    function sendNewImage() {
        put({
            url: API_URL + '/room/sendNewImage',
            body: JSON.stringify({
                nick: store.nick,
                message,
                dataImage: dataImage.assets[0].base64,
                room,
                maxViews: 3
            })
        })
            .then(() => {
                showAlert({
                    alertType: ALERT_TYPES.SUCCESS,
                    alertTitle: 'Image Added!',
                    alertBody: 'Your image has been sent. Click now on yours room!',
                });
                navigation.navigate('Home');
            });
    }

    return (
        <View style={style.body}>
            <Text style={style.textWhite}>Message to Image: </Text>

            <TextInput
                onChangeText={(text) => setNewMessage(text)}
                value={newMessage}
                placeholder="Write Your Message"
                style={style.input}
            />

            <Text style={style.textWhite}>Max Views Image: </Text>

            <TextInput
                onChangeText={(number) => setMaxViews(number)}
                value={maxViews}
                placeholder="Write Max Views"
                style={style.input}
                keyboardType="numeric"
            />

            <IconButton
                icon="send"
                title="Send"
                backgroundColor="#777"
                onPress={sendNewImage}
            />
        </View>
    );
}


const mapStateToProps = state => ({
    store: state.user
});

export default connect(
    mapStateToProps,
    null,
)(ImageSend);