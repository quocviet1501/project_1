import { useReducer } from 'react';
import { projectsReducer } from './reducers/projectsReducer';
import { ProjectsContext } from './context/ProjectsContext';
import { ProjectsDispatchContext } from './context/ProjectsDispatchContext';

import AddProject from './components/AddProject';
import ProjectList from './components/ProjectList';

function App() {
  const [projects, dispatch] = useReducer(projectsReducer, []);

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Quản lý Dự án & Nhiệm vụ</h1>
          <AddProject />
          <ProjectList />
        </div>
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}

export default App;
