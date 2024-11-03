import React, { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { createStore, combineReducers } from 'redux';

import { SOCKET_URL } from '../screens/utils/const';

import reducer from './index';

const rootReducer = combineReducers({
  user: reducer
});

const configureStore = () => {
  return createStore(rootReducer); // ! UPDATE
}

export default configureStore;

interface ISocketContext {
  socket: Socket | null;
}
const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState(() => io(SOCKET_URL));

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext)?.socket;