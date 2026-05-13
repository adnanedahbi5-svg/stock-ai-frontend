import { defineStore } from "pinia";
import api from "@/services/api";

export const useFournisseurStore = defineStore("fournisseurs", {
    state: () => ({
        fournisseurs: [] as any[],
        currentFournisseur: null as any,
        loading: false,
        fournisseurLoading: false,
        saving: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchFournisseurs(page = 1, trashed = false) {
            this.loading = true;
            try {
                const res = await api.get(`fournisseurs?page=${page}&per_page=${this.meta.per_page}${trashed ? '&trashed=1' : ''}`);
                this.fournisseurs = res.data.data ?? [];
                this.meta = {
                    current_page: res.data.meta.current_page,
                    last_page: res.data.meta.last_page,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                };
            } catch (error) {
                console.error("Error fetching fournisseurs:", error);
            }
            this.loading = false;
        },
        async fetchFournisseursForSelect() {
            try {
                // Use the base route but pass a large per_page value
                const res = await api.get("fournisseurs", {
                    params: { per_page: 100 }
                });
                this.fournisseurs = res.data.data ?? [];
            } catch (error) {
                console.error("Error fetching fournisseurs for select:", error);
            }
        },

        async fetchFournisseur(id: number) {
            this.fournisseurLoading = true;
            this.currentFournisseur = null;
            try {
                const res = await api.get(`fournisseurs/${id}`);
                this.currentFournisseur = res.data.data ?? res.data;
            } catch (error) {
                console.error("Error fetching fournisseur:", error);
            }
            this.fournisseurLoading = false;
        },

        async updateFournisseur(id: number, data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.put(`fournisseurs/${id}`, data);
                this.currentFournisseur = res.data.data ?? res.data;
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

        async createFournisseur(data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.post(`fournisseurs`, data);
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

        async softDeleteFournisseur(id: number) {
            try {
                await api.delete(`fournisseurs/${id}`);
                this.fetchFournisseurs(this.meta.current_page);
            } catch (error) {
                console.error("Error deleting fournisseur:", error);
            }
        },

        async restoreFournisseur(id: number) {
            try {
                await api.patch(`fournisseurs/${id}/restore`);
                this.fetchFournisseurs(this.meta.current_page, true);
            } catch (error) {
                console.error("Error restoring fournisseur:", error);
            }
        },

        async forceDeleteFournisseur(id: number) {
            try {
                await api.delete(`fournisseurs/${id}/force`);
                this.fetchFournisseurs(this.meta.current_page, true);
            } catch (error) {
                console.error("Error permanently deleting fournisseur:", error);
            }
        },
    },
});
