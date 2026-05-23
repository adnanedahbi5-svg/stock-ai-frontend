import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("users", {
    state: () => ({
        users: [] as any[],
        currentUser: null as any,
        loading: false,       // used by fetchUsers (list)
        userLoading: false,   // used by fetchUser (single profile)
        saving: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchUsers(page = 1) {
            this.loading = true;
            try {
                const res = await api.get(`users?page=${page}&per_page=${this.meta.per_page}`);
                this.users = res.data.data ?? [];
                this.meta = {
                    current_page: res.data.meta.current_page,
                    last_page: res.data.meta.last_page,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                };
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            this.loading = false;
        },

        async fetchUser(id: number) {
            this.userLoading = true;
            this.currentUser = null;
            try {
                const res = await api.get(`users/${id}`);
                this.currentUser = res.data.data ?? res.data;
            } catch (error) {
                console.error("Error fetching user:", error);
            }
            this.userLoading = false;
        },

        async updateUser(id: number, data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.put(`users/${id}`, data);
                this.currentUser = res.data.data ?? res.data;
                return { success: true };
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || "Update failed",
                    errors: error.response?.data?.errors ?? {},
                };
            } finally {
                this.saving = false;
            }
        },

        async createUser(data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.post(`users`, data);
                return { success: true, data: res.data.data ?? res.data };
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || "Creation failed",
                    errors: error.response?.data?.errors ?? {},
                };
            } finally {
                this.saving = false;
            }
        },

        async deleteUser(id: number) {
            try {
                await api.delete(`users/${id}`);
                this.fetchUsers(this.meta.current_page);
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        async uploadProfilePicture(file: File, userId?: number) {
            this.saving = true;
            try {
                const formData = new FormData();
                formData.append("image", file);

                const endpoint = userId
                    ? `users/${userId}/profile-picture`
                    : "users/profile-picture";

                const res = await api.post(endpoint, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (this.currentUser && this.currentUser.id === userId) {
                    this.currentUser.profile_picture = res.data?.profile_picture;
                }

                return { success: true, data: res.data };
            } catch (error: any) {
                return {
                    success: false,
                    errors: error.response?.data?.errors ?? {},
                };
            } finally {
                this.saving = false;
            }
        },
    },
});