<template>
  <div class="card">
    <div class="card-header border-0 pb-0">
      <h4 class="card-title">Network</h4>
      <div class="dropdown custom-dropdown mb-0">
        <div class="btn sharp tp-btn dark-btn" data-bs-toggle="dropdown">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="var(--text)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
              stroke="var(--text)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
              stroke="var(--text)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="javascript:void(0);">Details</a>
          <a class="dropdown-item text-danger" href="javascript:void(0);">Cancel</a>
        </div>
      </div>
    </div>
    <div class="card-body pb-2">
      <div class="row sp10">
        <div class="col-xl-3 col-md-3 col-6 mb-4 text-center">
          <div class="d-inline-block ms-auto me-auto mb-md-3 mb-2 db-donut-chart-sale me-4">
            <span class="donut" data-peity='{ "fill": ["var(--primary)", "var(--light)"],   "innerRadius": 38, "radius": 10}' style="display: none">6/9</span
            ><svg class="peity" height="100" width="100">
              <path
                d="M 49.9922 0 A 49.9922 49.9922 0 1 1 6.69768480892759 74.98830000000001 L 17.083234656191337 68.99220000000001 A 38 38 0 1 0 49.9922 11.992199999999997"
                data-value="6"
                fill="var(--primary)"
              ></path>
              <path
                d="M 6.69768480892759 74.98830000000001 A 49.9922 49.9922 0 0 1 49.99219999999999 0 L 49.99219999999999 11.992199999999997 A 38 38 0 0 0 17.083234656191337 68.99220000000001"
                data-value="3"
                fill="var(--light)"
              ></path>
            </svg>
            <h4 class="mb-0 pie-label">66%</h4>
          </div>
          <h5 class="mb-1">Engineer</h5>
          <p class="mb-0">5,050 Vacancy</p>
        </div>
        <div class="col-xl-3 col-md-3 col-6 mb-4 text-center">
          <div class="d-inline-block ms-auto me-auto mb-md-3 mb-2 db-donut-chart-sale me-4">
            <span class="donut" data-peity='{ "fill": ["var(--primary)", "var(--light)"],   "innerRadius": 38, "radius": 10}' style="display: none">3/9</span
            ><svg class="peity" height="100" width="100">
              <path
                d="M 49.9922 0 A 49.9922 49.9922 0 0 1 93.2867151910724 74.98829999999998 L 82.90116534380867 68.9922 A 38 38 0 0 0 49.9922 11.992199999999997"
                data-value="3"
                fill="var(--primary)"
              ></path>
              <path
                d="M 93.2867151910724 74.98829999999998 A 49.9922 49.9922 0 1 1 49.99219999999999 0 L 49.99219999999999 11.992199999999997 A 38 38 0 1 0 82.90116534380867 68.9922"
                data-value="6"
                fill="var(--light)"
              ></path>
            </svg>
            <h4 class="mb-0 pie-label">31%</h4>
          </div>
          <h5 class="mb-1">Designer</h5>
          <p class="mb-0">10,524 Vacany</p>
        </div>
        <div class="col-xl-3 col-md-3 col-6 mb-4 text-center">
          <div class="d-inline-block ms-auto me-auto mb-md-3 mb-2 db-donut-chart-sale me-4">
            <span class="donut" data-peity='{ "fill": ["var(--primary)", "var(--light)"],   "innerRadius": 38, "radius": 10}' style="display: none">6/8</span
            ><svg class="peity" height="100" width="100">
              <path
                d="M 49.9922 0 A 49.9922 49.9922 0 1 1 0 49.992200000000004 L 11.992199999999997 49.992200000000004 A 38 38 0 1 0 49.9922 11.992199999999997"
                data-value="6"
                fill="var(--primary)"
              ></path>
              <path
                d="M 0 49.992200000000004 A 49.9922 49.9922 0 0 1 49.99219999999999 0 L 49.99219999999999 11.992199999999997 A 38 38 0 0 0 11.992199999999997 49.992200000000004"
                data-value="2"
                fill="var(--light)"
              ></path>
            </svg>
            <h4 class="mb-0 pie-label">75%</h4>
          </div>
          <h5 class="mb-1">Manager</h5>
          <p class="mb-0">621 Vacancy</p>
        </div>
        <div class="col-xl-3 col-md-3 col-6 mb-4 text-center">
          <div class="d-inline-block ms-auto me-auto mb-md-3 mb-2 db-donut-chart-sale me-4">
            <span class="donut" data-peity='{ "fill": ["var(--primary)", "var(--light)"],   "innerRadius": 38, "radius": 10}' style="display: none">7/10</span
            ><svg class="peity" height="100" width="100">
              <path
                d="M 49.9922 0 A 49.9922 49.9922 0 1 1 2.446792426069429 65.44063938619125 L 13.852052380784166 61.734845786248 A 38 38 0 1 0 49.9922 11.992199999999997"
                data-value="7"
                fill="var(--primary)"
              ></path>
              <path
                d="M 2.446792426069429 65.44063938619125 A 49.9922 49.9922 0 0 1 49.99219999999999 0 L 49.99219999999999 11.992199999999997 A 38 38 0 0 0 13.852052380784166 61.734845786248"
                data-value="3"
                fill="var(--light)"
              ></path>
            </svg>
            <h4 class="mb-0 pie-label">62%</h4>
          </div>
          <h5 class="mb-1">Programmer</h5>
          <p class="mb-0">9,662 Vacancy</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
