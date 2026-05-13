import { defineStore } from "pinia";
import api from "@/services/api";

export const useCommandeStore = defineStore("commandes", {
    state: () => ({
        commandes: [] as any[],
        currentCommande: null as any,
        loading: false,         // Used by fetchCommandes (list)
        commandeLoading: false, // Used by fetchCommande (single view)
        saving: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        /**
         * Fetch paginated list of commandes
         */
        async fetchCommandes(page = 1, filters = {}) {
            this.loading = true;
            try {
                const params = {
                    page,
                    per_page: this.meta.per_page,
                    ...filters,
                };

                const res = await api.get("commandes", { params });

                this.commandes = res.data.data ?? [];
                this.meta = {
                    current_page: res.data.meta.current_page,
                    last_page: res.data.meta.last_page,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                };
            } catch (error) {
                console.error("Error fetching commandes:", error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch a single commande by ID
         */
        async fetchCommande(id: number) {
            this.commandeLoading = true;
            this.currentCommande = null;
            try {
                const res = await api.get(`commandes/${id}`);
                this.currentCommande = res.data.data ?? res.data;
            } catch (error) {
                console.error("Error fetching commande:", error);
            } finally {
                this.commandeLoading = false;
            }
        },

        /**
         * Create a new commande (with details array)
         */
        async createCommande(data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.post("commandes", data);
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

        async downloadPdf(id: number) {
            try {

                const response = await api.get(
                    `/commandes/${id}/pdf`,
                    {
                        responseType: "blob",
                    }
                );

                const blob = new Blob(
                    [response.data],
                    {
                        type: "application/pdf",
                    }
                );

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");

                link.href = url;

                link.setAttribute(
                    "download",
                    `bon_commande_${id}.pdf`
                );

                document.body.appendChild(link);

                link.click();

                link.remove();

                window.URL.revokeObjectURL(url);

            } catch (error) {

                console.error(
                    "Erreur téléchargement PDF:",
                    error
                );

            }
        },

        /**
         * Update an existing commande (header fields only)
         */
        async updateCommande(id: number, data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.put(`commandes/${id}`, data);
                this.currentCommande = res.data.data ?? res.data;
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

        /**
         * Delete a commande — removes from local list immediately
         */
        async deleteCommande(id: number) {
            try {
                await api.delete(`commandes/${id}`);
                // ✅ Remove locally instead of re-fetching
                this.commandes = this.commandes.filter((c) => c.id !== id);
                this.meta.total = Math.max(0, this.meta.total - 1);
                return { success: true };
            } catch (error: any) {
                console.error("Error deleting commande:", error);
                return {
                    success: false,
                    message: error.response?.data?.message || "Delete failed",
                };
            }
        },
    },
});