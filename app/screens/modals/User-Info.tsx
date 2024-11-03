import style from '../public/css/add-register-room.module';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { API_URL, API_URLS, ROLES, TEXTS } from '../utils/const';
import { post } from '../utils/network';

function UserInfo({ store, navigation, route }: any) {
    const [userInfo, setUserInfo]: any = useState({});
    // BAN FOR ADMINS HERE

    const { messageNick } = route.params;

    useEffect(() => {
        post({
            url: API_URL + API_URLS['user:getInfoAboutUser'],
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
            <Text>
                {TEXTS['text:user:info:text:name']} {messageNick}
            </Text>
            <Text>
                {TEXTS['text:user:info:text:role']} {Object.values(userInfo).length > 0 ? userInfo.role : TEXTS['text:user:info:text:role:loading']}
            </Text>

            {/* ADMIN PANEL */}

            {
                store.role === ROLES.admin ? (
                    <Text>
                        {TEXTS['text:user:info:admin:text:panel']}
                    </Text>
                ) : null
            }

        </View>
    );
}



const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

export default connect(
    mapStateToProps,
    null,
)(UserInfo);