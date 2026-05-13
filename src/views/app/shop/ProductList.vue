<template>
  <div class="container-fluid mh-auto">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Shop</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Product List</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xl-6" v-for="{ img, fillstar, fillstar2, price } in productList" :key="img">
        <div class="card">
          <div class="card-body">
            <div class="row m-b-30">
              <div class="col-xl-5 col-md-4 col-sm-5">
                <div class="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                  <div class="new-arrivals-img-contnent">
                    <img class="img-fluid" :src="img" alt="" />
                  </div>
                </div>
              </div>
              <div class="col-xl-7 col-md-8 col-sm-7">
                <div class="new-arrival-content position-relative">
                  <h4>
                    <RouterLink to="/ecom-product-detail">Solid Women's V-neck Dark T-Shirt</RouterLink>
                  </h4>
                  <div class="comment-review star-rating">
                    <ul>
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i :class="`${fillstar} me-1`"></i></li>
                      <li><i :class="`${fillstar2}`"></i></li>
                    </ul>
                    <span class="review-text">(34 reviews) / </span
                    ><a class="product-review" href="javasctipt:void(0)" data-bs-toggle="modal" data-bs-target="#reviewModal">Write a review?</a>
                    <p class="price">{{ price }}</p>
                  </div>
                  <p>
                    Availability:
                    <span class="item"> In stock <i class="fa fa-check-circle text-success"></i></span>
                  </p>
                  <p>Product code: <span class="item">0405689</span></p>
                  <p>Brand: <span class="item">Lee</span></p>
                  <p class="text-content">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
                    randomised words.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="reviewModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Review</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="text-center mb-4">
              <img class="img-fluid rounded" width="78" src="../../../assets/images/avatar/1.jpg" alt="DexignZone" />
            </div>
            <div class="mb-3">
              <div class="rating-widget mb-4 text-center">
                <div class="rating-stars d-flex justify-content-center">
                  <vue3-star-ratings id="stars" v-model="rating" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <textarea class="form-control" placeholder="Comment" rows="5"></textarea>
            </div>
            <button class="btn btn-success btn-block">RATE</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { productList } from "@/elements/TableArrayData";
import { RouterLink } from "vue-router";
// @ts-ignore
import vue3StarRatings from "vue3-star-ratings";

export default defineComponent({
  components: { RouterLink, vue3StarRatings },
  data() {
    return {
      productList,
    };
  },
  setup() {
    const rating = ref(0);
    return { rating };
  },
});
</script>

<style>
.vue3-star-ratings__icon {
  margin-left: 5px !important;
  width: 12px !important;
}
</style>
