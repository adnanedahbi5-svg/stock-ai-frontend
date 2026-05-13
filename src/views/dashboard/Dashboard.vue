<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-6">
        <div class="row">
          <CardChart />
          <div class="col-xl-12">
            <div class="card" id="user-activity">
              <VacancyChart />
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card" id="user-activity1">
              <Activity1 height="280px" />
            </div>
          </div>
          <div class="col-xl-12">
            <FeaturedCompany />
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-8 col-xxl-7 col-sm-7">
                    <div class="update-profile d-flex">
                      <img src="../../assets/images/profile/pic1.jpg" alt="" />
                      <div class="ms-4">
                        <h3 class="mb-0">Franklin Jr</h3>
                        <span class="text-primary d-block mb-xl-3 mb-1">UI / UX Designer</span>
                        <span><i class="fas fa-map-marker-alt me-1"></i>Medan, Sumatera Utara - ID</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-xxl-5 col-sm-5 sm-mt-auto mt-3 text-sm-end">
                    <a href="javascript:void(0);" class="btn btn-primary">Update Profile</a>
                  </div>
                </div>
                <div class="row mt-4 align-items-center">
                  <h4 class="fs-20 mb-0 mt-1">Skills</h4>
                  <div class="col-xl-6 col-sm-6">
                    <div class="progress default-progress">
                      <div class="progress-bar bg-green progress-animated" style="width: 90%; height: 8px" role="progressbar">
                        <span class="sr-only">90% Complete</span>
                      </div>
                    </div>
                    <div class="d-flex align-items-end mt-2 pb-4 justify-content-between">
                      <span class="font-w500">Figma</span>
                      <h6 class="mb-0">90%</h6>
                    </div>
                    <div class="progress default-progress">
                      <div class="progress-bar bg-info progress-animated" style="width: 68%; height: 8px" role="progressbar">
                        <span class="sr-only">45% Complete</span>
                      </div>
                    </div>
                    <div class="d-flex align-items-end mt-2 pb-4 justify-content-between">
                      <span class="font-w500">Adobe XD</span>
                      <h6 class="mb-0">68%</h6>
                    </div>
                    <div class="progress default-progress">
                      <div class="progress-bar bg-blue progress-animated" style="width: 85%; height: 8px" role="progressbar">
                        <span class="sr-only">85% Complete</span>
                      </div>
                    </div>
                    <div class="d-flex align-items-end mt-2 justify-content-between">
                      <span class="font-w500">Photoshop</span>
                      <h6 class="mb-0">85%</h6>
                    </div>
                  </div>
                  <div class="col-xl-6 col-sm-6">
                    <div id="pieChart1">
                      <apexchart height="220" :series="pieChart1.series" :options="pieChart1.chartOptions" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header border-0 pb-2">
                <h4 class="card-title mb-0">Recent Activity</h4>
                <div>
                  <div class="dropdown bootstrap-select default-select dashboard-select">
                    <JobSelectOption :options="[{ title: 'Newest' }, { title: 'latest' }, { title: 'oldest' }]" />
                  </div>
                  <div class="dropdown custom-dropdown mb-0">
                    <div class="btn sharp tp-btn dark-btn" data-bs-toggle="dropdown">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="var(--text)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          stroke="var(--text)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                          stroke="var(--text)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="javascript:void(0);">Details</a>
                      <a class="dropdown-item text-danger" href="javascript:void(0);">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body loadmore-content pb-0 pt-3 list-grid-area dlab-scroll height370 recent-activity-wrapper" id="RecentActivityContent">
                <div class="d-flex recent-activity">
                  <span class="me-3 activity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#f93a0b" />
                    </svg>
                  </span>
                  <div class="d-flex align-items-center list-item-bx">
                    <div class="icon-img-bx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                        <g transform="translate(-457 -443)">
                          <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                          <g transform="translate(457 443)">
                            <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee" />
                            <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                            <circle
                              data-name="Ellipse 11"
                              cx="11"
                              cy="11"
                              r="11"
                              transform="translate(36 15)"
                              fill="#ffe70c"
                              style="mix-blend-mode: multiply; isolation: isolate"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-1">Bubles Studios have 5 available positions for you</h6>
                      <p class="mb-0">8min ago</p>
                    </div>
                  </div>
                </div>
                <div class="d-flex recent-activity">
                  <span class="me-3 activity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#d9d9d9" />
                    </svg>
                  </span>
                  <div class="d-flex align-items-center list-item-bx">
                    <div class="icon-img-bx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                        <g transform="translate(-457 -443)">
                          <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                          <g transform="translate(457 443)">
                            <rect data-name="placeholder" width="71" height="71" rx="12" fill="#eeac27" />
                            <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                            <circle
                              data-name="Ellipse 11"
                              cx="11"
                              cy="11"
                              r="11"
                              transform="translate(36 15)"
                              fill="#ffe70c"
                              style="mix-blend-mode: multiply; isolation: isolate"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-1">Elextra Studios has invited you to interview meeting tomorrow</h6>
                      <p class="mb-0">8min ago</p>
                    </div>
                  </div>
                </div>
                <div class="d-flex recent-activity">
                  <span class="me-3 activity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#d9d9d9" />
                    </svg>
                  </span>
                  <div class="d-flex align-items-center list-item-bx">
                    <div class="icon-img-bx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                        <g transform="translate(-457 -443)">
                          <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                          <g transform="translate(457 443)">
                            <rect data-name="placeholder" width="71" height="71" rx="12" fill="#22bc32" />
                            <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                            <circle
                              data-name="Ellipse 11"
                              cx="11"
                              cy="11"
                              r="11"
                              transform="translate(36 15)"
                              fill="#ffe70c"
                              style="mix-blend-mode: multiply; isolation: isolate"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-1">Highspeed Design Team have 2 available positions for you</h6>
                      <p class="mb-0">8min ago</p>
                    </div>
                  </div>
                </div>
                <div class="d-flex recent-activity">
                  <span class="me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#d9d9d9" />
                    </svg>
                  </span>
                  <div class="d-flex align-items-center list-item-bx">
                    <div class="icon-img-bx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                        <g transform="translate(-457 -443)">
                          <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                          <g transform="translate(457 443)">
                            <rect data-name="placeholder" width="71" height="71" rx="12" fill="#9933cb" />
                            <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                            <circle
                              data-name="Ellipse 11"
                              cx="11"
                              cy="11"
                              r="11"
                              transform="translate(36 15)"
                              fill="#ffe70c"
                              style="mix-blend-mode: multiply; isolation: isolate"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-1">Kleon Studios have 5 available positions for you</h6>
                      <p class="mb-0">8min ago</p>
                    </div>
                  </div>
                </div>
                <div class="d-flex recent-activity">
                  <span class="me-3 activity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill="#d9d9d9" />
                    </svg>
                  </span>
                  <div class="d-flex align-items-center list-item-bx">
                    <div class="icon-img-bx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                        <g transform="translate(-457 -443)">
                          <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                          <g transform="translate(457 443)">
                            <rect data-name="placeholder" width="71" height="71" rx="12" fill="#eeac27" />
                            <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                            <circle
                              data-name="Ellipse 11"
                              cx="11"
                              cy="11"
                              r="11"
                              transform="translate(36 15)"
                              fill="#ffe70c"
                              style="mix-blend-mode: multiply; isolation: isolate"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-1">Elextra Studios has invited you to interview meeting tomorrow</h6>
                      <p class="mb-0">8min ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer border-0 text-center">
                <a href="javascript:void(0);" class="btn btn-outline-primary m-auto dlab-load-more" id="RecentActivity" rel="ajax/recentactivity.html">View more</a>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header pb-0 border-0 flex-wrap">
                <h4 class="card-title mb-sm-0 mb-2">Available Jobs For You</h4>
                <div>
                  <div class="dropdown bootstrap-select default-select dashboard-select">
                    <JobSelectOption :options="[{ title: 'Newest' }, { title: 'oldest' }]" />
                  </div>
                </div>
              </div>
              <div class="card-body">
                <Swiper
                  class="owl-carousel owl-carousel owl-loaded front-view-slider"
                  :slides-per-view="2.8"
                  :space-between="30"
                  :speed="1200"
                  :breakpoints="{
                    // 3500: { slidesPerView: 6.5 },
                    // 3000: { slidesPerView: 5.5 },
                    // 2700: { slidesPerView: 4.5 },
                    // 1900: { slidesPerView: 3 },
                    // 1800: { slidesPerView: 2.5 },
                    1600: { slidesPerView: 2.5 },
                    1200: { slidesPerView: 2.3 },
                    1199: { slidesPerView: 3 },
                    768: { slidesPerView: 3, spaceBetween: '20' },
                    591: { slidesPerView: 2.3 },
                    240: { slidesPerView: 1 },
                  }"
                >
                  <SwiperSlide class="items" v-for="({ icon, title, text }, ind) in carousel" :key="ind">
                    <div class="jobs">
                      <div class="text-center">
                        <div class="icon-img-bx" v-html="icon"></div>
                        <h5 class="mb-1">{{ title }}</h5>
                        <p class="text-primary mb-2 fs-13">{{ text }}</p>
                      </div>
                      <div class="bottom-info pt-1 text-center">
                        <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>Manchester, England</p>
                        <p class="mb-0"><i class="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <SvgCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { SVGImage } from "@/constent/Theme";
