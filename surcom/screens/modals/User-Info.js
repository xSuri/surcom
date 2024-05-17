import style from '../utils/add-register-room.module.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { API_URL } from '../utils/const';

function UserInfo({ store, navigation, route }) {
    const [userInfo, setUserInfo] = useState({});
    // BAN FOR ADMINS HERE

    const { messageNick } = route.params;


    // FOR TEST FUNCTIO!!

    useEffect(() => {
        post({
            url: API_URL + '/user/getInfoAboutUser',
            body: JSON.stringify({
                nick: messageNick
            })
        })
            .then(res => res.json())
            .then(data => setUserInfo({
                role: data.role,
            }));

    }, [])

    // *********************

    // console.log(store)  <-- user info (admin)

    return (
        <View style={style.body}>
            <Text>Name: {messageNick}</Text>
            <Text>Role: {Object.values(userInfo).length > 0 ? userInfo.role : 'Loading'}</Text>

            {/* ADMIN PANEL */}

            {
                store.role === 'admin' ? (
                    <Text>ADMIN PANEL</Text>
                ) : null
            }

        </View>
    );
}



const mapStateToProps = state => ({
    store: state.user
});

export default connect(
    mapStateToProps,
    null,
)(UserInfo);