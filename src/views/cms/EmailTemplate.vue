<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">CMS</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Email Template</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="filter cm-content-box box-primary">
          <div class="content-title">
            <div class="cpa"><i class="fa-solid fa-filter me-1"></i> Filter</div>
            <div class="tools">
              <a
                href="#emailCollape"
                class="expand SlideToolHeader"
                data-bs-toggle="collapse"
                data-bs-target="#emailCollape"
                aria-expanded="true"
                aria-controls="emailCollape"
                ><i class="fal fa-angle-down"></i
              ></a>
            </div>
          </div>
          <div class="cm-content-body form excerpt collape show" id="emailCollape">
            <div class="card-body">
              <div class="row">
                <div class="col-xl-3 col-sm-6">
                  <label class="form-label">Title</label>
                  <input type="text" class="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div class="col-xl-3 col-sm-6 mb-3 mb-xl-0">
                  <label class="form-label">Status</label>
                  <EmailCustomSelect valueOne="Select Status" valueTwo="Active" valueThree="Inactive" />
                </div>
                <div class="col-xl-3 col-sm-6">
                  <label class="form-label">Date</label>
                  <datepicker
                    class="form-control mb-xl-0 mb-3"
                    :week-starts-on="1"
                    startingView="day"
                    dayPickerHeadingFormat="dd-mm-yyyy"
                    id="datepicker"
                    v-model="picked"
                  />
                </div>
                <div class="col-xl-3 col-sm-6 align-self-end">
                  <div>
                    <button class="btn btn-primary me-2" title="Click here to Search" type="button"><i class="fa fa-filter me-1"></i>Filter</button>
                    <button class="btn btn-danger light" title="Click here to remove filter" type="button">Remove Filter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 pb-3">
          <ul class="d-flex align-items-center">
            <li>
              <RouterLink to="/add-email" class="btn btn-primary btn-sm">New Email Template</RouterLink>
            </li>
          </ul>
        </div>
        <CmsTable title="Email Template List" icon="fa-solid fa-envelope me-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CmsTable from "@/elements/CmsTable.vue";
import EmailCustomSelect from "@/components/EmailCustomSelect.vue";
import { defineComponent } from "vue";
// @ts-ignore
import Datepicker from "vue3-datepicker";

export default defineComponent({
  name: "email_template",
  data() {
    return {
      picked: new Date(),
    };
  },
  setup() {
    return {};
  },
  components: { CmsTable, EmailCustomSelect, Datepicker },
});
</script>

<style scoped></style>
