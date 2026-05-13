<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCommandeStore } from "@/stores/CommandeStore";
import { storeToRefs } from "pinia";


const router = useRouter();
const route = useRoute();
const commandeStore = useCommandeStore();
const { currentCommande, commandeLoading } = storeToRefs(commandeStore);

const id = Number(route.params.id);

onMounted(async () => {
    await commandeStore.fetchCommande(id);
});

const goBack      = () => router.push(`/commandes`);
const editCommande = () => router.push(`/commandes/${id}/edit`);

// ✅ Matches backend enum: en_attente | recue | annulee
const getStatusBadgeClass = (statut: string) => {
    const s = statut?.toLowerCase();
    if (s === "recue")      return "badge-success";
    if (s === "en_attente") return "badge-warning";
    if (s === "annulee")    return "badge-danger";
    return "badge-primary";
};

const formatStatut = (statut: string) => {
    if (statut === "en_attente") return "En attente";
    if (statut === "recue")      return "Reçue";
    if (statut === "annulee")    return "Annulée";
    return statut;
};

const downloadPdf = async (id: number) => {
  await commandeStore.downloadPdf(id);
};
</script>

<template>
  <div class="container-fluid">
    <!-- HEADER -->
    <div class="d-flex align-items-center mb-4 flex-wrap">
      <h3 class="me-auto">Commande #{{ id }}</h3>

      <div class="d-flex gap-2">

        <button
          class="btn btn-secondary light btn-sm"
          @click="goBack"
        >
          <i class="fas fa-arrow-left me-1"></i>
          Back
        </button>

        <button
          class="btn btn-primary btn-sm"
          @click="editCommande"
        >
          <i class="fas fa-pencil-alt me-1"></i>
          Edit
        </button>

        <button
          class="btn btn-danger btn-sm"
          @click="commandeStore.downloadPdf(id)"
        >
          <i class="fas fa-file-pdf me-1"></i>
          PDF
        </button>

      </div>
    </div>

    <!-- Loading -->
    <div v-if="commandeLoading" class="text-center py-5">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
      <p class="mt-2">Loading details...</p>
    </div>

    <div v-else-if="currentCommande" class="row">
      <!-- General Info -->
      <div class="col-xl-4 col-lg-5">
        <div class="card">
          <div class="card-header border-0 pb-0">
            <h4 class="card-title">General Information</h4>
          </div>
          <div class="card-body">

            <!-- ✅ dateCommande (not date_commande) -->
            <div class="mb-4">
              <label class="text-muted d-block">Order Date</label>
              <h5>{{ currentCommande.dateCommande }}</h5>
            </div>

            <!-- ✅ fournisseur.nom (eager-loaded relation) -->
            <div class="mb-4">
              <label class="text-muted d-block">Fournisseur</label>
              <h5>{{ currentCommande.fournisseur?.nom ?? 'N/A' }}</h5>
            </div>

            <!-- ✅ user.name (eager-loaded relation) -->
            <div class="mb-4">
              <label class="text-muted d-block">Created by</label>
              <h5>{{ currentCommande.user?.name ?? 'N/A' }}</h5>
            </div>

            <!-- ✅ statut (not status) -->
            <div class="mb-4">
              <label class="text-muted d-block">Status</label>
              <span :class="`badge ${getStatusBadgeClass(currentCommande.statut)} light`">
                {{ formatStatut(currentCommande.statut) }}
              </span>
            </div>

            <hr />

            <div class="mb-2 d-flex justify-content-between">
              <span class="text-muted">Total HT:</span>
              <h5 class="mb-0">{{ currentCommande.total_ht ?? 0 }} €</h5>
            </div>
            <div class="mb-2 d-flex justify-content-between">
              <span class="text-muted">Total Tax:</span>
              <h5 class="mb-0">{{ currentCommande.total_tax ?? 0 }} €</h5>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Total TTC:</span>
              <h5 class="mb-0 text-primary fw-bold">{{ currentCommande.total_ttc ?? 0 }} €</h5>
            </div>

          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="col-xl-8 col-lg-7">
        <div class="card">
          <div class="card-header border-0 pb-0">
            <h4 class="card-title">Commande Items</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price HT</th>
                    <th>Tax Rate</th>
                    <th>Tax Amount</th>
                    <th class="text-end">Subtotal TTC</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- ✅ details (not items) -->
                  <tr v-if="!currentCommande.details || currentCommande.details.length === 0">
                    <td colspan="6" class="text-center py-4 text-muted">
                      No items found for this commande.
                    </td>
                  </tr>

                  <!-- ✅ quantity / unit_price_ht / tax_rate / tax_amount / subtotal_ttc -->
                  <tr v-for="detail in currentCommande.details" :key="detail.id">
                    <td>{{ detail.product?.nom ?? 'Unknown Product' }}</td>
                    <td>{{ detail.quantity }}</td>
                    <td>{{ detail.unit_price_ht }} €</td>
                    <td>{{ detail.tax_rate }} %</td>
                    <td>{{ detail.tax_amount }} €</td>
                    <td class="text-end fw-bold">{{ detail.subtotal_ttc }} €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-danger">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Commande not found or error loading data.
    </div>
  </div>
</template>

<style scoped></style>