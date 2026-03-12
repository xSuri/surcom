import style from '../utils/add-register-room.module.css';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, Image } from 'react-native';

import { API_URL } from '../utils/const';

function ImageShower({ route }) {
    const { image } = route.params;

    // INCREMENT NALICZANIE
    // ZABEZPIECZENIE

    // useEffect(() => {
    //     fetch(API_URL + '/room/getImageViews', {
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


const mapStateToProps = state => ({
    store: state.user
});

export default connect(
    mapStateToProps,
    null,
)(ImageShower);