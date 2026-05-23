<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const router    = useRouter();
const userStore = useUserStore();
const { saving } = storeToRefs(userStore);

const form = reactive({
  name:    "",
  email:   "",
  role:    "",
  secteur: "",
  password: "",
  password_confirmation: "",
});

const errors = ref<Record<string, string[]>>({});
const successMsg = ref("");
const profilePic = ref<File | null>(null);

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    profilePic.value = target.files[0];
  }
};

const goBack = () => router.push(`/users`);

const submit = async () => {
  errors.value = {};
  successMsg.value = "";

  const payload: Record<string, any> = {
    name:    form.name,
    email:   form.email,
    role:    form.role,
    secteur: form.secteur,
    password: form.password,
    password_confirmation: form.password_confirmation,
  };

  const result = await userStore.createUser(payload);

  if (result && result.success) {
    if (profilePic.value && result.data && result.data.id) {
      await userStore.uploadProfilePicture(profilePic.value, result.data.id);
    }

    successMsg.value = "User created successfully!";
    setTimeout(() => {
        if (result.data && result.data.id) {
            router.push(`/users/${result.data.id}`);
        } else {
            router.push(`/users`);
        }
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
      <h3 class="me-auto">New User</h3>
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
              <h4 class="card-title">User Information</h4>
            </div>

            <div class="card-body">
              <form @submit.prevent="submit">

                <!-- Name -->
                <div class="form-group mb-4">
                  <label class="form-label">Full Name <span class="text-danger">*</span></label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                    placeholder="Enter full name"
                    required
                  />
                  <div v-if="errors.name" class="invalid-feedback">{{ errors.name[0] }}</div>
                </div>

                <!-- Email -->
                <div class="form-group mb-4">
                  <label class="form-label">Email <span class="text-danger">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    placeholder="Enter email"
                    required
                  />
                  <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
                </div>

                <!-- Profile Picture -->
                <div class="form-group mb-4">
                  <label class="form-label">Profile Picture</label>
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="handleFileUpload"
                  />
                </div>

                <!-- Role -->
                <div class="form-group mb-4">
                  <label class="form-label">Role <span class="text-danger">*</span></label>
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
                  <div v-if="errors.role" class="invalid-feedback">{{ errors.role[0] }}</div>
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
                  <div v-if="errors.secteur" class="invalid-feedback">{{ errors.secteur[0] }}</div>
                </div>

                <!-- Password -->
                <div class="form-group mb-4">
                  <label class="form-label">Password <span class="text-danger">*</span></label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    placeholder="Enter password"
                    autocomplete="new-password"
                    required
                  />
                  <div v-if="errors.password" class="invalid-feedback">{{ errors.password[0] }}</div>
                </div>

                <!-- Password Confirmation -->
                <div class="form-group mb-4">
                  <label class="form-label">Confirm Password <span class="text-danger">*</span></label>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="form-control"
                    placeholder="Confirm password"
                    autocomplete="new-password"
                    required
                  />
                </div>

                <!-- Actions -->
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="saving">
                    <i class="fas fa-plus me-2"></i>
                    {{ saving ? 'Creating...' : 'Create User' }}
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
