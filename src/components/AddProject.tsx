import { useContext, useState } from 'react';
import { ProjectsDispatchContext } from '../context/ProjectsDispatchContext';

export default function AddProject() {
  const dispatch = useContext(ProjectsDispatchContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      dispatch({
        type: 'ADD_PROJECT',
        payload: { name, description },
      });
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 max-w-md">
      <h2 className="text-lg font-semibold mb-2">Thêm Dự án mới</h2>
      <p>
      <input
        className="border rounded p-2 w-full mb-2"
        placeholder="Tên dự án"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </p>
      <p>
      <textarea
        className="border rounded p-2 w-full mb-2"
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </p>
      <p>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Thêm
      </button>
      </p>
      
    </div>
  );
}
