'use client';

import { useCommitStore } from './store/commitStore';
import RepoInput from './components/RepoInput';
import ProcessPanel from './components/ProcessPanel';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  Shield, 
  Github,
  Settings,
  Sun
} from 'lucide-react';

export default function Home() {
  const { commits, isLoading, isComplete, error, repository, category, startTime } = useCommitStore();

  return (
    <div className="min-h-screen bg-pattern">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#161B22]/80 backdrop-blur-lg border-b border-[#30363D]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-[#58A6FF] to-[#A371F7]">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#F0F6FC]">GitHub Automatic Commit Tool</h1>
                <p className="text-xs text-[#8B949E]">Educational Automation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262D] transition-colors">
                <Sun className="w-5 h-5" />
              </button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262D] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button className="p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262D] transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#F0F6FC] mb-4"
          >
            Generate GitHub Commits
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#8B949E] max-w-2xl mx-auto"
          >
            Push educational commits to your repository with customizable categories and professional commit messages.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          id="features" 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#58A6FF]/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#58A6FF]/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#58A6FF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#F0F6FC] mb-2">Fast & Efficient</h3>
            <p className="text-sm text-[#8B949E]">Generate up to 1000 commits with smart rate limiting.</p>
          </div>
          <motion.div 
            className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#A371F7]/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-lg bg-[#A371F7]/20 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-[#A371F7]" />
            </div>
            <h3 className="text-lg font-semibold text-[#F0F6FC] mb-2">47 Categories</h3>
            <p className="text-sm text-[#8B949E]">Choose from Web Development, AI, DevOps, Security and more.</p>
          </motion.div>
          <motion.div 
            className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#3FB950]/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-lg bg-[#3FB950]/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#3FB950]" />
            </div>
            <h3 className="text-lg font-semibold text-[#F0F6FC] mb-2">Secure & Private</h3>
            <p className="text-sm text-[#8B949E]">Token processed in memory only and never stored.</p>
          </motion.div>
        </motion.div>

        {/* Commit Form */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F0F6FC] mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#58A6FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Push Commits
            </h2>
            <RepoInput />
          </div>
        </motion.div>

        {/* Process Panel - Shows during/after commit generation */}
        {(commits.length > 0 || isLoading || error) && (
          <ProcessPanel 
            isLoading={isLoading}
            isComplete={isComplete}
            error={error}
            commits={commits.length}
            totalCommits={commits.length}
            repository={repository}
            category={category}
            startTime={startTime}
          />
        )}

        {/* Categories Section */}
        <motion.div 
          id="categories" 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-[#F0F6FC] text-center mb-8">Available Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Business & Website', count: 11 },
              { name: 'Software Development', count: 10 },
              { name: 'AI & Data', count: 8 },
              { name: 'DevOps & Infrastructure', count: 8 },
              { name: 'Security', count: 4 },
              { name: 'Knowledge Repos', count: 8 },
              { name: 'Emerging Tech', count: 8 },
              { name: 'Repository Types', count: 4 },
            ].map((group, index) => (
              <motion.div 
                key={group.name} 
                className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 hover:border-[#58A6FF]/50 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-[#F0F6FC] mb-1">{group.name}</h3>
                <p className="text-sm text-[#8B949E]">{group.count} categories</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-[#8B949E] mt-4">Total: 47 categories with 20+ commit messages each</p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363D] bg-[#161B22] mt-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#8B949E]">Educational Use Only • Do not use for contribution manipulation</p>
            <span className="text-xs text-[#6E7681]">Version 2.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
