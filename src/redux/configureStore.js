import { createStore } from 'redux'; //create the Redux store
import { Reducer, initialState } from './reducer'; // needed to configure store

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState,
    );

    return store;
}