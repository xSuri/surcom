import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isSignout: true,
    nick: '',
    role: 'user',
    rooms: []
}

const ACTION_TYPES = {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    ADDING_ROOM: 'ADDING_ROOM',
    UPDATE_ROOMS_ON_LOAD: 'UPDATE_ROOMS_ON_LOAD',
    UPDATE_ROLE: 'UPDATE_ROLE'
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN:
            return {
                ...state,
                isSignout: false,
                nick: action.nick
            };
        case ACTION_TYPES.SIGN_OUT:
            return {
                ...state,
                isSignout: true,
            };
        case ACTION_TYPES.ADDING_ROOM:
            AsyncStorage.setItem('@rooms', JSON.stringify([...state.rooms, action.room]));

            return {
                ...state,
                rooms: [...state.rooms, action.room]
            };
        case ACTION_TYPES.UPDATE_ROOMS_ON_LOAD:
            return {
                ...state,
                rooms: [...state.rooms, ...action.rooms]
            };
        case ACTION_TYPES.UPDATE_ROLE:
            return {
                ...state,
                role: action.role
            };
        default:
            return state;
    }
}

export const signIn = nick => ({
    type: ACTION_TYPES.SIGN_IN,
    nick
});

export const signOut = () => ({
    type: ACTION_TYPES.SIGN_OUT
});

export const addingRoom = room => ({
    type: ACTION_TYPES.ADDING_ROOM,
    room
});

export const updateRoomsOnLoad = rooms => ({
    type: ACTION_TYPES.UPDATE_ROOMS_ON_LOAD,
    rooms
});

export const updateRoles = role => ({
    type: ACTION_TYPES.UPDATE_ROLE,
    role
});