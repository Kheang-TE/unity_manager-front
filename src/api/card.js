import axios from './axios';
import { emitBoardEdition } from '@/sockets/socket.js';

export async function createCard(cardData) {
  try {
    const card = await axios.post('/cards', {
      name: cardData.name,
      position: cardData.position,
      content: cardData.content,
      list_id: cardData.list_id,
      tags: cardData.tags,
    });
    if (card) {
      emitBoardEdition();
    }
    return card.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteCard(cardId) {
  try {
    const deletedCard = await axios.delete(`/cards/${cardId}`);
    if (deletedCard) {
      emitBoardEdition();
    }
    return deletedCard.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateCard(cardData) {
  try {
    const card = await axios.patch(`/cards/${cardData.id}`, {
      name: cardData.name,
      position: cardData.position,
      content: cardData.content,
      list_id: cardData.list_id,
      tags: cardData.tags,
    });

    if (card) {
      emitBoardEdition();
    }
    return card.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
