import React, { useState } from 'react';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, TextInput, View } from 'react-native';
import { IconButton } from './utils/button';
import showAlert, { ALERT_TYPES } from './utils/alert';
import style from './utils/global.module.css';

import { API_URL, API_URLS, STATUTS, SCREEN_ROUTES } from './utils/const';

import { signIn as signInAction } from '../reducers/index';


function LoginPage({ navigation, signIn }) {
    const [isUnlocked, setUnlock] = useState(true);

    const [nick, setNick] = useState('');
    const [pin, setPin] = useState('');

    return (
        <View style={style.body}>
            <View style={style.view}>
                <View><Text style={style.headerText}>Login Page</Text></View>


                <Text style={style.textWhite}>Login: </Text>

                <TextInput
                    onChangeText={(text) => setNick(text)}
                    value={nick}
                    placeholder="Write Your Login"
                    style={style.input}
                    editable={isUnlocked}
                    selectTextOnFocus={isUnlocked}
                />

                <Text style={style.textWhite}>Pin: </Text>

                <TextInput
                    onChangeText={(text) => setPin(text)}
                    value={pin}
                    placeholder="Write Your Pin"
                    keyboardType="numeric"
                    secureTextEntry
                    style={style.input}
                    editable={isUnlocked}
                    selectTextOnFocus={isUnlocked}
                />

                <IconButton
                    icon="sign-in"
                    title="Login"
                    backgroundColor="#777"
                    onPress={() => {
                        setUnlock(false);

                        if (isNaN(pin)) {
                            showAlert({
                                alertType: ALERT_TYPES.DANGER,
                                alertTitle: 'Please try again!',
                                alertBody: 'Pin must be a number!',
                            });

                            setUnlock(true);
                            return;
                        }

                        if (nick.length < 4 && nick.length < 30) {
                            showAlert({
                                alertType: ALERT_TYPES.DANGER,
                                alertTitle: 'Please try again!',
                                alertBody: 'Nick must have 4-30 letters!',
                            });

                            setUnlock(true);
                            return;
                        }

                        login({ nick, pin })
                            .then(resp => resp.json())
                            .then((data) => {
                                if (data.status === STATUTS['success']) {

                                    signIn(data.nick);
                                    AsyncStorage.setItem('@nick', data.nick);

                                    showAlert({
                                        alertType: ALERT_TYPES.SUCCESS,
                                        alertTitle: 'Success!',
                                        alertBody: data.statusMessage,
                                    });

                                    navigation.navigate(SCREEN_ROUTES['screen:home']);
                                }
                                else {
                                    showAlert({
                                        alertType: ALERT_TYPES.DANGER,
                                        alertTitle: 'Please try again!',
                                        alertBody: data.statusMessage,
                                    });

                                    setUnlock(true);
                                }
                            })
                            .catch(err => {
                                showAlert({
                                    alertType: ALERT_TYPES.DANGER,
                                    alertTitle: 'Error!',
                                    alertBody: 'Something went wrong! (Please try again later)',
                                });

                                setUnlock(true);
                            });

                    }}
                    editable={isUnlocked}
                    selectTextOnFocus={isUnlocked}
                />
            </View>

        </View>

    );
}

function login({ nick, pin }) {
    return fetch(API_URL + API_URLS['login'], {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            nick: nick,
            pin: pin
        })

    });
}

const mapDispatchToProps = {
    signIn: signInAction
};

export default connect(
    null,
    mapDispatchToProps
)(LoginPage);