import { createStore, combineReducers } from 'redux';

import reducer from './index';

const rootReducer = combineReducers({
    user: reducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;