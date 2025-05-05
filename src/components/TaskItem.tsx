import { useContext, useState } from 'react';
import { Task } from '../types/types';
import { ProjectsDispatchContext } from '../context/ProjectsDispatchContext';

interface Props {
  task: Task;
  projectId: string;
}

export default function TaskItem({ task, projectId }: Props) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);

  const toggleCompleted = () => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: { projectId, taskId: task.id },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { projectId, taskId: task.id },
    });
  };

  const handleSave = () => {
    if (name.trim()) {
      dispatch({
        type: 'EDIT_TASK',
        payload: { projectId, taskId: task.id, newTaskName: name },
      });
      setEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between bg-white p-2 rounded shadow-sm">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompleted}
          className="w-4 h-4"
        />
        {editing ? (
          <input
            className="border p-1 rounded w-48 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.name}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="text-sm px-2 py-1 bg-green-500 text-white rounded"
            >
              Lưu
            </button> &nbsp;
            <button
              onClick={() => setEditing(false)}
              className="text-sm px-2 py-1 bg-gray-300 rounded"
            >
              Hủy
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="text-sm px-2 py-1 bg-yellow-400 rounded"
            >
              Sửa
            </button> &nbsp;
            <button
              onClick={handleDelete}
              className="text-sm px-2 py-1 bg-red-500 text-white rounded"
            >
              Xóa
            </button>
          </>
        )}
      </div>
    </li>
  );
}
