import style from '../public/css/add-register-room.module';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Text, View } from 'react-native';

import { IconButton } from '../utils/button';

import { API_URL } from '../utils/const';

import { updateRoles as updateRolesAction } from '../../reducers';
import { post } from '../utils/network';

function Settings({ store, navigation, updateRoles }: any) {
    console.log(store)

    return (
        <View style={style.body}>
            <AboutUser store={store} />

            <IconButton
                backgroundColor={'black'}
                icon={'refresh'}
                title={'Aktualizuj moją rangę!'}
                onPress={() => {
                    updateRole({ store })
                        .then((role) => updateRoles(role))
                        .catch(err => console.log("error:", err));
                }}
            />
        </View>
    );
}

function AboutUser({ store }: any) {
    const [userInfo, setUserInfo]: any = useState({});

    useEffect(() => {
        post({
            url:API_URL + '/user/getInfoAboutUser',
            body: JSON.stringify({
                nick: store.nick
            })
        })
            .then(res => res.json())
            .then(data => setUserInfo({
                role: data.role,
            }));

    }, [])

    return (
        <View>
            <Text>Name: {store.nick}</Text>
            <Text>Role: {Object.values(userInfo).length > 0 ? (userInfo.role || {}) : 'Loading'}</Text>
        </View>
    );
}


function updateRole({ store }: any) {
    return new Promise((resolve, reject) => {
        fetch(API_URL + '/user/getInfoAboutUser', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                nick: store.nick
            })

        })
            .then(res => res.json())
            .then(data => resolve(data.role))
            .catch(err => reject(err));
    });
}


const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

const mapDispatchToProps = {
    updateRoles: updateRolesAction,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);