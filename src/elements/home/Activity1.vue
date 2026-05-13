<template>
  <div class="card-header border-0 pb-0">
    <h4 class="card-title mb-0">Chart</h4>
    <ul class="nav nav-tabs style-1 chart-tab" role="tablist">
      <li class="nav-item">
        <a @click="updateChart('Daily')" class="nav-link" data-bs-toggle="tab" data-series="Daily" href="javascript:void(0)" role="tab">Daily</a>
      </li>
      <li class="nav-item">
        <a @click="updateChart('Weekly')" class="nav-link" data-bs-toggle="tab" data-series="Weekly" href="javascript:void(0)" role="tab">Weekly</a>
      </li>
      <li class="nav-item">
        <a @click="updateChart('Monthly')" class="nav-link active" data-bs-toggle="tab" data-series="Monthly" href="javascript:void(0)" role="tab">Monthly</a>
      </li>
    </ul>
  </div>
  <div class="card-body ps-sm-3 ps-0 pb-2">
    <div class="d-sm-flex d-block mb-3 mx-3">
      <div class="d-flex align-items-center me-5 mb-sm-0 mb-2">
        <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
          <rect width="13" height="13" fill="#f73a0b" />
        </svg>
        <label class="form-label mb-0 me-4">Delivered</label>
        <h6 class="mb-0 me-1">239</h6>
        <span class="text-success fs-13 font-w500">+0.4%</span>
      </div>
      <div class="d-flex align-items-center">
        <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
          <rect width="13" height="13" fill="#6e6e6e" />
        </svg>
        <label class="form-label mb-0 me-4">Expense</label>
        <h6 class="mb-0 me-1">$8,345</h6>
      </div>
    </div>
    <div>
      <div id="activity1" class="ltr">
        <apexchart :height="height" :series="state.series" :options="state.chartOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "activity1_",
  components: { apexchart: VueApexCharts },
  props: {
    height: String as () => string,
  },
  setup() {
    const state = reactive({
      series: [
        {
          name: "Net Profit",
          data: [50, 40, 55, 25, 45, 40, 35, 55, 50, 25, 42, 35, 50],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 280,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "35%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["var(--primary)"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13"],
          labels: {
            style: {
              colors: "var(--text)",
              fontSize: "13px",
              fontFamily: "Poppins",
              fontWeight: 400,
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "var(--text)",
              fontSize: "13px",
              fontFamily: "Poppins",
              fontWeight: 400,
            },
            formatter: function (value: any) {
              return value;
            },
          },
        },
        grid: {
          show: true,
          strokeDashArray: 6,
          borderColor: "var(--border)",
        },
        fill: {
          opacity: 1,
        },
      },
    });
    return { state };
  },
  methods: {
    updateChart(type: string) {
      switch (type) {
        case "Daily":
          this.state.series[0].data = [60, 40, 50, 45, 60, 45, 35, 56, 45, 60, 36, 45, 60];
          break;
        case "Weekly":
          this.state.series[0].data = [55, 35, 45, 35, 55, 45, 35, 60, 40, 55, 45, 25, 45];
          break;
        case "Monthly":
          this.state.series[0].data = [50, 40, 55, 25, 45, 40, 35, 55, 50, 25, 42, 35, 50];
          break;
        default:
          this.state.series[0].data = [50, 40, 55, 25, 45, 40, 35, 55, 50, 25, 42, 35, 50];
          break;
      }
    },
  },
});
</script>

<style scoped></style>
