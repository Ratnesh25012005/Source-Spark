import { useMemo, useState } from 'react';
import { FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';

const techOptions = ['React', 'Vue', 'Next.js', 'Express', 'Node.js', 'TypeScript', 'Python', 'Go', 'Rust', 'Docker'];
const languageOptions = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Ruby', 'C', 'C++'];
const competitionOptions = ['Very High', 'High', 'Moderate', 'Low', 'Very Low'];
const activityOptions = ['Highest', 'High', 'Moderate', 'Low'];

const repoBlueprints = [
  {
    slug: 'react-taskboard-lite',
    description: 'Kanban-style task board UI with drag-drop and keyboard accessibility fixes.',
    language: ['TypeScript'],
    techStack: ['React', 'TypeScript', 'Node.js'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 780,
    baseForks: 110,
  },
  {
    slug: 'express-auth-starter',
    description: 'Starter API for auth flows, refresh tokens, and audit logs.',
    language: ['JavaScript'],
    techStack: ['Express', 'Node.js', 'Docker'],
    activityLevel: 'Moderate',
    competitionLevel: 'Low',
    baseStars: 490,
    baseForks: 80,
  },
  {
    slug: 'next-commerce-hooks',
    description: 'Composable storefront hooks and SSR-safe utilities for checkout flows.',
    language: ['TypeScript'],
    techStack: ['Next.js', 'React', 'TypeScript'],
    activityLevel: 'Highest',
    competitionLevel: 'High',
    baseStars: 1200,
    baseForks: 180,
  },
  {
    slug: 'python-cli-toolkit',
    description: 'Command-line automation toolkit with plugin architecture and tests.',
    language: ['Python'],
    techStack: ['Python', 'Docker'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 660,
    baseForks: 90,
  },
  {
    slug: 'go-observability-kit',
    description: 'Instrumentation helpers for metrics, traces, and structured logs in Go services.',
    language: ['Go'],
    techStack: ['Go', 'Docker'],
    activityLevel: 'Moderate',
    competitionLevel: 'Low',
    baseStars: 900,
    baseForks: 108,
  },
  {
    slug: 'rust-fast-cache',
    description: 'In-memory cache primitives optimized for low-latency web workloads.',
    language: ['Rust'],
    techStack: ['Rust'],
    activityLevel: 'High',
    competitionLevel: 'High',
    baseStars: 1040,
    baseForks: 150,
  },
  {
    slug: 'vue-design-system-seed',
    description: 'Accessible component primitives and token-based theming for Vue apps.',
    language: ['TypeScript'],
    techStack: ['Vue', 'TypeScript'],
    activityLevel: 'Low',
    competitionLevel: 'Very Low',
    baseStars: 420,
    baseForks: 60,
  },
  {
    slug: 'docker-dev-environments',
    description: 'Collection of container setups for common full-stack environments.',
    language: ['Ruby'],
    techStack: ['Docker', 'Node.js'],
    activityLevel: 'Low',
    competitionLevel: 'Very Low',
    baseStars: 350,
    baseForks: 42,
  },
  {
    slug: 'react-data-grid-pro',
    description: 'Virtualized data grid with pinned columns and advanced filtering.',
    language: ['JavaScript'],
    techStack: ['React', 'Node.js'],
    activityLevel: 'Highest',
    competitionLevel: 'Very High',
    baseStars: 1500,
    baseForks: 250,
  },
  {
    slug: 'typescript-api-contracts',
    description: 'Shared API schemas and client generation for strongly-typed integrations.',
    language: ['TypeScript'],
    techStack: ['TypeScript', 'Express', 'Node.js'],
    activityLevel: 'Moderate',
    competitionLevel: 'Moderate',
    baseStars: 930,
    baseForks: 128,
  },
  {
    slug: 'next-mdx-blog-engine',
    description: 'MDX-powered publishing engine with image optimization and search.',
    language: ['TypeScript'],
    techStack: ['Next.js', 'React', 'TypeScript'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 700,
    baseForks: 84,
  },
  {
    slug: 'go-api-gateway-core',
    description: 'Lightweight API gateway primitives with auth, rate limits, and retries.',
    language: ['Go'],
    techStack: ['Go', 'Docker', 'Express'],
    activityLevel: 'High',
    competitionLevel: 'High',
    baseStars: 1160,
    baseForks: 188,
  },
  {
    slug: 'python-data-pipeline-kit',
    description: 'Reusable ETL building blocks for data ingestion and transformation tasks.',
    language: ['Python'],
    techStack: ['Python', 'Docker', 'TypeScript'],
    activityLevel: 'Moderate',
    competitionLevel: 'Low',
    baseStars: 610,
    baseForks: 95,
  },
  {
    slug: 'vue-dashboard-widgets',
    description: 'Configurable analytics widgets and charts for enterprise admin portals.',
    language: ['JavaScript'],
    techStack: ['Vue', 'Node.js'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 560,
    baseForks: 72,
  },
  {
    slug: 'react-form-builder-x',
    description: 'Schema-driven form builder with validation, async fields, and presets.',
    language: ['TypeScript'],
    techStack: ['React', 'TypeScript'],
    activityLevel: 'High',
    competitionLevel: 'High',
    baseStars: 980,
    baseForks: 140,
  },
  {
    slug: 'docker-security-scanner',
    description: 'Automated container vulnerability checks with CI-friendly reporting.',
    language: ['Go'],
    techStack: ['Docker', 'Go'],
    activityLevel: 'Moderate',
    competitionLevel: 'Low',
    baseStars: 820,
    baseForks: 105,
  },
  {
    slug: 'rust-web-helpers',
    description: 'Utilities for auth, routing, and request parsing in Rust web services.',
    language: ['Rust'],
    techStack: ['Rust', 'Docker'],
    activityLevel: 'Moderate',
    competitionLevel: 'Moderate',
    baseStars: 770,
    baseForks: 99,
  },
  {
    slug: 'node-queue-worker',
    description: 'Background worker patterns with retries, backoff, and failure handling.',
    language: ['JavaScript'],
    techStack: ['Node.js', 'Express'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 670,
    baseForks: 92,
  },
  {
    slug: 'next-edge-content-kit',
    description: 'Edge-rendered content toolkit focused on latency and SEO optimizations.',
    language: ['TypeScript'],
    techStack: ['Next.js', 'React'],
    activityLevel: 'Highest',
    competitionLevel: 'Very High',
    baseStars: 1380,
    baseForks: 210,
  },
  {
    slug: 'typescript-monorepo-tools',
    description: 'Monorepo scripts for shared packages, versioning, and release orchestration.',
    language: ['TypeScript'],
    techStack: ['TypeScript', 'Node.js', 'Docker'],
    activityLevel: 'High',
    competitionLevel: 'Moderate',
    baseStars: 890,
    baseForks: 122,
  },
];

const fakeProjects = Array.from({ length: 100 }, (_, index) => {
  const blueprint = repoBlueprints[index % repoBlueprints.length];
  const batch = Math.floor(index / repoBlueprints.length) + 1;

  return {
    _id: `p-${index + 1}`,
    name: `${blueprint.slug}-${String(batch).padStart(2, '0')}`,
    description: `${blueprint.description} Mock repository ${index + 1}.`,
    repoUrl: `https://github.com/example/${blueprint.slug}-${String(batch).padStart(2, '0')}`,
    language: [...blueprint.language],
    techStack: [...blueprint.techStack],
    stars: blueprint.baseStars + index * 17,
    forks: blueprint.baseForks + index * 3,
    activityLevel: blueprint.activityLevel,
    competitionLevel: blueprint.competitionLevel,
  };
});

function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [activityLevel, setActivityLevel] = useState('');
  const [competitionLevel, setCompetitionLevel] = useState('');

  const projects = useMemo(() => {
    const text = search.trim().toLowerCase();

    return fakeProjects.filter((project) => {
      const matchesSearch = !text
        || [project.name, project.description, project.language.join(' '), project.techStack.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(text);

      const matchesTech = selectedTech.length === 0
        || selectedTech.some((item) => project.techStack.includes(item));

      const matchesLanguage = selectedLanguages.length === 0
        || selectedLanguages.some((item) => project.language.includes(item));

      const matchesActivity = !activityLevel || project.activityLevel === activityLevel;
      const matchesCompetition = !competitionLevel || project.competitionLevel === competitionLevel;

      return matchesSearch && matchesTech && matchesLanguage && matchesActivity && matchesCompetition;
    });
  }, [activityLevel, competitionLevel, search, selectedLanguages, selectedTech]);

  const toggleItem = (value, setter, values) => {
    if (values.includes(value)) {
      setter(values.filter((item) => item !== value));
    } else {
      setter([...values, value]);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedTech([]);
    setSelectedLanguages([]);
    setActivityLevel('');
    setCompetitionLevel('');
  };

  return (
    <div className="projects-layout">
      <aside className="filters-panel glass-card">
        <div className="panel-heading">
          <FiFilter />
          <h3>Filters</h3>
        </div>
        <label className="search-field">
          <FiSearch />
          <input
            type="search"
            value={search}
            placeholder="Search projects"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>

        <div className="filter-group">
          <h4>Tech Stack</h4>
          <div className="checkbox-grid">
            {techOptions.map((item) => (
              <label key={item} className="check-pill">
                <input
                  type="checkbox"
                  checked={selectedTech.includes(item)}
                  onChange={() => toggleItem(item, setSelectedTech, selectedTech)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>Language</h4>
          <div className="checkbox-grid">
            {languageOptions.map((item) => (
              <label key={item} className="check-pill">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(item)}
                  onChange={() => toggleItem(item, setSelectedLanguages, selectedLanguages)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>Competition Level</h4>
          <div className="radio-stack">
            {competitionOptions.map((item) => (
              <label key={item}>
                <input type="radio" name="competition" checked={competitionLevel === item} onChange={() => { setCompetitionLevel(item); }} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>Activity Level</h4>
          <div className="radio-stack">
            {activityOptions.map((item) => (
              <label key={item}>
                <input type="radio" name="activity" checked={activityLevel === item} onChange={() => { setActivityLevel(item); }} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="secondary-btn full-width" type="button" onClick={resetFilters}>
          <FiRefreshCw /> Reset filters
        </button>
      </aside>

      <div className="projects-content">
        <div className="section-heading compact">
          <p>OSS Projects</p>
          <h2>Curated repos with instant filtering</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {projects.length === 0 ? <div className="empty-state">No projects match your filters.</div> : null}
      </div>
    </div>
  );
}

export default ProjectsPage;
