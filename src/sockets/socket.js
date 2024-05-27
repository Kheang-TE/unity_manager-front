// src/sockets/socket.js
import io from 'socket.io-client';

// Établir une connexion WebSocket. Assurez-vous que l'URL est correcte.
const socket = io('http://localhost:4000');

const connecting = (firstname) => {
  try {
    socket.emit('connecting', firstname);
  } catch (error) {
    console.error(error);
  }
};

const joinProjectRoom = (projectData) => {
  try {
    socket.emit('joinProject', projectData);
    socket.project = projectData.id;
    console.log(socket);
  } catch (error) { console.error(error); }
};

const leaveProjectRoom = (projectId) => {
  socket.emit('leaveProject', projectId);
  console.log(`Left project room: ${projectId}`);
};

const sendMessage = (message) => {
  console.log('sending message', message);
  try {
    socket.emit('sendMessage', { message });
  } catch (error) { console.error(error); }
};
function initializeOnMessageReceived(onMessageReceived) {
  socket.on('receiveMessage', (message) => {
    if (onMessageReceived) {
      onMessageReceived(message);
    }
  });
}
function initializeChatState(onChatStateReceived) {
  socket.on('chatState', (data) => {
    if (onChatStateReceived) {
      onChatStateReceived(data);
    }
  });
}
function initializeUserState(onUserStateReceived) {
  socket.on('userState', (userFromServer) => {
    if (onUserStateReceived) {
      onUserStateReceived(userFromServer);
    }
  });
}

export {
  sendMessage, initializeUserState, initializeChatState, initializeOnMessageReceived, connecting, joinProjectRoom, leaveProjectRoom, socket,
};
