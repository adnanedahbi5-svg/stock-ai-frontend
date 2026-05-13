<template>
  <div class="container-fluid mh-auto">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Shop</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Product Grid</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-2 col-xxl-3 col-md-4 col-sm-6" v-for="({ img, title, price, fillstar, fillstar2, discount }, ind) in productGrid" :key="ind">
        <div class="card product-grid-card">
          <div class="card-body">
            <div class="new-arrival-product">
              <div class="new-arrivals-img-contnent">
                <img class="img-fluid" :src="img" alt="" />
              </div>
              <div class="new-arrival-content text-center mt-3">
                <h4>
                  <RouterLink to="/ecom-product-detail">{{ title }}</RouterLink>
                </h4>
                <ul class="star-rating">
                  <li class="me-1"><i class="fa fa-star"></i></li>
                  <li class="me-1"><i class="fa fa-star"></i></li>
                  <li class="me-1"><i class="fa fa-star"></i></li>
                  <li class="me-1"><i :class="fillstar"></i></li>
                  <li class=""><i :class="fillstar2"></i></li>
                </ul>
                <del class="discount">${{ discount }}</del>
                <span class="price">{{ price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { productGrid } from "@/elements/TableArrayData";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "productGrid_",
  components: { RouterLink },
  data() {
    return { productGrid };
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
