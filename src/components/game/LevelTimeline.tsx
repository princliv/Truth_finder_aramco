import { motion } from 'framer-motion';
import { Check, Lock, Play } from 'lucide-react';

interface LevelTimelineProps {
  currentLevel: number;
  totalLevels: number;
  levelNames: string[];
  lang: string;
}

const LevelTimeline = ({ currentLevel, totalLevels, levelNames, lang }: LevelTimelineProps) => {
  const isRtl = lang === 'ar';

  return (
    <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4 ${isRtl ? 'right-8 left-auto' : ''}`}>
      <div className="absolute top-0 bottom-0 w-px bg-white/10 left-1/2 -translate-x-1/2" />
      
      {Array.from({ length: totalLevels }).map((_, i) => {
        const levelNum = i + 1;
        const isActive = levelNum === currentLevel;
        const isCompleted = levelNum < currentLevel;

        return (
          <div key={i} className="relative group">
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.2 : 1,
                borderColor: isActive ? 'var(--primary)' : isCompleted ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                backgroundColor: isActive ? 'var(--primary)' : isCompleted ? 'var(--accent)' : 'rgba(255,255,255,0.05)'
              }}
              className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center relative z-10 transition-colors shadow-2xl backdrop-blur-xl`}
            >
              {isCompleted ? (
                <Check className="w-6 h-6 text-white" />
              ) : isActive ? (
                <Play className="w-6 h-6 text-white animate-pulse" />
              ) : (
                <Lock className="w-5 h-5 text-white/20" />
              )}
            </motion.div>
            
            {/* Tooltip-like Label */}
            <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap px-4 py-2 rounded-xl glass border border-white/10 pointer-events-none ${
              isRtl ? 'right-16 text-right' : 'left-16 text-left'
            }`}>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">
                Level {levelNum}
              </span>
              <span className="text-sm font-bold text-white">
                {levelNames[i]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LevelTimeline;
