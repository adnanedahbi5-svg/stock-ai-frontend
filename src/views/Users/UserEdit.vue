<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { currentUser, userLoading, saving } = storeToRefs(userStore);

const form = reactive({
  name: "",
  email: "",
  role: "",
  secteur: "",
  password: "",
});

const errors = ref<Record<string, string[]>>({});
const successMsg = ref("");
const picMessage = ref("");

const handleFileUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const id = Number(route.params.id);
    await userStore.uploadProfilePicture(target.files[0], id);
    picMessage.value = "Profile picture updated successfully!";
    setTimeout(() => (picMessage.value = ""), 3000);
  }
};

onMounted(async () => {
  const id = Number(route.params.id);
  await userStore.fetchUser(id);

  if (currentUser.value) {
    form.name = currentUser.value.name ?? "";
    form.email = currentUser.value.email ?? "";
    form.role = currentUser.value.role ?? "";
    form.secteur = currentUser.value.secteur ?? "";
  }
});

const goBack = () => router.push(`/users/${route.params.id}`);

const submit = async () => {
  errors.value = {};
  successMsg.value = "";

  const id = Number(route.params.id);

  // Build payload — only send password if filled
  const payload: Record<string, any> = {
    name: form.name,
    email: form.email,
    role: form.role,
    secteur: form.secteur,
  };
  if (form.password) payload.password = form.password;

  const result = await userStore.updateUser(id, payload);

  if (result && result.success) {
    await userStore.fetchUser(id);
    successMsg.value = "User updated successfully!";
    setTimeout(() => router.push(`/users/${id}`), 1200);
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
      <h3 class="me-auto">Edit User</h3>
      <button class="btn btn-secondary light btn-sm" @click="goBack">
        <i class="fas fa-arrow-left me-1"></i> Back
      </button>
    </div>

    <!-- Loading -->
    <div v-if="userLoading" class="text-center py-5">
      <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
      <p class="mt-2 text-muted">Loading user...</p>
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
              <h4 class="card-title">User Information</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submit">
                <!-- Name -->
                <div class="form-group mb-4">
                  <label class="form-label"
                    >Full Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                    placeholder="Enter full name"
                    required
                  />
                  <div v-if="errors.name" class="invalid-feedback">
                    {{ errors.name[0] }}
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group mb-4">
                  <label class="form-label"
                    >Email <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    placeholder="Enter email"
                    required
                  />
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email[0] }}
                  </div>
                </div>

                <!-- Profile Picture -->
                <div class="form-group mb-4">
                  <label class="form-label">Profile Picture</label>
                  <div class="d-flex align-items-center gap-3">
                    <img
                      v-if="currentUser?.profile_picture"
                      :src="currentUser.profile_picture"
                      alt="Profile"
                      class="rounded-circle shadow-sm"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <input
                      type="file"
                      class="form-control"
                      accept="image/*"
                      @change="handleFileUpload"
                    />
                  </div>
                  <div v-if="picMessage" class="text-success mt-1 small">
                    <i class="fas fa-check-circle me-1"></i>{{ picMessage }}
                  </div>
                </div>

                <!-- Role -->
                <div class="form-group mb-4">
                  <label class="form-label"
                    >Role <span class="text-danger">*</span></label
                  >
                  <select
                    v-model="form.role"
                    class="form-control"
                    :class="{ 'is-invalid': errors.role }"
                    required
                  >
                    <option value="">-- Select role --</option>
                    <option value="administrateur">Administrateur</option>
                    <option value="gestionnaire">Gestionnaire</option>
                  </select>
                  <div v-if="errors.role" class="invalid-feedback">
                    {{ errors.role[0] }}
                  </div>
                </div>

                <!-- Secteur -->
                <div class="form-group mb-4">
                  <label class="form-label">Secteur</label>
                  <input
                    v-model="form.secteur"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.secteur }"
                    placeholder="Enter secteur (optional)"
                  />
                  <div v-if="errors.secteur" class="invalid-feedback">
                    {{ errors.secteur[0] }}
                  </div>
                </div>

                <!-- New Password (optional) -->
                <div class="form-group mb-4">
                  <label class="form-label"
                    >New Password
                    <small class="text-muted"
                      >(leave blank to keep current)</small
                    ></label
                  >
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    placeholder="Enter new password"
                    autocomplete="new-password"
                  />
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password[0] }}
                  </div>
                </div>

                <!-- Actions -->
                <div class="d-flex gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="saving"
                  >
                    <i class="fas fa-save me-2"></i>
                    {{ saving ? "Saving..." : "Save Changes" }}
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
