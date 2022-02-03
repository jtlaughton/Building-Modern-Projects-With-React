import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { todos, isLoading } from './todos/reducers';

// Some Best Practices:

// 1) Make sure to export both the connected and unconnect versions of a component.
//    This helps with testing component rendering since you don't need to worry about
//    connectedness for that
// 2) Keep redux actions and async operations out of reducers
// 3) Think about what components actually need to be connected

const reducers = {
    todos,
    isLoading
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => 
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )