<template>
  <div
    class="offcanvas offcanvas-end customeoff"
    tabindex="-1"
    id="offcanvasExample1"
    aria-modal="true"
    role="dialog"
  >
    <div class="offcanvas-header">
      <h5 class="modal-title" id="#gridSystemModal1">Add New Task</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <div class="container-fluid">
        <form>
          <div class="row">
            <div class="col-xl-6 mb-3">
              <label for="exampleFormControlInputfirst" class="form-label"
                >Title<span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInputfirst"
                placeholder="Title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Project<span class="text-danger">*</span></label>
              <v-select
                id="dynamic-option-creation"
                placeholder="Project"
                :options="[
                  { title: 'Salesmate' },
                  { title: 'ActiveCampaign' },
                  { title: 'Insightly' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label for="exampleFormControlInputthree" class="form-label"
                >Start Date<span class="text-danger">*</span></label
              >
              <input type="date" class="form-control" id="exampleFormControlInputthree" />
            </div>
            <div class="col-xl-6 mb-3">
              <label for="exampleFormControlInputfour" class="form-label"
                >End Date<span class="text-danger">*</span></label
              >
              <input type="date" class="form-control" id="exampleFormControlInputfour" />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Estimated Hour<span class="text-danger">*</span></label>
              <div class="input-group">
                <input type="text" class="form-control" value="09:30" /><span
                  class="input-group-text"
                  ><i class="fas fa-clock"></i
                ></span>
              </div>
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Status<span class="text-danger">*</span></label>
              <v-select
                id="dynamic-option-creation"
                placeholder="Status"
                :options="[
                  { title: 'Status' },
                  { title: 'Inprogress' },
                  { title: 'Pending' },
                  { title: 'Completed' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">priority<span class="text-danger">*</span></label>
              <v-select
                id="dynamic-option-creation"
                placeholder="priority"
                :options="[
                  { title: 'priority' },
                  { title: 'Hight' },
                  { title: 'Medium' },
                  { title: 'Low' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Category<span class="text-danger">*</span></label>

              <v-select
                id="dynamic-option-creation"
                placeholder="Category"
                :options="[
                  { title: 'Category' },
                  { title: 'Designing' },
                  { title: 'Development' },
                  { title: 'React developer' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Permission<span class="text-danger">*</span></label>
              <v-select
                id="dynamic-option-creation"
                placeholder="Permission"
                :options="[{ title: 'Permission' }, { title: 'Public' }, { title: 'Private' }]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Deadline add<span class="text-danger">*</span></label>

              <v-select
                id="dynamic-option-creation"
                placeholder="Deadline"
                :options="[{ title: 'Deadline' }, { title: 'Yes' }, { title: 'No' }]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Assigned to<span class="text-danger">*</span></label>
              <v-select
                id="dynamic-option-creation"
                placeholder="Assigned"
                :options="[
                  { title: 'Assigned' },
                  { title: 'Bernard' },
                  { title: 'Sergey Brin' },
                  { title: 'Larry Ellison' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-6 mb-3">
              <label class="form-label">Responsible Person<span class="text-danger">*</span></label>
              <v-select
                multiple
                id="dynamic-option-creation"
                placeholder="Assigned"
                :options="[
                  { title: 'Assigned' },
                  { title: 'Bernard' },
                  { title: 'Sergey Brin' },
                  { title: 'Larry Ellison' }
                ]"
                label="title"
              />
            </div>
            <div class="col-xl-12 mb-3">
              <label class="form-label">Description<span class="text-danger">*</span></label>
              <textarea rows="3" class="form-control"></textarea>
            </div>
            <div class="col-xl-12 mb-3">
              <label class="form-label">Summary<span class="text-danger">*</span></label>
              <textarea rows="3" class="form-control"></textarea>
            </div>
          </div>
          <div>
            <button class="btn btn-danger light ms-1">Cancel</button> {{ ' ' }}
            <button class="btn btn-primary me-1">Help Desk</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
  name: 'addNewTask',
  components: { VueMultiselect },
  setup() {
    return {}
  }
})
</script>

<style>
.vs__open-indicator {
  transform: scale(0.6) !important;
}
.vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(0.6) !important;
}
.vs__clear {
  display: none;
}
</style>
