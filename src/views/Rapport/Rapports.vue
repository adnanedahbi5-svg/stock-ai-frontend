<template>
  <div class="container-fluid">
    <!-- Breadcrumb -->
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="javascript:void(0)">Gestion Stock</a>
        </li>

        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Rapports</a>
        </li>
      </ol>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <!-- FILTER / GENERATE BOX -->
        <div class="filter cm-content-box box-primary">
          <div class="content-title">
            <div class="cpa">
              <i class="fa-solid fa-file-pdf me-2"></i>
              Génération Rapport
            </div>

            <div class="tools">
              <a
                href="javascript:void(0);"
                class="expand SlideToolHeader"
                data-bs-toggle="collapse"
                data-bs-target="#rapportCollapse"
              >
                <i class="fal fa-angle-down"></i>
              </a>
            </div>
          </div>

          <div
            id="rapportCollapse"
            class="cm-content-body form excerpt collapse show"
          >
            <div class="card-body">
              <div class="row">
                <!-- Rapport Name -->
                <div class="col-xl-4 col-sm-12 mb-3">
                  <label class="form-label"> Nom du rapport </label>

                  <input
                    v-model="nom"
                    type="text"
                    class="form-control"
                    placeholder="Ex: Rapport Stock Mai 2026"
                  />
                </div>

                <!-- Rapport Type -->
                <div class="col-xl-4 col-sm-12 mb-3">
                  <label class="form-label"> Type de rapport </label>

                  <select v-model="type" class="form-select">
                    <option disabled value="">Sélectionner un type</option>

                    <option value="Stock">Stock</option>
                    <option value="Commande">Commande</option>
                    <option value="Fournisseur">Fournisseur</option>
                    <option value="Utilisateur">Utilisateur</option>
                    <option value="Activite">Activité</option>
                    <option value="Mouvement">Mouvement</option>
                    <option value="Produit">Produit</option>
                    <option value="Categorie">Catégorie</option>
                  </select>
                </div>

                <!-- Generate Button -->
                <div class="col-xl-4 col-sm-12 align-self-end mb-3">
                  <button
                    class="btn btn-primary"
                    @click="generateRapport"
                    :disabled="generating"
                  >
                    <span
                      v-if="generating"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>

                    <i v-else class="fa-solid fa-plus me-2"></i>

                    Générer Rapport
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RAPPORT TABLE -->
        <div class="card">
          <div class="card-header border-0 pb-0">
            <h4 class="card-title">Liste des rapports</h4>
          </div>

          <div class="card-body">
            <!-- Loading -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary"></div>

              <p class="mt-3">Chargement des rapports...</p>
            </div>

            <!-- Table -->
            <div v-else class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Généré Par</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <!-- Empty -->
                  <tr v-if="rapports.length === 0">
                    <td colspan="5" class="text-center py-4 text-muted">
                      Aucun rapport généré.
                    </td>
                  </tr>

                  <!-- Rapport Rows -->
                  <tr v-for="rapport in rapports" :key="rapport.id">
                    <td>
                      {{ rapport.nom }}
                    </td>

                    <td>
                      <span class="badge badge-primary light">
                        {{ rapport.type }}
                      </span>
                    </td>

                    <td>
                      {{ formatDate(rapport.dateCreation) }}
                    </td>

                    <td>
                      {{ rapport.user?.name ?? "N/A" }}
                    </td>

                    <!-- Actions -->
                    <td class="text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <!-- Download -->
                        <button
                          class="btn btn-success btn-sm"
                          @click="downloadRapport(rapport)"
                        >
                          <i class="fa-solid fa-download"></i>
                        </button>

                        <!-- Delete -->
                        <button
                          class="btn btn-danger btn-sm"
                          @click="deleteRapport(rapport.id)"
                          :disabled="deletingId === rapport.id"
                        >
                          <span
                            v-if="deletingId === rapport.id"
                            class="spinner-border spinner-border-sm"
                          ></span>

                          <i v-else class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import {
  useRapportStore,
  type Rapport,
  type RapportType,
} from "@/stores/RapportStore";

const rapportStore = useRapportStore();

const { rapports, loading, generating, deletingId } = storeToRefs(rapportStore);

/**
 * FORM
 */
const nom = ref("");
const type = ref<RapportType | "">("");

/**
 * FETCH RAPPORTS
 */
onMounted(async () => {
  await rapportStore.fetchRapports();
});

/**
 * GENERATE RAPPORT
 */
const generateRapport = async () => {
  if (!nom.value || !type.value) {
    alert("Veuillez remplir tous les champs.");

    return;
  }

  const res = await rapportStore.generateRapport(
    nom.value,
    type.value as RapportType,
  );

  if (res.success) {
    alert("Rapport généré avec succès.");

    // Déclencher le téléchargement automatique
    if (res.rapport) {
      await rapportStore.downloadRapport(res.rapport.id, res.rapport.nom);
    }

    nom.value = "";
    type.value = "";
  } else {
    alert(res.message);
  }
};

/**
 * DOWNLOAD RAPPORT
 */
const downloadRapport = async (rapport: Rapport) => {
  const res = await rapportStore.downloadRapport(rapport.id, rapport.nom);

  if (!res.success) {
    alert(res.message);
  }
};

/**
 * DELETE RAPPORT
 */
const deleteRapport = async (id: number) => {
  const confirmed = confirm("Voulez-vous supprimer ce rapport ?");

  if (!confirmed) return;

  const res = await rapportStore.deleteRapport(id);

  if (!res.success) {
    alert(res.message);
  }
};

/**
 * FORMAT DATE
 */
const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
</script>

<style scoped></style>
