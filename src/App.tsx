import { useEffect, useState } from 'react';
import type { Lang } from './data/content';
import { email, facebookUrl, githubUrl, linkedinUrl } from './data/content';
import { icons } from './data/icons';
import { useI18n, type Key } from './i18n';
import { useTheme } from './theme';

const base = import.meta.env.BASE_URL;

function Flag({ lang }: { lang: Lang }) {
  return lang === 'vi' ? (
    <svg viewBox="0 0 30 20" width="28" height="19" aria-hidden="true">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon points="15.00,4.00 16.35,8.14 20.71,8.15 17.19,10.71 18.53,14.85 15.00,12.30 11.47,14.85 12.81,10.71 9.29,8.15 13.65,8.14" fill="#FFFF00" />
    </svg>
  ) : (
    <svg viewBox="0 0 60 30" width="28" height="14" aria-hidden="true">
      <clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id="uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const other: Lang = lang === 'vi' ? 'en' : 'vi';
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
        <div className="lang-switch">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            title={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setLang(other)}
            aria-label={other === 'vi' ? 'Tiếng Việt' : 'English'}
            title={other === 'vi' ? 'Tiếng Việt' : 'English'}
          >
            <Flag lang={other} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="hero wrap narrow">
      <img className="avatar" src={`${base}images/avatar.jpeg`} alt="Nguyễn Ngọc Hiếu" width={220} height={220} />
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

function CopyEmail() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} title={t('copyEmail')} aria-label={t('copyEmail')}>
      {copied ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M4 12l5 5L20 6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" />
          <path d="M5 15V4h11" />
        </svg>
      )}
    </button>
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
          <span className="email-wrap">
            <a href={`mailto:${email}`}>{email}</a>
            <CopyEmail />
          </span>
        </li>
        <li className="row">
          <span>{t('addressLabel')}</span>
          <span>{t('location')}</span>
        </li>
      </ul>
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

function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      className={show ? 'to-top show' : 'to-top'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('backToTop')}
      title={t('backToTop')}
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
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
      <BackToTop />
      <footer className="wrap narrow footer">
        <Socials />
        <p className="caption">© 2026 Nguyễn Ngọc Hiếu · {t('quote')}</p>
      </footer>
    </>
  );
}
