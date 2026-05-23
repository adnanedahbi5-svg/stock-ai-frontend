<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCommandeStore } from "@/stores/CommandeStore";
import { useFournisseurStore } from "@/stores/fournisseurStore";
import { useAuthStore } from "@/stores/authStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import api from "@/services/api";
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const commandeStore = useCommandeStore();
const authStore = useAuthStore();
const productStore = useProductStore();
const { saving } = storeToRefs(commandeStore);

// ✅ Header fields
const form = reactive({
  dateCommande: new Date().toISOString().split("T")[0],
  fournisseur_id: "" as number | "",
  statut: "en_attente",
  user_id: authStore.user?.id || "",
});

// ✅ Detail lines — required by POST /api/commandes
interface DetailLine {
  product_id: number | "";
  quantity: number | "";
  unit_price_ht: number | "";
  tax_rate: number | "";
}

const details = ref<DetailLine[]>([newDetailLine()]);

function newDetailLine(): DetailLine {
  return { product_id: "", quantity: "", unit_price_ht: "", tax_rate: 20 };
}

const addDetail = () => details.value.push(newDetailLine());
const removeDetail = (i: number) => {
  if (details.value.length > 1) details.value.splice(i, 1);
};

// Computed subtotals for the UI (HT only)
const lineSubtotalHt = (line: DetailLine) => {
  const qty = Number(line.quantity) || 0;
  const price = Number(line.unit_price_ht) || 0;
  return (qty * price).toFixed(2);
};

const lineSubtotalTtc = (line: DetailLine) => {
  const ht = Number(line.quantity) * Number(line.unit_price_ht) || 0;
  const tax = ht * (Number(line.tax_rate) / 100) || 0;
  return (ht + tax).toFixed(2);
};

const grandTotalHt = () =>
  details.value
    .reduce(
      (sum, l) => sum + (Number(l.quantity) * Number(l.unit_price_ht) || 0),
      0,
    )
    .toFixed(2);

const grandTotalTtc = () =>
  details.value
    .reduce((sum, l) => {
      const ht = Number(l.quantity) * Number(l.unit_price_ht) || 0;
      const tax = ht * (Number(l.tax_rate) / 100) || 0;
      return sum + ht + tax;
    }, 0)
    .toFixed(2);

const fournisseurStore = useFournisseurStore();
const { fournisseurs } = storeToRefs(fournisseurStore);
const { products } = storeToRefs(productStore);
const errors = ref<Record<string, any>>({});
const successMsg = ref("");

onMounted(async () => {
  try {
    await fournisseurStore.fetchFournisseursForSelect();
  } catch (e) {
    console.error("Error fetching fournisseurs", e);
  }

  try {
    productStore.fetchProductsForSelect();
  } catch (e) {
    console.error("Error fetching products", e);
  }
  if (route.query.product_id) {
    details.value[0] = {
      product_id: Number(route.query.product_id),
      quantity: Number(route.query.quantity) || 1,
      unit_price_ht: "",
      tax_rate: 20,
    };
  }
});

const goBack = () => router.push("/commandes");

