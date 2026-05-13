import { defineStore } from 'pinia';
import api from "@/services/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'administrateur',
        isGestionnaire: (state) => state.user?.role === 'gestionnaire',
    },

    actions: {
        async login(credentials: { email: string; password: string }) {
            try {
                const response = await api.post('login', credentials);

                const user = response.data.user;
                const token = response.data.token;

                this.user = user;
                this.token = token;

                // ✅ safe (always string now)
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // ✅ attach token for future requests
                // Token is handled by api interceptor

                return { success: true };
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Erreur de connexion',
                };
            }
        },

        async logout() {
            try {
                await api.post('logout');
            } catch (e) {
                // ignore error
            } finally {
                this.user = null;
                this.token = null;

                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Token is handled by api interceptor
            }
        },
    },
});