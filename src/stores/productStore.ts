import { defineStore } from "pinia";
import api from "@/services/api";

export const useProductStore = defineStore("products", {
    state: () => ({
        products: [] as any[],
        currentProduct: null as any,
        loading: false,       // used by fetchProducts (list)
        productLoading: false,   // used by fetchProduct (single profile)
        saving: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchProducts(page = 1, trashed = false, perPage = 1000) {
            this.loading = true;
            try {
                const res = await api.get(`products?page=${page}&per_page=${this.meta.per_page}${trashed ? '&trashed=1' : ''}`);
                // const res = await api.get(`products?page=${page}&per_page=${perPage}${trashed ? '&trashed=1' : ''}`);
                this.products = res.data.data ?? [];
                this.meta = {
                    current_page: res.data.meta.current_page,
                    last_page: res.data.meta.last_page,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                };
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            this.loading = false;
        },
        async fetchProductsForSelect() {
            try {
                const res = await api.get("products", {
                    params: {
                        per_page: 100
                    }
                });
                this.products = res.data.data ?? [];
            } catch (error) {
                console.error("Error fetching products for select:", error);
            }
        },

        async fetchProduct(id: number) {
            this.productLoading = true;
            this.currentProduct = null;
            try {
                const res = await api.get(`products/${id}`);
                this.currentProduct = res.data.data ?? res.data;
            } catch (error) {
                console.error("Error fetching product:", error);
            }
            this.productLoading = false;
        },

        async updateProduct(id: number, data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.put(`products/${id}`, data);
                this.currentProduct = res.data.data ?? res.data;
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

        async createProduct(data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.post(`products`, data);
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

        async softDeleteProduct(id: number) {
            try {
                await api.delete(`products/${id}`);
                this.fetchProducts(this.meta.current_page);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        },

        async restoreProduct(id: number) {
            try {
                await api.patch(`products/${id}/restore`);
                this.fetchProducts(this.meta.current_page, true);
            } catch (error) {
                console.error("Error restoring product:", error);
            }
        },

        async forceDeleteProduct(id: number) {
            try {
                await api.delete(`products/${id}/force`);
                this.fetchProducts(this.meta.current_page, true);
            } catch (error) {
                console.error("Error permanently deleting product:", error);
            }
        },
    },
});
