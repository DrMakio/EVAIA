import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  Send, ArrowLeft, RotateCcw, MessageCircle, XCircle, ArrowDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './index.css';
import { WIZARD_THEMES, WIZARD_DATA, OUTFIT_WIZARD } from './wizardData';

// --- CONFIG ---
const getApiKey = () => {
  try { return (import.meta as any).env?.VITE_GEMINI_API_KEY || ""; } 
  catch (e) { return ""; }
};
const API_KEY = getApiKey();
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// IMAGES
const HERO_IMG = "/hero.png";
const MAKEUP_IMG = "/makeup.png";

// --- COMPONENTS ---
const ThinkingDots = () => (
  <div className="thinking-container">
    <img src="/eva-avatar.png" className="avatar-img" alt="Eva" />
    <div className="thinking-content">
      <div className="dot-group">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span className="thinking-text">Eva está pensando...</span>
    </div>
  </div>
);

const BlinkingCursor = () => (
  <motion.span 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
    className="blinking-cursor"
  >|</motion.span>
);

const AnimatedBackground = ({ active }: { active: boolean }) => {
  const [frame, setFrame] = useState(1);
  const totalFrames = 200;

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setFrame(f => (f % totalFrames) + 1);
    }, 50); // 20fps
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className={`animated-bg-container ${active ? 'visible' : ''}`}>
      <img 
        src={`/frames/ezgif-frame-${frame.toString().padStart(3, '0')}.jpg`} 
        alt="bg-frame" 
        className="bg-frame-img"
      />
      <div className="bg-overlay"></div>
    </div>
  );
};

