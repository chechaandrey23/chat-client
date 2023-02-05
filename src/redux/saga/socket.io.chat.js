import {take, call, put, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {socket} from '../../configs/socket.io.js';

import {createSagas, createActions} from './helpers/helper.saga.js';

import {pushAddMessage, addMessage, pushCreateUsername, createUsername, pushUpdateUsername, updateUsername,
		pushUpdateMessageUsername, updateMessageUsername, pushAddUser, addUser, pushLeaveUser, leaveUser} from "../chats.js";

// add message
function createAddMessageChannel() {
  const subscribe = emitter => {
	socket.on('add-message', emitter);
  	return () => {
			socket.off('add-message', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushAddMessageSaga() {
	const channel = yield call(createAddMessageChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushAddMessage(response));
	}
}

function* socketAddMessageSaga({payload}) {
	yield call(() => {socket.emit('add-message', payload);});
	yield put(addMessage(payload));
}

// create username
function createCreateUsernameChannel() {
  const subscribe = emitter => {
	socket.on('create-user', emitter);
  	return () => {
			socket.off('create-user', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushCreateUsernameSaga() {
	const channel = yield call(createCreateUsernameChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushCreateUsername(response));
	}
}

function* socketCreateUsernameSaga({payload}) {
	yield call(() => {socket.emit('create-user', payload);});
	yield put(createUsername(payload));
}

// update username
function createUpdateUsernameChannel() {
  const subscribe = emitter => {
	socket.on('update-username', emitter);
  	return () => {
			socket.off('update-username', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushUpdateUsernameSaga() {
	const channel = yield call(createUpdateUsernameChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushUpdateUsername(response));
	}
}

function* socketUpdateUsernameSaga({payload}) {
	yield call(() => {socket.emit('update-username', payload);});
	yield put(updateUsername(payload));
}

// update message username
function createUpdateMessageUsernameChannel() {
  const subscribe = emitter => {
	socket.on('update-message-username', emitter);
  	return () => {
			socket.off('update-message-username', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushUpdateMessageUsernameSaga() {
	const channel = yield call(createUpdateMessageUsernameChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushUpdateMessageUsername(response));
	}
}

// add-user
function createAddUserChannel() {
  const subscribe = emitter => {
	socket.on('add-user', emitter);
  	return () => {
			socket.off('add-user', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushAddUserSaga() {
	const channel = yield call(createAddUserChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushAddUser(response));
	}
}

// leave-user
function createLeaveUserChannel() {
  const subscribe = emitter => {
	socket.on('leave-user', emitter);
  	return () => {
			socket.off('leave-user', emitter);
		}
	};
	return eventChannel(subscribe);
}

function* socketPushLeaveUserSaga() {
	const channel = yield call(createLeaveUserChannel);

	while (true) {
		const response = yield take(channel);

		yield put(pushLeaveUser(response));
	}
}

const SOCKET_ADD_MESSAGE = 'SOCKET_ADD_MESSAGE';
const SOCKET_CREATE_USER = 'SOCKET_CREATE_USER';
const SOCKET_UPDATE_USERNAME = 'SOCKET_UPDATE_USERNAME';
const SOCKET_UPDATE_MESSAGE_USERNAME = 'SOCKET_UPDATE_MESSAGE_USERNAME';
const SOCKET_ADD_USER = 'SOCKET_ADD_USER';
const SOCKET_LEAVE_USER = 'SOCKET_LEAVE_USER';

export const chatSagas = createSagas([
	socketPushAddMessageSaga,
	socketPushCreateUsernameSaga,
	socketPushUpdateUsernameSaga,
	socketPushUpdateMessageUsernameSaga,
  socketPushAddUserSaga,
  socketPushLeaveUserSaga,
	[SOCKET_ADD_MESSAGE, socketAddMessageSaga],
	[SOCKET_CREATE_USER, socketCreateUsernameSaga],
	[SOCKET_UPDATE_USERNAME, socketUpdateUsernameSaga],
]);

export const {sagaAddMessage, sagaCreateUsername, sagaUpdateUsername} = createActions({
	sagaAddMessage: SOCKET_ADD_MESSAGE,
	sagaCreateUsername: SOCKET_CREATE_USER,
	sagaUpdateUsername: SOCKET_UPDATE_USERNAME,
});
