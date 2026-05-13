<template>
  <div class="fix-wrapper">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5">
          <div class="form-input-content text-center error-page">
            <h1 class="error-text font-weight-bold">503</h1>
            <h4><i class="fa fa-times-circle text-danger"></i> Service Unavailable</h4>
            <p>Sorry, we are under maintenance!</p>
            <div>
              <RouterLink class="btn btn-primary" to="/">Back to Home</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "error503_",
  components: { RouterLink },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
