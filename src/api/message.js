import { sendMessage } from '@/sockets/socket.js';
import axios from './axios';

export async function postMessage(messageData) {
  try {
    const { project_id, content } = messageData;
    const message = await axios.post('/messages/', {
      project_id,
      content,
    });
    if (message) {
      sendMessage(content);
    }
    return message.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMessagesbyProject(projectId) {
  try {
    const messages = await axios.get(`/messages/projects/${projectId}`);
    return messages.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
