<script setup lang="ts">
import { reactive } from "vue";
import { tableDatabase } from "@/elements/TableArrayData";
// import { RouterLink } from "vue-router";
import handlePagination from "@/layouts/HandlePaginatin";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";
import JobSelectOption from "../JobSelectOption.vue";

const tableBtn = reactive([{ name: "Name" }, { name: "Position" }, { name: "Office" }, { name: "Age" }, { name: "Start date" }, { name: "Salary" }]);
const { paginatedData, data, goToPage, nextPage, perPage, backPage, addActive, sortingArr, searchData, qtyshowPage } = handlePagination(tableDatabase, 10);
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
          <table id="example" class="display table" style="min-width: 845px">
            <thead>
              <tr>
                <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="({ name, Position, Office, Age, Start_date, Salary }, ind) in paginatedData" :key="ind">
                <td>{{ name }}</td>
                <td>{{ Position }}</td>
                <td>{{ Office }}</td>
                <td>{{ Age }}</td>
                <td>{{ Start_date }}</td>
                <td>{{ Salary }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
            </tfoot>
          </table>
          <div class="d-flex align-items-center justify-content-between basic-data_table_pagination">
            <div class="dataTables_info">Showing {{ paginationLength }} to {{ paginationLength }} of {{ tableDatabase.length }} entries</div>
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
