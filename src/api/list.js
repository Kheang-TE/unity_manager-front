import axios from './axios';

export async function createList(listData) {
  try {
    const response = await axios.post('/lists', {
      name: listData.name,
      position: listData.position,
      code_color: '#267699',
      project_id: listData.project_id,
    });
    console.log('new List : ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteList(listId) {
  try {
    await axios.delete(`/lists/${listId}`);
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateList(listId, listData) {
  try {
    const response = await axios.patch(`/lists/${listId}`, {
      name: listData.name,
      position: listData.position,
      code_color: '#267699',
      project_id: listData.project_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
