<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Email</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Inbox</a></li>
      </ol>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <EmailRightContent />
              <div class="col-xl-9 col-xxl-8">
                <div>
                  <div role="toolbar" class="toolbar ms-1 ms-sm-0 ms-xl-1 d-flex align-items-center">
                    <div class="btn-group mb-1">
                      <div class="form-check custom-checkbox">
                        <input type="checkbox" class="form-check-input" id="checkAll" @click="allCheckInputs = !allCheckInputs" />
                        <label class="form-check-label" for="checkAll"></label>
                      </div>
                    </div>
                    <div class="btn-group mb-1">
                      <button class="btn btn-primary light px-3" type="button"><i class="ti-reload"></i></button>
                    </div>
                    <div class="btn-group mb-1">
                      <button aria-expanded="false" data-bs-toggle="dropdown" class="btn btn-primary px-3 light dropdown-toggle mx-2" type="button">
                        More <span class="caret"></span>
                      </button>
                      <div class="dropdown-menu">
                        <a href="javascript: void(0);" class="dropdown-item">Mark as Unread</a> <a href="javascript: void(0);" class="dropdown-item">Add to Tasks</a>
                        <a href="javascript: void(0);" class="dropdown-item">Add Star</a> <a href="javascript: void(0);" class="dropdown-item">Mute</a>
                      </div>
                    </div>
                    <div :class="`email-tools-box float-end mb-2 ${emaiComposeMenuToggle ? 'active' : ''}`" @click="emaiComposeMenuToggle = !emaiComposeMenuToggle">
                      <i class="fa-solid fa-list-ul"></i>
                    </div>
                    <form class="d-none d-sm-block ms-auto">
                      <div class="input-group search-area ms-auto w-100 d-sm-inline-flex d-none">
                        <input type="text" class="form-control" placeholder="Search here" />
                        <span class="input-group-text"
                          ><a href="javascript:void(0)"><i class="flaticon-381-search-2"></i></a
                        ></span>
                      </div>
                    </form>
                  </div>
                  <div class="email-list mt-3">
                    <div class="message" v-for="({ title }, ind) in emailInboxData" :key="ind">
                      <div>
                        <div class="d-flex message-single">
                          <div class="ps-1 align-self-center">
                            <div class="form-check custom-checkbox">
                              <input type="checkbox" class="form-check-input" :id="`checkbox21${ind}`" :checked="allCheckInputs" />
                              <label class="form-check-label" for="checkbox21"></label>
                            </div>
                          </div>
                          <div class="ms-2">
                            <button class="border-0 bg-transparent align-middle p-0"><i class="fa fa-star" aria-hidden="true"></i></button>
                          </div>
                        </div>
                        <RouterLink to="/email-read" class="col-mail col-mail-2">
                          <div class="subject">{{ title }}</div>
                          <div class="date">11:49 am</div>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                  <!-- panel -->
                  <div class="row mt-4">
                    <div class="col-12 ps-3">
                      <nav>
                        <ul class="pagination pagination-gutter pagination-primary pagination-sm no-bg justify-content-center justify-content-xl-start">
                          <li class="page-item page-indicator">
                            <a class="page-link" href="javascript:void()"><i class="la la-angle-left"></i></a>
                          </li>
                          <li class="page-item"><a class="page-link" href="javascript:void()">1</a></li>
                          <li class="page-item active"><a class="page-link" href="javascript:void()">2</a></li>
                          <li class="page-item"><a class="page-link" href="javascript:void()">3</a></li>
                          <li class="page-item"><a class="page-link" href="javascript:void()">4</a></li>
                          <li class="page-item page-indicator">
                            <a class="page-link" href="javascript:void()"><i class="la la-angle-right"></i></a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
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
import EmailRightContent from "@/elements/EmailRightContent.vue";
import { emailInboxData } from "@/elements/TableArrayData";
import { RouterLink } from "vue-router";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "emailInbox",
  components: { EmailRightContent, RouterLink },
  data() {
    return {
      emailInboxData,
    };
  },
  setup() {
    const { emaiComposeMenuToggle } = storeToRefs(useStore());
    const allCheckInputs = ref(false);
    return { allCheckInputs, emaiComposeMenuToggle };
  },
});
</script>

<style scoped></style>