function App() {
  const [view, setView] = useState<'home' | 'wizard' | 'result' | 'chat'>('home');
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showDecisionPoint, setShowDecisionPoint] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  
  // Streaming States
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  
  // Scroll State
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  useEffect(() => {
    if (isStreaming && !showScrollBottom) {
      scrollToBottom();
    }
  }, [messages, isStreaming]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollBottom(!isAtBottom);
  };

  const isOutfit = selectedThemeId === 1;
  const currentBlock = isOutfit ? OUTFIT_WIZARD[currentBlockIndex] : null;
  const currentQuestionsList = isOutfit ? currentBlock?.questions : WIZARD_DATA[selectedThemeId || 0];
  const currentQuestion = currentQuestionsList && currentQuestionsList.length > currentStep ? currentQuestionsList[currentStep] : null;

  const handleStartWizard = (id: number) => {
    setSelectedThemeId(id);
    setCurrentStep(0);
    setCurrentBlockIndex(0);
    setShowDecisionPoint(false);
    setAnswers({});
    setMessages([]);
    setView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStep < (currentQuestionsList?.length || 0) - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (isOutfit && currentBlockIndex < OUTFIT_WIZARD.length - 1) {
        setShowDecisionPoint(true);
      } else {
        generateAIRecommendation();
      }
    }
  };

  const handleBack = () => {
    if (showDecisionPoint) { setShowDecisionPoint(false); return; }
    if (currentStep > 0) { setCurrentStep(prev => prev - 1); }
    else if (isOutfit && currentBlockIndex > 0) {
      const prevBlock = OUTFIT_WIZARD[currentBlockIndex - 1];
      setCurrentBlockIndex(prev => prev - 1);
      setCurrentStep(prevBlock.questions.length - 1);
    } else { setView('home'); }
  };

  const streamResponse = async (prompt: string, systemInstruction: string) => {
    const msgId = Date.now().toString();
    setIsStreaming(true);
    setIsStopped(false);
    setIsThinking(true);
    setMessages(prev => [...prev, { id: msgId, role: 'bot', text: '', timestamp: new Date(), isStreaming: true }]);

    const maxRetries = 3;
    let retryCount = 0;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        const model = genAI!.getGenerativeModel({ model: "gemini-2.0-flash-lite", systemInstruction });
        const result = await model.generateContentStream(prompt);
        
        setIsThinking(false);
        let fullText = '';
        
        for await (const chunk of result.stream) {
          if (isStopped) break;
          const chunkText = chunk.text();
          fullText += chunkText;
          
          const words = chunkText.split(' ');
          for (let i = 0; i < words.length; i++) {
            if (isStopped) break;
            setMessages(prev => prev.map(m => 
              m.id === msgId ? { ...m, text: m.text + (i === 0 ? '' : ' ') + words[i] } : m
            ));
            await new Promise(r => setTimeout(r, 60));
          }
        }
        success = true;
      } catch (e: any) {
        console.error("Attempt", retryCount + 1, "failed:", e);
        if (e.message?.includes("429") || e.message?.includes("quota")) {
          retryCount++;
          if (retryCount < maxRetries) {
            await new Promise(r => setTimeout(r, 2000 * retryCount)); // Backoff
            continue;
          }
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: m.text + '\n\n*Eva está un poco saturada de consultas en este momento. Por favor, espera un minuto e intenta de nuevo.*' } : m));
        } else {
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: m.text + '\n\n*Eva ha tenido un momento de distracción. ¿Podemos intentar de nuevo?*' } : m));
          break;
        }
      }
    }
    
    setIsStreaming(false);
    setIsThinking(false);
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
  };

  const generateAIRecommendation = async () => {
    setView('result');
    const themeTitle = WIZARD_THEMES.find(t => t.id === selectedThemeId)?.title;
    const prompt = `Wizard: ${themeTitle}. Respuestas: ${JSON.stringify(answers)}. Genera una recomendación estructurada.`;
    const systemInstruction = "Eres Eva, asesora experta. Tono editorial. Estructura: Concepto, Piezas Clave, Accesorios, Tip Pro. No uses JSON crudo.";
    await streamResponse(prompt, systemInstruction);
  };

  const handleSendChatMessage = async () => {
    if (!input.trim() || isStreaming) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    const systemInstruction = "Eres Eva, asesora experta. Estás refinando una consulta.";
    await streamResponse(currentInput, systemInstruction);
  };

  if (!API_KEY) return <div className="serif-text" style={{ padding: '60px', textAlign: 'center' }}>Falta API Key</div>;

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo-text serif-text">Eva AI</h1>
        <nav className="nav-bar">
          <a href="#" className="nav-item" onClick={() => setView('home')}>Inicio</a>
          <div className="nav-divider"></div>
          <a href="#" className="nav-item">Consultas</a>
          <div className="nav-divider"></div>
          <a href="#" className="nav-item">Tips</a>
        </nav>
      </header>

      <div className="main-content" ref={scrollContainerRef} onScroll={handleScroll}>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="full-section" style={{ backgroundImage: `url(${HERO_IMG})` }}>
                <div className="section-overlay"></div>
                <div className="section-content-wrapper">
                  <div className="hero-content">
                    <span className="label-caps">Editorial Premium</span>
                    <h2 className="hero-headline serif-text">Tu estilo,<br/>sin reglas pero<br/>con criterio.</h2>
                    <button className="btn btn-primary" onClick={() => handleStartWizard(1)}>Iniciar Asesoría</button>
                  </div>
                </div>
              </section>
              {/* Otras secciones simplificadas por brevedad */}
              <section className="full-section" style={{ backgroundImage: `url(${MAKEUP_IMG})` }}>
                <div className="section-overlay"></div>
                <div className="section-content-wrapper">
                  <h2 className="serif-text" style={{ fontSize: '64px' }}>Belleza &<br/>Maquillaje</h2>
                  <button className="btn btn-secondary" onClick={() => handleStartWizard(2)}>Descubrir</button>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'wizard' && (
            <motion.div key="wizard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="wizard-container">
              {!showDecisionPoint ? (
                <>
                  <div className="wizard-progress"><div className="wizard-progress-bar" style={{ width: `${((currentStep + 1) / (currentQuestionsList?.length || 1)) * 100}%` }}></div></div>
                  <h2 className="question-title serif-text">{currentQuestion?.question}</h2>
                  <div className="options-list">
                    {currentQuestion?.type === 'select' && currentQuestion.options?.map((opt: any) => (
                      <button key={opt} className={`option-btn ${answers[currentQuestion.id] === opt ? 'selected' : ''}`} onClick={() => setAnswers(p => ({ ...p, [currentQuestion.id]: opt }))}>{opt}</button>
                    ))}
                    {currentQuestion?.type === 'text' && <textarea className="text-input" value={answers[currentQuestion.id] || ''} onChange={e => setAnswers(p => ({ ...p, [currentQuestion.id]: e.target.value }))} />}
                  </div>
                  <div className="wizard-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    <button className="btn btn-secondary" onClick={handleBack}><ArrowLeft size={14} /> Atrás</button>
                    <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h2 className="serif-text" style={{ fontSize: '32px' }}>Buen avance</h2>
                  <p>{currentBlock?.decisionMessage}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}>
                    <button className="btn btn-primary" onClick={() => { setShowDecisionPoint(false); setCurrentBlockIndex(p => p + 1); setCurrentStep(0); }}>Seguir refinando</button>
                    <button className="btn btn-secondary" onClick={generateAIRecommendation}>Generar ahora</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="result-container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
              <AnimatedBackground active={isStreaming || isThinking} />
              
              <div className="result-text">
                {isThinking && <ThinkingDots />}
                {messages.map(m => (
                  <div key={m.id} className="message-wrapper">
                    {m.role === 'bot' && <img src="/eva-avatar.png" className="avatar-img small" alt="Eva" />}
                    <div className="message-text">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                      {m.isStreaming && <BlinkingCursor />}
                    </div>
                  </div>
                ))}
              </div>

              {!isStreaming && !isThinking && messages.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="result-actions" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                  <button className="btn btn-primary" style={{ gap: '10px' }} onClick={() => setView('chat')}><MessageCircle size={14} /> Refinar con chat</button>
                  <button className="btn btn-secondary" style={{ gap: '10px' }} onClick={() => setView('home')}><RotateCcw size={14} /> Nueva consulta</button>
                </motion.div>
              )}
              
              {isStreaming && (
                <button className="btn-stop" onClick={() => setIsStopped(true)}><XCircle size={14} /> Detener</button>
              )}
              <div ref={chatEndRef} />
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', height: '75vh', position: 'relative' }}>
              <AnimatedBackground active={isStreaming || isThinking} />
              <div className="chat-area" style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 5 }}>
                {messages.map(m => (
                  <div key={m.id} className={`message-wrapper ${m.role}`}>
                    {m.role === 'bot' && <img src="/eva-avatar.png" className="avatar-img small" alt="Eva" />}
                    <div className={`message ${m.role}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                      {m.isStreaming && <BlinkingCursor />}
                    </div>
                  </div>
                ))}
                {isThinking && <ThinkingDots />}
                <div ref={chatEndRef} />
              </div>
              <div className="input-area">
                {isStreaming && <div className="label-caps" style={{ marginBottom: '10px', fontSize: '10px' }}>Eva está escribiendo...</div>}
                <div className="input-container">
                  <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendChatMessage()} placeholder={isStreaming ? "Espera a que Eva termine..." : "Escribe a Eva..."} disabled={isStreaming} />
                  <button className="send-btn" onClick={isStreaming ? () => setIsStopped(true) : handleSendChatMessage}>
                    {isStreaming ? <XCircle size={18} /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showScrollBottom && (
          <button className="scroll-bottom-btn" onClick={scrollToBottom}><ArrowDown size={16} /></button>
        )}
      </div>
    </div>
  );
}

export default App;
