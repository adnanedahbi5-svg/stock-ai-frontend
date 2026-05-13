import { defineStore } from "pinia";
import api from "@/services/api";

export interface Movement {
    id?: number;
    type: "Entrée" | "Sortie";
    quantite: number;
    dateheure?: string;
    localisation?: string;
    product_id: number;
    user_id?: number;
    product?: {
        id: number;
        nom: string;
    };
    user?: {
        id: number;
        name: string;
    };
}

export interface StockMouvementState {
    movements: Movement[];
    loading: boolean;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
}

export const useStockMouvementStore = defineStore("stockMouvement", {
    state: (): StockMouvementState => ({
        movements: [],
        loading: false,
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
            per_page: 10,
        },
    }),

    actions: {
        async fetchMovements(page = 1, filters: Record<string, any> = {}) {
            this.loading = true;
            console.log("Fetching movements for page:", page, "with filters:", filters);
            try {
                const queryParams: any = {
                    page: page,
                    per_page: this.meta.per_page,
                };

                // Add filters if they have values
                Object.keys(filters).forEach(key => {
                    if (filters[key]) {
                        queryParams[key] = filters[key];
                    }
                });

                const response = await api.get("movements", { params: queryParams });
                console.log("API Response:", response.data);

                // Handle both flat and wrapped (Resource) responses
                const data = response.data.data || response.data;
                const pagination = response.data.meta || response.data;

                this.movements = Array.isArray(data) ? data : (data.data || []);
                
                this.meta = {
                    current_page: Number(pagination.current_page || 1),
                    last_page: Number(pagination.last_page || 1),
                    total: Number(pagination.total || 0),
                    per_page: Number(pagination.per_page || 10),
                };
                
                console.log("Updated state meta:", this.meta);
            } catch (error: any) {
                console.error("Error fetching movements:", error);
            } finally {
                this.loading = false;
            }
        },

        async createMovement(movementData: Movement) {
            this.loading = true;
            try {
                const response = await api.post("movements", movementData);
                if (response.data.movement) {
                    this.movements.unshift(response.data.movement);
                }
                return response.data;
            } catch (error: any) {
                throw error.response ? error.response.data : error;
            } finally {
                this.loading = false;
            }
        }
    }
});
