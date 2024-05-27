import axios from './axios';

export async function createCard(cardData) {
  try {
    const response = await axios.post('/cards', {
      name: cardData.name,
      content: cardData.content,
      position: cardData.position,
      list_id: cardData.list_id,
    });
    console.log('new Card : ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteCard(cardId) {
  try {
    await axios.delete(`/cards/${cardId}`);
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateCard(cardData) {
  try {
    const response = await axios.patch(`/cards/${cardData.id}`, {
      name: cardData.name,
      position: cardData.position,
      content: cardData.content,
      list_id: cardData.list_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
