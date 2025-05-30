import { create } from 'zustand';

interface LoaderState {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const useLoaderStore = create<LoaderState>()((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useLoaderStore;