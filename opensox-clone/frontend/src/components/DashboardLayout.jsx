import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiBell, FiGrid, FiLayout, FiLogOut, FiMenu, FiSearch, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import useTokenGuard from '../hooks/useTokenGuard';

const titles = {
  '/dashboard/home': 'Dashboard Home',
  '/dashboard/projects': 'OSS Projects',
  '/dashboard/sheet': 'OSS Sheet',
  '/dashboard/oss-programs': 'OSS Programs',
};

const navItems = [
  { to: '/dashboard/home', label: 'Home', icon: FiLayout },
  { to: '/dashboard/projects', label: 'OSS Projects', icon: FiSearch },
  { to: '/dashboard/sheet', label: 'OSS Sheet', icon: FiGrid },
  { to: '/dashboard/oss-programs', label: 'OSS Programs', icon: FiBookOpen },
];

function DashboardLayout() {
  useTokenGuard();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">O</div>
          <div>
            <p className="brand-name">Source Spark</p>
            <span className="brand-tag">Open source discovery</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const NavIcon = item.icon;

            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <NavIcon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-user">
          <img src={user?.avatar} alt={user?.name || 'User'} />
          <div>
            <strong>{user?.name}</strong>
            <p>{user?.email}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={logout} type="button">
          <FiLogOut />
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">Workspace</p>
            <h1>{titles[location.pathname] || 'Dashboard'}</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-btn" aria-label="Notifications">
              <FiBell />
            </button>
            <button type="button" className="icon-btn mobile-only" aria-label="Menu">
              <FiMenu />
            </button>
          </div>
        </header>
        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
