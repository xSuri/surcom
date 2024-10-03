import style from './public/css/room.module';

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TextInput,
    LogBox,
    FlatList,
    Pressable
} from 'react-native';

import { API_URL } from './utils/const';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import showAlert, { ALERT_TYPES } from './utils/alert';
import LoadingSkeleton from './utils/loading';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Room = ({ navigation, route, store }: any) => {
    const [inputIsActive, setInputIsActive] = useState(false);
    const [messagesIsFetched, setNewMessagesIsFetched] = useState(false);

    const [messages, setMessages] = useState([]);
    const [items, setItems] = useState(15);
    const [newMessage, setNewMessage] = useState('');

    const { socket, roomName } = route.params;

    // const flatList = useRef();
    // const input = useRef();

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
            .catch(err => {
                navigation.navigate('Home');

                showAlert({
                    alertType: ALERT_TYPES.DANGER,
                    alertTitle: 'Error!',
                    alertBody: 'Something went wrong! (Please try again later -> Network Problem)',
                });
            })
            .finally(() => messagesIsFetched ? null : setNewMessagesIsFetched(true));

    }, [items])

    useEffect(() => {
        socket.on(roomName, (data: string) => setMessages(JSON.parse(data)));
    }, []);

    const handleScroll = (event: { nativeEvent: { contentOffset: any; }; }) => {
        const { contentOffset } = event.nativeEvent;

        // if (contentOffset.y < 0.15) {
        //     setItems(items + 10);
        // }
    }

    return (
        <>
            <View style={style.main}>
                <View style={style.body}>
                    <View style={style.chatContainer}>
                        <View style={style.chat}>
                            {
                                messagesIsFetched ? (
                                    <FlatList
                                        style={style.scroll}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={messages}
                                        // ref={flatList}
                                        // onContentSizeChange={() => flatList.current.scrollToEnd()}
                                        onScroll={handleScroll}
                                        renderItem={({ item }: any) => (
                                            <ChatMessage
                                                key={item.id}
                                                navigation={navigation}
                                                userNick={store.nick}
                                                item={item}
                                                room={roomName}
                                            />
                                        )}
                                    />

                                ) : <LoadingSkeleton />
                            }

                        </View>
                    </View>
                </View>

                <View style={style.bottom}>

                    <View style={style.content}>


                        {
                            inputIsActive ? null : (
                                <>
                                    <View style={style.icons}>
                                        <Icon
                                            name='camera'
                                            size={20}
                                            color='white'
                                            // onPress={() => launchCamera()}
                                        />
                                    </View>

                                    <View style={style.icons}>
                                        <Icon
                                            name='image'
                                            size={20}
                                            color='white'
                                            onPress={() => launchImageLibrary({
                                                selectionLimit: 1, includeBase64: true, maxWidth: 1920, maxHeight: 1080,
                                                mediaType: 'video'
                                            }).then(data => {
                                                navigation.navigate('ImageSend', {
                                                    message: newMessage,
                                                    dataImage: data,
                                                    store,
                                                    navigation,
                                                    room: roomName
                                                });
                                            })
                                            }
                                        />
                                    </View>
                                </>
                            )
                        }


                        <TextInput
                            onChangeText={(text) => setNewMessage(text)}
                            onSubmitEditing={() => {
                                if (newMessage.length > 0 && newMessage.trim().length > 0) {
                                    sendNewMessage(socket, roomName, store.nick, newMessage);
                                }
                                setNewMessage('');

                                // input.current.focus()
                            }}
                            onPressIn={() => setInputIsActive(true)}
                            value={newMessage}
                            // ref={input}
                            placeholder="Write Your Message!"
                            style={[style.text_input, inputIsActive ? { width: '90%' } : { width: '66%' }]}
                            editable={true}
                            blurOnSubmit={false}
                            onEndEditing={() => setInputIsActive(false)}
                        />

                        <View style={style.icons}>
                            <Icon
                                name={inputIsActive ? 'chevron-left' : 'chevron-right'}
                                size={20}
                                color='white'
                                onPress={() => setInputIsActive(!inputIsActive)}
                            />
                        </View>

                    </View>

                </View>

            </View>
        </>
    );
};

function ChatMessage({ userNick, navigation, item }: any) {
    const messageNick = item.nick;
    const message = item.message;
    const isImage = item.isImage;

    if (isImage) {
        const image = item.image;
        return (
            <Pressable
                onLongPress={() => navigation.navigate('ImageShower', { image })}
            >
                <View style={[style.message, style.left]}>
                    <View>
                        <Text style={style.name}>{messageNick}</Text>
                    </View>

                    <Text style={style.messageStyle}>Hold Here To See Image!</Text>
                </View>
            </Pressable>
        )
    }

    if (messageNick === userNick) {
        return (
            <Pressable
                onLongPress={() => navigation.navigate('UserInfo', { messageNick })}
            >
                <View style={[style.message, style.right]}>
                    <View>
                        <Text style={style.name}>{messageNick}</Text>
                    </View>

                    <Text style={style.messageStyle}>{message}</Text>
                </View>
            </Pressable>
        )
    }
    else {
        return (
            <Pressable onLongPress={() => navigation.navigate('UserInfo', { messageNick })}>
                <View style={[style.message, style.left]}>
                    <View>
                        <Text style={style.name}>{messageNick}</Text>
                    </View>

                    <Text style={style.messageStyle}>{message}</Text>
                </View>

            </Pressable>
        )
    }
}

function sendNewMessage(socket: { emit: (arg0: any, arg1: string) => void; }, room: any, nick: any, message: string) {
    socket.emit(room,
        JSON.stringify({
            nick,
            message,
            isImage: false
        })
    );
}

const mapStateToProps = (state: { user: any; }) => ({
    store: state.user
});

export default connect(
    mapStateToProps,
)(Room);

