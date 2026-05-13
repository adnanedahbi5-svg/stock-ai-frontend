import { defineStore } from "pinia";
import api from "@/services/api";

export const useActivityLogStore = defineStore("activityLogs", {
    state: () => ({
        logs: [] as any[],
        loading: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchLogs(page = 1, search = "") {
            this.loading = true;
            try {
                const params: Record<string, any> = {
                    page,
                    per_page: this.meta.per_page,
                };
                // ✅ only send search if it's not empty — avoids 422
                if (search?.trim()) params.search = search.trim();

                const res = await api.get(`activity-logs`, { params });

                this.logs = res.data.data ?? [];

                // ✅ Controller wraps pagination info inside res.data.meta
                const m = res.data.meta;
                this.meta = {
                    current_page: Number(m?.current_page ?? 1),
                    last_page: Number(m?.last_page ?? 1),
                    total: Number(m?.total ?? 0),
                    per_page: Number(m?.per_page ?? 10),
                };
            } catch (error) {
                console.error("Error fetching activity logs:", error);
            } finally {
                this.loading = false; // ✅ always runs, even on error
            }
        },
    },
});