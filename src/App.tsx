import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, ChevronRight, Sparkles, MessageSquare, BookOpen, Zap, Info } from 'lucide-react';
import { cn } from './lib/utils';
import Markdown from 'react-markdown';

// --- Types ---
type VibeMode = 'formal' | 'genz';
type ViewState = 'dashboard' | 'viewer';

interface TechnicalTerm {
  term: string;
  definition: string;
}

// --- Components ---

const Header = ({ vibe, setVibe }: { vibe: VibeMode, setVibe: (v: VibeMode) => void }) => (
  <nav className="glass rounded-2xl p-4 flex items-center justify-between shadow-sm relative z-50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
        <Upload className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-slate-800 font-display">PaperSimplifier</span>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex bg-white/50 p-1 rounded-full border border-white/40 shadow-inner">
        <button 
          onClick={() => setVibe('formal')}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
            vibe === 'formal' ? "bg-white text-sky-600 shadow-sm" : "text-slate-400"
          )}
        >
          Academic
        </button>
        <button 
          onClick={() => setVibe('genz')}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
            vibe === 'genz' ? "bg-white text-sky-600 shadow-sm" : "text-slate-400"
          )}
        >
          Savage Mode 🔥
        </button>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Vibe Switch</span>
      </div>
    </div>
  </nav>
);

