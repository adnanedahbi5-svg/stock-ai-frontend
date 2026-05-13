import { defineStore } from "pinia";
import api from "@/services/api";

export interface CommandeDetail {
    id?: number;

    commande_id: number;

    product_id: number;

    quantity: number;

    unit_price_ht: number;

    tax_rate: number;

    subtotal_ht?: number;

    tax_amount?: number;

    subtotal_ttc?: number;

    commande?: {
        id: number;
        dateCommande: string;
        statut: string;
    };

    product?: {
        id: number;
        nom: string;
    };
}

export interface CommandeDetailState {
    details: CommandeDetail[];

    currentDetail: CommandeDetail | null;

    loading: boolean;

    saving: boolean;

    meta: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
}

export const useCommandeDetailStore = defineStore("commandeDetails", {

    state: (): CommandeDetailState => ({

        details: [],

        currentDetail: null,

        loading: false,

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
         * Fetch all commande details
         */
        async fetchDetails(
            page = 1,
            filters: Record<string, any> = {}
        ) {

            this.loading = true;

            try {

                const queryParams: any = {
                    page,
                    per_page: this.meta.per_page,
                };

                // ✅ Add filters dynamically
                Object.keys(filters).forEach((key) => {

                    if (
                        filters[key] !== null &&
                        filters[key] !== undefined &&
                        filters[key] !== ""
                    ) {
                        queryParams[key] = filters[key];
                    }
                });

                const response = await api.get(
                    "commande-details",
                    {
                        params: queryParams
                    }
                );

                this.details = response.data.data ?? [];

                this.meta = {
                    current_page:
                        response.data.meta?.current_page ?? 1,

                    last_page:
                        response.data.meta?.last_page ?? 1,

                    total:
                        response.data.meta?.total ?? 0,

                    per_page:
                        response.data.meta?.per_page ?? 10,
                };

            } catch (error) {

                console.error(
                    "Error fetching commande details:",
                    error
                );

            } finally {

                this.loading = false;
            }
        },

        /**
         * Fetch one detail
         */
        async fetchDetail(id: number) {

            this.loading = true;

            this.currentDetail = null;

            try {

                const response = await api.get(
                    `commande-details/${id}`
                );

                this.currentDetail =
                    response.data.data ?? response.data;

            } catch (error) {

                console.error(
                    "Error fetching commande detail:",
                    error
                );

            } finally {

                this.loading = false;
            }
        },

        /**
         * Create detail
         */
        async createDetail(data: CommandeDetail) {

            this.saving = true;

            try {

                const response = await api.post(
                    "commande-details",
                    data
                );

                const created =
                    response.data.data ?? response.data;

                this.details.unshift(created);

                return {
                    success: true,
                    data: created,
                };

            } catch (error: any) {

                return {
                    success: false,

                    message:
                        error.response?.data?.message
                        || "Creation failed",

                    errors:
                        error.response?.data?.errors ?? {},
                };

            } finally {

                this.saving = false;
            }
        },

        /**
         * Update detail
         */
        async updateDetail(
            id: number,
            data: Partial<CommandeDetail>
        ) {

            this.saving = true;

            try {

                const response = await api.put(
                    `commande-details/${id}`,
                    data
                );

                const updated =
                    response.data.data ?? response.data;

                // ✅ Update local state
                const index = this.details.findIndex(
                    (d) => d.id === id
                );

                if (index !== -1) {
                    this.details[index] = updated;
                }

                this.currentDetail = updated;

                return {
                    success: true,
                    data: updated,
                };

            } catch (error: any) {

                return {
                    success: false,

                    message:
                        error.response?.data?.message
                        || "Update failed",

                    errors:
                        error.response?.data?.errors ?? {},
                };

            } finally {

                this.saving = false;
            }
        },

        /**
         * Delete detail
         */
        async deleteDetail(id: number) {

            try {

                await api.delete(
                    `commande-details/${id}`
                );

                // ✅ Remove locally
                this.details = this.details.filter(
                    (d) => d.id !== id
                );

                return {
                    success: true
                };

            } catch (error: any) {

                return {
                    success: false,

                    message:
                        error.response?.data?.message
                        || "Delete failed",
                };
            }
        },
    },
});