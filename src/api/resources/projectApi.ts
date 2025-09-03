import AxiosInstance from '../axios';
import type { Project } from '../models/Project';

export const getProjects = async () => {
  return AxiosInstance.get('/projects')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching projects:', error);
      return [];
    });
};

export const getProjectById = async (id: string) => {
  return AxiosInstance.get(`/projects/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching project by ID:', error);
      return null;
    });
};

export const createProject = async (projectData: Omit<Project, 'id'>) => {
  return AxiosInstance.post('/projects', projectData)
    .then((response) => response.data)
    .catch(() => {
      console.error('Error creating project');
      return null;
    });
};

export const updateProject = async (
  id: string,
  projectData: Partial<Project>
) => {
  return AxiosInstance.patch(`/projects/${id}`, projectData)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error updating project:', error);
      return null;
    });
};
