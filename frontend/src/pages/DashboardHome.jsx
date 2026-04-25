import { FiArrowRight, FiTrendingUp, FiUsers, FiDatabase, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const featured = [
  {
    title: 'VS Code',
    company: 'Microsoft',
    repo: 'microsoft/vscode',
    repoUrl: 'https://github.com/microsoft/vscode',
    text: 'Massive extension ecosystem and excellent issue labels for first-time contributors.',
  },
  {
    title: 'React',
    company: 'Meta',
    repo: 'facebook/react',
    repoUrl: 'https://github.com/facebook/react',
    text: 'Core UI library with active discussions, RFCs, and a mature contribution workflow.',
  },
  {
    title: 'TensorFlow',
    company: 'Google',
    repo: 'tensorflow/tensorflow',
    repoUrl: 'https://github.com/tensorflow/tensorflow',
    text: 'Widely-used ML framework with docs, tooling, and code issues across skill levels.',
  },
  {
    title: 'GitHub Docs',
    company: 'GitHub',
    repo: 'github/docs',
    repoUrl: 'https://github.com/github/docs',
    text: 'Documentation-focused contributions with clear templates and review guidance.',
  },
  {
    title: 'Hydrogen',
    company: 'Shopify',
    repo: 'Shopify/hydrogen',
    repoUrl: 'https://github.com/Shopify/hydrogen',
    text: 'Modern commerce frontend stack where contributors can work on DX and storefront features.',
  },
  {
    title: 'PDF.js',
    company: 'Mozilla',
    repo: 'mozilla/pdf.js',
    repoUrl: 'https://github.com/mozilla/pdf.js',
    text: 'Popular web PDF renderer with approachable frontend and bug-fix opportunities.',
  },
];

const contributionMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const contributionMatrix = (() => {
  const totalRows = 7;
  const totalWeeks = 64;

  return Array.from({ length: totalRows }, (_, row) => (
    Array.from({ length: totalWeeks }, (_, col) => {
      const deterministicNoise = ((col * 19 + row * 23 + 7) % 100) / 100;
      const earlyYearBase = col < 24 ? 0.15 : col < 48 ? 0.24 : 0.42;
      const recentBoost = col >= 63 ? 0.14 : 0;
      const weekdayBoost = row === 1 || row === 3 || row === 5 ? 0.08 : 0;
      const activeThreshold = earlyYearBase + recentBoost + weekdayBoost;

      let level = deterministicNoise < activeThreshold
        ? ((col + row * 3) % 4) + 1
        : 0;

      // Keep final November weeks visibly active.
      if (col >= 66 && (row === 1 || row === 3 || row === 5)) {
        level = Math.max(level, 2 + ((col + row) % 3));
      }

      return level;
    })
  ));
})();

function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="dashboard-stack">
      <section className="welcome-card glass-card">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>Hi {user?.name || 'Contributor'}, let&apos;s find your next repository.</h2>
          <p>Browse active projects, compare difficulty, and move faster from idea to pull request.</p>
        </div>
        <Link to="/dashboard/projects" className="primary-btn">
          Explore Projects <FiArrowRight />
        </Link>
      </section>

      <section className="stat-grid">
        <article className="stat-card"><FiDatabase /><strong>1,320+</strong><span>Total Repos Indexed</span></article>
        <article className="stat-card"><FiUsers /><strong>48K+</strong><span>Active Contributors</span></article>
        <article className="stat-card"><FiTrendingUp /><strong>8,900+</strong><span>Projects Found</span></article>
      </section>

      <section className="section-heading compact">
        <p>Featured Repositories</p>
        <h2>High-signal projects worth exploring</h2>
      </section>

      <section className="featured-grid">
        {featured.map((item) => (
          <article key={item.title} className="glass-card featured-card">
            <h3>{item.title}</h3>
            <p>{item.company} · {item.repo}</p>
            <p>{item.text}</p>
            <a href={item.repoUrl} target="_blank" rel="noreferrer" className="link-chip">
              View on GitHub <FiExternalLink />
            </a>
          </article>
        ))}
      </section>

      <section className="glass-card contribution-card contribution-card--github">
        <div className="github-months">
          {contributionMonths.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        <div className="github-grid-layout">
          <div className="github-day-labels">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className="github-grid">
            {contributionMatrix.map((row, rowIndex) => (
              <div className="github-row" key={`row-${rowIndex}`}>
                {row.map((level, colIndex) => (
                  <span
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`github-cell github-cell--${level}`}
                    aria-label={`Week ${colIndex + 1}, intensity ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="github-footer">
          <span className="github-help">Learn how we count contributions</span>
          <div className="github-legend">
            <span>Less</span>
            <i className="github-cell github-cell--0" />
            <i className="github-cell github-cell--1" />
            <i className="github-cell github-cell--2" />
            <i className="github-cell github-cell--3" />
            <i className="github-cell github-cell--4" />
            <span>More</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
