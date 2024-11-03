import style from '../public/css/add-register-room.module';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, Image } from 'react-native';

import { API_URL, API_URLS } from '../utils/const';

function ImageShower({ route }: any) {
    const { image } = route.params;

    //! INCREMENT NALICZANIE
    //! ZABEZPIECZENIE

    // useEffect(() => {
    //! POST
    //     fetch(API_URL + API_URLS['room:getImageViews'], {
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         method: 'POST',
    //         body: JSON.stringify({

    //         })

    //     })
    // }, [])

    return (
        <View style={style.body}>
            <Image
                style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                source={{ uri: `data:image/png;base64,${image}` }}
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
)(ImageShower);