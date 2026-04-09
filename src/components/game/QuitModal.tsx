import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LogOut, ArrowRight } from 'lucide-react';
import { t, Language } from '@/lib/i18n';

interface QuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lang: Language;
}

const QuitModal = ({ isOpen, onClose, onConfirm, lang }: QuitModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-md glass border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="text-center relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>

              <h2 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">
                {t(lang, 'quitTitle')}
              </h2>
              
              <p className="text-white/60 font-medium mb-10 leading-relaxed italic">
                {t(lang, 'quitMessage')}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl glass border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  {t(lang, 'stay')}
                </button>
                <button
                  onClick={onConfirm}
                  className="w-full py-4 rounded-xl bg-red-500 text-white font-black uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 group"
                >
                  {t(lang, 'quit')}
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuitModal;