const submit = async () => {
  errors.value = {};
  successMsg.value = "";

  // ✅ Send header + details as expected by the backend
  const payload = {
    ...form,
    details: details.value,
  };

  const result = await commandeStore.createCommande(payload);

  if (result?.success) {
    successMsg.value = "Commande created successfully!";
    setTimeout(() => router.push("/commandes"), 1200);
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
      <h3 class="me-auto">New Commande</h3>
      <button class="btn btn-secondary light btn-sm" @click="goBack">
        <i class="fas fa-arrow-left me-1"></i> Back
      </button>
    </div>

    <!-- Success -->
    <div v-if="successMsg" class="alert alert-success">
      <i class="fas fa-check-circle me-2"></i>{{ successMsg }}
    </div>

    <!-- General error -->
    <div v-if="errors.general" class="alert alert-danger">
      {{ errors.general[0] }}
    </div>

    <form @submit.prevent="submit">
      <!-- ── Section 1: Header ─────────────────────────────── -->
      <div class="row">
        <div class="col-xl-8 col-lg-10">
          <div class="card mb-4">
            <div class="card-header border-0">
              <h4 class="card-title">Commande Information</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Date -->
                <div class="col-md-6 mb-4">
                  <label class="form-label"
                    >Order Date <span class="text-danger">*</span></label
                  >
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
                  <label class="form-label"
                    >Fournisseur <span class="text-danger">*</span></label
                  >
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

                <!-- Status -->
                <div class="col-md-6 mb-4">
                  <label class="form-label"
                    >Status <span class="text-danger">*</span></label
                  >
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
            </div>
          </div>
        </div>
      </div>

      <!-- ── Section 2: Detail Lines ───────────────────────── -->
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-header border-0 d-flex align-items-center">
              <h4 class="card-title me-auto">Order Lines</h4>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="addDetail"
              >
                <i class="fas fa-plus me-1"></i> Add Line
              </button>
            </div>
            <div class="card-body">
              <!-- Validation errors for details array -->
              <template v-for="(msg, key) in errors" :key="key">
                <div
                  v-if="String(key).startsWith('details')"
                  class="alert alert-danger py-2"
                >
                  {{ Array.isArray(msg) ? msg[0] : msg }}
                </div>
              </template>

              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product <span class="text-danger">*</span></th>
                      <th style="width: 110px">
                        Quantity <span class="text-danger">*</span>
                      </th>
                      <th style="width: 140px">
                        Unit Price HT <span class="text-danger">*</span>
                      </th>
                      <th style="width: 110px">
                        Tax Rate % <span class="text-danger">*</span>
                      </th>
                      <th style="width: 120px" class="text-end">Subtotal HT</th>
                      <th style="width: 120px" class="text-end">
                        Subtotal TTC
                      </th>
                      <th style="width: 50px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(line, i) in details" :key="i">
                      <!-- Product -->
                      <td>
                        <select
                          v-model="line.product_id"
                          class="form-control form-control-sm"
                          :class="{
                            'is-invalid': errors[`details.${i}.product_id`],
                          }"
                          required
                        >
                          <option value="" disabled>-- Select --</option>
                          <option
                            v-for="p in products"
                            :key="p.id"
                            :value="p.id"
                          >
                            {{ p.nom }}
                          </option>
                        </select>
                      </td>

                      <!-- Quantity -->
                      <td>
                        <input
                          v-model.number="line.quantity"
                          type="number"
                          min="1"
                          class="form-control form-control-sm"
                          :class="{
                            'is-invalid': errors[`details.${i}.quantity`],
                          }"
                          required
                        />
                      </td>

                      <!-- Unit Price HT -->
                      <td>
                        <input
                          v-model.number="line.unit_price_ht"
                          type="number"
                          min="0"
                          step="0.01"
                          class="form-control form-control-sm"
                          :class="{
                            'is-invalid': errors[`details.${i}.unit_price_ht`],
                          }"
                          required
                        />
                      </td>

                      <!-- Tax Rate -->
                      <td>
                        <input
                          v-model.number="line.tax_rate"
                          type="number"
                          min="0"
                          step="0.01"
                          class="form-control form-control-sm"
                          :class="{
                            'is-invalid': errors[`details.${i}.tax_rate`],
                          }"
                          required
                        />
                      </td>

                      <!-- Subtotal HT (read-only) -->
                      <td class="text-end align-middle fw-semibold">
                        {{ lineSubtotalHt(line) }} €
                      </td>

                      <!-- Subtotal TTC (read-only) -->
                      <td class="text-end align-middle fw-bold text-primary">
                        {{ lineSubtotalTtc(line) }} €
                      </td>

                      <!-- Remove -->
                      <td class="text-center align-middle">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          :disabled="details.length === 1"
                          @click="removeDetail(i)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" class="text-end fw-bold">
                        Grand Total HT:
                      </td>
                      <td class="text-end fw-bold">{{ grandTotalHt() }} €</td>
                      <td class="text-end fw-bold text-primary">
                        {{ grandTotalTtc() }} €
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Actions ───────────────────────────────────────── -->
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="saving">
          <i class="fas fa-plus me-2"></i>
          {{ saving ? "Creating..." : "Create Commande" }}
        </button>
        <button type="button" class="btn btn-light" @click="goBack">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
