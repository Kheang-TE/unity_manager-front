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
    console.log(`Joined project room: ${projectData.id}`);
  } catch (error) { console.error(error); }
};

const leaveProjectRoom = (projectId) => {
  socket.emit('leaveProject', projectId);
  console.log(`Left project room: ${projectId}`);
};

const sendMessage = (projectId, message) => {
  socket.emit('sendMessage', { projectId, message });
};

socket.on('receiveMessage', (message) => {
  console.log('New message received:', message);
  // Potentiellement, gérer l'affichage du message dans l'UI ici
});

export {
  connecting, joinProjectRoom, leaveProjectRoom, sendMessage, socket,
};
