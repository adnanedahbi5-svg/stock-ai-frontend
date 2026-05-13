<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Table</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Datatable</a></li>
      </ol>
    </div>
    <div class="element-area">
      <div class="demo-view">
        <div class="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
          <div class="row">
            <BasicDatatable />
          </div>
          <DataTableResponsive />
          <DataTable />
          <ProfileDatatable />
          <FeesCollection />
          <PatientTable />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import BasicDatatable from "@/elements/tableDataContent/BasicDatatable.vue";
import DataTable from "@/elements/tableDataContent/DataTable.vue";
import DataTableResponsive from "@/elements/tableDataContent/DataTableResponsive.vue";
import ProfileDatatable from "./ProfileDatatable.vue";
import FeesCollection from "@/elements/tableDataContent/FeesCollection.vue";
import PatientTable from "./PatientTable.vue";

export default defineComponent({
  name: "tableDatabase",
  components: {
    RouterLink,
    BasicDatatable,
    DataTableResponsive,
    DataTable,
    ProfileDatatable,
    FeesCollection,
    PatientTable,
  },

  setup() {
    return {};
  },
});
</script>
