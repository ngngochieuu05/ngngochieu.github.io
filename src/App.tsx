import { email, facebookUrl, githubUrl, linkedinUrl } from './data/content';
import { icons } from './data/icons';
import { useI18n, type Key } from './i18n';

const base = import.meta.env.BASE_URL;

function Header() {
  const { t, toggle } = useI18n();
  const links: [string, Key][] = [
    ['about', 'navAbout'],
    ['education', 'navEducation'],
    ['contact', 'navContact'],
  ];
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <span />
        <nav aria-label="Primary">
          {links.map(([id, k]) => (
            <a key={id} href={`#${id}`}>
              {t(k)}
            </a>
          ))}
        </nav>
        <button className="btn btn-secondary btn-sm" onClick={toggle} aria-label="Switch language">
          {t('switchTo')}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="hero wrap narrow">
      <img className="avatar" src={`${base}images/logo.png`} alt="Logo Nguyễn Ngọc Hiếu" width={220} height={220} />
      <h1>Nguyễn Ngọc Hiếu</h1>
      <div className="actions">
        <a className="btn btn-primary" href="#contact">
          {t('contactMe')}
        </a>
        <a className="btn btn-secondary" href={`${base}images/cv.jpg`} target="_blank" rel="noreferrer">
          {t('downloadCv')}
        </a>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section wrap narrow">
      <h2>{t('aboutTitle')}</h2>
      <p>{t('aboutP1')}</p>
      <p>{t('aboutP2')}</p>
    </section>
  );
}

function Education() {
  const { t } = useI18n();
  return (
    <section id="education" className="section wrap narrow">
      <h2>{t('educationTitle')}</h2>
      <article className="card">
        <header>
          <h3>{t('school')}</h3>
          <span className="caption">{t('schoolPeriod')}</span>
        </header>
        <p>{t('major')}</p>
      </article>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="section wrap narrow">
      <h2>{t('contactTitle')}</h2>
      <p>{t('contactLede')}</p>
      <ul className="list">
        <li className="row">
          <span>Email</span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li className="row">
          <span>{t('addressLabel')}</span>
          <span>{t('location')}</span>
        </li>
      </ul>
      <a className="btn btn-primary" href={`mailto:${email}`}>
        {t('sendEmail')}
      </a>
    </section>
  );
}

function Socials() {
  const items = [
    { name: 'GitHub', href: githubUrl, d: icons.github },
    { name: 'LinkedIn', href: linkedinUrl, d: icons.linkedin },
    { name: 'Facebook', href: facebookUrl, d: icons.facebook },
  ].filter((i) => i.href);
  return (
    <ul className="socials">
      {items.map((i) => (
        <li key={i.name}>
          <a href={i.href} target="_blank" rel="noreferrer" aria-label={i.name} title={i.name}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d={i.d} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const { t } = useI18n();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Contact />
      </main>
      <footer className="wrap narrow footer">
        <Socials />
        <p className="caption">© 2026 Nguyễn Ngọc Hiếu · {t('quote')}</p>
      </footer>
    </>
  );
}
