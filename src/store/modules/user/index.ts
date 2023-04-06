import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  systemUserInfo,
  SystemUser,
  LoginRequest,
} from '@/api/system';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';

const useUserStore = defineStore('user', {
  state: (): SystemUser => ({
    id: -1,
    username: '',
    role: '',
    validStatus: 0,
  }),

  getters: {
    userInfo(state: SystemUser): SystemUser {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<SystemUser>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await systemUserInfo();
      this.setInfo(res.data);
    },

    // Login
    async login(params: LoginRequest) {
      try {
        const res = await userLogin(params);
        setToken(res.data);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
