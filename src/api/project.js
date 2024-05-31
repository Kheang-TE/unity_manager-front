import { joinProjectRoom, emitBoardEdition } from '@/sockets/socket';
import axios from './axios';

export async function getProject(projectId) {
  try {
    const project = await axios.get(`/projects/${projectId}/details`);
    const projectInfo = { id: project.data.id, name: project.data.name };
    if (project) {
      joinProjectRoom(projectInfo);
    }
    return project.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProjects() {
  try {
    const response = await axios.get('/projects/user');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createProject(projectData) {
  try {
    const project = await axios.post('/projects', projectData);
    return project.data;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
}

export async function updateProject(projectData) {
  try {
    const project = await axios.patch(`/projects/${projectData.id}`, {
      name: projectData.name,
    });
    if (project) {
      emitBoardEdition();
    }
    return project.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function removeProject(projectId) {
  try {
    const project = await axios.delete(`/projects/${projectId}`);
    if (project) {
      emitBoardEdition();
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}
