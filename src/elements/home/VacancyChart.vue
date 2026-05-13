<template>
  <div class="card-header border-0 pb-0 flex-wrap">
    <h4 class="card-title mb-0">Vacancy Stats</h4>
    <div class="mt-3 mt-sm-0">
      <ul class="nav nav-tabs vacany-tabs style-1" role="tablist">
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
  </div>
  <div class="card-body pt-3 px-sm-3 px-0 pb-1">
    <div class="pb-sm-4 mb-3 d-flex flex-wrap px-3">
      <div class="d-flex align-items-center">
        <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
          <rect width="13" height="13" rx="6.5" fill="#35c556" />
        </svg>
        <span class="text-dark fs-13 font-w500">Application Sent</span>
      </div>
      <div class="application d-flex align-items-center">
        <svg class="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
          <rect width="13" height="13" rx="6.5" fill="#3f4cfe" />
        </svg>
        <span class="text-dark fs-13 font-w500">Interviews</span>
      </div>
      <div class="application d-flex align-items-center">
        <svg class="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
          <rect width="13" height="13" rx="6.5" fill="#f34040" />
        </svg>
        <span class="text-dark fs-13 font-w500">Rejected</span>
      </div>
    </div>
    <div class="">
      <div id="vacancyChart" class="ltr">
        <apexchart height="300px" :series="state.series" :options="state.chartOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "vacancyChart_",
  components: { apexchart: VueApexCharts },
  setup() {
    const state = reactive({
      series: [
        {
          name: "Application Sent",
          data: [40, 60, 50, 65, 40, 65, 45, 56, 45, 60],
        },
        {
          name: "Interviews",
          data: [30, 27, 38, 35, 30, 35, 20, 35, 30, 40],
        },
        {
          name: "Rejected",
          data: [20, 25, 28, 20, 25, 28, 35, 25, 20, 30],
        },
      ],

      chartOptions: {
        chart: {
          height: 300,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        colors: ["#35c556", "#3f4cfe", "#f34040"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 5,
        },
        legend: {
          show: false,
        },
        grid: {
          show: true,
          strokeDashArray: 6,
          borderColor: "var(--border)",
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
        xaxis: {
          categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
        fill: {
          type: "gradient",
          gradient: {
            colorStops: [
              [
                {
                  offset: 0,
                  color: "#35c556",
                  opacity: 0.2,
                },
                {
                  offset: 50,
                  color: "#35c556",
                  opacity: 0,
                },
                {
                  offset: 100,
                  color: "#35c556",
                  opacity: 0,
                },
              ],
              [
                {
                  offset: 0,
                  color: "#3f4cfe",
                  opacity: 0.2,
                },
                {
                  offset: 50,
                  color: "#3f4cfe",
                  opacity: 0,
                },
                {
                  offset: 100,
                  color: "#3f4cfe",
                  opacity: 0,
                },
              ],
              [
                {
                  offset: 0,
                  color: "#f34040",
                  opacity: 0.2,
                },
                {
                  offset: 50,
                  color: "#f34040",
                  opacity: 0,
                },
                {
                  offset: 100,
                  color: "#f34040",
                  opacity: 0,
                },
              ],
            ],
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        responsive: [
          {
            breakpoint: 575,
            options: {
              chart: {
                height: 200,
              },
              stroke: {
                width: 3,
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "11px",
                  },
                },
              },
              xaxis: {
                labels: {
                  style: {
                    fontSize: "11px",
                  },
                },
              },
            },
          },
        ],
      },
    });
    return { state };
  },
  methods: {
    updateChart(type: string) {
      switch (type) {
        case "Daily":
          this.state.series[0].data = [60, 40, 50, 45, 60, 45, 35, 56, 45, 60];
          this.state.series[1].data = [20, 35, 25, 35, 30, 20, 20, 35, 25, 40];
          this.state.series[2].data = [10, 25, 30, 20, 25, 15, 35, 20, 20, 30];
          break;
        case "Weekly":
          this.state.series[0].data = [55, 35, 45, 35, 55, 45, 35, 60, 40, 55];
          this.state.series[1].data = [35, 30, 40, 25, 44, 50, 20, 35, 30, 40];
          this.state.series[2].data = [20, 20, 15, 10, 25, 28, 20, 25, 20, 30];
          break;
        case "Monthly":
          this.state.series[0].data = [40, 60, 50, 65, 40, 65, 45, 56, 45, 60];
          this.state.series[1].data = [30, 27, 38, 35, 30, 35, 20, 35, 30, 40];
          this.state.series[2].data = [20, 25, 28, 20, 25, 28, 35, 25, 20, 30];
          break;
        default:
          this.state.series[0].data = [40, 60, 50, 65, 40, 65, 45, 56, 45, 60];
          this.state.series[1].data = [30, 27, 38, 35, 30, 35, 20, 35, 30, 40];
          this.state.series[2].data = [20, 25, 28, 20, 25, 28, 35, 25, 20, 30];
          break;
      }
    },
  },
});
</script>
