import { useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiCheck, FiPlayCircle, FiSearch, FiUsers } from 'react-icons/fi';

const doneStorageKey = 'oss-sheet-done-map';

const fakeModules = [
  { id: 'm1', module: 'Introduction & Announcement' },
  { id: 'm2', module: 'Things to know before jumping to Open Source' },
  { id: 'm3', module: 'Get basics done - prerequisites, tools and tips' },
  { id: 'm4', module: 'Explore and select projects to contribute' },
  { id: 'm5', module: 'How to setup projects locally' },
  { id: 'm6', module: 'Introduce yourself and familiarize' },
  { id: 'm7', module: 'Find issues to work on' },
  { id: 'm8', module: 'Understand contribution guidelines' },
  { id: 'm9', module: 'Set up branch and workflow' },
  { id: 'm10', module: 'Make your first documentation PR' },
  { id: 'm11', module: 'Code quality basics and linting' },
  { id: 'm12', module: 'Writing meaningful commit messages' },
  { id: 'm13', module: 'How to create small feature PRs' },
  { id: 'm14', module: 'Review feedback and iterate fast' },
  { id: 'm15', module: 'Debugging open source codebases' },
  { id: 'm16', module: 'Testing changes before PR' },
  { id: 'm17', module: 'Issue triage and reproduction' },
  { id: 'm18', module: 'Fix your first beginner issue' },
  { id: 'm19', module: 'Intermediate bug fixing workflow' },
  { id: 'm20', module: 'Adding small enhancements safely' },
  { id: 'm21', module: 'Working with maintainers effectively' },
  { id: 'm22', module: 'Open source etiquette and collaboration' },
  { id: 'm23', module: 'Handle stale branches and rebases' },
  { id: 'm24', module: 'Release notes and changelog practice' },
  { id: 'm25', module: 'Docs contribution sprint' },
  { id: 'm26', module: 'Frontend issue contribution sprint' },
  { id: 'm27', module: 'Backend issue contribution sprint' },
  { id: 'm28', module: 'Good first issue marathon' },
  { id: 'm29', module: 'Cross-project contribution strategy' },
  { id: 'm30', module: 'Build your open source profile' },
  { id: 'm31', module: 'Consistency and contribution streaks' },
  { id: 'm32', module: 'Final challenge and wrap-up' },
];

function SheetPage() {
  const [search, setSearch] = useState('');
  const [doneMap, setDoneMap] = useState(() => {
    try {
      const saved = localStorage.getItem(doneStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(doneStorageKey, JSON.stringify(doneMap));
  }, [doneMap]);

  const visibleModules = useMemo(() => {
    const filtered = fakeModules.filter((item) => {
      const haystack = item.module.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
    return filtered;
  }, [search]);

  const completedCount = useMemo(() => visibleModules.filter((item) => doneMap[item.id]).length, [doneMap, visibleModules]);
  const completionPercentage = visibleModules.length
    ? Math.round((completedCount / visibleModules.length) * 100)
    : 0;

  const toggleDone = (id) => {
    setDoneMap((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const createDocLink = (id) => {
    return `https://example.com/docs/${id}`;
  };

  const createWatchLink = (id) => {
    return `https://example.com/watch/${id}`;
  };

  return (
    <div className="sheet-page glass-card">
      <div className="sheet-hero">
        <div>
          <p className="sheet-hero__kicker">Contributor Roadmap</p>
          <h2>Open Source Sprint Sheet</h2>
          <p>Track your daily progress through curated projects and ship consistent contributions.</p>
        </div>
        <div className="sheet-progress">
          <div>
            <p>Total Progress</p>
            <strong>{completedCount} / {visibleModules.length}</strong>
          </div>
          <div
            className="progress-ring"
            role="img"
            aria-label={`${completionPercentage}% completed`}
            style={{ '--ring-value': `${completionPercentage}%` }}
          >
            <span>{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <p className="sheet-quote">
        Learn one module at a time, stay consistent, and let compounding effort do the heavy lifting.
      </p>

      <div className="sheet-toolbar">
        <label className="search-field search-field--wide sheet-search">
          <FiSearch />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search module name" />
        </label>
      </div>

      <div className="table-wrap">
        <table className="oss-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Module Name</th>
              <th>Doc</th>
              <th>Watch</th>
              <th>Sessions</th>
              <th>Done?</th>
            </tr>
          </thead>
          <tbody>
            {visibleModules.map((item, index) => (
              <tr key={item.id} className={doneMap[item.id] ? 'is-done' : ''}>
                <td>{index + 1}</td>
                <td>{item.module}</td>
                <td>
                  <a href={createDocLink(item.id)} target="_blank" rel="noreferrer" className="sheet-action-link">
                    <FiBookOpen /> Read
                  </a>
                </td>
                <td>
                  <a href={createWatchLink(item.id)} target="_blank" rel="noreferrer" className="sheet-action-link sheet-action-link--video">
                    <FiPlayCircle /> Watch
                  </a>
                </td>
                <td>
                  <span className="session-chip">
                    <FiUsers /> OX Pro
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={`done-toggle ${doneMap[item.id] ? 'done-toggle--active' : ''}`}
                    onClick={() => toggleDone(item.id)}
                    aria-label={`Mark ${item.module} as done`}
                  >
                    {doneMap[item.id] ? <FiCheck /> : null}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SheetPage;
