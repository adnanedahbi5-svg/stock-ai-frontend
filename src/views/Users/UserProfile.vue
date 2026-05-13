<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const route     = useRoute();
const router    = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const { currentUser: storeUser, userLoading: storeLoading } = storeToRefs(userStore);
const { user: authUser } = storeToRefs(authStore);

const isAuthProfile = computed(() => !route.params.id);
const currentUser = computed(() => isAuthProfile.value ? authUser.value : storeUser.value);
const userLoading = computed(() => isAuthProfile.value ? false : storeLoading.value);

onMounted(() => {
  if (!isAuthProfile.value) {
    const id = Number(route.params.id);
    if (!isNaN(id)) {
      userStore.fetchUser(id);
    }
  }
});

const goEdit = () => {
  if (currentUser.value) {
    router.push(`/users/${currentUser.value.id}/edit`);
  }
};
const goBack = () => {
  if (isAuthProfile.value) {
    router.push("/");
  } else {
    router.push("/user-list");
  }
};
</script>

<template>
  <div class="container-fluid">

    <!-- HEADER -->
    <div class="d-flex align-items-center mb-4">
      <h3 class="me-auto">{{ isAuthProfile ? 'My Profile' : 'User Profile' }}</h3>
      <button class="btn btn-secondary light btn-sm me-2" @click="goBack">
        <i class="fas fa-arrow-left me-1"></i> Back
      </button>
      <button class="btn btn-primary btn-sm" @click="goEdit">
        <i class="fas fa-pencil-alt me-1"></i> Edit
      </button>
    </div>

    <!-- Loading -->
    <div v-if="userLoading" class="text-center py-5">
      <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
      <p class="mt-2 text-muted">Loading profile...</p>
    </div>

    <!-- Profile card -->
    <div v-else-if="currentUser" class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header border-0 flex-wrap align-items-start">
            <div class="col-md-8">
              <div class="user d-sm-flex d-block pe-md-5 pe-0">
                <img src="../../assets/images/profile/pic1.jpg" alt="avatar" />
                <div class="ms-sm-3 ms-0 me-md-5 md-0">
                  <h5 class="mb-1">
                    <span class="text-dark">{{ currentUser.name }}</span>
                  </h5>
                  <div class="listline-wrapper mb-2">
                    <span class="item">
                      <i class="text-primary far fa-envelope"></i>
                      {{ currentUser.email }}
                    </span>
                    <span class="item">
                      <i class="text-primary far fa-id-badge"></i>
                      {{ currentUser.role }}
                    </span>
                    <span class="item" v-if="currentUser.secteur">
                      <i class="text-primary fas fa-building"></i>
                      {{ currentUser.secteur }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-12 text-end">
              <span :class="`badge badge-${currentUser.role === 'administrateur' ? 'danger' : 'primary'} light`">
                {{ currentUser.role }}
              </span>
            </div>
          </div>

          <div class="card-body pt-0">
            <h4 class="card-title">Account Details</h4>
            <div class="row">
              <div class="col-xl-6 col-md-6">
                <ul class="list-style-1">
                  <li><label class="custom-label-2 mb-0">ID :</label>{{ currentUser.id }}</li>
                  <li><label class="custom-label-2 mb-0">Full Name :</label>{{ currentUser.name }}</li>
                  <li><label class="custom-label-2 mb-0">Email :</label>{{ currentUser.email }}</li>
                  <li><label class="custom-label-2 mb-0">Role :</label>{{ currentUser.role }}</li>
                  <li><label class="custom-label-2 mb-0">Secteur :</label>{{ currentUser.secteur ?? '-' }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card-footer d-flex flex-wrap justify-content-end align-items-center gap-2">
            <button class="btn btn-secondary btn-sm" @click="goBack">
              <i class="fas fa-arrow-left me-1"></i> {{ isAuthProfile ? 'Back to Dashboard' : 'Back to List' }}
            </button>
            <button class="btn btn-primary btn-sm" @click="goEdit">
              <i class="fas fa-pencil-alt me-1"></i> Edit User
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="text-center py-5 text-muted">
      <i class="fas fa-user-slash fa-3x mb-3"></i>
      <p>User not found.</p>
      <button class="btn btn-secondary btn-sm" @click="goBack">{{ isAuthProfile ? 'Back to Dashboard' : 'Back to List' }}</button>
    </div>

  </div>
</template>

<style scoped></style>
