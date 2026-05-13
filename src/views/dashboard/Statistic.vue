<script setup lang="ts">
// @ts-ignore
import CountUp from "vue-countup-v3";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import { pieChart3, chartBar } from "../../layouts/ChartsData";
import VacancyChart from "@/elements/home/VacancyChart.vue";
import Activity1 from "@/elements/home/Activity1.vue";
import FeaturedCompany from "@/elements/home/FeaturedCompany.vue";
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="row shapreter-row">
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="fas fa-eye"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="94" :duration="20" />
                  </h3>
                  <p class="mb-0">Profile Viewed</p>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="far fa-comments"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="261" :duration="20" />
                  </h3>
                  <p class="mb-0">Unread Messages</p>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="fas fa-suitcase"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="874" :duration="20" />
                  </h3>
                  <p class="mb-0">Application Sent</p>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="fas fa-suitcase"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="25" :duration="20" />
                  </h3>
                  <p class="mb-0">App. Answered</p>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="fas fa-calendar"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="221" :duration="20" />
                  </h3>
                  <p class="mb-0">Interviewed</p>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-sm-4 col-6">
                <div class="static-icon">
                  <span>
                    <i class="fas fa-phone-alt"></i>
                  </span>
                  <h3 class="count mb-0">
                    <count-up :end-val="4" :duration="20" />
                  </h3>
                  <p class="mb-0">Hired</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-header border-0 pb-0">
            <h4 class="card-title mb-0">Profile Stregth</h4>
          </div>
          <div class="card-body pt-3">
            <div class="row align-items-center">
              <div class="col-xl-6 col-sm-6">
                <div class="progress default-progress">
                  <div class="progress-bar bg-vigit progress-animated" style="width: 90%; height: 8px" role="progressbar">
                    <span class="sr-only">90% Complete</span>
                  </div>
                </div>
                <div class="d-flex align-items-end mt-2 pb-4 justify-content-between">
                  <span class="font-w500">Figma</span>
                  <h6 class="mb-0">90%</h6>
                </div>
                <div class="progress default-progress">
                  <div class="progress-bar bg-contact progress-animated" style="width: 68%; height: 8px" role="progressbar">
                    <span class="sr-only">45% Complete</span>
                  </div>
                </div>
                <div class="d-flex align-items-end mt-2 pb-4 justify-content-between">
                  <span class="font-w500">Adobe XD</span>
                  <h6 class="mb-0">68%</h6>
                </div>
                <div class="progress default-progress">
                  <div class="progress-bar bg-follow progress-animated" style="width: 85%; height: 8px" role="progressbar">
                    <span class="sr-only">85% Complete</span>
                  </div>
                </div>
                <div class="d-flex align-items-end mt-2 justify-content-between">
                  <span class="font-w500">Photoshop</span>
                  <h6 class="mb-0">85%</h6>
                </div>
              </div>
              <div class="col-xl-6 col-sm-6">
                <div id="pieChart3">
                  <VueApexCharts height="230px" :series="pieChart3.series" :options="pieChart3.chartOptions" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-header border-0 flex-wrap pb-0 align-items-start">
            <h4 class="card-title mb-2">Your Network Summary</h4>
            <div class="width160">
              <div class="d-flex align-items-center">
                <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                  <rect width="13" height="13" fill="#f73a0b" />
                </svg>
                Following
                <h5 class="ms-auto mb-0">239</h5>
              </div>
              <div class="mt-1 d-flex align-items-center">
                <span>
                  <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                    <rect width="13" height="13" fill="#01111c" />
                  </svg>
                  Followers
                </span>
                <h5 class="ms-auto mb-0">824</h5>
              </div>
            </div>
          </div>
          <div class="card-body pt-0 pb-0 ps-sm-3 ps-0">
            <div id="chartBar" class="chartBar">
              <VueApexCharts height="230px" :series="chartBar.series" :options="chartBar.chartOptions" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="card" id="user-activity">
          <VacancyChart />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card" id="user-activity1">
          <Activity1 height="350px" />
        </div>
      </div>
      <div class="col-xl-6">
        <FeaturedCompany />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
