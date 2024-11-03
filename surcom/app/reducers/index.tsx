import { STORAGES } from "../screens/utils/const";
import { setStorage } from "../screens/utils/storage";

const initialState = {
    isSignout: true,
    nick: '',
    role: 'user',
    rooms: []
}

const ACTION_TYPES = {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    ADD_ROOM: 'ADD_ROOM',
    UPDATE_ROOMS_ON_LOAD: 'UPDATE_ROOMS_ON_LOAD',
    UPDATE_ROLE: 'UPDATE_ROLE',
    DELETE_ROOM: 'DELETE_ROOM',
}

export default function reducer(state = initialState, action: { type: any; nick: any; room: any; rooms: any; role: any; }) {
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
            
        case ACTION_TYPES.ADD_ROOM:
            setStorage(STORAGES['rooms'], JSON.stringify([...state.rooms, action.room]));

            return {
                ...state,
                rooms: [...state.rooms, action.room]
            };

        case ACTION_TYPES.DELETE_ROOM:
            const new_rooms = [...state.rooms].filter(room => room !== action.room)
            setStorage(STORAGES['rooms'], JSON.stringify(new_rooms));

            return {
                ...state,
                rooms: new_rooms
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

export const signIn = (nick: any) => ({
    type: ACTION_TYPES.SIGN_IN,
    nick
});

export const signOut = () => ({
    type: ACTION_TYPES.SIGN_OUT
});

export const addRoom = (room: any) => ({
    type: ACTION_TYPES.ADD_ROOM,
    room
});

export const deleteRoom = (room: any) => ({
    type: ACTION_TYPES.DELETE_ROOM,
    room
});

export const updateRoomsOnLoad = (rooms: any) => ({
    type: ACTION_TYPES.UPDATE_ROOMS_ON_LOAD,
    rooms
});

export const updateRoles = (role: any) => ({
    type: ACTION_TYPES.UPDATE_ROLE,
    role
});