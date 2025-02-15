// src/sockets/socket.js
import io from 'socket.io-client';

// Utilisez l'URL de votre domaine principal
const socket = io('https://unitymanager.mohamedzerrouki.com', {
  path: '/socket.io', // Chemin correct pour les WebSockets
  transports: ['websocket', 'polling']
});

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
  } catch (error) { console.error(error); }
};

const leaveProjectRoom = (projectId) => {
  socket.emit('leaveProject', projectId);
};

const emitNewCollaborator = () => {
  try {
    socket.emit('newCollaborator');
  } catch (error) { console.error(error); }
};
function initializeCollaboratorReceived(onCollaboratorReceived) {
  socket.on('refreshCollaborators', () => {
    if (onCollaboratorReceived) {
      onCollaboratorReceived();
    }
  });
}
// --------------------board-------------------------
const emitBoardEdition = () => {
  try {
    socket.emit('boardEvent');
  } catch (error) { console.error(error); }
};

function initializeBoardEvents(refreshBoard) {
  socket.on('refreshBoard', () => {
    if (refreshBoard) {
      refreshBoard();
    }
  });
}
// ---------------messages----------------------------
const emitMessageCreation = () => {
  try {
    socket.emit('messageCreation');
  } catch (error) { console.error(error); }
};
function initializeMessageReceived(onMessageReceived) {
  socket.on('receiveMessage', (message) => {
    if (onMessageReceived) {
      onMessageReceived(message);
    }
  });
}

export {
  emitNewCollaborator,
  emitBoardEdition,
  emitMessageCreation,
  initializeBoardEvents,
  initializeCollaboratorReceived,
  initializeMessageReceived,
  connecting,
  joinProjectRoom,
  leaveProjectRoom,
  socket,
};
