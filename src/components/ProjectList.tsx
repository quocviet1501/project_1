import { useContext } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectItem from './ProjectItem';

export default function ProjectList() {
  const projects = useContext(ProjectsContext);

  if (projects.length === 0) {
    return <p className="text-gray-500">Chưa có dự án nào.</p>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
