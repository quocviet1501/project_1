import { createContext } from 'react';
import { ProjectsState } from '../types/types';

export const ProjectsContext = createContext<ProjectsState>([]);
