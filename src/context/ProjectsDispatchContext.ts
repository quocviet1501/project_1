import { createContext } from 'react';
import { Action } from '../types/types';

export const ProjectsDispatchContext = createContext<React.Dispatch<Action>>(() => {});
