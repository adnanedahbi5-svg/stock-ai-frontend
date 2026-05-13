import { defineStore } from "pinia";
import api from "@/services/api";

export const useCategoryStore = defineStore("categories", {
    state: () => ({
        categories: [] as any[],
        currentCategory: null as any,
        loading: false,
        categoryLoading: false,
        saving: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchCategories(page = 1, trashed = false) {
            this.loading = true;
            try {
                const res = await api.get(`categories?page=${page}&per_page=${this.meta.per_page}${trashed ? '&trashed=1' : ''}`);
                this.categories = res.data.data ?? [];
                this.meta = {
                    current_page: res.data.meta.current_page,
                    last_page: res.data.meta.last_page,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                };
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            this.loading = false;
        },

        async fetchCategory(id: number) {
            this.categoryLoading = true;
            this.currentCategory = null;
            try {
                const res = await api.get(`categories/${id}`);
                this.currentCategory = res.data.data ?? res.data;
            } catch (error) {
                console.error("Error fetching category:", error);
            }
            this.categoryLoading = false;
        },

        async updateCategory(id: number, data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.put(`categories/${id}`, data);
                this.currentCategory = res.data.data ?? res.data;
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

        async createCategory(data: Record<string, any>) {
            this.saving = true;
            try {
                const res = await api.post(`categories`, data);
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

        async softDeleteCategory(id: number) {
            try {
                await api.delete(`categories/${id}`);
                this.fetchCategories(this.meta.current_page);
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        },

        async restoreCategory(id: number) {
            try {
                await api.patch(`categories/${id}/restore`);
                this.fetchCategories(this.meta.current_page, true);
            } catch (error) {
                console.error("Error restoring category:", error);
            }
        },

        async forceDeleteCategory(id: number) {
            try {
                await api.delete(`categories/${id}/force`);
                this.fetchCategories(this.meta.current_page, true);
            } catch (error) {
                console.error("Error permanently deleting category:", error);
            }
        },
    },
});
