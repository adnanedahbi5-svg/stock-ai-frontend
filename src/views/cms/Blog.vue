<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">CMS</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Blog</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="filter cm-content-box box-primary">
          <div class="content-title">
            <div class="cpa"><i class="fa-solid fa-filter me-2"></i>Filter</div>
            <div class="tools">
              <a
                href="javascript:void(0);"
                class="expand SlideToolHeader"
                data-bs-toggle="collapse"
                data-bs-target="#blogCollapse"
                aria-expanded="false"
                aria-controls="blogCollapse"
                ><i class="fal fa-angle-down"></i
              ></a>
            </div>
          </div>
          <div class="cm-content-body form excerpt collapse show" id="blogCollapse">
            <div class="card-body">
              <div class="row">
                <div class="col-xl-3 col-sm-6">
                  <label class="form-label">Title</label>
                  <input type="text" class="form-control mb-3 mb-xl-0" id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div class="col-xl-3 col-sm-6 mb-3 mb-xl-0">
                  <label class="form-label">Status</label>
                  <CustomSelectOption2 value-one="Select Status" value-two="Published" value-three="Draft" value-four="Trash" value-five="Private" value-six="Pending" />
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
                  <button class="btn btn-primary me-2" title="Click here to Search" type="button"><i class="fa fa-filter me-1"></i>Filter</button>
                  {{ "  " }}
                  <button class="btn btn-danger light" title="Click here to remove filter" type="button">Remove Filter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 pb-3">
          <ul class="d-flex align-items-center flex-wrap">
            <li><RouterLink to="/add-blog" class="btn btn-primary btn-sm">Add Blog</RouterLink></li>
            <li>
              <RouterLink to="/blog-category" class="btn btn-primary btn-sm mx-1">Blog Category</RouterLink>
            </li>
            <li>
              <RouterLink to="/blog-category" class="btn btn-primary btn-sm mt-sm-0 mt-1">Add Blog Category</RouterLink>
            </li>
          </ul>
        </div>
        <CmsTable title="Blogs List" icon="fa-solid fa-file-lines me-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomSelectOption2 from "@/components/CustomSelectOption2.vue";
import CmsTable from "@/elements/CmsTable.vue";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
// @ts-ignore
import Datepicker from "vue3-datepicker";
export default defineComponent({
  name: "blog_",

  data() {
    return {
      picked: new Date(),
    };
  },
  setup() {
    return {};
  },
  components: { CmsTable, CustomSelectOption2, Datepicker, RouterLink },
});
</script>

<style scoped></style>
