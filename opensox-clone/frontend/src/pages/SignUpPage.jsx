import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', form);
      login(response.data);
      navigate('/dashboard/home', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page--split">
      <div className="auth-shell glass-card">
        <section className="auth-panel">
          <header className="auth-nav">
            <Link to="/" className="auth-brand auth-brand--dot">Source Spark</Link>
            <div className="auth-nav-links">
              <Link to="/">Home</Link>
              <Link to="/signin">Sign In</Link>
            </div>
          </header>

          <div className="auth-body">
            <p className="auth-kicker">START FOR FREE</p>
            <h1>Create new account<span>.</span></h1>
            <p className="auth-subtext">
              Already a member? <Link to="/signin">Log in</Link>
            </p>

            <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
              <label>
                Full Name
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </label>

              {error ? <div className="error-box">{error}</div> : null}

              <div className="auth-cta-row">
                <Link to="/signin" className="secondary-btn auth-link-btn">Change method</Link>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside className="auth-visual" aria-hidden="true">
          <div className="auth-visual__overlay" />
          <div className="auth-visual__mark">OS</div>
        </aside>
      </div>
    </div>
  );
}

export default SignUpPage;
