<template>
  <div class="container-fluid mh-auto">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Shop</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Product Details</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-3 col-lg-6 col-md-6 col-xxl-4">
                <!-- Tab panes -->
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="nav-first" role="tabpanel" aria-labelledby="nav-first-tab">
                    <img class="img-fluid rounded" src="../../../assets/images/product/1.jpg" alt="" />
                  </div>
                  <div class="tab-pane fade" id="nav-second" role="tabpanel" aria-labelledby="nav-second-tab">
                    <img class="img-fluid rounded" src="../../../assets/images/product/2.jpg" alt="" />
                  </div>
                  <div class="tab-pane fade" id="nav-third" role="tabpanel" aria-labelledby="nav-third-tab">
                    <img class="img-fluid rounded" src="../../../assets/images/product/3.jpg" alt="" />
                  </div>
                  <div class="tab-pane fade" id="nav-for" role="tabpanel" aria-labelledby="nav-for-tab">
                    <img class="img-fluid rounded" src="../../../assets/images/product/4.jpg" alt="" />
                  </div>
                </div>
                <nav>
                  <div class="product-detail-tab nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      class="nav-link active"
                      id="nav-first-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-first"
                      type="button"
                      role="tab"
                      aria-controls="nav-first"
                      aria-selected="true"
                    >
                      <img class="img-fluid rounded" src="../../../assets/images/tab/1.jpg" alt="" width="100" />
                    </button>
                    <button
                      class="nav-link"
                      id="nav-second-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-second"
                      type="button"
                      role="tab"
                      aria-controls="nav-second"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      <img class="img-fluid rounded" src="../../../assets/images/tab/2.jpg" alt="" width="100" />
                    </button>
                    <button
                      class="nav-link"
                      id="nav-third-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-third"
                      type="button"
                      role="tab"
                      aria-controls="nav-third"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      <img class="img-fluid rounded" src="../../../assets/images/tab/3.jpg" alt="" width="100" />
                    </button>
                    <button
                      class="nav-link"
                      id="nav-for-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-for"
                      type="button"
                      role="tab"
                      aria-controls="nav-for"
                      aria-selected="false"
                      tabindex="-1"
                    >
                      <img class="img-fluid rounded" src="../../../assets/images/tab/4.jpg" alt="" width="100" />
                    </button>
                  </div>
                </nav>
              </div>
              <div class="col-xl-9 col-lg-6 col-md-6 col-xxl-6 col-sm-12">
                <div class="product-detail-content">
                  <!--Product details-->
                  <div class="new-arrival-content pr">
                    <h4>Solid Women's V-neck Dark T-Shirt</h4>
                    <div class="comment-review star-rating">
                      <ul class="mb-2">
                        <li><i class="fa fa-star me-1"></i></li>
                        <li><i class="fa fa-star me-1"></i></li>
                        <li><i class="fa fa-star me-1"></i></li>
                        <li><i class="fa fa-star me-1"></i></li>
                        <li><i class="fa fa-star"></i></li>
                      </ul>
                      <span class="review-text">(34 reviews) / </span
                      ><a class="product-review" href="" data-bs-toggle="modal" data-bs-target="#reviewModal">Write a review?</a>
                    </div>
                    <div class="d-table mb-2 mt-3">
                      <p class="price float-start d-block">$325.00</p>
                    </div>
                    <p>
                      Availability: <span class="item"> In stock <i class="fa fa-shopping-basket"></i></span>
                    </p>
                    <p>Product code: <span class="item">0405689</span></p>
                    <p>Brand: <span class="item">Lee</span></p>
                    <p>
                      Product tags:&nbsp;&nbsp;
                      <span class="badge badge-info light me-1">bags</span>
                      <span class="badge badge-danger light me-1">clothes</span>
                      <span class="badge badge-primary light me-1">shoes</span>
                      <span class="badge badge-success light">dresses</span>
                    </p>
                    <p class="text-content">
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
                      randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                      anything embarrassing.
                    </p>
                    <div class="d-flex align-items-end flex-wrap mt-4">
                      <div class="filtaring-area me-3">
                        <div class="size-filter">
                          <h4 class="mb-3">Select size</h4>
                          <div class="d-flex select-size mb-2" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" checked />
                            <label class="btn btn-outline-primary sharp sharp-lg" for="btnradio1">XS</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" />
                            <label class="btn btn-outline-primary sharp sharp-lg" for="btnradio2">SM</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" />
                            <label class="btn btn-outline-primary sharp sharp-lg" for="btnradio3">MD</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" />
                            <label class="btn btn-outline-primary sharp sharp-lg" for="btnradio4">LG</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" />
                            <label class="btn btn-outline-primary sharp sharp-lg" for="btnradio5">XL</label>
                          </div>
                        </div>
                      </div>
                      <!--Quantity start-->
                      <div class="col-2 px-0 mb-2 me-3">
                        <input type="number" name="num" class="form-control input-btn input-number" value="1" />
                      </div>
                      <!--Quanatity End-->
                      <div class="shopping-cart mb-2 me-3">
                        <a class="btn btn-primary" href="javascript:void();"><i class="fa fa-shopping-basket me-2"></i>Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="reviewModal">
        <div class="modal-dialog modal-dialog-center" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Review</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="text-center mb-4">
                  <img class="img-fluid rounded" width="78" src="./../../../assets/images/avatar/1.jpg" alt="DexignZone" />
                </div>
                <div class="mb-3">
                  <div class="rating-widget mb-4 text-center">
                    <div class="rating-stars">
                      <ul id="stars">
                        <li class="star" title="Poor" data-value="1">
                          <i class="fa fa-star fa-fw"></i>
                        </li>
                        <li class="star" title="Fair" data-value="2">
                          <i class="fa fa-star fa-fw"></i>
                        </li>
                        <li class="star" title="Good" data-value="3">
                          <i class="fa fa-star fa-fw"></i>
                        </li>
                        <li class="star" title="Excellent" data-value="4">
                          <i class="fa fa-star fa-fw"></i>
                        </li>
                        <li class="star" title="WOW!!!" data-value="5">
                          <i class="fa fa-star fa-fw"></i>
                        </li>
                      </ul>
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
      <div>
        <h4 class="card-title mb-3">Similar Products</h4>
        <Swiper
          class="owl-carousel card-slider"
          :slides-per-view="5"
          :space-between="30"
          :loop="true"
          :breakpoints="{
            1200: { slidesPerView: 5 },
            1024: { slidesPerView: 4 },
            991: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
            240: { slidesPerView: 1 },
          }"
        >
          <SwiperSlide class="items" v-for="({ img, price, title, discount }, ind) in products" :key="ind">
            <div class="card">
              <div class="card-body product-grid-card">
                <div class="new-arrival-product">
                  <div class="new-arrivals-img-contnent">
                    <img class="img-fluid" :src="img" alt="" />
                  </div>
                  <div class="new-arrival-content text-center mt-3">
                    <h4>
                      <RouterLink to="/ecom-product-detail">{{ title }}</RouterLink>
                    </h4>
                    <ul class="star-rating">
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i class="fa fa-star me-1"></i></li>
                      <li><i class="fa-solid fa-star-half-stroke me-1"></i></li>
                      <li><i class="fa-solid fa-star-half-stroke"></i></li>
                    </ul>
                    <span class="price">{{ price }}</span
                    >{{ " " }}
                    <del class="discount">${{ discount }}</del>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import IMAGE from "@/constent/Theme";
import { RouterLink } from "vue-router";
export default defineComponent({
  name: "productDetails",
  components: { Swiper, SwiperSlide, RouterLink },
  setup() {
    return {
      products: [
        { img: IMAGE.product1, title: "Sales Motivation and Incentives", price: "$761.00", discount: "245" },
        { img: IMAGE.product2, title: "Performance Management", price: "$61.00", discount: "348" },
        { img: IMAGE.product3, title: "Recruitment, Training", price: "$50.00", discount: "564" },
        { img: IMAGE.product4, title: "Sales Organization", price: "$40.00", discount: "245" },
        { img: IMAGE.product5, title: "Sales ForecastinG", price: "$30.00", discount: "348" },
        { img: IMAGE.product6, title: "Sales Planning and Strategy", price: "$20.00", discount: "564" },
      ],
    };
  },
});
</script>

<style scoped></style>
