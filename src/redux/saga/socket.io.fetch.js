import {take, call, put, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {socket} from '../../configs/socket.io.js';

import {createSagas, createActions} from './helpers/helper.saga.js';

import {pushStartFetch, pushStopFetch, startFetch, stopFetch} from "../chats.js";

function createFetchChannel() {
	const subscribe = emitter => {
		socket.on('chat-start', emitter);
		return () => {
			socket.off('chat-start', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketFetchSaga() {
	const channel = yield call(createFetchChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushStartFetch(response));
	}
}

function createFetchStopChannel() {
	const subscribe = emitter => {
		socket.on('chat-stop', emitter);
		return () => {
			socket.off('chat-stop', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketFetchStopSaga() {
	const channel = yield call(createFetchStopChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushStopFetch(response));
	}
}

function* socketSubscribeFetchSaga() {
	yield call(() => {socket.emit('start');});
	yield put(startFetch());
}

function* socketUnSubscribeFetchSaga() {
	yield call(() => {socket.emit('stop');});
	yield put(stopFetch());
}

const SOCKET_SUBSCRIBE_FETCH = 'SOCKET_SUBSCRIBE_FETCH';
const SOCKET_UNSUBSCRIBE_FETCH = 'SOCKET_UNSUBSCRIBE_FETCH';

export const fetchSagas = createSagas([
	socketFetchSaga,
	socketFetchStopSaga,
	[SOCKET_SUBSCRIBE_FETCH, socketSubscribeFetchSaga],
	[SOCKET_UNSUBSCRIBE_FETCH, socketUnSubscribeFetchSaga]
]);

export const {sagaStartFetch, sagaStopFetch} = createActions({
	sagaStartFetch: SOCKET_SUBSCRIBE_FETCH,
	sagaStopFetch: SOCKET_UNSUBSCRIBE_FETCH
});
