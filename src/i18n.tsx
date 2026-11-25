import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from './data/content';

const dict = {
  vi: {
    navAbout: 'Giới thiệu',
    navEducation: 'Học vấn',
    navContact: 'Liên hệ',
    contactMe: 'Liên hệ',
    downloadCv: 'Xem CV',
    aboutTitle: 'Giới thiệu',
    aboutP1:
      'Tôi là sinh viên năm thứ tư chuyên ngành Công nghệ thông tin tại HUTECH University, dự kiến tốt nghiệp năm 2027. Tôi đam mê nghiên cứu và phát triển các hệ thống thị giác máy tính, đặc biệt là nhận diện và giám sát đối tượng bằng học sâu.',
    aboutP2:
      'Định hướng nghiên cứu hiện tại tập trung vào thị giác máy tính, điện toán biên và ứng dụng trí tuệ nhân tạo đa nền tảng. Tôi mong muốn được tiếp xúc và làm việc cùng các nhóm nghiên cứu, phát triển trong lĩnh vực này.',
    addressLabel: 'Địa chỉ',
    copyEmail: 'Sao chép email',
    backToTop: 'Lên đầu trang',
    lightMode: 'Chế độ sáng',
    darkMode: 'Chế độ tối',
    educationTitle: 'Học vấn',
    school: 'HUTECH University',
    major: 'Công nghệ thông tin - Học máy & Ứng dụng',
    schoolPeriod: '09/2023 – Hiện tại',
    contactTitle: 'Liên hệ',
    contactLede: 'Luôn sẵn sàng trao đổi về thực tập, hợp tác hoặc các dự án AI.',
    location: 'Biên Hòa, Đồng Nai, Việt Nam',
    quote: 'Học hỏi, phát triển và chia sẻ kiến thức AI.',
  },
  en: {
    navAbout: 'About',
    navEducation: 'Education',
    navContact: 'Contact',
    contactMe: 'Get in touch',
    downloadCv: 'View CV',
    aboutTitle: 'About',
    aboutP1:
      'I am a fourth-year Information Technology student at HUTECH University, expected to graduate in 2027. I am dedicated to researching and developing computer vision systems, particularly deep-learning-based object detection and monitoring.',
    aboutP2:
      'My current research focuses on computer vision, edge computing and cross-platform artificial intelligence applications. I look forward to engaging and working with research and engineering teams in this field.',
    addressLabel: 'Location',
    copyEmail: 'Copy email',
    backToTop: 'Back to top',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    educationTitle: 'Education',
    school: 'HUTECH University',
    major: 'Information Technology - Machine Learning & Applications',
    schoolPeriod: '09/2023 – Present',
    contactTitle: 'Contact',
    contactLede: 'Happy to talk about internships, collaboration or AI projects.',
    location: 'Bien Hoa, Dong Nai, Vietnam',
    quote: 'Learn, grow and share AI knowledge.',
  },
} as const;

export type Key = keyof (typeof dict)['vi'];

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}

const I18n = createContext<Ctx | null>(null);

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'vi' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value: Ctx = {
    lang,
    setLang,
    t: (k) => dict[lang][k],
  };
  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export const useI18n = () => {
  const c = useContext(I18n);
  if (!c) throw new Error('useI18n outside provider');
  return c;
};
