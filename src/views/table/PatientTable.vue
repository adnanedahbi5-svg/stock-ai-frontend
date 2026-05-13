<script setup lang="ts">
import { ref } from "vue";
import { patiantTable } from "@/elements/TableArrayData";
import { RouterLink } from "vue-router";
import handlePagination from "@/layouts/HandlePaginatin";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";
import JobSelectOption from "@/elements/JobSelectOption.vue";

const tableBtn = [
  { name: "Patient ID" },
  { name: "Date Check in" },
  { name: "Patient Name" },
  { name: "Doctor Assgined" },
  { name: "Disease" },
  { name: "Status" },
  { name: "Room no" },
  { name: "Action" },
];

const checkboxes = ref(false);

const { paginatedData, data, goToPage, nextPage, perPage, backPage, addActive, sortingArr, searchData, qtyshowPage } = handlePagination(patiantTable, 10);
const { paginationLength } = storeToRefs(useStore());
</script>

<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Patient</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <div id="example_wrapper">
            <div class="dataTables_length" id="example_length">
              Show
              <div class="dropdown bootstrap-select dropup w-auto">
                <JobSelectOption :Click="qtyshowPage" :options="[{ title: 10 }, { title: 25 }, { title: 50 }, { title: 100 }]" />
              </div>
              entries
            </div>
            <div id="example_filter" class="dataTables_filter">
              <label class="mb-0 me-2">Search:</label>
              <input
                type="search"
                class="table-data-base-search"
                placeholder=""
                style="color: var(--text-dark); background-color: transparent; border-color: var(--border)"
                @input="(e) => searchData((e.target as HTMLInputElement).value)"
                aria-controls="example"
              />
            </div>
          </div>
          <table id="example5" class="display table" style="min-width: 845px">
            <thead>
              <tr>
                <th>
                  <div class="custom-control d-inline custom-checkbox">
                    <input type="checkbox" class="form-check-input" id="checkAll" required @click="checkboxes = !checkboxes" />
                    <label class="form-check-label" for="checkAll"></label>
                  </div>
                </th>
                <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="({ doctor, disease, name, status, roomNo, badgeColor }, ind) in paginatedData" :key="ind">
                <td>
                  <div class="form-check custom-checkbox ms-2">
                    <input type="checkbox" class="form-check-input" id="customCheckBox2" required :checked="checkboxes" />
                    <label class="form-check-label" for="customCheckBox2"></label>
                  </div>
                </td>
                <td>#P-0000#{{ ind + 1 }}</td>
                <td>26/02/2020, 12:42 AM</td>
                <td>{{ name }}</td>
                <td>{{ doctor }}</td>
                <td>{{ disease }}</td>
                <td>
                  <span :class="`badge light badge-${badgeColor}`">
                    <i class="fa fa-circle text-danger me-1"></i>
                    {{ status }}
                  </span>
                </td>
                <td>{{ roomNo }}</td>
                <td>
                  <div class="dropdown ms-auto text-end c-pointer">
                    <div class="btn-link" data-bs-toggle="dropdown">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </div>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="#">Accept Patient</a>
                      <a class="dropdown-item" href="#">Reject Order</a>
                      <a class="dropdown-item" href="#">View Details</a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex align-items-center justify-content-between basic-data_table_pagination">
            <div class="dataTables_info">Showing {{ paginationLength }} to {{ paginationLength }} of {{ patiantTable.length }} entries</div>
            <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
              <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a
              ><span>
                <a
                  :class="`paginate_button border-0 text-center m-1 ${addActive === item ? 'current' : ''}`"
                  v-for="item in Math.ceil(data.length / perPage)"
                  :key="item"
                  style="background-color: var(--rgba-primary-1)"
                  @click="() => goToPage(item)"
                  >{{ item }}</a
                >
              </span>
              <a
                class="paginate_button next disabled active"
                @click="nextPage"
                aria-controls="empoloyees-tblwrapper"
                data-dt-idx="3"
                tabindex="0"
                id="empoloyees-tblwrapper_next"
                ><i class="fa fa-angle-double-right" aria-hidden="true"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
