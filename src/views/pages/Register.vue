<template>
  <div class="fix-wrapper">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
          <div class="card mb-0 h-auto">
            <div class="card-body">
              <div class="text-center mb-3">
                <RouterLink to="/"><img class="logo-auth" src="../../assets/images/logo-full.png" alt="" /></RouterLink>
              </div>
              <h4 class="text-center mb-4">Sign up your account</h4>
              <form action="/">
                <div class="form-group mb-4">
                  <label class="form-label" for="username">Username</label>
                  <input type="text" class="form-control" placeholder="Enter username" id="username" />
                </div>
                <div class="form-group mb-4">
                  <label class="form-label" for="email">Email</label>
                  <input type="email" class="form-control" placeholder="hello@example.com" id="email" />
                </div>
                <div class="mb-sm-4 mb-3 position-relative">
                  <label class="form-label" for="dlab-password">Password</label>
                  <input :type="show ? 'text' : 'password'" id="dlab-password" class="form-control" value="123456" />
                  <span :class="`show-pass eye ${show ? 'active' : ''}`" @click="show = !show">
                    <i class="fa fa-eye-slash"></i>
                    <i class="fa fa-eye"></i>
                  </span>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-block">Sign up</button>
                </div>
              </form>
              <div class="new-account mt-3">
                <p>Already have an account? <RouterLink class="text-primary" to="/page-login">Sign in</RouterLink></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "register_",
  components: { RouterLink },
  setup() {
    const show = ref(false);
    return { show };
  },
});
</script>

<style scoped></style>
