import { t, Language } from '@/lib/i18n';
import { Sparkles, Trophy, BookOpen, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  lang: Language;
  onStartWorksheet: () => void;
  onStartScenario: () => void;
}

const IntroScreen = ({ lang, onStartWorksheet, onStartScenario }: IntroScreenProps) => {
  const isRtl = lang === 'ar';

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12 px-4">
      {/* Hero Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center shadow-2xl glass border-white/20 animate-float">
            <Target className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
          <span className="text-white">{t(lang, 'title').split(' ')[0]}</span>{' '}
          <span className="gradient-text">{t(lang, 'title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 font-medium tracking-wide max-w-2xl mx-auto">
          {t(lang, 'subtitle')} — {t(lang, 'tagline')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Scenario Mode Card */}
        <motion.button
          whileHover={{ scale: 1.05, translateY: -10 }}
          whileTap={{ scale: 0.98 }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onStartScenario}
          className="group relative p-8 rounded-[2.5rem] glass border-white/5 text-start overflow-hidden transition-all hover:border-primary/50"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-32 h-32 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t(lang, 'scenarioMode')}</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              {t(lang, 'scenarioModeDesc' as any)}
            </p>
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
              <span>{t(lang, 'start')}</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </motion.button>

        {/* Worksheet Mode Card */}
        <motion.button
          whileHover={{ scale: 1.05, translateY: -10 }}
          whileTap={{ scale: 0.98 }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onStartWorksheet}
          className="group relative p-8 rounded-[2rem] glass border-white/5 text-start overflow-hidden transition-all hover:border-accent/50"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen className="w-32 h-32 -rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t(lang, 'worksheetMode')}</h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              {t(lang, 'worksheetModeDesc' as any)}
            </p>
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs">
              <span>{t(lang, 'start')}</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </motion.button>
      </div>

    </div>
  );
};

export default IntroScreen;
