import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsDispatchContext';
import { Project } from '../types/types';
import TaskList from './TaskList';

interface Props {
  project: Project;
}

export default function ProjectItem({ project }: Props) {
  const dispatch = useContext(ProjectsDispatchContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } });
  };

  const handleEdit = () => {
    if (name.trim()) {
      dispatch({
        type: 'EDIT_PROJECT',
        payload: { id: project.id, newName: name, newDescription: description },
      });
      setEditing(false);
    }
  };

  return (
    <div className="border rounded p-4 bg-gray-50">
      {editing ? (
        <div className="mb-2">
          <p>
          <input
            className="border p-2 rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </p>
          <p>
          <textarea
            className="border p-2 rounded w-full mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </p>
          
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
          >
            Lưu
          </button> &nbsp;
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Hủy
          </button>
        </div>
      ) : (
        <div className="mb-2">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <p className="text-gray-600">{project.description}</p>
        </div>
      )}

      {!editing && (
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Sửa
          </button> &nbsp;
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Xóa
          </button>
        </div>
      )}

      <TaskList project={project} />
    </div>
  );
}
