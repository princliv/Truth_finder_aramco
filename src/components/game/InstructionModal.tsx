import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Pointer, Check, Play, UserCircle } from 'lucide-react';
import { t, Language } from '@/lib/i18n';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  level: number;
  levelName: string;
}

const InstructionModal = ({ isOpen, onClose, lang, level, levelName }: InstructionModalProps) => {
  const getGesture = () => {
    switch (level) {
      case 1:
        return {
          icon: <Hand className="w-16 h-16 text-primary" />,
          label: t(lang, 'gesturePause'),
          desc: t(lang, 'level1Instruction')
        };
      case 2:
        return {
          icon: <Pointer className="w-16 h-16 text-accent -rotate-45" />,
          label: t(lang, 'gestureFocus'),
          desc: t(lang, 'level2Instruction')
        };
      case 3:
        return {
          icon: <Hand className="w-16 h-16 text-secondary rotate-90" />, // Simulating "Ok" or "Grasp"
          label: t(lang, 'gestureOk'),
          desc: t(lang, 'level3Instruction')
        };
      default:
        return null;
    }
  };

  const gesture = getGesture();
  if (!gesture) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg glass border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />

            <div className="relative z-10 text-center">
              <div className="mb-8 flex justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: level === 2 ? [-45, -35, -45] : [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl"
                >
                  {gesture.icon}
                </motion.div>
              </div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                Level {level}
              </span>
              
              <h2 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter">
                {levelName}
              </h2>
              
              <p className="text-white/60 font-medium mb-10 leading-relaxed text-lg italic">
                "{gesture.desc}"
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
                <div className="flex items-center gap-4 text-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <UserCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Instruction</span>
                    <span className="text-sm font-bold text-white/90">{gesture.label}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-5 rounded-2xl gradient-primary text-primary-foreground font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                {t(lang, 'startLevel')}
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InstructionModal;
