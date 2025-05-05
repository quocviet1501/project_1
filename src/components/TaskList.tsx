import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsDispatchContext';
import { Project } from '../types/types';
import TaskItem from './TaskItem';

interface Props {
  project: Project;
}

export default function TaskList({ project }: Props) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: { projectId: project.id, taskName },
      });
      setTaskName('');
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-2">
        <p><input
          className="border p-2 rounded w-full"
          placeholder="Tên nhiệm vụ"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        /></p>
        <p><button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button></p>
        
        
      </div>

      {project.tasks.length === 0 ? (
        <p className="text-sm text-gray-400">Chưa có nhiệm vụ nào.</p>
      ) : (
        <ul className="space-y-2">
          {project.tasks.map((task) => (
            <TaskItem key={task.id} task={task} projectId={project.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