import CardChart from "@/elements/CardChart.vue";
import Activity1 from "@/elements/home/Activity1.vue";
import SvgCard from "@/elements/home/SvgCard.vue";
import VacancyChart from "@/elements/home/VacancyChart.vue";
import router from "@/router";
import { Swiper, SwiperSlide } from "swiper/vue";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import { pieChart1 } from "@/layouts/ChartsData";
import JobSelectOption from "../../elements/JobSelectOption.vue";
import FeaturedCompany from "../../elements/home/FeaturedCompany.vue";

export default defineComponent({
  name: "dashBoard",
  components: {
    CardChart,
    Activity1,
    SvgCard,
    VacancyChart,
    apexchart: VueApexCharts,
    Swiper,
    SwiperSlide,
    JobSelectOption,
    FeaturedCompany,
  },
  data() {
    return { SVGImage, pieChart1 };
  },
  setup() {
    const selectOptin = ref("Month");
    watchEffect(() => {
      if (router.currentRoute.value.name == "dark") {
        document.body.setAttribute("data-theme-version", "dark");
      } else {
        document.body.setAttribute("data-theme-version", "light");
      }
    });
    return {
      selectOptin,
      selectBox: [{ title: "Today" }, { title: "Week" }, { title: "Month" }],
      carousel: [
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "UI Designer",
          text: "Bubbles Studios",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#ee27c0" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "Researcher",
          text: "Kleon Studios",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2db532" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "Frontend",
          text: "Green Comp.",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "UI Designer",
          text: "Bubbles Studios",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#ee27c0" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "Researcher",
          text: "Kleon Studios",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2db532" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "Frontend",
          text: "Green Comp.",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "UI Designer",
          text: "Bubbles Studios",
        },
        {
          icon: `<svg class="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
                            <g transform="translate(-457 -443)">
                              <rect width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5" />
                              <g transform="translate(457 443)">
                                <rect data-name="placeholder" width="71" height="71" rx="12" fill="#ee27c0" />
                                <circle data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff" />
                                <circle
                                  data-name="Ellipse 11"
                                  cx="11"
                                  cy="11"
                                  r="11"
                                  transform="translate(36 15)"
                                  fill="#ffe70c"
                                  style="mix-blend-mode: multiply; isolation: isolate"
                                />
                              </g>
                            </g>
                          </svg>`,
          title: "Researcher",
          text: "Kleon Studios",
        },
      ],
    };
  },
  methods: {
    selectOption(option: string) {
      this.selectOptin = option;
    },
  },
});
</script>

<style scoped>
div.dt-buttons {
  position: relative;
  float: unset;
  margin-top: unset;
}
</style>
