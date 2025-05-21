
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,

  login: (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true, user });
    
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
