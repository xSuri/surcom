import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import style from './utils/room.module.css';

import {
    Text,
    View,
    TextInput,
    LogBox,
    FlatList
} from 'react-native';

import { API_URL } from './utils/const';

import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Room = ({ navigation, route, store }) => {
    const [inputIsActive, setInputIsActive] = useState(false);

    const [messages, setMessages] = useState([]);
    const [items, setItems] = useState(10);
    const [newMessage, setNewMessage] = useState('');

    const { socket, roomName } = route.params;

    const flatList = useRef();

    useEffect(() => {
        fetch(API_URL + '/room/getAllMessages', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    room: roomName,
                    items
                }
            )
        })
            .then(response => response.json())
            .then(jsonData => setMessages(jsonData))
            .catch(err => console.log(err));

    }, [items])

    useEffect(() => {
        socket.on(roomName, (data) => setMessages(JSON.parse(data)));
    }, []);

    handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;

        if (contentOffset.y < 0.5) {
            setItems(items + 10);
        }
    }
    //ograniczenie

    return (
        <>
            <View style={style.main}>
                <View style={style.body}>
                    <View style={style.chatContainer}>
                        <View style={style.chat}>
                            <FlatList
                                style={style.scroll}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={messages}
                                ref={flatList}
                                onContentSizeChange={() => flatList.current.scrollToEnd()}
                                onScroll={handleScroll}
                                renderItem={({ item }) => (
                                    <ChatMessage
                                        key={item.id}
                                        userNick={store.nick}
                                        messageNick={item.nick}
                                        message={item.message}
                                    />
                                )}
                            />

                        </View>
                    </View>
                </View>

                <View style={style.bottom}>

                    <View style={style.content}>


                        {
                            inputIsActive ? null : (
                                <>
                                    <View style={style.image_picker}>
                                        <Icon
                                            name='image'
                                            size={20}
                                            color='white'
                                            onPress={() => launchImageLibrary({selectionLimit: 0}).then(data => console.log(data))}
                                        />
                                    </View>


                                    <View style={style.image_picker}>
                                        <Icon
                                            name='image'
                                            size={20}
                                            color='white'
                                        // style={style.image_picker}
                                        // onClick={() => launchImageLibrary()}
                                        />
                                    </View>
                                </>
                            )
                        }


                        <TextInput
                            onChangeText={(text) => setNewMessage(text)}
                            onSubmitEditing={() => {
                                sendNewMessage(socket, roomName, store.nick, newMessage);
                                setNewMessage('');
                                setInputIsActive(false);
                            }}
                            onPressIn={() => setInputIsActive(true)}
                            value={newMessage}
                            placeholder="Write Your Message!"
                            style={[style.text_input, inputIsActive ? { width: '90%' } : { width: '66%' }]}
                            editable={true}
                            selectTextOnFocus={true}
                        />

                        <View style={style.image_picker}>
                            <Icon
                                name='image'
                                size={20}
                                color='white'
                            // style={style.image_picker}
                            // onClick={() => launchImageLibrary()}
                            />
                        </View>
                    </View>

                </View>
                {/* name='chevron-left' */}


                {/* <button
                    onClick={() => sendNewImage(socket, roomName, store.nick, newImage)}
                > */}
                {/*IKONKA  */}
                {/* </button> */}


                {/* IKONKA DO KLIKNIECIA
                    ONCLICK => zdjecie do base64 i wyslanie wiadomosci z tagiem <?image>
                */}
            </View>
        </>
    );
};

function ChatMessage({ messageNick, message, userNick }) {
    if (messageNick === userNick) {
        return (
            <View style={[style.message, style.right]}>
                <View style={style.userInfo}>
                    <Text style={style.name}>{messageNick}</Text>
                </View>

                <Text style={style.messageStyle}>{message}</Text>
            </View>
        )
    }
    else {
        return (
            <View style={[style.message, style.left]}>
                <View style={style.userInfo}>
                    <Text style={style.name}>{messageNick}</Text>
                </View>

                <Text style={style.messageStyle}>{message}</Text>
            </View>
        )
    }
}

function sendNewMessage(socket, room, nick, message) {
    socket.emit(room,
        JSON.stringify({
            nick,
            message
        })
    );
}

// function sendNewMessage(socket, room, nick, message) {
//     socket.emit(room,
//         JSON.stringify({
//             nick,
//             image: imagebase64
//         })
//     );
// }

const mapStateToProps = state => ({
    store: state.user
});

export default connect(
    mapStateToProps,
)(Room);

