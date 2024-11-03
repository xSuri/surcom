import style from '../public/css/add-register-room.module';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput } from 'react-native';

import { IconButton } from '../utils/button';

import showAlert, { ALERT_TYPES } from '../utils/alert';
import { ALERTS_TEXTS, API_URL, API_URLS, NUMBERS, SCREEN_ROUTES, TEXTS } from '../utils/const';
import { put } from '../utils/network';

function ImageSend({ route }: any) {
    const [maxViews, setMaxViews] = useState(0);
    const [newMessage, setNewMessage] = useState('');

    const { store, navigation, message, dataImage, room } = route.params;

    useEffect(() => setNewMessage(message), []);

    function sendNewImage() {
        put({
            url: API_URL + API_URLS['room:sendNewImage'],
            body: JSON.stringify({
                nick: store.nick,
                message,
                dataImage: dataImage.assets[0].base64,
                room,
                // !
                maxViews: NUMBERS['image:max:views']
            })
        })
            .then(() => {
                showAlert({
                    alertType: ALERT_TYPES.SUCCESS,
                    alertTitle: ALERTS_TEXTS['alert:text:image:send:success:title'],
                    alertBody: ALERTS_TEXTS['alert:text:image:send:success:body'],
                });

                navigation.navigate(SCREEN_ROUTES['screen:home']);
            });
    }

    return (
        <View style={style.body}>
            <Text style={style.textWhite}>
                {TEXTS['text:image:send:message']}
            </Text>

            <TextInput
                onChangeText={(text) => setNewMessage(text)}
                value={newMessage}
                placeholder={TEXTS['text:image:input:write:message']}
                style={style.input}
            />

            <Text style={style.textWhite}>
                {TEXTS['text:image:send:max:views']}
            </Text>

            <TextInput
                onChangeText={(number) => setMaxViews(Number(number))}
                value={String(maxViews)}
                placeholder={TEXTS['text:image:input:max:views']}
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


const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

export default connect(
    mapStateToProps,
    null,
)(ImageSend);