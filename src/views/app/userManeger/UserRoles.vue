<template>
  <div class="container-fluid">
    <div class="row">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="heading mb-3">Account Setting</h4>
        <a
          class="btn btn-primary btn-sm mb-3"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
          >+ Add a role</a
        >
      </div>
      <div class="col-xl-3 col-lg-4">
        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header py-3">
                <h4 class="heading mb-0">Personal</h4>
              </div>
              <div class="card-body px-0 py-2">
                <ul class="personal-info">
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-user text-primary me-2"></i> Profile</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-lock text-primary me-2"></i> Password</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-calendar-days text-primary me-2"></i> Date</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header py-3">
                <h4 class="heading mb-0">Company</h4>
              </div>
              <div class="card-body px-0 py-2">
                <ul class="personal-info">
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-building text-primary me-2"></i> Commpany Details</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-user-plus text-primary me-2"></i> Team Members</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="far fa-clock text-primary me-2"></i> Format setting</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-solid fa-briefcase text-primary me-2"></i> Job boards</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="far fa-user text-primary me-2"></i> Positions</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fas fa-times-circle text-danger me-2"></i>Rejections resions</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fas fa-envelope text-primary me-2"></i>Automated message</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8">
        <div class="row">
          <div class="col-xl-12">
            <h4 class="heading mb-0">
              <i class="fa-solid fa-user-plus text-primary me-2 mb-3"></i> Job Management
            </h4>
            <div class="card h-auto">
              <div class="card-body p-0">
                <div class="table-responsive active-projects">
                  <table id="projects-tbl" class="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date Added</th>
                        <th>Last active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="({ name, date, day, img }, index) in paginatedData" :key="index">
                        <td>
                          <div class="d-flex align-items-center">
                            <img :src="img" class="avatar avatar-md rounded-circle" alt="" />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">{{ name }}</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>{{ date }}</td>
                        <td>{{ day }}</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            {{ ' ' }}
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="dataTables_info">Showing 11 to 12 of {{ '' }} entries</div>
                    <div
                      class="dataTables_paginate paging_simple_numbers"
                      id="empoloyees-tblwrapper_paginate"
                    >
                      <a
                        class="paginate_button previous"
                        id="empoloyees-tblwrapper_previous"
                        @click="backPage"
                        ><i class="fa-solid fa-angle-left"></i></a
                      ><span>
                        <a
                          class="paginate_button"
                          v-for="item in Math.ceil(data.length / perPage)"
                          :key="item"
                          :style="`background-color:${addActive == item ? 'var(--primary);' : ''};color:${addActive == item ? '#fff' : ''} `"
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
                        ><i class="fa-solid fa-angle-right"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <h4 class="heading">
              <i class="fas fa-times-circle text-danger me-2"></i> Rejections resions
            </h4>
            <div class="card h-auto">
              <div class="card-body p-0">
                <div class="table-responsive active-projects">
                  <!-- <table id="projects-tbl1" class="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date Added</th>
                        <th>Last active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic1.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Abdullah Risher</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>22 March 2023</td>
                        <td>Monday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic2.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Bongani Femi</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>28 February 2023</td>
                        <td>
                          <p class="mb-0 font-w500">Tuesday</p>
                        </td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic3.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Hakim Joy</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>28 February 2023</td>
                        <td>Tuesday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/profile/friends/f1.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Lolonyo Chinyelu</p>
                              <span>demo11@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>28 February 2023</td>
                        <td>Tuesday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic1.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Malik Oba</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>18 january 2023</td>
                        <td>
                          <p class="mb-0 font-w500">Monday</p>
                        </td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic2.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Darius Addo</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>28 May 2023</td>
                        <td>Monday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/contacts/pic3.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Zuri Hasani</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>28 February 2023</td>
                        <td>Tuesday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src="../../assets/images/profile/friends/f1.jpg"
                              class="avatar avatar-md rounded-circle"
                              alt=""
                            />
                            <div class="ms-2">
                              <p class="mb-0 text-start text-black font-w500">Amare mama</p>
                              <span>demo@gmail.com</span>
                            </div>
                          </div>
                        </td>
                        <td>23 May 2023</td>
                        <td>Tuesday</td>
                        <td>
                          <div class="action-button">
                            <button type="button" class="btn btn-primary btn-icon-xxs">
                              <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger btn-icon-xxs">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table> -->
                  <UserTable2 />
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
import { defineComponent } from 'vue'
import handlePagination from '@/layouts/HandlePaginatin'
import { UserRolesTable1 } from '@/elements/TableArrayData'
import UserTable2 from '@/elements/UserTable2.vue'

export default defineComponent({
  setup() {
    const handlePaginationValue = handlePagination(UserRolesTable1, 5)
    return { ...handlePaginationValue }
  },
  components: { UserTable2 }
})
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
</style>
