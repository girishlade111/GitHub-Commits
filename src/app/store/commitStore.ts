import { create } from 'zustand';

export interface CommitResult {
  sha: string;
  message: string;
  timestamp: string;
  branch: string;
  url: string;
}

export interface CommitState {
  commits: CommitResult[];
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
  currentCommitIndex: number;
  totalCommits: number;
  repository: string | null;
  category: string | null;
  startTime: number | null;
}

interface CommitActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addCommits: (commits: CommitResult[], repository: string, category: string, total: number) => void;
  updateCurrentCommit: (index: number) => void;
  reset: () => void;
  setStartTime: (time: number) => void;
}

const initialState: CommitState = {
  commits: [],
  isLoading: false,
  isComplete: false,
  error: null,
  currentCommitIndex: 0,
  totalCommits: 0,
  repository: null,
  category: null,
  startTime: null,
};

export const useCommitStore = create<CommitState & CommitActions>((set, get) => ({
  ...initialState,
  
  setLoading: (loading: boolean) => set({ 
    isLoading: loading,
    error: loading ? null : get().error,
    startTime: loading ? Date.now() : get().startTime,
  }),
  
  setError: (error: string | null) => set({ 
    error,
    isLoading: false,
    isComplete: error !== null,
  }),
  
  addCommits: (commits: CommitResult[], repository: string, category: string, total: number) => set({
    commits: [...get().commits, ...commits],
    isLoading: false,
    isComplete: true,
    repository,
    category,
    totalCommits: total,
    currentCommitIndex: total,
    error: null,
  }),
  
  updateCurrentCommit: (index: number) => set({
    currentCommitIndex: index,
    isLoading: index < get().totalCommits,
  }),
  
  setStartTime: (time: number) => set({ startTime: time }),
  
  reset: () => set({...initialState, startTime: null}),
}));
