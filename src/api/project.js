import { joinProjectRoom } from '@/sockets/socket';
import axios from './axios';

export async function getProject(projectId) {
  try {
    const project = await axios.get(`/projects/${projectId}/details`);
    const projectInfo = { id: project.data.id, name: project.data.name };
    joinProjectRoom(projectInfo);
    return project.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProjects() {
  try {
    const response = await axios.get('/projects');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
