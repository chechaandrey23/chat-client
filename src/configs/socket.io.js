import io from 'socket.io-client';

//export const socket = io.connect('http://localhost:3300');
export const socket = io.connect(window.location.href);
