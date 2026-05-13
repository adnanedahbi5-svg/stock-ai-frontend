<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Gestion Stock</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Mouvements</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="d-flex align-items-center mb-4 flex-wrap gap-3">
          <div class="ms-auto">
            <RouterLink to="/stock-movements/new" class="btn btn-primary btn-rounded shadow-primary">
              <i class="fa fa-plus-circle me-2"></i>Nouveau Mouvement
            </RouterLink>
          </div>
        </div>

        <!-- Table displaying the list -->
        <div class="card">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Historique des Mouvements</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table display mb-4 dataTablesCard table-responsive-xl card-table">
                        <thead>
                            <tr>
                                <th>Date & Heure</th>
                                <th>Produit</th>
                                <th>Type</th>
                                <th>Quantité</th>
                                <th>Localisation</th>
                                <th>Utilisateur</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="6" class="text-center py-4">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Chargement des mouvements...
                                </td>
                            </tr>
                            <tr v-else-if="movements.length === 0">
                                <td colspan="6" class="text-center py-5 no-data-state">
                                    <div class="no-data-content">
                                        <i class="flaticon-381-folder-1 display-1 text-light mb-3 d-block"></i>
                                        <h4 class="text-muted">Aucun mouvement trouvé</h4>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="movement in movements" :key="movement.id">
                                <td>{{ formatDate(movement.dateheure) }}</td>
                                <td>{{ movement.product?.nom || 'N/A' }}</td>
                                <td>
                                    <span :class="`badge badge-${movement.type === 'Entrée' ? 'success' : 'danger'} light`">
                                        {{ movement.type }}
                                    </span>
                                </td>
                                <td>{{ movement.quantite }}</td>
                                <td>{{ movement.localisation }}</td>
                                <td>{{ movement.user?.name || 'N/A' }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <div class="d-flex align-items-center justify-content-between flex-wrap mt-3">
                        <div class="dataTables_info">
                            {{ meta.total === 0 ? 0 : (meta.current_page - 1) * meta.per_page + 1 }} - 
                            {{ Math.min(meta.current_page * meta.per_page, meta.total) }} 
                            sur {{ meta.total }}
                        </div>

                        <div class="dataTables_paginate paging_simple_numbers">
                            <a class="paginate_button previous" :class="{ disabled: Number(meta.current_page) <= 1 }" @click="goToPage(Number(meta.current_page) - 1)">
                                <i class="fa fa-angle-double-left"></i>
                            </a>
                            <span>
                                <a v-for="page in totalPages" :key="page" class="paginate_button m-1 border-0 text-center" 
                                   :class="{ current: Number(meta.current_page) === page }" @click="goToPage(page)">
                                    {{ page }}
                                </a>
                            </span>
                            <a class="paginate_button next" :class="{ disabled: Number(meta.current_page) >= Number(meta.last_page) }" @click="goToPage(Number(meta.current_page) + 1)">
                                <i class="fa fa-angle-double-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useStockMouvementStore } from "@/stores/stockMouvementStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import moment from "moment";

export default defineComponent({
  name: "StockMovementList",
  components: { RouterLink },
  setup() {
    const stockStore = useStockMouvementStore();
    const productStore = useProductStore();
    const { movements, loading, meta } = storeToRefs(stockStore);
    const { products } = storeToRefs(productStore);

    const filters = ref({
      type: "",
      product_id: ""
    });

    onMounted(() => {
      stockStore.fetchMovements();
      productStore.fetchProducts(1);
    });

    const handleFilter = () => {
      stockStore.fetchMovements(1, filters.value);
    };

    const resetFilters = () => {
      filters.value.type = "";
      filters.value.product_id = "";
      stockStore.fetchMovements(1);
    };

    const goToPage = (page: number) => {
      const lastPage = Number(meta.value.last_page);
      if (page >= 1 && page <= lastPage) {
        stockStore.fetchMovements(page, filters.value);
      }
    };

    const totalPages = computed(() => {
      const pages = [];
      const lastPage = Number(meta.value.last_page);
      for (let i = 1; i <= lastPage; i++) pages.push(i);
      return pages;
    });

    const formatDate = (date?: string) => {
      return date ? moment(date).format("DD/MM/YYYY HH:mm") : "N/A";
    };

    return {
      movements,
      products,
      loading,
      meta,
      filters,
      handleFilter,
      resetFilters,
      goToPage,
      totalPages,
      formatDate
    };
  },
});
</script>

<style scoped>
/* TABLE */
.card-table tbody tr {
    transition: all 0.2s ease;
}

.card-table tbody tr:hover {
    background: rgba(var(--primary-rgb), 0.03);
}

/* EMPTY STATE */
.no-data-state {
    background: #fdfdfd;
}

.no-data-content i {
    font-size: 60px;
    opacity: 0.3;
}

/* PAGINATION */
.dataTables_paginate {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}

.dataTables_paginate span {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}

.paginate_button {
    cursor: pointer;
    min-width: 38px;
    height: 38px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px !important;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    white-space: nowrap;
}

.paginate_button:hover:not(.disabled) {
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
}

.paginate_button.current {
    background: var(--primary) !important;
    color: #fff !important;
}

.paginate_button.disabled {
    opacity: 0.5;
    pointer-events: none;
}

/* MOBILE */
@media (max-width: 768px) {
    .dataTables_info {
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
    }

    .dataTables_paginate {
        width: 100%;
    }

    .paginate_button {
        min-width: 34px;
        height: 34px;
        font-size: 13px;
    }
}
</style>
