<template>
  <div class="container-fluid">
    <!-- Breadcrumbs Section -->
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Gestion Stock</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Nouveau Mouvement</a></li>
      </ol>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <!-- Navigation Button -->
        <div>
          <RouterLink to="/stock-movements" class="btn btn-sm btn-primary mb-4 me-1">
            Liste des Mouvements
          </RouterLink>
        </div>

        <!-- Integrated Form Card -->
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Enregistrer une Entrée ou Sortie</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <!-- Product Selection -->
                <div class="mb-3 col-md-6">
                  <label class="form-label">Produit</label>
                  <select v-model="formData.product_id" class="form-control" required>
                    <option value="0" disabled>Sélectionner un produit</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">
                      {{ product.nom }} (Stock actuel: {{ product.quantiteStock }})
                    </option>
                  </select>
                </div>

                <!-- Movement Type -->
                <div class="mb-3 col-md-6">
                  <label class="form-label">Type de Mouvement</label>
                  <select v-model="formData.type" class="form-control" required>
                    <option value="Entrée">Entrée (Réapprovisionnement)</option>
                    <option value="Sortie">Sortie (Utilisation/Vente)</option>
                  </select>
                </div>

                <!-- Quantity -->
                <div class="mb-3 col-md-6">
                  <label class="form-label">Quantité</label>
                  <input 
                    type="number" 
                    v-model.number="formData.quantite" 
                    class="form-control" 
                    min="1" 
                    required 
                  />
                </div>

                <!-- Localization -->
                <div class="mb-3 col-md-6">
                  <label class="form-label">Localisation / Destination</label>
                  <input 
                    type="text" 
                    v-model="formData.localisation" 
                    class="form-control" 
                    placeholder="Ex: Entrepôt A, Chantier B..." 
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary" :disabled="stockStore.loading">
                <i v-if="stockStore.loading" class="fas fa-spinner fa-spin me-2"></i>
                {{ stockStore.loading ? 'Traitement...' : 'Valider le Mouvement' }}
              </button>
            </form>
          </div>
        </div>
        <!-- End Integrated Form -->

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useStockMouvementStore, type Movement } from "@/stores/stockMouvementStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "AddStockMovement",
  components: { RouterLink },
  setup() {
    const stockStore = useStockMouvementStore();
    const productStore = useProductStore();
    const router = useRouter();
    
    const { products } = storeToRefs(productStore);

    onMounted(() => {
      // Fetch products to populate the dropdown
      productStore.fetchProductsForSelect(); // You might want to fetch all products if there are many, or implement a search
    });

    const formData = ref<Movement>({
      product_id: 0,
      type: 'Entrée',
      quantite: 1,
      localisation: ''
    });

    const handleSubmit = async () => {
      if (formData.value.product_id === 0) {
        alert("Veuillez sélectionner un produit.");
        return;
      }

      try {
        await stockStore.createMovement(formData.value);
        // Successful creation: Redirect to the history list
        router.push('/stock-movements');
      } catch (error: any) {
        // Displays error messages returned by your Laravel controller
        alert(error.message || "Une erreur est survenue lors de l'enregistrement.");
      }
    };

    return { 
      formData, 
      handleSubmit, 
      stockStore, 
      products 
    };
  },
});
</script>

<style scoped>
</style>