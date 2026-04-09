import { useEffect, useState } from 'react';
import { t, Language } from '@/lib/i18n';
import { Trophy, Zap, RefreshCw, Eye, ArrowRight, Star, BarChart3, Target, Brain, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinalScreenProps {
  lang: Language;
  mode: 'worksheet' | 'scenario';
  worksheetAnswers?: Record<string, any>;
  scenarioScore?: number;
  onTryAgain: () => void;
  onContinue: () => void;
}

const FinalScreen = ({ lang, mode, worksheetAnswers, scenarioScore, onTryAgain, onContinue }: FinalScreenProps) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setTimeout(() => setRevealed(true), 500);
  }, []);

  const getPatternLabel = () => {
    if (mode === 'scenario') {
      if ((scenarioScore || 0) >= 4) return t(lang, 'reflective');
      if ((scenarioScore || 0) >= 2) return t(lang, 'defensive');
      return t(lang, 'reactive');
    }
    const pattern = worksheetAnswers?.pattern || '';
    if (pattern.includes('Reflective') || pattern === 'patternReflective') return t(lang, 'reflective');
    if (pattern.includes('Defensive') || pattern === 'patternDefensive') return t(lang, 'defensive');
    if (pattern.includes('Avoidant') || pattern === 'patternAvoidant') return t(lang, 'defensive');
    return t(lang, 'reactive');
  };

  const getStrength = () => {
    if (mode === 'scenario' && (scenarioScore || 0) >= 4) {
      return t(lang, 'strengthExcellent' as any);
    }
    if (worksheetAnswers?.firstReaction?.includes('listenCarefully')) {
      return t(lang, 'strengthListening' as any);
    }
    return t(lang, 'strengthSelfAwareness' as any);
  };

  const getImprovement = () => {
    if (mode === 'scenario' && (scenarioScore || 0) < 4) {
      return t(lang, 'improvementObjective' as any);
    }
    return t(lang, 'improvementSeparation' as any);
  };

  const getInsight = () => {
    return t(lang, 'finalInsightText' as any);
  };

  // Real calculation: 50 points per correct answer (out of 5 scenarios)
  const totalXP = mode === 'scenario' ? (scenarioScore || 0) * 50 : 250;
  const accuracy = mode === 'scenario' ? Math.round(((scenarioScore || 0) / 5) * 100) : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
      {/* Completion header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 w-28 h-28 rounded-[2.5rem] gradient-primary flex items-center justify-center shadow-2xl shadow-primary/40 relative"
        >
          <div className="absolute inset-0 rounded-[2.5rem] animate-pulse glow-teal -z-10" />
          <Trophy className="w-14 h-14 text-primary-foreground" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-white mb-4 italic uppercase tracking-tighter"
        >
          {t(lang, 'insightUnlocked')}
        </motion.h1>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-4 mt-4 px-8 py-4 rounded-[2rem] glass border-primary/20 shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Total Rewards</span>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-secondary animate-pulse" />
              <span className="text-3xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {totalXP} XP
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Insights and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Insights */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-black text-white/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
            <Brain className="w-5 h-5" /> {t(lang, 'behavioralInsights' as any)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {revealed && [
                { icon: <Star className="w-6 h-6 text-secondary" />, label: t(lang, 'reactionPattern'), value: getPatternLabel() },
                { icon: <Zap className="w-6 h-6 text-accent" />, label: t(lang, 'strength'), value: getStrength() },
                { icon: <RefreshCw className="w-6 h-6 text-secondary" />, label: t(lang, 'improvementArea'), value: getImprovement() },
                { icon: <Eye className="w-6 h-6 text-accent" />, label: t(lang, 'personalInsight'), value: getInsight() },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="p-8 rounded-[2.5rem] glass border-white/5 shadow-2xl hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 block">
                    {item.label}
                  </span>
                  <p className="text-lg font-bold text-white/90 leading-tight">{item.value}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Performance Report */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-white/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 shrink-0" /> <span className="truncate">{t(lang, 'performanceReport' as any)}</span>
          </h2>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="p-8 rounded-[3rem] glass border-secondary/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity className="w-32 h-32 text-primary" />
            </div>

            <div className="space-y-10 relative z-10">
              {/* Accuracy Chart */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-black text-white/60 uppercase tracking-widest">{t(lang, 'accuracy' as any)}</span>
                  <span className="text-2xl font-black text-white italic">{accuracy}%</span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full p-1 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${accuracy}%` }}
                    transition={{ duration: 1.5, ease: 'circOut', delay: 1.2 }}
                    className="h-full rounded-full gradient-primary shadow-[0_0_15px_rgba(0,163,224,0.4)]"
                  />
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold text-white/60 uppercase">{t(lang, 'successfulKernels' as any)}</span>
                  </div>
                  <span className="text-lg font-black text-white">{scenarioScore || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 opacity-60">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-secondary" />
                    <span className="text-xs font-bold text-white/60 uppercase">{t(lang, 'pointsPerTruth' as any)}</span>
                  </div>
                  <span className="text-lg font-black text-white">50 XP</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs font-medium text-white/40 leading-relaxed italic">
                  "{t(lang, 'finalAdvice' as any)}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-24 justify-center"
      >
        <button
          onClick={onTryAgain}
          className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl glass border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          {t(lang, 'tryAgain')}
        </button>
        <button
          onClick={onContinue}
          className="flex items-center justify-center gap-3 px-12 py-5 rounded-2xl gradient-primary text-primary-foreground font-black uppercase tracking-[0.2em] shadow-2xl hover:shadow-primary/40 hover:scale-[1.05] transition-all"
        >
          {t(lang, 'continue')}
          <ArrowRight className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default FinalScreen;
