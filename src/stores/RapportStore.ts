import { defineStore } from "pinia";
import api from "@/services/api";

export type RapportType =
    | "Stock"
    | "Commande"
    | "Fournisseur"
    | "Utilisateur"
    | "Activite"
    | "Mouvement"
    | "Produit"
    | "Categorie";

export interface Rapport {
    id: number;
    nom: string;
    type: RapportType;
    dateCreation: string;
    file_path: string;
    user_id: number;
    user?: { id: number; name: string };
}

export const useRapportStore = defineStore("rapports", {
    state: () => ({
        rapports: [] as Rapport[],
        loading: false,
        generating: false,
        deletingId: null as number | null,
    }),

    actions: {
        /**
         * GET /api/rapports
         * Fetch all generated rapports
         */
        async fetchRapports() {
            this.loading = true;
            try {
                const res = await api.get("rapports");
                this.rapports = res.data ?? [];
            } catch (error) {
                console.error("Error fetching rapports:", error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * POST /api/rapports/generate
         * Generate a new rapport PDF and persist it
         */
        async generateRapport(nom: string, type: RapportType) {
            this.generating = true;
            try {
                const res = await api.post("rapports/generate", { nom, type });
                // Prepend the new rapport to the list
                if (res.data?.rapport) {
                    this.rapports.unshift(res.data.rapport);
                }
                return { success: true, rapport: res.data.rapport };
            } catch (error: any) {
                return {
                    success: false,
                    message:
                        error.response?.data?.message ||
                        "Erreur lors de la génération du rapport.",
                    errors: error.response?.data?.errors ?? {},
                };
            } finally {
                this.generating = false;
            }
        },

        /**
         * GET /api/rapports/{id}/download
         * Download the PDF file for a rapport
         */
        async downloadRapport(id: number, nom: string = "rapport") {
            try {
                const response = await api.get(`rapports/${id}/download`, {
                    responseType: "blob",
                });

                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${nom}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);

                return { success: true };
            } catch (error: any) {
                console.error("Erreur téléchargement rapport PDF:", error);
                return {
                    success: false,
                    message:
                        error.response?.data?.message ||
                        "Impossible de télécharger le rapport.",
                };
            }
        },

        /**
         * DELETE /api/rapports/{id}
         * Delete a rapport record and its associated PDF file
         */
        async deleteRapport(id: number) {
            this.deletingId = id;
            try {
                await api.delete(`rapports/${id}`);
                // Remove from local list immediately
                this.rapports = this.rapports.filter((r) => r.id !== id);
                return { success: true };
            } catch (error: any) {
                console.error("Error deleting rapport:", error);
                return {
                    success: false,
                    message:
                        error.response?.data?.message ||
                        "Erreur lors de la suppression du rapport.",
                };
            } finally {
                this.deletingId = null;
            }
        },
    },
});
