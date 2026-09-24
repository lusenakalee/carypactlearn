import en from '@/messages/en.json';
import zh from '@/messages/zh.json';
import es from '@/messages/es.json';
import ja from '@/messages/ja.json';
import ko from '@/messages/ko.json';
import vi from '@/messages/vi.json';
import ru from '@/messages/ru.json';
import fr from '@/messages/fr.json';
import hi from '@/messages/hi.json';

export type SupportedLocale = 'en' | 'zh' | 'es' | 'ja' | 'ko' | 'vi' | 'ru' | 'fr' | 'hi';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'zh', 'es', 'ja', 'ko', 'vi', 'ru', 'fr', 'hi'];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export interface LanguageInfo {
  code: SupportedLocale;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', label: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'vi', label: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export const allMessages: Record<SupportedLocale, typeof en> = {
  en,
  zh,
  es,
  ja,
  ko,
  vi,
  ru,
  fr,
  hi,
};

export function getMessages(locale: string) {
  if (locale in allMessages) {
    return allMessages[locale as SupportedLocale];
  }
  return allMessages[DEFAULT_LOCALE];
}
