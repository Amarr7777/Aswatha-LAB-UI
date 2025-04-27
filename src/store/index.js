import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga'; 
import { appSlice } from './app';

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware({
        onError(error) {
            console.error('Saga error:', error);
        },
    });

    const store = configureStore({
        reducer: {
            app: appSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), 
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export const store = makeStore();