const Dashboard = ({ onUpload }: { onUpload: () => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex-1 grid grid-cols-12 gap-4 h-full"
    >
      {/* Sidebar - Upload Box and Recent */}
      <div className="col-span-12 lg:col-span-3 glass rounded-2xl p-5 flex flex-col gap-4 shadow-sm h-full overflow-hidden">
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); onUpload(); }}
          onClick={onUpload}
          className={cn(
            "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-4 transition-all duration-300 cursor-pointer",
            isDragging ? "border-sky-500 bg-sky-100/50 scale-[0.98]" : "border-sky-300/50 bg-sky-50/30 hover:bg-sky-50/50"
          )}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
            <Upload className="text-sky-500 w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-700">Upload New PDF</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">Drag & Drop Area</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Papers</p>
          <div className="p-3 bg-white/60 rounded-xl border border-white/20 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs font-semibold text-slate-700 truncate">Deep_Learning_NLP.pdf</span>
          </div>
          <div className="p-3 bg-white/20 rounded-xl flex items-center gap-3 opacity-60">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span className="text-xs font-semibold text-slate-700 truncate">Quantum_Physics_v2.pdf</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-12 lg:col-span-9 glass rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest mb-6">
            Research Simplified
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Pahami Jurnal Apapun <br /> <span className="savage-gradient">Tanpa Pusing.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
            Upload PDF akademikmu dan biarkan AI kami mengubahnya menjadi bahasa yang gampang dimengerti. Tetap pintar, tapi santai.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
            {[
              { icon: Sparkles, title: "AI Powered", desc: "Ringkasan presisi tingkat tinggi." },
              { icon: Zap, title: "Speed Mode", desc: "Inti riset dalam < 10 detik." },
              { icon: MessageSquare, title: "Slang Toggle", desc: "Mode santai biar gak ngantuk." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/40 border border-white/20 p-4 rounded-xl shadow-sm">
                <feature.icon className="w-5 h-5 text-sky-500 mb-2" />
                <h3 className="font-bold text-sm text-slate-800">{feature.title}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </motion.div>
  );
};

const Viewer = ({ vibe, setVibe }: { vibe: VibeMode, setVibe: (v: VibeMode) => void }) => {
  const [progress, setProgress] = useState(65);
  const [activeTerm, setActiveTerm] = useState<TechnicalTerm | null>(null);

  const academicText = `The proposed architecture utilizes an advanced Gradient Descent algorithm combined with Multi-layer Perceptrons to achieve superior convergence in high-dimensional feature spaces. Preliminary results demonstrate a significant reduction in loss variance, outperforming traditional stochastic estimators in terms of both structural stability and computational efficiency.`;

  const simplifiedVersion = vibe === 'formal' 
    ? `Penelitian ini menggunakan struktur AI yang cerdas untuk mengolah data rumit secara lebih efisien. Hasil awal menunjukkan bahwa metode ini lebih stabil dan lebih cepat dibandingkan cara-cara lama yang sudah ada sebelumnya.`
    : `Jujurly, riset ini pake AI yang sat-set-sat-set buat nyelesaiin masalah data yang ribet banget. Intinya sih, hasilnya jauh lebih mantap, anti-repot, dan pastinya lebih kenceng daripada cara jadul yang biasa dipake orang-orang. Gacor parah!`;

  const terms: TechnicalTerm[] = [
    { term: "Gradient Descent", definition: "Cara matematika buat nyari 'jalan terpendek' atau solusi paling pas di sebuah AI." },
    { term: "Multi-layer Perceptron", definition: "Jaringan saraf buatan yang punya banyak lapisan, kayak otak kita tapi versi coding." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 grid grid-cols-12 gap-4 h-full min-h-0"
    >
      {/* Sidebar - Small Stats */}
      <div className="hidden lg:col-span-2 lg:flex flex-col gap-4 overflow-hidden">
        <div className="glass rounded-2xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Highlights</p>
          <div className="space-y-3">
            <div className="p-3 bg-white/60 rounded-xl border border-white/20">
              <p className="text-[10px] font-bold text-sky-600 uppercase">Efficiency</p>
              <p className="text-lg font-extrabold text-slate-800">+24%</p>
            </div>
            <div className="p-3 bg-white/60 rounded-xl border border-white/20">
              <p className="text-[10px] font-bold text-orange-600 uppercase">Complexity</p>
              <p className="text-lg font-extrabold text-slate-800">Low</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-4 shadow-sm flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Terminology</p>
          <div className="space-y-2">
            {terms.map((t, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTerm(t)}
                className="w-full text-left p-2.5 bg-sky-50 transition-all rounded-lg text-[11px] font-bold text-slate-600 border border-transparent hover:border-sky-200"
              >
                {t.term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Split View */}
      <div className="col-span-12 lg:col-span-10 glass rounded-2xl p-6 flex flex-col gap-4 shadow-lg overflow-hidden border-2 border-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-sky-100 text-sky-700 text-[10px] font-bold rounded-md uppercase">Original Text</span>
            <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-sky-500" 
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">PROGRESS: {progress}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-md uppercase",
              vibe === 'formal' ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"
            )}>
              Simplified ({vibe === 'formal' ? 'Academic' : 'Savage'})
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
          {/* Academic Text Area */}
          <div className="flex-1 bg-slate-50/50 rounded-2xl p-6 border border-white/20 overflow-y-auto shadow-inner">
             <h2 className="font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
               <BookOpen className="w-4 h-4 text-sky-500" /> Research Abstract
             </h2>
             <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              <p className="text-xl font-medium">
                {academicText.split(' ').map((word, i) => {
                  const baseWord = word.replace(/[.,]/g, '');
                  const termMatch = terms.find(t => baseWord === t.term.split(' ')[0] || (t.term.split(' ')[1] && baseWord === t.term.split(' ')[1]));
                  if (termMatch) {
                    return (
                      <span 
                        key={i} 
                        onClick={() => setActiveTerm(termMatch)}
                        className="cursor-help bg-sky-200/50 border-b-2 border-sky-400 transition-colors mx-0.5 px-0.5 rounded-sm"
                      >
                        {word}{' '}
                      </span>
                    );
                  }
                  return <span key={i}>{word} </span>;
                })}
              </p>
              <div className="mt-8 space-y-4 opacity-40">
                <p>The convergence of stochastic variables in non-linear manifolds represents a significant challenge in modern machine learning heuristics...</p>
                <p>Empirical evidence suggests that the inclusion of specific dropout layers enhances the overall robustness of the predictive model...</p>
              </div>
            </div>
          </div>

          {/* AI Output Area */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
             {vibe === 'formal' ? (
                <div className="self-end max-w-[95%] bg-white rounded-2xl rounded-tr-none p-5 shadow-sm border border-slate-100 relative">
                   <p className="text-sm text-slate-700 leading-relaxed font-serif italic mb-4">"The technical essence, translated for clarity."</p>
                   <div className="markdown-body">
                      <Markdown>{simplifiedVersion}</Markdown>
                   </div>
                </div>
             ) : (
               <>
                <div className="self-end max-w-[90%] bg-white rounded-2xl rounded-tr-none p-4 shadow-md border border-slate-100 italic font-serif">
                   <p className="text-sm text-slate-800 leading-relaxed">"Basically, it's just math trying to find the lowest point of a hill. Like finding your phone in the dark by feeling around the floor."</p>
                </div>
                <div className="self-start max-w-[95%] bg-sky-500 rounded-2xl rounded-tl-none p-6 shadow-lg text-white relative overflow-hidden flex-1">
                  <div className="relative z-10 h-full flex flex-col">
                    <p className="text-xs leading-relaxed font-extrabold mb-4 tracking-widest uppercase flex items-center gap-2">
                       <Zap className="w-4 h-4 fill-white" /> SAVAGE BREAKDOWN 🔥
                    </p>
                    <div className="text-lg leading-relaxed font-bold opacity-100 flex-1">
                      <Markdown>{simplifiedVersion}</Markdown>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20 text-[10px] font-bold uppercase tracking-tighter opacity-80 flex justify-between items-center">
                       <span>No Cap Verification Passed</span>
                       <Sparkles className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
               </>
             )}

             <div className="p-3 bg-white/50 border border-white/40 rounded-xl flex items-center justify-between mt-auto">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Ask AI anything...</span>
               <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-sky-600 transition-colors cursor-pointer">
                 <Zap className="w-4 h-4" />
               </div>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeTerm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setActiveTerm(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl max-w-sm shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Info className="text-sky-600 w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900">{activeTerm.term}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium">{activeTerm.definition}</p>
              <button 
                onClick={() => setActiveTerm(null)}
                className="w-full py-4 bg-sky-500 text-white rounded-xl font-extrabold shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all active:scale-[0.98]"
              >
                GOT IT, FAM!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('dashboard');
  const [vibe, setVibe] = useState<VibeMode>('genz');

  return (
    <div className="h-screen w-full p-4 flex flex-col gap-4 overflow-hidden max-w-7xl mx-auto">
      <Header vibe={vibe} setVibe={setVibe} />
      
      <main className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <Dashboard key="dashboard" onUpload={() => setView('viewer')} />
          ) : (
            <Viewer key="viewer" vibe={vibe} setVibe={setVibe} />
          )}
        </AnimatePresence>
      </main>
      
      <footer className="flex items-center justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"></div> 
            AI Engine Online
          </div>
          <span>|</span>
          <span>Latency: 24ms</span>
        </div>
        <div className="text-right">
          © 2026 PAPERSIMPLIFIER • GEN-Z APPROVED 🚀
        </div>
      </footer>
    </div>
  );
}
