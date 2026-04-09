import { useState, useEffect, useMemo } from 'react';
import { Language, t } from '@/lib/i18n';
import LanguageToggle from '@/components/game/LanguageToggle';
import IntroScreen from '@/components/game/IntroScreen';
import WorksheetFlow from '@/components/game/WorksheetFlow';
import ScenarioMode from '@/components/game/ScenarioMode';
import FinalScreen from '@/components/game/FinalScreen';
import AIAssistant from '@/components/game/AIAssistant';
import LevelTimeline from '@/components/game/LevelTimeline';
import InstructionModal from '@/components/game/InstructionModal';
import QuitModal from '@/components/game/QuitModal';

type GameState = 'intro' | 'worksheet' | 'scenario' | 'complete';

const Index = () => {
  const [lang, setLang] = useState<Language>('en');
  const [gameState, setGameState] = useState<GameState>('intro');
  const [mode, setMode] = useState<'worksheet' | 'scenario'>('worksheet');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [worksheetAnswers, setWorksheetAnswers] = useState<Record<string, any>>({});
  const [scenarioScore, setScenarioScore] = useState(0);
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);

  // Monitor level changes for instruction modal
  useEffect(() => {
    if (gameState !== 'intro' && gameState !== 'complete') {
      setShowInstruction(true);
    }
  }, [currentLevel, gameState]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const handleLogoClick = () => {
    if (gameState === 'intro' || gameState === 'complete') {
      setGameState('intro');
    } else {
      setShowQuitModal(true);
    }
  };

  const handleQuitConfirm = () => {
    setShowQuitModal(false);
    setGameState('intro');
  };

  const handleStartWorksheet = () => {
    setMode('worksheet');
    setGameState('worksheet');
    setCurrentLevel(1);
  };

  const handleStartScenario = () => {
    setMode('scenario');
    setGameState('scenario');
    setCurrentLevel(1);
  };

  const handleWorksheetComplete = (answers: Record<string, any>) => {
    setWorksheetAnswers(answers);
    setGameState('complete');
  };

  const handleScenarioComplete = (score: number) => {
    setScenarioScore(score);
    setGameState('complete');
  };

  const getLevelNames = () => {
    if (mode === 'worksheet') return [t(lang, 'worksheetL1'), t(lang, 'worksheetL2'), t(lang, 'worksheetL3')];
    return [t(lang, 'scenarioL1'), t(lang, 'scenarioL2'), t(lang, 'scenarioL3')];
  };

  const handleTryAgain = () => {
    setGameState('intro');
    setWorksheetAnswers({});
    setScenarioScore(0);
    setCurrentLevel(1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-foreground relative overflow-hidden dark">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 bg-tech-pattern opacity-40" />
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-20" />
      <div className="fixed inset-0 z-0 bg-mesh-gradient" />

      {/* Level Timeline (Sidebar) */}
      {gameState !== 'intro' && gameState !== 'complete' && (
        <LevelTimeline
          currentLevel={currentLevel}
          totalLevels={3}
          levelNames={getLevelNames()}
          lang={lang}
        />
      )}

      {/* Top bar - Logo left, Session center, Language right */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center px-6 py-4 bg-[#0F79B9] backdrop-blur-xl border-b border-white/10 shadow-lg">
        {/* Left: Company logo + name */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-3 flex-shrink-0 hover:scale-[1.05] transition-transform cursor-pointer focus:outline-none"
        >
          <img src="/favicon.ico" alt="Logo" className="w-50 h-10 object-contain" />
        </button>

        {/* Center: Session detail */}
        <div className="flex-1 text-center hidden md:block">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
              Session 4B: R2 – {mode === 'worksheet' ? 'Reflecting' : 'Assessing'}
            </span>
          </div>
        </div>

        {/* Right: Language toggle */}
        <div className="flex-shrink-0">
          <LanguageToggle lang={lang} onToggle={toggleLang} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-24">
        <div className="container mx-auto max-w-5xl px-4">
          {gameState === 'intro' && (
            <IntroScreen
              lang={lang}
              onStartWorksheet={handleStartWorksheet}
              onStartScenario={handleStartScenario}
            />
          )}

          {gameState === 'worksheet' && (
            <WorksheetFlow
              lang={lang}
              onComplete={handleWorksheetComplete}
              onTriggerAI={setAiPrompt}
              onLevelChange={setCurrentLevel}
            />
          )}

          {gameState === 'scenario' && (
            <ScenarioMode
              lang={lang}
              onComplete={handleScenarioComplete}
              onTriggerAI={setAiPrompt}
              onLevelChange={setCurrentLevel}
            />
          )}

          {gameState === 'complete' && (
            <FinalScreen
              lang={lang}
              mode={mode}
              worksheetAnswers={worksheetAnswers}
              scenarioScore={scenarioScore}
              onTryAgain={handleTryAgain}
              onContinue={handleTryAgain}
            />
          )}
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant
        lang={lang}
        prompt={aiPrompt}
        onDismiss={() => setAiPrompt(null)}
      />

      {/* Level Instruction Modal */}
      <InstructionModal
        isOpen={showInstruction}
        onClose={() => setShowInstruction(false)}
        lang={lang}
        level={currentLevel}
        levelName={getLevelNames()[currentLevel - 1]}
      />
      {/* Quit Confirmation Modal */}
      <QuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={handleQuitConfirm}
        lang={lang}
      />
    </div>
  );
};

export default Index;
