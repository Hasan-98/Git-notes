
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  login: (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_name', user.user_name);
    console.log('user in auth store', user)
    set({ isLoggedIn: true, user });
    
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_name');
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
