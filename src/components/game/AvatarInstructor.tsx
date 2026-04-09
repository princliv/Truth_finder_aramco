import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface AvatarInstructorProps {
  isOpen: boolean;
  isCorrect: boolean;
  statement: string;
  feedback: string;
  onNext: () => void;
  lang: Language;
}

const AvatarInstructor = ({ isOpen, isCorrect, statement, feedback, onNext, lang }: AvatarInstructorProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-background/95 backdrop-blur-xl"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isCorrect ? 'bg-accent' : 'bg-destructive'}`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isCorrect ? 'bg-primary' : 'bg-secondary'}`} />
          </div>

          <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Avatar Section */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="relative flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                <img
                  src="/avatar_instructor.png"
                  alt="Instructor"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                {isCorrect ? (
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-[0_0_20px_rgba(0,194,184,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center border border-destructive/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <XCircle className="w-10 h-10 text-destructive" />
                  </div>
                )}
                <div>
                  <h2 className={`text-3xl font-bold ${isCorrect ? 'text-accent' : 'text-destructive'}`}>
                    {isCorrect ? t(lang, 'correct') : t(lang, 'notQuite')}
                  </h2>
                  <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
                    {t(lang, 'feedbackReceived' as any) || 'Instructor Feedback'}
                  </p>
                </div>
              </div>

              <div className="bg-card/50 border border-border/50 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                <blockquote className="border-l-4 border-primary pl-4 mb-6 italic text-foreground/80">
                  "{statement}"
                </blockquote>

                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t(lang, 'theKernelOfTruth' as any) || 'The Kernel of Truth'}
                </h3>

                <p className="text-lg text-foreground/90 leading-relaxed mb-8">
                  {feedback}
                </p>

                <button
                  onClick={onNext}
                  className="group w-full py-4 px-8 rounded-2xl gradient-primary text-primary-foreground font-bold text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  {t(lang, 'continue' as any) || 'Continue to Next Stage'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarInstructor;
