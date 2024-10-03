/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';

import App from './App';

import configureStore from './reducers/configure-store';

const store = configureStore()

export default function Index() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}