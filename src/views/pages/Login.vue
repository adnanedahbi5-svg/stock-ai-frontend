<template>
  <div class="fix-wrapper">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">

          <div class="card mb-0 h-auto">
            <div class="card-body">

              <div class="text-center mb-3">
                <RouterLink to="/">
                  <img class="logo-auth" src="../../assets/images/logo-full.png" alt="" />
                </RouterLink>
              </div>

              <h4 class="text-center mb-4">Sign in your account</h4>

              <!-- ERROR -->
              <div v-if="error" class="alert alert-danger text-center">
                {{ error }}
              </div>

              <form @submit.prevent="login">

                <!-- EMAIL -->
                <div class="form-group mb-4">
                  <label class="form-label">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <!-- PASSWORD -->
                <div class="mb-sm-4 mb-3 position-relative">
                  <label class="form-label">Password</label>
                  <input
                    v-model="form.password"
                    :type="show ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Enter password"
                  />

                  <span
                    :class="`show-pass eye ${show ? 'active' : ''}`"
                    @click="show = !show"
                  >
                    <i class="fa fa-eye-slash"></i>
                    <i class="fa fa-eye"></i>
                  </span>
                </div>

                <!-- BUTTON -->
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block w-100"
                    :disabled="loading"
                  >
                    {{ loading ? 'Signing in...' : 'Sign In' }}
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

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export default defineComponent({
  name: "login_",
  components: { RouterLink },

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const show = ref(false);
    const loading = ref(false);
    const error = ref("");

    const form = reactive({
      email: "",
      password: ""
    });

    const login = async () => {
      loading.value = true;
      error.value = "";

      const result = await authStore.login(form);

      if (result.success) {
        router.push("/"); // ✅ redirect here
      } else {
        error.value = result.message;
      }

      loading.value = false;
    };

    return {
      show,
      form,
      login,
      loading,
      error
    };
  }
});
</script>

<style scoped></style>