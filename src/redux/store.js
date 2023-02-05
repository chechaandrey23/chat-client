import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import chatsReduser from './chats.js';

import saga from "./saga/saga.js";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		chats: chatsReduser
	},
	middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;
