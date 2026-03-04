'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  Clock,
  GitBranch,
  ArrowRight
} from 'lucide-react';

export interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timestamp: Date;
}

interface ProcessPanelProps {
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
  commits: number;
  totalCommits: number;
  repository: string | null;
  category: string | null;
  startTime: number | null;
}

export default function ProcessPanel({
  isLoading,
  isComplete,
  error,
  commits,
  totalCommits,
  repository,
  category,
  startTime,
}: ProcessPanelProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  const progress = totalCommits > 0 ? (commits / totalCommits) * 100 : 0;
  const elapsedTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

  // Generate logs based on state
  useEffect(() => {
    if (isLoading && logs.length === 0) {
      // Initial logs
      addLog('info', 'Starting commit process...');
      setTimeout(() => addLog('info', 'Validating repository...'), 300);
      setTimeout(() => addLog('info', 'Connecting to GitHub API...'), 600);
    }
  }, [isLoading]);

  // Add commit logs as they progress
  useEffect(() => {
    if (commits > 0 && isLoading) {
      const lastLog = logs[logs.length - 1];
      if (!lastLog || lastLog.message.includes('pushed')) {
        // Simulated commit message for display
        const messages = [
          'feat: implement responsive navbar with mobile hamburger menu',
          'fix: resolve CSS specificity conflict in hero section',
          'refactor: extract reusable Button component',
          'docs: update README with local development setup',
          'perf: add lazy loading for below-fold images',
          'style: apply consistent 8px spacing system',
          'ci: configure GitHub Actions for lint checks',
          'feat: add dark mode toggle with localStorage',
          'fix: correct z-index stacking on modal',
          'chore: upgrade TailwindCSS to v4',
        ];
        const msgIndex = (commits - 1) % messages.length;
        setTimeout(() => {
          addLog('success', `Commit ${commits}/${totalCommits} pushed: ${messages[msgIndex]}`);
        }, 100);
        
        // Rate limit warning between commits
        if (commits < totalCommits && commits % 5 === 0) {
          setTimeout(() => {
            addLog('info', 'Waiting 2 seconds to avoid GitHub rate limit...');
          }, 800);
        }
      }
    }
  }, [commits, isLoading, totalCommits]);

  // Completion logs
  useEffect(() => {
    if (isComplete && !error && logs.length > 0) {
      const hasCompletionLog = logs.some(l => l.message.includes('successfully'));
      if (!hasCompletionLog) {
        setTimeout(() => {
          addLog('success', 'All commits pushed successfully!');
          addLog('info', `Total time: ${elapsedTime} seconds`);
        }, 500);
      }
    }
  }, [isComplete, error, elapsedTime]);

  // Error logs
  useEffect(() => {
    if (error) {
      addLog('error', error);
    }
  }, [error]);

  const addLog = (type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: new Date(),
    }]);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isLoading && !isComplete && logs.length === 0) {
    return null;
  }

  const getTypeIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#3FB950]" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-[#F85149]" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-[#D29922]" />;
      default:
        return <Info className="w-4 h-4 text-[#58A6FF]" />;
    }
  };

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-[#3FB950]';
      case 'error':
        return 'text-[#F85149]';
      case 'warning':
        return 'text-[#D29922]';
      default:
        return 'text-[#58A6FF]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#161B22] border border-[#30363D]">
          <Terminal className="w-5 h-5 text-[#58A6FF]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#F0F6FC]">Live Commit Activity</h2>
          <p className="text-sm text-[#8B949E]">
            {isLoading ? 'Processing...' : isComplete ? 'Completed' : 'Waiting...'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {(isLoading || isComplete) && totalCommits > 0 && (
        <div className="mb-4 p-4 bg-[#161B22] border border-[#30363D] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#F0F6FC]">Commit Progress</span>
            <span className="text-sm text-[#8B949E]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#21262D] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#58A6FF] to-[#3FB950]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-[#8B949E]">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              {commits} / {totalCommits} commits completed
            </span>
            {startTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {elapsedTime}s elapsed
              </span>
            )}
          </div>
        </div>
      )}

      {/* Repository Info */}
      {repository && (
        <div className="mb-4 flex items-center gap-2 text-sm text-[#8B949E]">
          <GitBranch className="w-4 h-4" />
          <span className="font-mono text-[#58A6FF]">{repository}</span>
          {category && (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>{category}</span>
            </>
          )}
        </div>
      )}

      {/* Terminal */}
      <div className="bg-[#0D1117] border border-[#30363D] rounded-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161B22] border-b border-[#30363D]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F85149]" />
            <div className="w-3 h-3 rounded-full bg-[#D29922]" />
            <div className="w-3 h-3 rounded-full bg-[#3FB950]" />
          </div>
          <span className="text-xs text-[#8B949E] ml-2">bash</span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 h-64 overflow-y-auto font-mono text-sm">
          <AnimatePresence mode="popLayout">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2 py-1"
              >
                {getTypeIcon(log.type)}
                <span className={getTypeColor(log.type)}>
                  [{log.type.toUpperCase()}]
                </span>
                <span className="text-[#8B949E]">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 py-1"
            >
              <span className="text-[#58A6FF]">[INFO]</span>
              <span className="text-[#8B949E]">Processing</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-[#58A6FF]"
              >
                ...
              </motion.span>
            </motion.div>
          )}
          
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-[#F85149]/10 border border-[#F85149]/30 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-[#F85149]" />
            <div>
              <h4 className="font-semibold text-[#F85149]">Error</h4>
              <p className="text-sm text-[#F85149]/80">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Success State */}
      {isComplete && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-[#3FB950]/10 border border-[#3FB950]/30 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-[#3FB950]" />
            <h4 className="font-semibold text-[#3FB950]">All commits pushed successfully!</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#8B949E]">Total Commits</p>
              <p className="font-semibold text-[#F0F6FC]">{commits}</p>
            </div>
            <div>
              <p className="text-[#8B949E]">Repository</p>
              <p className="font-semibold text-[#F0F6FC] font-mono">{repository}</p>
            </div>
            <div>
              <p className="text-[#8B949E]">Time</p>
              <p className="font-semibold text-[#F0F6FC]">{elapsedTime}s</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
