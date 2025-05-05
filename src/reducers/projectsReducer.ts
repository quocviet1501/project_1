import { ProjectsState, Action } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export function projectsReducer(state: ProjectsState, action: Action): ProjectsState {
  switch (action.type) {
    case 'ADD_PROJECT': {
      const newProject = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        tasks: [],
      };
      return [...state, newProject];
    }

    case 'EDIT_PROJECT': {
      return state.map((project) =>
        project.id === action.payload.id
          ? { ...project, name: action.payload.newName, description: action.payload.newDescription }
          : project
      );
    }

    case 'DELETE_PROJECT': {
      return state.filter((project) => project.id !== action.payload.id);
    }

    case 'ADD_TASK': {
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              tasks: [
                ...project.tasks,
                { id: uuidv4(), name: action.payload.taskName, completed: false },
              ],
            }
          : project
      );
    }

    case 'EDIT_TASK': {
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === action.payload.taskId
                  ? { ...task, name: action.payload.newTaskName }
                  : task
              ),
            }
          : project
      );
    }

    case 'TOGGLE_TASK': {
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === action.payload.taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : project
      );
    }

    case 'DELETE_TASK': {
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== action.payload.taskId),
            }
          : project
      );
    }

    case 'MOVE_TASK_BETWEEN_PROJECTS': {
      const { fromProjectId, toProjectId, taskId } = action.payload;
      let taskToMove;

      const newState = state.map((project) => {
        if (project.id === fromProjectId) {
          const filteredTasks = project.tasks.filter((task) => {
            if (task.id === taskId) {
              taskToMove = task;
              return false;
            }
            return true;
          });
          return { ...project, tasks: filteredTasks };
        }
        return project;
      });

      if (!taskToMove) return state; // Nếu không tìm thấy task

      return newState.map((project) =>
        project.id === toProjectId
          ? { ...project, tasks: [...project.tasks, taskToMove!] }
          : project
      );
    }

    default:
      return state;
  }
}
