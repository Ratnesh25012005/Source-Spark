import { FiExternalLink, FiGitBranch, FiStar } from 'react-icons/fi';

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__header">
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="link-chip">
          <FiExternalLink />
          View Repo
        </a>
      </div>

      <div className="badge-row">
        {project.language.map((item) => (
          <span key={item} className="badge badge--soft">
            {item}
          </span>
        ))}
      </div>

      <div className="project-meta">
        <span><FiStar /> {project.stars.toLocaleString()}</span>
        <span><FiGitBranch /> {project.forks.toLocaleString()}</span>
      </div>

      <div className="badge-row">
        <span className="badge">{project.activityLevel}</span>
        <span className="badge badge--violet">{project.competitionLevel}</span>
      </div>
    </article>
  );
}

export default ProjectCard;
