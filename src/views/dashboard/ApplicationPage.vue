<script setup lang="ts">
import { ref } from "vue";
import JobSelectOption from "@/elements/JobSelectOption.vue";
import handlePagination from "@/layouts/HandlePaginatin";
import { applicationPageTable } from "@/elements/TableArrayData";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const tableBtn = [
  { name: "Order ID" },
  { name: "Date Applied" },
  { name: "Company" },
  { name: "Type" },
  { name: "Position" },
  { name: "Contact" },
  { name: "Status" },
  { name: "" },
];
const checkAllinputs = ref(false);
const { paginatedData, data, goToPage, nextPage, perPage, backPage, addActive, sortingArr } = handlePagination(applicationPageTable, 10);
const { paginationLength } = storeToRefs(useStore());
</script>
<template>
  <div class="container-fluid">
    <div class="d-sm-flex d-block justify-content-between align-items-center mb-4">
      <div class="card-action coin-tabs mt-3 mt-sm-0">
        <ul class="nav nav-tabs bg-card style-1" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#AllStatus">All Status</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#Pending">Pending</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#On-Hold">On-Hold</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#Candidate">Candidate</a>
          </li>
        </ul>
      </div>
      <div class="d-flex mt-sm-0 mt-3">
        <div class="dropdown bootstrap-select default-select dashboard-select">
          <JobSelectOption :options="[{ title: 'Newest' }, { title: 'oldest' }]" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tab-content">
          <div class="tab-pane fade show active" id="AllStatus">
            <div class="table-responsive">
              <table class="table display mb-4 dataTablesCard order-table card-table dataTable no-footer" id="application-tbl1">
                <thead>
                  <tr>
                    <th class="icon_none">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="checkAll4" @click="checkAllinputs = !checkAllinputs" />
                        <label class="form-check-label" for="checkAll4"> </label>
                      </div>
                    </th>
                    <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind" class="table_head">{{ name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({ name, status, icon, status_color }, index) in paginatedData" :key="index">
                    <td class="tbl-bx">
                      <div class="form-check ms-2">
                        <input class="form-check-input form_inputs" type="checkbox" :checked="checkAllinputs" />
                        <label class="form-check-label"> </label>
                      </div>
                    </td>
                    <td>#000123456</td>
                    <td class="wspace-no">Nov 21th 2020 09:21 AM</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center">
                        <div class="icon-img-bx sm me-2" v-html="icon"></div>
                        <h6 class="mb-0 font-w400">{{ name }}</h6>
                      </div>
                    </td>
                    <td>FULLTIME</td>
                    <td>UI Designer</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center text-secondary">
                        <i class="fas fa-phone-alt me-2"></i>
                        012 3123412 441
                      </div>
                    </td>
                    <td>
                      <span :class="`badge badge-${status_color} light badge-rounded`">{{ status }}</span>
                    </td>
                    <td>
                      <div class="dropdown text-end">
                        <div class="btn-link" data-bs-toggle="dropdown">
                          <a href="javascript:void(0);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-check-circle me-1 text-success"></i>Accept order</a>
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-times-circle me-1 text-danger"></i>Reject order</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-between">
                <div class="dataTables_info">Showing {{ paginationLength - 9 }} to {{ paginationLength }} of {{ applicationPageTable.length }} entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                  <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a
                  ><span>
                    <a
                      :class="`paginate_button m-1 border-0 text-center ${addActive === item ? 'current' : ''}`"
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
          <div class="tab-pane fade" id="Pending">
            <div class="table-responsive">
              <table class="table display mb-4 dataTablesCard order-table card-table" id="application-tbl1">
                <thead>
                  <tr>
                    <th class="icon_none">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="checkAll4" @click="checkAllinputs = !checkAllinputs" />
                        <label class="form-check-label" for="checkAll4"> </label>
                      </div>
                    </th>
                    <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({ name, status, icon, status_color }, index) in paginatedData" :key="index">
                    <td class="tbl-bx">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="customCheckBox" :checked="checkAllinputs" />
                        <label class="form-check-label" for="customCheckBox"> </label>
                      </div>
                    </td>
                    <td>#000123456</td>
                    <td class="wspace-no">Nov 21th 2020 09:21 AM</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center">
                        <div class="icon-img-bx sm me-2" v-html="icon"></div>
                        <h6 class="mb-0 font-w400">{{ name }}</h6>
                      </div>
                    </td>
                    <td>FULLTIME</td>
                    <td>UI Designer</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center text-secondary">
                        <i class="fas fa-phone-alt me-2"></i>
                        012 3123412 441
                      </div>
                    </td>

                    <td>
                      <span :class="`badge badge-${status_color} light badge-rounded`">{{ status }}</span>
                    </td>
                    <td>
                      <div class="dropdown text-end">
                        <div class="btn-link" data-bs-toggle="dropdown">
                          <a href="javascript:void(0);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-check-circle me-1 text-success"></i>Accept order</a>
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-times-circle me-1 text-danger"></i>Reject order</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-between">
                <div class="dataTables_info">Showing {{ paginationLength - 9 }} to {{ paginationLength }} of {{ applicationPageTable.length }} entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                  <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a
                  ><span>
                    <a
                      :class="`paginate_button m-1 border-0 text-center ${addActive === item ? 'current' : ''}`"
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
          <div class="tab-pane" id="On-Hold">
            <div class="table-responsive">
              <table class="table display mb-4 dataTablesCard order-table card-table" id="application-tbl1">
                <thead>
                  <tr>
                    <th class="icon_none">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="checkAll4" @click="checkAllinputs = !checkAllinputs" />
                        <label class="form-check-label" for="checkAll4"> </label>
                      </div>
                    </th>
                    <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({ name, status, icon, status_color }, index) in paginatedData" :key="index">
                    <td class="tbl-bx">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="customCheckBox" :checked="checkAllinputs" />
                        <label class="form-check-label" for="customCheckBox"> </label>
                      </div>
                    </td>
                    <td>#000123456</td>
                    <td class="wspace-no">Nov 21th 2020 09:21 AM</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center">
                        <div class="icon-img-bx sm me-2" v-html="icon"></div>
                        <h6 class="mb-0 font-w400">{{ name }}</h6>
                      </div>
                    </td>
                    <td>FULLTIME</td>
                    <td>UI Designer</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center text-secondary">
                        <i class="fas fa-phone-alt me-2"></i>
                        012 3123412 441
                      </div>
                    </td>

                    <td>
                      <span :class="`badge badge-${status_color} light badge-rounded`">{{ status }}</span>
                    </td>
                    <td>
                      <div class="dropdown text-end">
                        <div class="btn-link" data-bs-toggle="dropdown">
                          <a href="javascript:void(0);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-check-circle me-1 text-success"></i>Accept order</a>
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-times-circle me-1 text-danger"></i>Reject order</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-between">
                <div class="dataTables_info">Showing {{ paginationLength - 9 }} to {{ paginationLength }} of {{ applicationPageTable.length }} entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                  <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a
                  ><span>
                    <a
                      :class="`paginate_button m-1 border-0 text-center ${addActive === item ? 'current' : ''}`"
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
          <div class="tab-pane" id="Candidate">
            <div class="table-responsive">
              <table class="table display mb-4 dataTablesCard order-table card-table" id="application-tbl1">
                <thead>
                  <tr>
                    <th class="icon_none">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="checkAll4" @click="checkAllinputs = !checkAllinputs" />
                        <label class="form-check-label" for="checkAll4"> </label>
                      </div>
                    </th>
                    <th @click="sortingArr(ind)" v-for="({ name }, ind) in tableBtn" :key="ind">{{ name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({ name, status, icon, status_color }, index) in paginatedData" :key="index">
                    <td class="tbl-bx">
                      <div class="form-check ms-2">
                        <input class="form-check-input" type="checkbox" value="" id="customCheckBox" :checked="checkAllinputs" />
                        <label class="form-check-label" for="customCheckBox"> </label>
                      </div>
                    </td>
                    <td>#000123456</td>
                    <td class="wspace-no">Nov 21th 2020 09:21 AM</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center">
                        <div class="icon-img-bx sm me-2" v-html="icon"></div>
                        <h6 class="mb-0 font-w400">{{ name }}</h6>
                      </div>
                    </td>
                    <td>FULLTIME</td>
                    <td>UI Designer</td>
                    <td class="wspace-no">
                      <div class="d-flex align-items-center text-secondary">
                        <i class="fas fa-phone-alt me-2"></i>
                        012 3123412 441
                      </div>
                    </td>

                    <td>
                      <span :class="`badge badge-${status_color} light badge-rounded`">{{ status }}</span>
                    </td>
                    <td>
                      <div class="dropdown text-end">
                        <div class="btn-link" data-bs-toggle="dropdown">
                          <a href="javascript:void(0);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                stroke="var(--text-gray)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-check-circle me-1 text-success"></i>Accept order</a>
                          <a class="dropdown-item text-black" href="javascript:void(0);"><i class="far fa-times-circle me-1 text-danger"></i>Reject order</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex align-items-center justify-content-between">
                <div class="dataTables_info">Showing {{ paginationLength - 9 }} to {{ paginationLength }} of {{ applicationPageTable.length }} entries</div>
                <div class="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                  <a class="paginate_button previous" id="empoloyees-tblwrapper_previous" @click="backPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a
                  ><span>
                    <a
                      :class="`paginate_button m-1  border-0 text-center ${addActive === item ? 'current' : ''}`"
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
    </div>
  </div>
</template>

<style scoped>
.table_head:last-child:after {
  display: none !important;
}
</style>
