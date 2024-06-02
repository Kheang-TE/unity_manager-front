import axios from './axios';
import { emitBoardEdition } from '@/sockets/socket.js';

export async function createTag(tagData) {
  console.log(tagData);
  try {
    const tag = await axios.post('/tags', {
      name: tagData.name,
      code_color: tagData.code_color,
      project_id: tagData.project_id,
    });
    if (tag) {
      emitBoardEdition();
    }
    return tag.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTag(tagId) {
  try {
    const deletedTag = await axios.delete(`/tags/${tagId}`);
    if (deletedTag) {
      emitBoardEdition();
    }
    return deletedTag.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateTag(tagData) {
  try {
    const tag = await axios.patch(`/tags/${tagData.id}`, {
      name: tagData.name,
      code_color: tagData.content,
    });

    if (tag) {
      emitBoardEdition();
    }
    return tag.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
