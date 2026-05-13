<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useFournisseurStore } from "@/stores/fournisseurStore";
import { storeToRefs } from "pinia";

const router    = useRouter();
const fournisseurStore = useFournisseurStore();
const { saving } = storeToRefs(fournisseurStore);

const form = reactive({
  nom: "",
  contact: "",
  adresse: "",
});

const errors = ref<Record<string, string[]>>({});
const successMsg = ref("");

const goBack = () => router.push(`/fournisseurs`);

const submit = async () => {
  errors.value = {};
  successMsg.value = "";

  const result = await fournisseurStore.createFournisseur(form);

  if (result && result.success) {
    successMsg.value = "Fournisseur created successfully!";
    setTimeout(() => {
        router.push(`/fournisseurs`);
    }, 1200);
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
      <h3 class="me-auto">New Fournisseur</h3>
      <button class="btn btn-secondary light btn-sm" @click="goBack">
        <i class="fas fa-arrow-left me-1"></i> Back
      </button>
    </div>

    <div>
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
              <h4 class="card-title">Fournisseur Information</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submit">

                <!-- Name -->
                <div class="form-group mb-4">
                  <label class="form-label">Fournisseur Name <span class="text-danger">*</span></label>
                  <input
                    v-model="form.nom"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.nom }"
                    placeholder="Enter fournisseur name"
                    required
                  />
                  <div v-if="errors.nom" class="invalid-feedback">{{ errors.nom[0] }}</div>
                </div>

                <!-- Contact -->
                <div class="form-group mb-4">
                  <label class="form-label">Contact <span class="text-danger">*</span></label>
                  <input
                    v-model="form.contact"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.contact }"
                    placeholder="Enter contact details"
                    required
                  />
                  <div v-if="errors.contact" class="invalid-feedback">{{ errors.contact[0] }}</div>
                </div>

                <!-- Address -->
                <div class="form-group mb-4">
                  <label class="form-label">Address</label>
                  <textarea
                    v-model="form.adresse"
                    class="form-control"
                    :class="{ 'is-invalid': errors.adresse }"
                    placeholder="Enter address"
                    rows="3"
                  ></textarea>
                  <div v-if="errors.adresse" class="invalid-feedback">{{ errors.adresse[0] }}</div>
                </div>

                <!-- Actions -->
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="saving">
                    <i class="fas fa-plus me-2"></i>
                    {{ saving ? 'Creating...' : 'Create Fournisseur' }}
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
