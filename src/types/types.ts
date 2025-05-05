export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export type ProjectsState = Project[];

export type Action =
  | { type: 'ADD_PROJECT'; payload: { name: string; description: string } }
  | { type: 'EDIT_PROJECT'; payload: { id: string; newName: string; newDescription: string } }
  | { type: 'DELETE_PROJECT'; payload: { id: string } }
  | { type: 'ADD_TASK'; payload: { projectId: string; taskName: string } }
  | { type: 'EDIT_TASK'; payload: { projectId: string; taskId: string; newTaskName: string } }
  | { type: 'TOGGLE_TASK'; payload: { projectId: string; taskId: string } }
  | { type: 'DELETE_TASK'; payload: { projectId: string; taskId: string } }
  | {
      type: 'MOVE_TASK_BETWEEN_PROJECTS';
      payload: { fromProjectId: string; toProjectId: string; taskId: string };
    };
