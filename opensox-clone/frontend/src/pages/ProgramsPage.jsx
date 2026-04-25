import { FiBookOpen, FiExternalLink, FiFlag, FiGlobe, FiLayers } from 'react-icons/fi';

const programs = [
  {
    title: 'GSoC',
    icon: FiGlobe,
    description: 'Google Summer of Code pairs new contributors with mentors during a paid summer program.',
    eligibility: 'Students and newer open source contributors',
    timeline: 'Applications usually open early in the year',
    link: 'https://summerofcode.withgoogle.com/',
  },
  {
    title: 'Outreachy',
    icon: FiFlag,
    description: 'Remote internships that support underrepresented groups in open source.',
    eligibility: 'Open to applicants from underrepresented communities',
    timeline: 'Two cohorts per year',
    link: 'https://www.outreachy.org/',
  },
  {
    title: 'LFX Mentorship',
    icon: FiLayers,
    description: 'Mentored open source projects from the Linux Foundation ecosystem.',
    eligibility: 'Contributors with matching technical background',
    timeline: 'Multiple rounds each year',
    link: 'https://lfx.linuxfoundation.org/tools/mentorship/',
  },
  {
    title: 'MLH Fellowship',
    icon: FiBookOpen,
    description: 'A remote, paid, open source fellowship experience for emerging developers.',
    eligibility: 'Students and early-career contributors',
    timeline: 'Seasonal application windows',
    link: 'https://fellowship.mlh.io/',
  },
  {
    title: 'Season of KDE',
    icon: FiGlobe,
    description: 'A community-driven program for contributing to KDE projects and tools.',
    eligibility: 'Anyone eager to contribute to KDE',
    timeline: 'Annual application cycle',
    link: 'https://season.kde.org/',
  },
];

function ProgramsPage() {
  return (
    <div className="program-grid">
      {programs.map((program) => {
        const Icon = program.icon;
        return (
          <article key={program.title} className="glass-card program-card">
            <Icon />
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <div className="program-meta">
              <span>{program.eligibility}</span>
              <span>{program.timeline}</span>
            </div>
            <a href={program.link} target="_blank" rel="noreferrer" className="secondary-btn">
              Learn More <FiExternalLink />
            </a>
          </article>
        );
      })}
    </div>
  );
}

export default ProgramsPage;
