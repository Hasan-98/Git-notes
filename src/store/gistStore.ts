import { create } from 'zustand';

const useGistStore = create((set) => ({
    gists: [],
    setGists: (gists: any[]) => set({ gists }),
}));

export default useGistStore;
