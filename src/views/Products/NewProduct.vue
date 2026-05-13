<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import api from "@/services/api";

const router    = useRouter();
const productStore = useProductStore();
const { saving } = storeToRefs(productStore);

const form = reactive({
  nom: "",
  codeBarre: "",
  quantiteStock: 0,
  seuilAlerte: 0,
  category_id: "" as number | "",
});

const categories = ref<any[]>([]);
const errors = ref<Record<string, string[]>>({});
const successMsg = ref("");

onMounted(async () => {
    try {
        const res = await api.get('/categories');
        categories.value = res.data.data ?? [];
    } catch (error) {
        console.error("Error fetching categories", error);
    }
});

const goBack = () => router.push(`/products`);

const submit = async () => {
  errors.value = {};
  successMsg.value = "";

  const result = await productStore.createProduct(form);

  if (result && result.success) {
    successMsg.value = "Product created successfully!";
    setTimeout(() => {
        router.push(`/products`);
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
      <h3 class="me-auto">New Product</h3>
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
              <h4 class="card-title">Product Information</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submit">

                <!-- Name -->
                <div class="form-group mb-4">
                  <label class="form-label">Product Name <span class="text-danger">*</span></label>
                  <input
                    v-model="form.nom"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.nom }"
                    placeholder="Enter product name"
                    required
                  />
                  <div v-if="errors.nom" class="invalid-feedback">{{ errors.nom[0] }}</div>
                </div>

                <!-- Code Barre -->
                <div class="form-group mb-4">
                  <label class="form-label">Barcode <span class="text-danger">*</span></label>
                  <input
                    v-model="form.codeBarre"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.codeBarre }"
                    placeholder="Enter barcode"
                    required
                  />
                  <div v-if="errors.codeBarre" class="invalid-feedback">{{ errors.codeBarre[0] }}</div>
                </div>

                <!-- Stock Quantity -->
                <div class="form-group mb-4">
                  <label class="form-label">Stock Quantity <span class="text-danger">*</span></label>
                  <input
                    v-model="form.quantiteStock"
                    type="number"
                    min="0"
                    class="form-control"
                    :class="{ 'is-invalid': errors.quantiteStock }"
                    placeholder="0"
                    required
                  />
                  <div v-if="errors.quantiteStock" class="invalid-feedback">{{ errors.quantiteStock[0] }}</div>
                </div>

                <!-- Alert Limit -->
                <div class="form-group mb-4">
                  <label class="form-label">Alert Limit <span class="text-danger">*</span></label>
                  <input
                    v-model="form.seuilAlerte"
                    type="number"
                    min="0"
                    class="form-control"
                    :class="{ 'is-invalid': errors.seuilAlerte }"
                    placeholder="0"
                    required
                  />
                  <div v-if="errors.seuilAlerte" class="invalid-feedback">{{ errors.seuilAlerte[0] }}</div>
                </div>

                <!-- Category -->
                <div class="form-group mb-4">
                  <label class="form-label">Category <span class="text-danger">*</span></label>
                  <select
                    v-model="form.category_id"
                    class="form-control"
                    :class="{ 'is-invalid': errors.category_id }"
                    required
                  >
                    <option value="" disabled>-- Select Category --</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.nom }}
                    </option>
                  </select>
                  <div v-if="errors.category_id" class="invalid-feedback">{{ errors.category_id[0] }}</div>
                </div>

                <!-- Actions -->
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="saving">
                    <i class="fas fa-plus me-2"></i>
                    {{ saving ? 'Creating...' : 'Create Product' }}
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
