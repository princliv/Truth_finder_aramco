import { useState, useEffect } from 'react';
import { t, Language } from '@/lib/i18n';
import ProgressBar from './ProgressBar';
import { ChevronRight, ChevronLeft, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AvatarInstructor from './AvatarInstructor';

interface WorksheetFlowProps {
  lang: Language;
  onComplete: (answers: Record<string, any>) => void;
  onTriggerAI: (prompt: string) => void;
  onLevelChange: (level: number) => void;
}

const TOTAL_STEPS = 6;

const WorksheetFlow = ({ lang, onComplete, onTriggerAI, onLevelChange }: WorksheetFlowProps) => {
  const [step, setStep] = useState(1);
  const [showInstructor, setShowInstructor] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({
    firstReaction: [] as string[],
    emotions: [] as string[],
    behavior: '',
    pattern: '',
    reflection1: '',
    reflection2: '',
    selfAwareness1: '',
    selfAwareness2: '',
  });
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const level = step <= 2 ? 1 : step <= 4 ? 2 : 3;
    onLevelChange(level);
  }, [step, onLevelChange]);

  const handleMultiSelect = (key: string, value: string) => {
    const current = answers[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [key]: updated });
  };

  const handleSingleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleTextChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const nextStep = () => {
    setXp(prev => prev + 50);
    // After each step, show the instructor with some insight
    setShowInstructor(true);
  };

  const confirmNext = () => {
    setShowInstructor(false);
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  const renderChip = (key: string, value: string, label: string, multi: boolean) => {
    const isSelected = multi
      ? (answers[key] as string[]).includes(value)
      : answers[key] === value;

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        key={value}
        onClick={() => {
          if (multi) handleMultiSelect(key, value);
          else handleSingleSelect(key, value);

          if (['deny', 'defend', 'getAngry', 'defensive', 'seekRevenge', 'avoidPerson'].includes(value)) {
            setTimeout(() => onTriggerAI(t(lang, 'aiPrompt1')), 800);
          }
        }}
        className={`px-6 py-4 rounded-2xl text-sm font-bold transition-all border ${
          isSelected
            ? 'gradient-primary text-primary-foreground border-transparent shadow-xl ring-2 ring-primary/50'
            : 'bg-muted text-foreground/80 border-border hover:border-primary/50 hover:bg-muted/80'
        }`}
      >
        {label}
      </motion.button>
    );
  };

  const renderEmotionCard = (value: string, label: string, emoji: string) => {
    const isSelected = (answers.emotions as string[]).includes(value);
    return (
      <motion.button
        whileHover={{ scale: 1.1, rotate: isSelected ? 0 : 2 }}
        whileTap={{ scale: 0.9 }}
        key={value}
        onClick={() => {
          handleMultiSelect('emotions', value);
          if (['defensive', 'frustrated', 'anxious'].includes(value)) {
            setTimeout(() => onTriggerAI(t(lang, 'aiPrompt2')), 800);
          }
        }}
        className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all border ${
          isSelected
            ? 'gradient-primary text-primary-foreground border-transparent shadow-2xl ring-4 ring-primary/20 scale-105'
            : 'glass text-foreground/70 border-border hover:border-secondary/50'
        }`}
      >
        <span className="text-4xl filter drop-shadow-lg">{emoji}</span>
        <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      </motion.button>
    );
  };

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                {t(lang, `step${step}Title` as any)}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              {t(lang, `step${step}Desc` as any)}
            </p>
          </div>

          <div className="mt-8">
            {step === 1 && (
              <div className="flex flex-wrap gap-4">
                {renderChip('firstReaction', 'deny', t(lang, 'deny'), true)}
                {renderChip('firstReaction', 'defend', t(lang, 'defend'), true)}
                {renderChip('firstReaction', 'goQuiet', t(lang, 'goQuiet'), true)}
                {renderChip('firstReaction', 'listenCarefully', t(lang, 'listenCarefully'), true)}
                {renderChip('firstReaction', 'feelHurt', t(lang, 'feelHurt'), true)}
                {renderChip('firstReaction', 'getAngry', t(lang, 'getAngry'), true)}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {renderEmotionCard('frustrated', t(lang, 'frustrated'), '😤')}
                {renderEmotionCard('anxious', t(lang, 'anxious'), '😰')}
                {renderEmotionCard('sad', t(lang, 'sad'), '😢')}
                {renderEmotionCard('curious', t(lang, 'curious'), '🤔')}
                {renderEmotionCard('defensive', t(lang, 'defensive'), '🛡️')}
                {renderEmotionCard('calm', t(lang, 'calm'), '😌')}
                {renderEmotionCard('confused', t(lang, 'confused'), '😕')}
                {renderEmotionCard('motivated', t(lang, 'motivated'), '💪')}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { val: 'avoidPerson', icon: '🚶' },
                  { val: 'seekRevenge', icon: '⚔️' },
                  { val: 'reflectAlone', icon: '🧘' },
                  { val: 'askForMore', icon: '🔍' },
                  { val: 'talkToOthers', icon: '💬' },
                  { val: 'writeItDown', icon: '📝' },
                ].map(({ val, icon }) => (
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    key={val}
                    onClick={() => {
                      handleSingleSelect('behavior', val);
                      if (['avoidPerson', 'seekRevenge'].includes(val)) {
                        setTimeout(() => onTriggerAI(t(lang, 'aiPrompt3')), 800);
                      }
                    }}
                    className={`flex items-center gap-4 p-6 rounded-2xl transition-all border text-start ${
                      answers.behavior === val
                        ? 'gradient-primary text-primary-foreground border-transparent shadow-xl ring-2 ring-primary/30'
                        : 'glass text-foreground/70 border-border hover:border-secondary/50'
                    }`}
                  >
                    <span className="text-3xl">{icon}</span>
                    <span className="text-sm font-bold uppercase tracking-wider">{t(lang, val as any)}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4">
                {['patternReactive', 'patternDefensive', 'patternAvoidant', 'patternReflective'].map((val) => (
                  <motion.button
                    whileHover={{ scale: 1.01, rotateX: 5 }}
                    key={val}
                    onClick={() => handleSingleSelect('pattern', val)}
                    className={`p-6 rounded-2xl text-start transition-all border ${
                      answers.pattern === val
                        ? 'gradient-primary text-primary-foreground border-transparent shadow-xl ring-2 ring-primary/30'
                        : 'glass text-foreground/70 border-border hover:border-secondary/50'
                    }`}
                  >
                    <span className="text-base font-bold italic tracking-tight">{t(lang, val as any)}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {(step === 5 || step === 6) && (
              <div className="space-y-8">
                {[1, 2].map(i => {
                  const key = step === 5 ? `reflection${i}` : `selfAwareness${i}`;
                  const labelKey = step === 5 ? (i === 1 ? 'whatKernel' : 'whatWouldChange') : (i === 1 ? 'iUsuallyReactBy' : 'oneThingICanImprove');
                  return (
                    <div key={i}>
                      <label className="block text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">{t(lang, labelKey as any)}</label>
                      <textarea
                        value={answers[key]}
                        onChange={(e) => handleTextChange(key, e.target.value)}
                        className="w-full p-6 rounded-3xl glass border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-32 text-lg transition-all placeholder:text-muted-foreground/30"
                        placeholder="Type your reflection here..."
                        dir={isRtl ? 'rtl' : 'ltr'}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const getStepInsight = () => {
    return t(lang, `insightStep${step}` as any) || "Great progress! You're becoming a master of your own mind.";
  };

  const canProceed = () => {
    switch (step) {
      case 1: return answers.firstReaction.length > 0;
      case 2: return answers.emotions.length > 0;
      case 3: return answers.behavior !== '';
      case 4: return answers.pattern !== '';
      case 5: return answers.reflection1.trim() !== '' && answers.reflection2.trim() !== '';
      case 6: return answers.selfAwareness1.trim() !== '' && answers.selfAwareness2.trim() !== '';
      default: return true;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in relative z-10">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{t(lang, 'worksheetMode')}</h4>
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass border-border shadow-xl">
          <Zap className="w-5 h-5 text-secondary animate-pulse" />
          <span className="text-sm font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{xp} XP</span>
        </div>
      </div>

      <ProgressBar current={step} total={TOTAL_STEPS} label="" lang={lang} />

      <div className="mt-12 group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-50" />
        <div className="relative p-10 rounded-[2.5rem] glass border-border shadow-2xl overflow-hidden min-h-[400px]">
          {renderStep()}
        </div>
      </div>

      <div className="flex flex-row justify-between mt-10">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
            step === 1
              ? 'opacity-20 cursor-not-allowed text-muted-foreground/20'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <BackIcon className="w-5 h-5" />
          {t(lang, 'back')}
        </motion.button>

        <motion.button
          whileHover={canProceed() ? { scale: 1.05 } : {}}
          whileTap={canProceed() ? { scale: 0.95 } : {}}
          onClick={nextStep}
          disabled={!canProceed()}
          className={`flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all ${
            canProceed() 
              ? 'gradient-primary text-primary-foreground hover:shadow-primary/40' 
              : 'bg-muted text-muted-foreground/20 cursor-not-allowed grayscale'
          }`}
        >
          {step === TOTAL_STEPS ? t(lang, 'submit') : t(lang, 'next')}
          <NextIcon className="w-5 h-5" />
        </motion.button>
      </div>

      <AvatarInstructor
        isOpen={showInstructor}
        isCorrect={true}
        statement={`Step ${step} Completed`}
        feedback={getStepInsight()}
        onNext={confirmNext}
        lang={lang}
      />
    </div>
  );
};

export default WorksheetFlow;
