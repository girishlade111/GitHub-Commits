'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommitResult } from '../store/commitStore';

interface GitTimelineProps {
  commits: CommitResult[];
  isLoading: boolean;
}

export default function GitTimeline({ commits, isLoading }: GitTimelineProps) {
  const [visibleCommits, setVisibleCommits] = useState<CommitResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // BUG FIX 5: Properly clean up setTimeout when commits prop changes
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (commits.length > 0) {
      setVisibleCommits([]);
      setCurrentIndex(0);

      commits.forEach((commit, index) => {
        const timer = setTimeout(() => {
          setVisibleCommits(prev => [...prev, commit]);
          setCurrentIndex(index + 1);
        }, index * 300);
        timers.push(timer);
      });
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [commits]);

  if (commits.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-white mb-6">
        Commit Timeline
        {isLoading && <span className="ml-2 text-sm font-normal text-gray-400">({currentIndex} / {commits.length})</span>}
      </h2>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

        <AnimatePresence mode="popLayout">
          {visibleCommits.map((commit, index) => (
            <motion.div
              key={commit.sha}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative pl-12 pb-6"
            >
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-gray-900" />

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium">{commit.message}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
                      <span className="font-mono text-blue-400">{commit.sha}</span>
                      <span>•</span>
                      <span>{commit.branch}</span>
                      <span>•</span>
                      <span>{new Date(commit.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                </div>
                {commit.url && (
                  <a href={commit.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-sm text-blue-400 hover:text-blue-300">
                    View on GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative pl-12 pt-2">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-blue-500 animate-spin" />
              <span>Pushing commits...</span>
            </div>
          </motion.div>
        )}
      </div>

      {commits.length > 0 && (
        <div className="mt-6">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(visibleCommits.length / commits.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-400 text-center">
            {visibleCommits.length} of {commits.length} commits pushed
          </p>
        </div>
      )}
    </div>
  );
}
