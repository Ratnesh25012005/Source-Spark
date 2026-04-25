import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch, FiSliders, FiUsers, FiGithub } from 'react-icons/fi';
import FAQAccordion from '../components/FAQAccordion';
import AnimatedCounter from '../components/AnimatedCounter';

const features = [
  {
    icon: FiUsers,
    title: 'Personalized Recommendations',
    text: 'Find repositories that match your skill level, stack, and contribution goals without manual searching.',
  },
  {
    icon: FiSearch,
    title: 'Seamless Search',
    text: 'Scan thousands of open-source projects with fast search and rich metadata in one place.',
  },
  {
    icon: FiSliders,
    title: 'Precision Filters',
    text: 'Narrow projects by activity, competition, language, stack, and topic to find the right fit.',
  },
];

const steps = [
  { step: '01', title: 'Set Your Filters', text: 'Choose stack, language, and contribution difficulty.' },
  { step: '02', title: 'Search Instantly', text: 'Explore curated repositories with a responsive dashboard.' },
  { step: '03', title: 'Discover & Contribute', text: 'Open the repo and start contributing with confidence.' },
];

const testimonials = [
  {
    name: 'Ava Morgan',
    role: 'Frontend Engineer',
    quote: 'I found my first real open source PR through this workflow in under a day.',
  },
  {
    name: 'Noah Patel',
    role: 'Full-Stack Developer',
    quote: 'The filters make it easy to discover projects that are active but still approachable.',
  },
  {
    name: 'Lina Chen',
    role: 'Student Contributor',
    quote: 'It feels like a guided path into open source instead of a random directory of links.',
  },
  {
    name: 'Marcus Reed',
    role: 'DevRel',
    quote: 'The dashboard is clean, fast, and exactly what contributors need to stay motivated.',
  },
];

const faqs = [
  {
    question: 'How does Source Spark find relevant repositories?',
    answer: 'It combines search, stack filters, activity signals, and competition level to surface suitable projects.',
  },
  {
    question: 'Can I sign in with a local account?',
    answer: 'Yes. This clone supports local email/password authentication using JWT and MongoDB.',
  },
  {
    question: 'How often are the repositories updated?',
    answer: 'The seeded data includes activity and last-updated metadata so the dashboard can prioritize current projects.',
  },
  {
    question: 'Is the app mobile friendly?',
    answer: 'Yes. The layout, cards, and tables collapse cleanly on smaller screens.',
  },
  {
    question: 'Does the token guard run on route changes?',
    answer: 'Yes. Protected pages revalidate the token on each route load and redirect immediately on failure.',
  },
  {
    question: 'Can I extend the project list?',
    answer: 'Yes. The backend exposes filterable project endpoints and a seed script for easy expansion.',
  },
];

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-badge">
          <FiGithub /> Built for contributors
        </div>
        <h1>Only platform you need to get into Open Source</h1>
        <p>
          Discover active repositories, compare contribution difficulty, and focus your time on projects that actually fit your stack.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard/home" className="primary-btn">
            Get Started <FiArrowRight />
          </Link>
          <Link to="/signin" className="secondary-btn">
            Sign In
          </Link>
        </div>
        <div className="hero-metrics">
          <div>
            <strong><AnimatedCounter end={48200} suffix="+" /></strong>
            <span>Total users</span>
          </div>
          <div>
            <strong><AnimatedCounter end={1320} suffix="+" /></strong>
            <span>Repos indexed</span>
          </div>
          <div>
            <strong><AnimatedCounter end={9800} suffix="+" /></strong>
            <span>Contributions tracked</span>
          </div>
        </div>
      </section>

      <section className="section-block" id="features">
        <div className="section-heading">
          <p>Why Source Spark</p>
          <h2>Built to reduce noise and surface opportunities</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <article key={feature.title} className="glass-card feature-card">
                <FeatureIcon />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block split-block" id="how-it-works">
        <div className="section-heading">
          <p>How It Works</p>
          <h2>Three steps from discovery to contribution</h2>
        </div>
        <div className="steps-grid">
          {steps.map((item) => (
            <article key={item.step} className="step-card">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-block">
        <div className="section-heading">
          <p>Testimonials</p>
          <h2>What contributors say after using the platform</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((person) => (
            <article key={person.name} className="glass-card testimonial-card">
              <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(person.name)}`} alt={person.name} />
              <p>“{person.quote}”</p>
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-block">
        <div className="section-heading">
          <p>FAQ</p>
          <h2>Common questions before you start contributing</h2>
        </div>
        <FAQAccordion items={faqs} />
      </section>

      <section className="section-block cta-strip">
        <div>
          <p>Ready to dive into open source?</p>
          <h2>Find a project that fits your skills today.</h2>
        </div>
        <Link to="/dashboard/home" className="primary-btn">
          Explore Dashboard <FiArrowRight />
        </Link>
      </section>

      <footer className="site-footer">
        <div>
          <strong>Platform</strong>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div>
          <strong>Legal</strong>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
        <div>
          <strong>Socials</strong>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
