import { t, Language } from '@/lib/i18n';
import { Sparkles, Trophy, BookOpen, Target, Clock, Brain, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  lang: Language;
  onStartWorksheet: () => void;
  onStartScenario: () => void;
}

const IntroScreen = ({ lang, onStartWorksheet, onStartScenario }: IntroScreenProps) => {
  const isRtl = lang === 'ar';

  return (
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto py-12 px-4 relative overflow-hidden">
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-0 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      
      {/* Hero Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mb-8"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all duration-700" />
          <div className="relative w-28 h-28 rounded-[2rem] bg-blue-600 flex items-center justify-center shadow-2xl glass border-white/20 animate-float">
            <Target className="w-14 h-14 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter uppercase italic leading-[0.9]">
          <span className="text-white">{t(lang, 'title').split(' ')[0]}</span>{' '}
          <span className="text-blue-500">{t(lang, 'title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-wide max-w-3xl mx-auto">
          {t(lang, 'subtitle')} — {t(lang, 'tagline')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-20">
        {/* Scenario Mode Card - BLUE */}
        <motion.button
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onStartScenario}
          className="group relative p-10 rounded-[3rem] bg-blue-900/20 glass border-blue-500/20 text-start overflow-hidden transition-all hover:border-blue-500/50 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity translate-x-10 -translate-y-10 group-hover:translate-x-4 group-hover:-translate-y-4 duration-500">
            <Trophy className="w-32 h-32 rotate-12 text-blue-400" />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
              <Sparkles className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter">{t(lang, 'scenarioMode')}</h3>
            <p className="text-blue-100/60 mb-10 text-base leading-relaxed font-medium">
              {t(lang, 'scenarioModeDesc' as any)}
            </p>
            
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl group-hover:bg-blue-500 transition-all group-hover:shadow-blue-500/40">
              <span>{t(lang, 'start')}</span>
              <ArrowRight className={`w-5 h-5 transition-transform duration-500 ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-2`} />
            </div>
          </div>
        </motion.button>

        {/* Worksheet Mode Card - GREEN */}
        <motion.button
          whileHover={{ scale: 1.02, translateY: -5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onStartWorksheet}
          className="group relative p-10 rounded-[3rem] bg-emerald-900/20 glass border-emerald-500/20 text-start overflow-hidden transition-all hover:border-emerald-500/50 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity translate-x-10 -translate-y-10 group-hover:translate-x-4 group-hover:-translate-y-4 duration-500">
            <BookOpen className="w-32 h-32 -rotate-12 text-emerald-400" />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
              <BookOpen className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter">{t(lang, 'worksheetMode')}</h3>
            <p className="text-emerald-100/60 mb-10 text-base leading-relaxed font-medium">
              {t(lang, 'worksheetModeDesc' as any)}
            </p>
            
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl group-hover:bg-emerald-500 transition-all group-hover:shadow-emerald-500/40">
              <span>{t(lang, 'start')}</span>
              <ArrowRight className={`w-5 h-5 transition-transform duration-500 ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-2`} />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Information Grid: How it Works (Moved below games) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full p-12 rounded-[3.5rem] glass border-white/5 relative overflow-hidden backdrop-blur-3xl"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Brain className="w-64 h-64 text-blue-500" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-12 text-center flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            {t(lang, 'howItWorks' as any)}
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Clock className="w-8 h-8 text-blue-400" />, key: 'howItWorksStep1', title: 'Pause' },
              { icon: <Brain className="w-8 h-8 text-blue-400" />, key: 'howItWorksStep2', title: 'Analyze' },
              { icon: <Target className="w-8 h-8 text-blue-400" />, key: 'howItWorksStep3', title: 'Identify' },
              { icon: <ShieldCheck className="w-8 h-8 text-blue-400" />, key: 'howItWorksStep4', title: 'Respond' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group/step">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all group-hover/step:scale-110 group-hover/step:bg-blue-500/20">
                  {step.icon}
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-2">{step.title}</h4>
                  <p className="text-sm font-medium text-white/50 leading-relaxed px-2">
                    {t(lang, step.key as any).split(': ')[1] || t(lang, step.key as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
