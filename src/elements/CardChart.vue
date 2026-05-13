<template>
  <div class="col-xl-12">
    <div class="card">
      <div class="card-body">
        <div class="row separate-row">
          <div class="col-sm-6">
            <div class="job-icon pb-4 d-flex justify-content-between">
              <div>
                <div class="d-flex align-items-center mb-1">
                  <h2 class="mb-0 lh-1">342</h2>
                  <span class="ms-3 badge badge-success light">+0.5%</span>
                </div>
                <span class="d-block mb-2">Interview Schedules</span>
              </div>
              <div id="NewCustomers">
                <apexchart height="50px" width="100px" :series="DashboardNewCustomers.series" :options="DashboardNewCustomers.chartOptions" />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="job-icon pb-4 pt-4 pt-sm-0 d-flex justify-content-between">
              <div>
                <div class="d-flex align-items-center mb-1">
                  <h2 class="mb-0 lh-1">984</h2>
                </div>
                <span class="d-block mb-2">Application Sent</span>
              </div>
              <div id="NewCustomers1">
                <apexchart height="50px" width="100px" :series="NewCustomers1.series" :options="NewCustomers1.chartOptions" />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="job-icon pt-4 pb-sm-0 pb-4 d-flex justify-content-between">
              <div>
                <div class="d-flex align-items-center mb-1">
                  <h2 class="mb-0 lh-1">1,567k</h2>
                  <span class="ms-3 badge badge-danger light">-2.0%</span>
                </div>
                <span class="d-block mb-2">Profile Viewed</span>
              </div>
              <div id="NewCustomers2">
                <apexchart height="50px" width="100px" :series="NewCustomers2.series" :options="NewCustomers2.chartOptions" />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="job-icon pt-4 d-flex justify-content-between">
              <div>
                <div class="d-flex align-items-center mb-1">
                  <h2 class="mb-0 lh-1">437</h2>
                </div>
                <span class="d-block mb-2">Unread Messages</span>
              </div>
              <div id="NewCustomers3">
                <apexchart height="50px" width="100px" :series="NewCustomers3.series" :options="NewCustomers3.chartOptions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import { DashboardNewCustomers, NewCustomers1, NewCustomers2, redial, NewCustomers3 } from "@/layouts/ChartsData";
import IMAGE, { SVGImage } from "@/constent/Theme";
import TodoItem from "./home/TodoItem.vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "cardChart",
  components: { apexchart: VueApexCharts, TodoItem, RouterLink },
  setup() {
    return {};
  },
  data() {
    return {
      DashboardNewCustomers,
      NewCustomers1,
      NewCustomers2,
      redial,
      SVGImage,
      IMAGE,
      NewCustomers3,
    };
  },
});
</script>

<style scoped></style>
