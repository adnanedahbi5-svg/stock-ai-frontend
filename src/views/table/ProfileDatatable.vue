<script setup lang="ts">
import { ref, reactive } from "vue";
import { profileDataTable } from "@/elements/TableArrayData";
import { RouterLink } from "vue-router";
import handlePagination from "@/layouts/HandlePaginatin";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";
import JobSelectOption from "@/elements/JobSelectOption.vue";

const tableBtn = [
  { name: "Name" },
  { name: "Department" },
  { name: "Gender" },
  { name: "Education" },
  { name: "Mobile" },
  { name: "Email" },
  { name: "Joining Date" },
  { name: "Action" },
];
const { paginatedData, data, goToPage, nextPage, perPage, backPage, addActive, sortingArr, searchData, qtyshowPage } = handlePagination(profileDataTable, 10);
const { paginationLength } = storeToRefs(useStore());
</script>

<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Datatable Responsive</h4>
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
          <table id="example3" class="display table" style="min-width: 845px">
            <thead>
              <tr>
                <th></th>
                <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn">{{ name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="({ img, name, Department, Gender }, ind) in paginatedData" :key="ind">
                <td>
                  <img class="rounded-circle" width="35" :src="img" alt="" />
                </td>
                <td>{{ name }}</td>
                <td>{{ Department }}</td>
                <td>{{ Gender }}</td>
                <td>M.COM., P.H.D.</td>
                <td>
                  <a href="javascript:void(0);"><strong>123 456 7890</strong></a>
                </td>
                <td>
                  <a href="javascript:void(0);"><strong>info@example.com</strong></a>
                </td>
                <td>2011/04/25</td>
                <td>
                  <div class="d-flex">
                    <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                    <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex align-items-center justify-content-between basic-data_table_pagination">
            <div class="dataTables_info">Showing {{ paginationLength }} to {{ paginationLength }} of {{ profileDataTable.length }} entries</div>
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
