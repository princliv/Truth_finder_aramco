import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Pointer, Check, Play, UserCircle, Target, Zap, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { t, Language } from '@/lib/i18n';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  mode: 'worksheet' | 'scenario';
  level: number;
  levelName: string;
}

type Tab = 'intro' | 'rules' | 'instructions';

const InstructionModal = ({ isOpen, onClose, lang, mode, level, levelName }: InstructionModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('intro');
  const isRtl = lang === 'ar';

  const getGesture = () => {
    switch (level) {
      case 1:
        return {
          icon: <Hand className="w-12 h-12 text-blue-400" />,
          label: t(lang, 'gesturePause'),
          desc: t(lang, 'level1Instruction')
        };
      case 2:
        return {
          icon: <Pointer className="w-12 h-12 text-emerald-400 -rotate-45" />,
          label: t(lang, 'gestureFocus'),
          desc: t(lang, 'level2Instruction')
        };
      case 3:
        return {
          icon: <Hand className="w-12 h-12 text-blue-400 rotate-90" />,
          label: t(lang, 'gestureOk'),
          desc: t(lang, 'level3Instruction')
        };
      default:
        return null;
    }
  };

  const gesture = getGesture();
  if (!gesture) return null;

  const tabs: Tab[] = ['intro', 'rules', 'instructions'];

  const getContent = (tab: Tab) => {
    const modeKey = mode === 'scenario' ? 'Scenario' : 'Worksheet';
    switch (tab) {
      case 'intro':
        return {
          icon: <Target className="w-16 h-16 text-blue-400" />,
          title: t(lang, 'tabIntro' as any),
          text: t(lang, `intro${modeKey}` as any)
        };
      case 'rules':
        return {
          icon: <Zap className="w-16 h-16 text-emerald-400" />,
          title: t(lang, 'tabRules' as any),
          text: t(lang, `rules${modeKey}` as any)
        };
      case 'instructions':
        return {
          icon: <ShieldCheck className="w-16 h-16 text-blue-400" />,
          title: t(lang, 'tabInstructions' as any),
          text: t(lang, `instruction${modeKey}` as any)
        };
    }
  };

  const currentContent = getContent(activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            className="relative w-full max-w-2xl bg-card/40 glass border-border/10 rounded-[3.5rem] p-12 overflow-hidden shadow-2xl"
          >
            {/* Geometric Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${mode === 'scenario' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-1">Onboarding</h4>
                    <h3 className="text-xl font-bold text-foreground italic tracking-tight">{levelName}</h3>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeTab === tab 
                          ? `w-8 ${mode === 'scenario' ? 'bg-primary' : 'bg-accent'}` 
                          : 'w-4 bg-muted hover:bg-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-32 h-32 rounded-[2.5rem] bg-card border border-border flex items-center justify-center mb-8 shadow-2xl relative group">
                      <div className={`absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${mode === 'scenario' ? 'bg-primary' : 'bg-accent'}`} />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative z-10"
                      >
                        {currentContent.icon}
                      </motion.div>
                    </div>

                    <h2 className={`text-4xl font-black italic uppercase tracking-tighter mb-6 ${mode === 'scenario' ? 'text-primary' : 'text-accent'}`}>
                      {currentContent.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-lg font-medium leading-[1.6] max-w-md mx-auto italic">
                      "{currentContent.text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-16 flex gap-4">
                {activeTab !== 'instructions' ? (
                  <button
                    onClick={() => setActiveTab(tabs[tabs.indexOf(activeTab) + 1])}
                    className="flex-1 py-5 rounded-3xl bg-muted border border-border text-foreground font-black uppercase tracking-[0.3em] text-sm hover:bg-muted/80 transition-all flex items-center justify-center gap-3"
                  >
                    Next Concept
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className={`flex-1 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-sm shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 ${
                      mode === 'scenario' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    Begin Operations
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InstructionModal;
