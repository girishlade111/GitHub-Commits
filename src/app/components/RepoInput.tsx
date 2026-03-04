'use client';

import { useState, useCallback, FormEvent } from 'react';
import { useCommitStore } from '../store/commitStore';
import { VALID_CATEGORIES, CATEGORIES_BY_GROUP } from '../lib/validation';
import { Eye, EyeOff, GitCommit, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
  repoUrl: string;
  token: string;
  commitCount: number;
  category: string;
  confirmArchived: boolean;
}

export default function RepoInput() {
  const [formData, setFormData] = useState<FormData>({
    repoUrl: '',
    token: '',
    commitCount: 10,
    category: 'Web Development',
    confirmArchived: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showToken, setShowToken] = useState(false);
  
  const { isLoading, setLoading, setError, addCommits, error: storeError, reset, setStartTime } = useCommitStore();

  const validateField = useCallback((name: string, value: string | number | boolean): string | null => {
    switch (name) {
      case 'repoUrl':
        if (!value) return 'Repository URL is required';
        const urlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-.]+$/;
        const shortPattern = /^[\w-]+\/[\w-.]+$/;
        if (!urlPattern.test(value as string) && !shortPattern.test(value as string)) {
          return 'Invalid format. Use https://github.com/owner/repo or owner/repo';
        }
        return null;
      case 'token':
        if (!value) return 'GitHub token is required';
        const token = value as string;
        const isValidPrefix = token.startsWith('ghp_') || token.startsWith('gho_') || 
                            token.startsWith('ghu_') || token.startsWith('ghs_') || 
                            token.startsWith('ghr_') || token.startsWith('github_pat_');
        if (!isValidPrefix || token.length < 20) {
          return 'Invalid token format. Must be a GitHub PAT (ghp_*, gho_*, etc.)';
        }
        return null;
      case 'confirmArchived':
        if (!value) return 'You must confirm you want to commit to archived repos';
        return null;
      default:
        return null;
    }
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      if (!error) delete newErrors[field];
      return newErrors;
    });
  }, [validateField]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        errors[key] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setFieldErrors(errors);
      return;
    }
    
    reset();
    setStartTime(Date.now());
    setLoading(true);
    setFieldErrors({});
    
    try {
      const response = await fetch('/api/generate-commits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: formData.repoUrl,
          token: formData.token,
          commitCount: formData.commitCount,
          category: formData.category,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate commits');
      }
      
      addCommits(data.commits, data.repository, data.categoryUsed, data.totalCommits);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    }
  }, [formData, validateField, reset, setLoading, setError, addCommits, setStartTime]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="repoUrl" className="block text-sm font-medium text-[#F0F6FC] mb-2">
          Repository URL
        </label>
        <input
          id="repoUrl"
          type="text"
          value={formData.repoUrl}
          onChange={(e) => handleChange('repoUrl', e.target.value)}
          placeholder="https://github.com/username/repository"
          className={`w-full px-4 py-3 bg-[#0D1117] border rounded-lg text-[#F0F6FC] placeholder-[#6E7681] focus:outline-none focus:ring-2 focus:ring-[#58A6FF] transition-all ${fieldErrors.repoUrl ? 'border-[#F85149]' : 'border-[#30363D]'}`}
          disabled={isLoading}
        />
        {fieldErrors.repoUrl ? (
          <p className="mt-1.5 text-sm text-[#F85149]">{fieldErrors.repoUrl}</p>
        ) : (
          <p className="mt-1.5 text-xs text-[#8B949E]">Paste the full GitHub repository link.</p>
        )}
      </div>

      <div>
        <label htmlFor="token" className="block text-sm font-medium text-[#F0F6FC] mb-2">
          GitHub Access Token
        </label>
        <div className="relative">
          <input
            id="token"
            type={showToken ? 'text' : 'password'}
            value={formData.token}
            onChange={(e) => handleChange('token', e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className={`w-full px-4 py-3 pr-12 bg-[#0D1117] border rounded-lg text-[#F0F6FC] placeholder-[#6E7681] focus:outline-none focus:ring-2 focus:ring-[#58A6FF] transition-all ${fieldErrors.token ? 'border-[#F85149]' : 'border-[#30363D]'}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
          >
            {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {fieldErrors.token ? (
          <p className="mt-1.5 text-sm text-[#F85149]">{fieldErrors.token}</p>
        ) : (
          <p className="mt-1.5 text-xs text-[#8B949E]">Required for pushing commits to the repository.</p>
        )}
      </div>

      <div>
        <label htmlFor="commitCount" className="block text-sm font-medium text-[#F0F6FC] mb-2">
          Number of Commits: <span className="text-[#58A6FF]">{formData.commitCount}</span>
        </label>
        <input
          id="commitCount"
          type="range"
          min="1"
          max="1000"
          value={formData.commitCount}
          onChange={(e) => handleChange('commitCount', parseInt(e.target.value))}
          className="w-full h-2 bg-[#21262D] rounded-lg appearance-none cursor-pointer accent-[#58A6FF]"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-[#6E7681] mt-1.5">
          <span>1</span>
          <span>1000</span>
        </div>
        <p className="mt-1.5 text-xs text-[#8B949E]">Select how many commits you want to generate.</p>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-[#F0F6FC] mb-2">
          Repository Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-[#F0F6FC] focus:outline-none focus:ring-2 focus:ring-[#58A6FF] transition-all"
          disabled={isLoading}
        >
          {VALID_CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
        <p className="mt-1.5 text-xs text-[#8B949E]">Category determines commit message templates.</p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="confirmArchived"
          type="checkbox"
          checked={formData.confirmArchived}
          onChange={(e) => handleChange('confirmArchived', e.target.checked)}
          className="mt-1 w-4 h-4 bg-[#0D1117] border-[#30363D] rounded focus:ring-[#58A6FF] text-[#58A6FF]"
          disabled={isLoading}
        />
        <label htmlFor="confirmArchived" className="text-sm text-[#8B949E]">
          I understand this will push commits to the repository
        </label>
      </div>
      {fieldErrors.confirmArchived && <p className="text-sm text-[#F85149]">{fieldErrors.confirmArchived}</p>}

      {storeError && (
        <div className="p-4 bg-[#F85149]/10 border border-[#F85149]/30 rounded-lg">
          <p className="text-[#F85149]">{storeError}</p>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={isLoading || !formData.repoUrl.trim() || !formData.token.trim() || !formData.confirmArchived}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          isLoading || !formData.repoUrl.trim() || !formData.token.trim() || !formData.confirmArchived
            ? 'bg-[#21262D] text-[#6E7681] cursor-not-allowed'
            : 'bg-[#58A6FF] hover:bg-[#79B8FF] text-white hover:scale-[1.02] active:scale-[0.98]'
        }`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Commits...
          </>
        ) : (
          <>
            <GitCommit className="w-5 h-5" />
            Push Commits
          </>
        )}
      </motion.button>
    </form>
  );
}
