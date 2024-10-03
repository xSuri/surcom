import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { IconButton } from './utils/button';
import style from './public/css/global.module';
import AddingRoomModal from './modals/Add-Register-Room';
import DropdownPicker from './utils/dropdown-picker';

import { SOCKET_URL } from './utils/const';

import { deleteRoom as deleteRoomAction } from '../reducers/index';

const io = require('socket.io-client');

function HomePage({ navigation, rooms, state, deleteRoom }:any) {
    const [socket, setSocket] = useState('');
    const [roomModalIsOpen, setRoomModalIsOpen] = useState(false);

    useEffect(() => setSocket(io(SOCKET_URL)), []);

    const toggleRoomModal = () => setRoomModalIsOpen(!roomModalIsOpen);

    if (roomModalIsOpen) return (
        <AddingRoomModal navigation={navigation} toggleRoomModal={toggleRoomModal} socket={socket} />
    );


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

                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Image
                        style={style.logo}
                        source={require('./public/image/logo.png')}
                    />
                </TouchableWithoutFeedback>


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
                        rooms && rooms.length > 0 ? rooms.map((room: React.Key | null | undefined) => (
                            <View key={room} style={style.additionalRooms}>
                                <IconButton
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

                                <View style={style.dropdown}>
                                    <DropdownPicker
                                        items={[{ label: 'Delete Room', value: 'delete' }]}
                                        // TO CHANGE
                                        // VALUES VIOLET
                                        choosedValue={(value: string) => {
                                            if (value === 'delete') {
                                                deleteRoom(room)
                                            }
                                        }}
                                    />
                                </View>

                                {/* STYLIZACJA DELETE */}
                                {/* https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/list-modes */}
                            </View>

                        )) : null
                    }
                </View>

            </View>

        </>
    );
}

const mapStateToProps = (state: { user: { rooms: any; }; }) => ({
    rooms: state.user.rooms,
    state: state
});

const mapDispatchToProps = {
    deleteRoom: deleteRoomAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);