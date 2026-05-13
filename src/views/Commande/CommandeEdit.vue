<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCommandeStore } from "@/stores/CommandeStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import api from "@/services/api";

const router = useRouter();
const route  = useRoute();
const commandeStore = useCommandeStore();
const authStore     = useAuthStore();
const { saving, currentCommande, commandeLoading } = storeToRefs(commandeStore);

const id = Number(route.params.id);

const form = reactive({
    dateCommande:   "",
    fournisseur_id: "" as number | "",
    statut:         "en_attente",
    user_id:        authStore.user?.id || "",
});

const fournisseurs = ref<any[]>([]);
const errors       = ref<Record<string, string[]>>({});
const successMsg   = ref("");

onMounted(async () => {
    // Fetch fournisseurs for the select
    try {
        const res = await api.get("fournisseurs");
        fournisseurs.value = res.data.data ?? [];
    } catch (error) {
        console.error("Error fetching fournisseurs", error);
    }

    // Fetch the commande to edit
    await commandeStore.fetchCommande(id);

    // ✅ Hydrate form with correct backend field names
    if (currentCommande.value) {
        form.dateCommande   = currentCommande.value.dateCommande;
        form.fournisseur_id = currentCommande.value.fournisseur_id;
        form.statut         = currentCommande.value.statut;
        form.user_id        = currentCommande.value.user_id || authStore.user?.id;
    }
});

const goBack = () => router.push(`/commandes`);

const submit = async () => {
    errors.value   = {};
    successMsg.value = "";

    const result = await commandeStore.updateCommande(id, form);

    if (result?.success) {
        successMsg.value = "Commande updated successfully!";
        setTimeout(() => router.push(`/commandes`), 1200);
    } else if (result) {
        errors.value = result.errors ?? {};
        if (!Object.keys(errors.value).length && result.message) {
            errors.value = { general: [result.message] };
        }
    }
};
</script>

<template>
  <div class="container-fluid">
    <!-- HEADER -->
    <div class="d-flex align-items-center mb-4 flex-wrap">
      <h3 class="me-auto">Edit Commande #{{ id }}</h3>
      <button class="btn btn-secondary light btn-sm" @click="goBack">
        <i class="fas fa-arrow-left me-1"></i> Back
      </button>
    </div>

    <div v-if="commandeLoading" class="text-center py-5">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
      <p class="mt-2">Loading commande data...</p>
    </div>

    <div v-else>
      <!-- Success -->
      <div v-if="successMsg" class="alert alert-success">
        <i class="fas fa-check-circle me-2"></i>{{ successMsg }}
      </div>

      <!-- General error -->
      <div v-if="errors.general" class="alert alert-danger">
        {{ errors.general[0] }}
      </div>

      <div class="row">
        <div class="col-xl-8 col-lg-10">
          <div class="card">
            <div class="card-header border-0">
              <h4 class="card-title">Commande Information</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submit">
                <div class="row">

                  <!-- ✅ dateCommande -->
                  <div class="col-md-6 mb-4">
                    <label class="form-label">Order Date <span class="text-danger">*</span></label>
                    <input
                      v-model="form.dateCommande"
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': errors.dateCommande }"
                      required
                    />
                    <div v-if="errors.dateCommande" class="invalid-feedback">
                      {{ errors.dateCommande[0] }}
                    </div>
                  </div>

                  <!-- Fournisseur -->
                  <div class="col-md-6 mb-4">
                    <label class="form-label">Fournisseur <span class="text-danger">*</span></label>
                    <select
                      v-model="form.fournisseur_id"
                      class="form-control"
                      :class="{ 'is-invalid': errors.fournisseur_id }"
                      required
                    >
                      <option value="" disabled>-- Select Fournisseur --</option>
                      <option v-for="f in fournisseurs" :key="f.id" :value="f.id">
                        {{ f.nom }}
                      </option>
                    </select>
                    <div v-if="errors.fournisseur_id" class="invalid-feedback">
                      {{ errors.fournisseur_id[0] }}
                    </div>
                  </div>

                  <!-- ✅ statut (en_attente | recue | annulee) -->
                  <div class="col-md-6 mb-4">
                    <label class="form-label">Status <span class="text-danger">*</span></label>
                    <select
                      v-model="form.statut"
                      class="form-control"
                      :class="{ 'is-invalid': errors.statut }"
                      required
                    >
                      <option value="en_attente">En attente</option>
                      <option value="recue">Reçue</option>
                      <option value="annulee">Annulée</option>
                    </select>
                    <div v-if="errors.statut" class="invalid-feedback">
                      {{ errors.statut[0] }}
                    </div>
                  </div>

                </div>

                <!-- Actions -->
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="saving">
                    <i class="fas fa-save me-2"></i>
                    {{ saving ? 'Saving...' : 'Update Commande' }}
                  </button>
                  <button type="button" class="btn btn-light" @click="goBack">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>