import { create } from 'zustand';

const useGistStore = create((set) => ({
    gists: [],
    yourGist: [],
    setGists: (gists: any[]) => set({ gists }),
    setYourGist: (yourGist: any[]) => set({ yourGist }),
}));
export default useGistStore;
