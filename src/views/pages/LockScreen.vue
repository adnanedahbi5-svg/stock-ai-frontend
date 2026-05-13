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
              <h4 class="text-center mb-4">Account Locked</h4>
              <form action="/">
                <div class="mb-sm-4 mb-3 position-relative">
                  <label class="form-label" for="dlab-password">Password</label>
                  <input :type="show ? 'text' : 'password'" id="dlab-password" class="form-control" value="123456" />
                  <span :class="`show-pass eye ${show ? 'active' : ''}`" @click="show = !show">
                    <i class="fa fa-eye-slash"></i>
                    <i class="fa fa-eye"></i>
                  </span>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-block">Unlock</button>
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
import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "lockScreen",
  components: { RouterLink },
  setup() {
    const show = ref(false);
    return { show };
  },
});
</script>

<style scoped></style>
