import { createSlice } from '@reduxjs/toolkit'

export const changeChats = createSlice({
	name: 'chats',
	initialState: {
		subscribeFetch: false,
		stopingFetch: false,
		startingFetch: false,

		error: null,

		addingMessage: [],
		errorAddMessage: false,
		creatingUsername: false,
		errorCreateUsername: false,
		updatingUsername: false,
		errorUpdatingUsername: false,
		updatingMessageUsername: [],
		errorUpdateMessageUsername: false,

		addingUser: [],
		errorAddUser: false,
		leavingUser: [],
		errorLeaveUser: false,

		dataArray: [],
		//dataObjectUsername: {},
		username: null,
		users: [],
	},
	reducers: {
		pushConnect(state, action) {

		},
		pushDisConnect(state, action) {

		},
		pushStartFetch(state, action) {
			if(action.payload && action.payload.error) {
				if(action.payload.value) {
					state.error = action.payload;
				}
				state.error = 'pushStartFetch Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.subscribeFetch = true;
				state.startingFetch = false;
				//state.dataArray = action.payload.value;
				//state.dataObjectUsername = action.payload.value.reduce((acc, item) => {
	    	//		return {...acc, [item.username]: item};
				//}, {});
			}
		},
		pushStopFetch(state, action) {
			if(action.payload && action.payload.error) {
				state.error = 'pushStopFetch Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.stopingFetch = false;
				state.subscribeFetch = false;
			}

		},
		startFetch(state, action) {
			state.startingFetch = true;
		},
		stopFetch(state, action) {
			state.stopingFetch = true;
		},

		pushAddMessage(state, action) {
			state.addingMessage = state.addingMessage.filter((entry) => {
				return entry.username == state.username && entry.message == action.payload;
			});// remove
			if(action.payload && action.payload.error) {
				state.errorAddMessage = action.payload;
				state.error = 'pushAddMessage Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.dataArray = [...state.dataArray, action.payload.value];
				//state.dataObjectUsername = {...state.dataObjectUsername, [action.payload.value.username]: action.payload.value};
			}
		},
		addMessage(state, action) {
			state.addingMessage = [...state.addingMessage, {username: state.username, message: action.payload}];
			state.errorAddMessage = false;
		},
		setErrorAddMessage(state, action) {
			state.errorAddMessage = action.payload;
		},

		pushCreateUsername(state, action) {
			state.creatingUsername = false;
			if(action.payload && action.payload.error) {
				state.errorCreateUsername = action.payload;
				state.error = 'pushCreateUsername Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.username = action.payload.value;
			}
		},
		createUsername(state, action) {
			state.creatingUsername = action.payload;
			state.errorCreateUsername = false;
		},
		setErrorCreateUsername(state, action) {
			state.errorCreateUsername = action.payload;
		},

		pushUpdateUsername(state, action) {
			state.updatingUsername = false;
			if(action.payload && action.payload.error) {
				state.errorUpdateUsername = action.payload;
				state.error = 'pushUpdateUsername Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.username = action.payload.value;
			}
		},
		updateUsername(state, action) {
			state.updatingUsername = action.payload;
			state.errorUpdateUsername = false;
		},
		setErrorUpdateUsername(state, action) {
			state.errorUpdateUsername = action.payload;
		},

		pushUpdateMessageUsername(state, action) {
			state.updatingMessageUsername = state.updatingMessageUsername.filter((entry) => {
				return entry.username == action.payload.value;
			});// remove
			if(action.payload && action.payload.error) {
				state.errorUpdateMessageUsername = action.payload;
				state.error = 'pushUpdateMessageUsername Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.dataArray = state.dataArray.map((item) => {
					if(item.username == action.payload.oldUsername) {
						return {...item, username: action.payload.value}// {id: item.id, username: action.payload.value, message: item.message, date: item.date}
					} else {
						return {...item};
					}
				});
				//state.dataObjectUsername = state.dataArray.reduce((acc, item) => {
    		//		let data;
    		//		if(item.username == action.payload.oldUsername) {
    		//			data = {[action.payload.value.username]: {id: item.id, username: action.payload.value.username, message: item.message}};
    		//		} else {
    		//			data = {[item.username]: item};
    		//		}
    		//		return {...acc, ...data};
				//}, {});
			}
		},
		updateMessageUsername(state, action) {
			state.updatingMessageUsername = [...state.updatingMessageUsername, action.payload];
			state.errorUpdateMessageUsername = false;
		},
		setErrorUpdateMessageUsername(state, action) {
			state.errorUpdateMessageUsername = action.payload;
		},

		pushAddUser(state, action) {
			state.addingUser = state.addingUser.filter((entry) => {
				return entry == action.payload.value;
			});// remove
			if(action.payload && action.payload.error) {
				state.errorAddUser = action.payload;
				state.error = 'pushAddUser Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.users = [...state.users, action.payload.value];
				//state.addUser = action.payload.value;
				state.dataArray = [...state.dataArray, {type: 'enter', username: action.payload.value}];
			}
		},
		addUser(state, action) {
			state.addingUser = [...state.addingUser, action.payload];
			state.errorAddUser = false;
		},
		setErrorAddUser(state, action) {
			state.errorAddUser = action.payload;
		},

		pushLeaveUser(state, action) {
			state.leavingUser = state.leavingUser.filter((entry) => {
				return entry == action.payload.value;
			});// remove
			if(action.payload && action.payload.error) {
				state.errorLeaveUser = action.payload;
				state.error = 'pushLeaveUser Error ('+Date.now()+')';
				console.error(state.error);
			} else {
				state.users = state.users.filter((user) => {
					return user = action.payload.value;
				});
				//state.leaveUser = action.payload.value;
				state.dataArray = [...state.dataArray, {type: 'leave', username: action.payload.value}];
			}
		},
		leaveUser(state, action) {
			state.leavingUser = [...state.leavingUser, action.payload];
			state.errorLeaveUser = false;
		},
		setErrorLeaveUser(state, action) {
			state.errorLeaveUser = action.payload;
		},
	}
});

export const {
	pushConnect, pushDisConnect,
	pushStartFetch, pushStopFetch, startFetch, stopFetch,
	pushAddMessage, addMessage, setErrorAddMessage,
	pushCreateUsername, createUsername, setErrorCreateUsername,
	pushUpdateUsername, updateUsername, setErrorUpdateUsername,
	pushUpdateMessageUsername, updateMessageUsername, setErrorUpdateMessageUsername,
	pushAddUser, addUser, setErrorAddUser,
	pushLeaveUser, leaveUser, setErrorLeaveUser,
} = changeChats.actions;

export default changeChats.reducer;
