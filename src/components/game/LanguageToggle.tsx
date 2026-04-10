import { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  lang: Language;
  onToggle: () => void;
}

const LanguageToggle = ({ lang, onToggle }: LanguageToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-card card-shadow border border-border hover:border-primary transition-all duration-300"
    >
      <span className={`text-sm font-medium transition-colors ${lang === 'en' ? 'text-primary' : 'text-muted-foreground'}`}>
        EN
      </span>
      <div className="relative w-10 h-5 rounded-full gradient-primary">
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary-foreground shadow-sm transition-transform duration-300 ${
            lang === 'ar' ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
      <span className={`text-sm font-medium transition-colors ${lang === 'ar' ? 'text-primary' : 'text-muted-foreground'}`}>
        عربي
      </span>
    </button>
  );
};

export default LanguageToggle;
