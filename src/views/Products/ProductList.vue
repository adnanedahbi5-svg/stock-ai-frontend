<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const router    = useRouter();
const productStore = useProductStore();
const { products, loading, meta } = storeToRefs(productStore);

onMounted(() => productStore.fetchProducts(1));

// --- Routing actions ---
const editProduct = (id: number) => router.push(`/products/${id}/edit`);
const addProduct  = ()           => router.push("/products/new");
const viewHistory = ()           => router.push("/products/history");

// --- Delete with confirmation ---
const deleteProduct = (id: number) => {
  if (confirm("Are you sure you want to delete this product?")) {
    productStore.softDeleteProduct(id);
  }
};

// --- Pagination ---
const goToPage = (page: number) => {
  const lastPage = Number(meta.value.last_page);
  if (page >= 1 && page <= lastPage) {
    productStore.fetchProducts(page);
  }
};

const totalPages = computed(() => {
  const pages: number[] = [];
  const lastPage = Number(meta.value.last_page);
  for (let i = 1; i <= lastPage; i++) pages.push(i);
  return pages;
});
</script>

<template>
  <div class="container-fluid">

    <!-- HEADER -->
    <div class="d-flex align-items-center mb-4 flex-wrap">
      <h3 class="me-auto">Products List</h3>
      <div class="d-flex gap-2">
          <button class="btn btn-secondary light" @click="viewHistory">
            <i class="fas fa-history me-2"></i>History
          </button>
          <button class="btn btn-primary" @click="addProduct">
            <i class="fas fa-plus me-2"></i>Add New Product
          </button>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="table-responsive">
          <table class="table display mb-4 dataTablesCard table-responsive-xl card-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Barcode</th>
                <th>Stock</th>
                <th>Alert Limit</th>
                <th>Category</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <!-- Loading row -->
              <tr v-if="loading">
                <td colspan="7" class="text-center py-4">
                  <i class="fas fa-spinner fa-spin me-2"></i>Loading products...
                </td>
              </tr>

              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.nom }}</td>
                <td>{{ product.codeBarre }}</td>
                <td>
                  <span :class="`badge badge-${product.quantiteStock <= product.seuilAlerte ? 'danger' : 'success'} light`">
                    {{ product.quantiteStock }}
                  </span>
                </td>
                <td>{{ product.seuilAlerte }}</td>
                <td>{{ product.category?.nom ?? '-' }}</td>

                <!-- Icon actions -->
                <td class="text-end">
                  <div class="action-buttons d-flex justify-content-end gap-2">
                    <!-- EDIT -->
                    <button
                      class="btn btn-secondary light btn-sm"
                      title="Edit Product"
                      @click="editProduct(product.id)"
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </button>

                    <!-- DELETE -->
                    <button
                      class="btn btn-danger light btn-sm"
                      title="Delete Product"
                      @click="deleteProduct(product.id)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
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
</template>

<style scoped>
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
