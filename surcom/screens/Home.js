import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Image } from 'react-native';
import { IconButton } from './utils/button';
import style from './utils/global.module.css';
import AddingRoomModal from './modals/Add-Register-Room';

import { IP } from './utils/const';

const io = require('socket.io-client');

function HomePage({ navigation, rooms, state }) {
    const [socket, setSocket] = useState('');
    const [roomModalIsOpen, setRoomModalIsOpen] = useState(false);

    useEffect(() => {
        setSocket(io(`ws://${IP}:4242`));
    }, [])

    const toggleRoomModal = () => {
        setRoomModalIsOpen(!roomModalIsOpen);
    }

    if (roomModalIsOpen) {
        return (
            <AddingRoomModal toggleRoomModal={toggleRoomModal} socket={socket} />
        )
    }


    return (
        <>
            <View style={style.body}>

                <View>
                    <View style={style.addingRoomButton}>
                        <IconButton
                            icon="plus"
                            backgroundColor="black"
                            color="white"
                            additionalStyleClass={style.textWhite}
                            onPress={toggleRoomModal}
                        />
                    </View>
                </View>

                <Image
                    style={style.logo}
                    source={require('../../surcom/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')}
                />

                <View style={style.rooms}>
                    <IconButton
                        icon="globe"
                        title="Global Chat"
                        backgroundColor="black"
                        color="white"
                        additionalStyleClass={style.textWhite}
                        onPress={() => {
                            navigation.navigate('Room', {
                                socket,
                                roomName: 'GlobalChat',
                            })
                        }}
                    />

                    {
                        rooms && rooms.length > 0 ? rooms.map(room => (
                            <IconButton
                                key={room}
                                icon="comment"
                                title={room}
                                backgroundColor="black"
                                color="white"
                                additionalStyleClass={style.textWhite}
                                onPress={() => {
                                    navigation.navigate('Room', {
                                        socket,
                                        roomName: room,
                                    })
                                }}
                            />
                        )) : null
                    }
                </View>

            </View>

        </>
    );
}

const mapStateToProps = state => ({
    rooms: state.user.rooms,
    state: state
});

export default connect(
    mapStateToProps,
)(HomePage);