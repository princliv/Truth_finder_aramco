import { t, Language } from '@/lib/i18n';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
  lang: Language;
}

const ProgressBar = ({ current, total, label, lang }: ProgressBarProps) => {
  const progress = (current / total) * 100;
  const isRtl = lang === 'ar';

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-end">
        <div>
          {label && (
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-1">
              Mode: {label}
            </span>
          )}
          <span className="text-2xl font-black text-white italic tracking-tighter">
            {t(lang, 'stage')} {current} <span className="text-white/20">/</span> {total}
          </span>
        </div>
        <span className="text-sm font-black text-primary/80 tracking-widest">{Math.round(progress)}%</span>
      </div>
      
      <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1 glass">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'circOut' }}
          className="h-full rounded-full gradient-primary shadow-[0_0_15px_rgba(0,163,224,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
