import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { signIn as signInAction, updateRoomsOnLoad as updateRoomsOnLoadAction } from '../reducers/index';

import { IconButton } from './utils/button';
import style from './utils/global.module.css';

function Main({ navigation, signIn, updateRoomsOnLoad }) {
    const [isUnlocked, setUnlock] = useState(true);

    useEffect(() => {
        setUnlock(false);

        AsyncStorage.getItem('@rooms').then(rooms => {
            if (rooms && rooms.length > 0) {
                updateRoomsOnLoad(JSON.parse(rooms));
            }
        });

        AsyncStorage.getItem('@nick')
            .then(nick => {
                if (nick && nick.length > 0) {
                    signIn(nick);
                }
                setUnlock(true);
            })
            .catch(() => setUnlock(true));

    }, [])

    return (
        <>
            <View style={style.screenContainer}>

                <IconButton
                    icon="sign-in"
                    title="Login"
                    backgroundColor="white"
                    additionalStyleClass={style.textBlack}
                    imageColor="black"
                    onPress={() => navigation.navigate('Login')}
                    editable={isUnlocked}
                    selectTextOnFocus={isUnlocked}
                />

                <IconButton
                    icon="user"
                    title="Register"
                    backgroundColor="#777"
                    onPress={() => navigation.navigate('Register')}
                    editable={isUnlocked}
                    selectTextOnFocus={isUnlocked}
                />

            </View>
        </>
    );
}

const mapDispatchToProps = {
    signIn: signInAction,
    updateRoomsOnLoad: updateRoomsOnLoadAction
};

export default connect(
    null,
    mapDispatchToProps
)(Main);