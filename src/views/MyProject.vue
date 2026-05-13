<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-12 active-p">
        <div class="card">
          <div class="card-body px-0">
            <div class="table-responsive active-projects user-tbl dt-filter">
              <div id="user-tbl_wrapper" class="dataTables_wrapper no-footer">
                <div id="user-tbl_filter" class="dataTables_filter">
                  <label>
                    <i class="fa-solid fa-magnifying-glass"></i
                    ><input type="search" class="" placeholder="Search..." aria-controls="user-tbl" @input="(e) => searchData((e.target as HTMLInputElement).value)"
                  /></label>
                </div>
                <table id="user-tbl" class="table">
                  <thead>
                    <tr>
                      <th>
                        <div class="form-check custom-checkbox ms-0">
                          <input type="checkbox" class="form-check-input" id="checkAll" @click="checkboxes = !checkboxes" />
                          <label class="form-check-label" for="checkAll"></label>
                        </div>
                      </th>
                      <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, ind) in paginatedData" :key="ind">
                      <td>
                        <div class="form-check custom-checkbox">
                          <input type="checkbox" class="form-check-input" id="customCheckBox222" :checked="checkboxes" />
                          <label class="form-check-label" for="customCheckBox222"></label>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <img :src="item.img" class="avatar rounded-circle" alt="" />
                          <p class="mb-0 ms-2">{{ item.name }}</p>
                        </div>
                      </td>
                      <td>demo@gmail.com</td>
                      <td>Software Engineer</td>
                      <td>12 Jan 2023</td>
                      <td>Monday</td>
                      <td>
                        <div class="dropdown c-pointer">
                          <div class="btn-link" data-bs-toggle="dropdown" v-html="SVGImage.dotIcon"></div>
                          <div class="dropdown-menu dropdown-menu-right" style="">
                            <a class="dropdown-item" href="javascript:void(0);">Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="dataTables_info">Showing {{ paginationLength - 11 }} to {{ paginationLength }} of {{ userTabble.length }} entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                  <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa-solid fa-angle-left"></i></a
                  ><span>
                    <a
                      class="paginate_button"
                      v-for="item in Math.ceil(data.length / perPage)"
                      :key="item"
                      :style="`background-color:${addActive == item ? 'var(--primary);' : ''};color:${addActive == item ? '#fff !important' : ''}`"
                      @click="() => goToPage(item)"
                      >{{ item }}</a
                    >
                  </span>
                  <a class="paginate_button next" @click="nextPage" aria-controls="empoloyees-tblwrapper" data-dt-idx="3" tabindex="0" id="empoloyees-tblwrapper_next"
                    ><i class="fa-solid fa-angle-right"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { userTabble } from "@/elements/TableArrayData";
import handlePagination from "@/layouts/HandlePaginatin";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";
import { SVGImage } from "@/constent/Theme";

export default defineComponent({
  name: "myProject_",
  data() {
    return {
      SVGImage,
      userTabble,
    };
  },
  setup() {
    const checkboxes = ref(false);
    const handlePaginationValue = handlePagination(userTabble, 12);
    const { paginationLength } = storeToRefs(useStore());

    return {
      ...handlePaginationValue,
      checkboxes,
      paginationLength,
      tableBtn: [{ name: "User" }, { name: "Email" }, { name: "Position" }, { name: "Date Of Joining" }, { name: "Last Status" }, { name: "Action" }],
    };
  },
});
</script>

<style scoped>
.paginate_button {
  height: 24px;
  width: 24px;
  padding: 0;
  margin-left: 0rem;
  margin: 0 0.125rem;
  line-height: 25px;
  text-align: center;
  font-size: 13px;
  border-radius: 0.375rem;
  border: 0;
  color: #0d99ff !important;
  cursor: pointer;
  box-shadow: none;
  box-sizing: border-box;
  display: inline-block;
}

.paginate_button:hover {
  color: var(--primary);
  background: var(--rgba-primary-1);
}

#tbl_filter {
  color: #888888;
  border-radius: 1rem;
  padding: 0.125rem 0;
  margin-bottom: 0.35rem;
}
input {
  border: 0.0625rem solid #e2e2e2;
  padding: 0.3rem 0.5rem;
  color: #715d5d;
  border-radius: 0.3125rem;
}
</style>
