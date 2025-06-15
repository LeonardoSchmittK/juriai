import { create } from 'zustand';

interface Message {
  content: string;
  isUser: boolean;
}

interface Store {
  openWritingContainer:boolean,
  setopenWritingContainer: (flag: boolean) => void;
  openResultContainer:boolean,
  setopenResultContainer: (flag: boolean) => void;
  resetStore: () => void;
  isDark: boolean,
  toggleTheme: () => void
}

const useStore = create<Store>((set) => ({
  openWritingContainer:false,
  openResultContainer:false,
  isDark:false,
  setopenWritingContainer: (flag) => 
    set(() => ({ openWritingContainer: flag })),

  setopenResultContainer: (flag) => 
    set(() => ({ openResultContainer: flag })),
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  resetStore: () =>  
    set(() => ({
      openWritingContainer:false,
      openResultContainer:false,
    })),
}));

export default useStore;
