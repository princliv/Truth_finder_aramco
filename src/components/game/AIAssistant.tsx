import { useState, useEffect } from 'react';
import { t, Language } from '@/lib/i18n';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface AIAssistantProps {
  lang: Language;
  prompt: string | null;
  onDismiss: () => void;
}

interface KnowledgeNode {
  questionKey: string;
  options: { labelKey: string; nextNodeId: string | null; responseKey: string }[];
}

// Branching simulation tree
const knowledgeTree: Record<string, KnowledgeNode> = {
  root: {
    questionKey: 'kbRootQ',
    options: [
      { labelKey: 'kbRootOpt1', nextNodeId: 'emotions', responseKey: 'kbRootResp1' },
      { labelKey: 'kbRootOpt2', nextNodeId: 'kernel', responseKey: 'kbRootResp2' },
      { labelKey: 'kbRootOpt3', nextNodeId: 'pause', responseKey: 'kbRootResp3' },
    ],
  },
  emotions: {
    questionKey: 'kbEmotionsQ',
    options: [
      { labelKey: 'kbEmotionsOpt1', nextNodeId: 'emotions_deep', responseKey: 'kbEmotionsResp1' },
      { labelKey: 'kbEmotionsOpt2', nextNodeId: 'emotions_deep', responseKey: 'kbEmotionsResp2' },
      { labelKey: 'kbEmotionsOpt3', nextNodeId: null, responseKey: 'kbEmotionsResp3' },
    ],
  },
  emotions_deep: {
    questionKey: 'kbEmotionsDeepQ',
    options: [
      { labelKey: 'kbEmotionsDeepOpt1', nextNodeId: null, responseKey: 'kbEmotionsDeepResp1' },
      { labelKey: 'kbEmotionsDeepOpt2', nextNodeId: null, responseKey: 'kbEmotionsDeepResp2' },
    ],
  },
  kernel: {
    questionKey: 'kbKernelQ',
    options: [
      { labelKey: 'kbKernelOpt1', nextNodeId: 'kernel_deep', responseKey: 'kbKernelResp1' },
      { labelKey: 'kbKernelOpt2', nextNodeId: 'kernel_deep', responseKey: 'kbKernelResp2' },
    ],
  },
  kernel_deep: {
    questionKey: 'kbKernelDeepQ',
    options: [
      { labelKey: 'kbKernelDeepOpt1', nextNodeId: null, responseKey: 'kbKernelDeepResp1' },
      { labelKey: 'kbKernelDeepOpt2', nextNodeId: null, responseKey: 'kbKernelDeepResp2' },
    ],
  },
  pause: {
    questionKey: 'kbPauseQ',
    options: [
      { labelKey: 'kbPauseOpt1', nextNodeId: null, responseKey: 'kbPauseResp1' },
      { labelKey: 'kbPauseOpt2', nextNodeId: null, responseKey: 'kbPauseResp2' },
    ],
  },
};

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

const AIAssistant = ({ lang, prompt, onDismiss }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<string>('root');
  const [showOptions, setShowOptions] = useState(true);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  // Handle external trigger prompts
  useEffect(() => {
    if (prompt && prompt !== lastPrompt) {
      setLastPrompt(prompt);
      setIsOpen(true);
      setMessages([{ role: 'assistant', text: prompt }]);
      setCurrentNode('root');
      setShowOptions(true);
    }
  }, [prompt, lastPrompt]);

  const startConversation = () => {
    const node = knowledgeTree.root;
    setMessages([{ role: 'assistant', text: t(lang, node.questionKey as any) }]);
    setCurrentNode('root');
    setShowOptions(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      startConversation();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onDismiss();
  };

  const handleOptionSelect = (option: { labelKey: string; nextNodeId: string | null; responseKey: string }) => {
    const userText = t(lang, option.labelKey as any);
    const responseText = t(lang, option.responseKey as any);

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: userText },
      { role: 'assistant', text: responseText },
    ];

    if (option.nextNodeId) {
      const nextNode = knowledgeTree[option.nextNodeId];
      newMessages.push({ role: 'assistant', text: t(lang, nextNode.questionKey as any) });
      setCurrentNode(option.nextNodeId);
      setShowOptions(true);
    } else {
      // End of branch - offer to restart
      setShowOptions(false);
    }

    setMessages(newMessages);
  };

  const handleRestart = () => {
    setMessages([]);
    startConversation();
  };

  const node = knowledgeTree[currentNode];

  return (
    <>
      {/* Panel - always positioned above the button at bottom-right */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl bg-card/95 backdrop-blur-lg border border-border card-shadow animate-scale-in flex flex-col max-h-[60vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                {t(lang, 'reflect')}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${msg.role === 'assistant'
                    ? 'text-foreground'
                    : 'text-secondary font-medium text-right'
                  }`}
              >
                {msg.role === 'assistant' && (
                  <span className="text-xs text-muted-foreground block mb-1">🤖 Assistant</span>
                )}
                <p className={`${msg.role === 'user'
                    ? 'inline-block px-3 py-2 rounded-xl bg-secondary/10 text-foreground'
                    : ''
                  }`}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="p-4 border-t border-border/50 space-y-2">
            {showOptions && node ? (
              node.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-foreground bg-muted/50 hover:bg-muted border border-border/50 hover:border-secondary transition-all text-left"
                >
                  <span>{t(lang, opt.labelKey as any)}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              ))
            ) : (
              <button
                onClick={handleRestart}
                className="w-full px-3 py-2.5 rounded-xl text-sm font-medium gradient-primary text-primary-foreground transition-all"
              >
                {t(lang, 'kbRestart' as any)}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating button - always fixed at bottom-right */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${!isOpen ? 'glow-teal animate-pulse-soft' : ''
          }`}
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </button>
    </>
  );
};

export default AIAssistant;
