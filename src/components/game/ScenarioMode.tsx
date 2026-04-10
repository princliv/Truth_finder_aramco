import { useState, useMemo, useEffect } from 'react';
import { t, Language } from '@/lib/i18n';
import ProgressBar from './ProgressBar';
import { Zap, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import AvatarInstructor from './AvatarInstructor';

interface ScenarioModeProps {
  lang: Language;
  onComplete: (score: number) => void;
  onTriggerAI: (prompt: string) => void;
  onLevelChange: (level: number) => void;
}

type ResponseType = 'reactive' | 'defensive' | 'reflective' | 'veryDangerous';

interface Scenario {
  titleKey: string;
  descKey: string;
  options: { type: ResponseType; key: string }[];
  kernelKey: string;
}

const scenarios: Scenario[] = [
  {
    titleKey: 'scenario1Title',
    descKey: 'scenario1Desc',
    options: [
      { type: 'reactive', key: 'scenario1Reactive' },
      { type: 'defensive', key: 'scenario1Defensive' },
      { type: 'reflective', key: 'scenario1Reflective' },
      { type: 'veryDangerous', key: 'scenario1Dangerous' },
    ],
    kernelKey: 'scenario1Kernel',
  },
  {
    titleKey: 'scenario2Title',
    descKey: 'scenario2Desc',
    options: [
      { type: 'reactive', key: 'scenario2Reactive' },
      { type: 'defensive', key: 'scenario2Defensive' },
      { type: 'reflective', key: 'scenario2Reflective' },
      { type: 'veryDangerous', key: 'scenario2Dangerous' },
    ],
    kernelKey: 'scenario2Kernel',
  },
  {
    titleKey: 'scenario3Title',
    descKey: 'scenario3Desc',
    options: [
      { type: 'reactive', key: 'scenario3Reactive' },
      { type: 'defensive', key: 'scenario3Defensive' },
      { type: 'reflective', key: 'scenario3Reflective' },
      { type: 'veryDangerous', key: 'scenario3Dangerous' },
    ],
    kernelKey: 'scenario3Kernel',
  },
  {
    titleKey: 'scenario4Title',
    descKey: 'scenario4Desc',
    options: [
      { type: 'reactive', key: 'scenario4Reactive' },
      { type: 'defensive', key: 'scenario4Defensive' },
      { type: 'reflective', key: 'scenario4Reflective' },
      { type: 'veryDangerous', key: 'scenario4Dangerous' },
    ],
    kernelKey: 'scenario4Kernel',
  },
  {
    titleKey: 'scenario5Title',
    descKey: 'scenario5Desc',
    options: [
      { type: 'reactive', key: 'scenario5Reactive' },
      { type: 'defensive', key: 'scenario5Defensive' },
      { type: 'reflective', key: 'scenario5Reflective' },
      { type: 'veryDangerous', key: 'scenario5Dangerous' },
    ],
    kernelKey: 'scenario5Kernel',
  },
];

const ScenarioMode = ({ lang, onComplete, onTriggerAI, onLevelChange }: ScenarioModeProps) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selected, setSelected] = useState<ResponseType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const level = currentScenario < 2 ? 1 : currentScenario < 4 ? 2 : 3;
    onLevelChange(level);
  }, [currentScenario, onLevelChange]);

  const scenario = scenarios[currentScenario];
  
  const shuffledOptions = useMemo(() => {
    return [...scenario.options].sort(() => Math.random() - 0.5);
  }, [currentScenario]);

  const isCorrect = selected === 'reflective';
  const isDangerous = selected === 'veryDangerous';

  const handleSelect = (type: ResponseType) => {
    if (showFeedback) return;
    setSelected(type);
    
    setTimeout(() => {
      setShowFeedback(true);
      if (type === 'reflective') {
        setScore(prev => prev + 1);
        setXp(prev => prev + 50);
      } else if (type === 'defensive') {
        setXp(prev => prev + 25);
      } else if (type === 'reactive') {
        setXp(prev => prev + 10);
        onTriggerAI(t(lang, 'aiPrompt4'));
      } else if (type === 'veryDangerous') {
        setXp(prev => prev + 0);
        onTriggerAI(t(lang, 'aiPrompt3'));
      }
    }, 600);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  const getTypeColor = (type: ResponseType, isSelected: boolean) => {
    if (!isSelected) return 'bg-muted/50 backdrop-blur-sm text-foreground/80 border-border hover:border-secondary hover:shadow-lg transition-all';
    
    switch (type) {
      case 'reflective': return 'gradient-primary text-primary-foreground border-transparent shadow-[0_0_20px_rgba(0,163,224,0.3)] scale-[1.02]';
      case 'defensive': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-100 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)] scale-[1.02]';
      case 'reactive': return 'bg-orange-500/20 text-orange-600 dark:text-orange-100 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)] scale-[1.02]';
      case 'veryDangerous': return 'bg-red-500/20 text-red-600 dark:text-red-100 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] scale-[1.02]';
      default: return '';
    }
  };

  const getTypeLabel = (type: ResponseType) => {
    if (type === 'defensive') return t(lang, 'responseDefensive');
    if (type === 'veryDangerous') return t(lang, 'veryDangerous');
    return t(lang, type);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in relative z-10">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{t(lang, 'scenarioMode')}</h4>
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass border-border shadow-xl">
          <Zap className="w-5 h-5 text-secondary animate-pulse" />
          <span className="text-sm font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{xp} XP</span>
        </div>
      </div>

      <ProgressBar current={currentScenario + 1} total={scenarios.length} label="" lang={lang} />

      <div className="mt-12 group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-50" />
        <div className="relative p-10 rounded-[2.5rem] glass border-border shadow-2xl overflow-hidden animate-slide-up">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest gradient-primary text-primary-foreground shadow-xl">
                {t(lang, scenario.titleKey as any)}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-foreground italic tracking-tighter leading-tight">
              {t(lang, scenario.descKey as any)}
            </h3>
          </div>

          <div className="space-y-4">
            {shuffledOptions.map(({ type, key }) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                disabled={selected !== null}
                className={`w-full p-6 rounded-3xl text-start transition-all duration-500 border flex items-center gap-6 group/opt ${getTypeColor(type, selected === type)}`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  selected === type ? 'bg-white/20' : 'bg-muted group-hover/opt:bg-secondary/20'
                }`}>
                  {selected === type ? (
                    type === 'reflective' ? <CheckCircle2 className="w-6 h-6" /> : 
                    type === 'defensive' ? <Info className="w-6 h-6" /> :
                    type === 'reactive' ? <XCircle className="w-6 h-6" /> :
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20 group-hover/opt:bg-secondary group-hover/opt:scale-150 transition-all shadow-sm" />
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] block mb-2 ${selected === type ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {getTypeLabel(type)}
                  </span>
                  <span className="text-lg font-bold leading-tight">{t(lang, key as any)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AvatarInstructor
        isOpen={showFeedback}
        isCorrect={isCorrect}
        statement={selected ? t(lang, scenario.options.find(o => o.type === selected)?.key as any) : ''}
        feedback={t(lang, scenario.kernelKey as any)}
        onNext={nextScenario}
        lang={lang}
      />
    </div>
  );
};

export default ScenarioMode;
