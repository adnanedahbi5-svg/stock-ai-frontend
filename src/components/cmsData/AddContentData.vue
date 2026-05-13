<script lang="ts">
import { defineComponent, ref } from "vue";

// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import IMAGE from "../../constent/Theme";
import VueMultiselect from "vue-multiselect";
import JobSelectOption from "@/elements/JobSelectOption.vue";

export default defineComponent({
  name: "addContent",
  // @ts-ignore
  components: { ckeditor: CKEditor.component, VueMultiselect, JobSelectOption },
  setup() {
    const editor = ref(ClassicEditor);
    const editorData = ref("");
    const editorConfig = {
      toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
    };

    const src = ref(IMAGE.avatar);
    const handleUpload = (e: any) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        src.value = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    };
    return {
      editor,
      editorData,
      editorConfig,
      handleUpload,
      src,
    };
  },
  data() {
    return {
      imageData: "",
      IMAGE,
    };
  },
});
</script>
<template>
  <div class="main-check collapse" id="CheckBoxes">
    <div class="row">
      <h6 class="mb-3">Show on screen</h6>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-1" />
          <label class="form-check-label mb-0 text-nowrap" for="flexCheckDefault-1"> Page Attributes </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-2" />
          <label class="form-check-label mb-0 text-nowrap" for="flexCheckDefault-2"> Featured Image </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-3" />
          <label class="form-check-label mb-0" for="flexCheckDefault-3"> Excerpt </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-4" />
          <label class="form-check-label mb-0 text-nowrap" for="flexCheckDefault-4"> Custom Fields </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-5" />
          <label class="form-check-label mb-0 text-nowrap" for="flexCheckDefault-5"> Discussion </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-6" />
          <label class="form-check-label mb-0 text-nowrap" for="flexCheckDefault-6"> Slug </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-7" />
          <label class="form-check-label mb-0" for="flexCheckDefault-7"> Author </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-8" />
          <label class="form-check-label mb-0" for="flexCheckDefault-8"> Page Type </label>
        </div>
      </div>
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-9" />
          <label class="form-check-label mb-0" for="flexCheckDefault-9"> Seo </label>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xl-8">
      <div class="card h-auto">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" placeholder="Title" />
            </div>
          </form>
          <label class="form-label">Description</label>
          <ckeditor :editor="editor" :config="editorConfig" v-model="editorData"></ckeditor>
        </div>
      </div>

      <div class="filter cm-content-box box-primary">
        <div
          class="content-title SlideToolHeader collapse"
          data-bs-toggle="collapse"
          data-bs-target="#SlideToolHeader"
          aria-controls="SlideToolHeader"
          aria-expanded="true"
        >
          <div class="cpa">Custom Fields</div>
          <div class="tools">
            <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
          </div>
        </div>
        <div class="cm-content-body form excerpt collapse show" id="SlideToolHeader">
          <div class="card-body">
            <h6 class="mb-4 font-w500">Add New Custom Field:</h6>
            <div class="row">
              <div class="col-xl-6 col-sm-6">
                <form>
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" placeholder="Title" />
                  </div>
                </form>
              </div>
              <div class="col-xl-6 col-sm-6">
                <label class="form-label">Value</label>
                <textarea class="form-control" rows="2"></textarea>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-sm mt-3 mt-sm-0">Add Custom Field</button>
            <p class="mt-3 mb-0">Custom fields can be used to extra metadata to a post that you can use in your theme.</p>
          </div>
        </div>
      </div>
      <div class="filter cm-content-box box-primary">
        <div class="content-title SlideToolHeader collapse" data-bs-toggle="collapse" data-bs-target="#Discussion" aria-controls="Discussion" aria-expanded="true">
          <div class="cpa">Discussion</div>
          <div class="tools">
            <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
          </div>
        </div>
        <div class="cm-content-body form excerpt collapse show" id="Discussion">
          <div class="card-body">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckDefault"> Allow comments. </label>
            </div>
          </div>
        </div>
      </div>
      <div class="filter cm-content-box box-primary">
        <div class="content-title SlideToolHeader" data-bs-toggle="collapse" data-bs-target="#Slug" aria-controls="Slug" aria-expanded="true">
          <div class="cpa">Slug</div>
          <div class="tools">
            <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
          </div>
        </div>
        <div class="cm-content-body form excerpt collapse show" id="Slug">
          <div class="card-body">
            <label class="form-label">Slug</label>
            <input type="text" class="form-control" />
          </div>
        </div>
      </div>
      <div class="filter cm-content-box box-primary">
        <div class="content-title SlideToolHeader collapse" data-bs-toggle="collapse" data-bs-target="#Author" aria-controls="Author" aria-expanded="true">
          <div class="cpa">Author</div>
          <div class="tools">
            <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
          </div>
        </div>
        <div class="cm-content-body form excerpt collapse show" id="Author">
          <div class="card-body">
            <label class="form-label">User</label>
            <select class="form-control default-select h-auto wide">
              <option value="AL">admin@gmail.com</option>
              <option value="WY">India</option>
              <option value="WY">Information</option>
              <option value="WY">New Menu</option>
              <option value="WY">Page Menu</option>
            </select>
          </div>
        </div>
      </div>
      <div class="filter cm-content-box box-primary">
        <div class="content-title SlideToolHeader collapse" data-bs-toggle="collapse" data-bs-target="#Seo" aria-controls="Seo" aria-expanded="true">
          <div class="cpa">Seo</div>
          <div class="tools">
            <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
          </div>
        </div>
        <div class="cm-content-body form excerpt collapse show" id="Seo">
          <div class="card-body">
            <label class="form-label">Page Title</label>
            <input type="text" class="form-control mb-3" placeholder="Page title" />
            <div class="row">
              <div class="col-xl-6 col-sm-6">
                <label class="form-label">Keywords</label>
                <input type="text" class="form-control mb-3 mb-sm-0" placeholder="Enter meta Keywords" />
              </div>
              <div class="col-xl-6 col-sm-6">
                <label class="form-label">Descriptions</label>
                <textarea class="form-control" rows="3" placeholder="Enter meta Keywords"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4">
      <div class="right-sidebar-sticky">
        <div class="filter cm-content-box box-primary">
          <div class="content-title SlideToolHeader collapse" data-bs-toggle="collapse" data-bs-target="#Published" aria-controls="Published" aria-expanded="true">
            <div class="cpa">Published</div>
            <div class="tools">
              <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
            </div>
          </div>
          <div class="cm-content-body publish-content form excerpt collapse show" id="Published">
            <div class="card-body py-3">
              <ul class="list-style-1 block">
                <li>
                  <div>
                    <label class="form-label mb-0 me-2">
                      <i class="fa-solid fa-key"></i>
                      Status:
                    </label>
                    <span class="font-w500">Published</span>
                    <a
                      href="javascript:void(0);"
                      class="badge badge-primary light ms-3"
                      id="headingOne"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-controls="collapseOne"
                      aria-expanded="true"
                      role="button"
                      >Edit</a
                    >
                  </div>
                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-bs-parent="#accordion-one">
                    <div class="border rounded p-3 mt-3">
                      <div class="mb-2">
                        <label class="form-label w-100">Content Type</label>
                        <select class="form-control solid default-select">
                          <option selected>Select Status</option>
                          <option value="1">Published</option>
                          <option value="2">Draft</option>
                          <option value="3">Trash</option>
                          <option value="4">Private</option>
                          <option value="5">Pending</option>
                        </select>
                      </div>
                      <div class="mt-3">
                        <button
                          class="btn btn-primary btn-sm me-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Ok
                        </button>
                        <button
                          class="btn btn-danger light btn-sm"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <label class="form-label mb-0 me-2">
                      <i class="fa-solid fa-eye"></i>
                      Visible:
                    </label>
                    <span class="font-w500">Public</span>
                    <a
                      href="javascript:void(0);"
                      class="badge badge-primary light ms-3"
                      id="headingtwo"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsetwo"
                      aria-controls="collapsetwo"
                      aria-expanded="true"
                      role="button"
                      >Edit</a
                    >
                  </div>
                  <div id="collapsetwo" class="collapse" aria-labelledby="headingtwo" data-bs-parent="#accordion-one">
                    <div class="p-3 mt-3 border rounded">
                      <div class="basic-form">
                        <form>
                          <div class="mb-3 mb-0">
                            <div class="radio">
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1"> Public </label>
                              </div>
                            </div>
                            <div class="radio">
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2"> Password Protected </label>
                              </div>
                            </div>
                            <div class="radio disabled">
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                <label class="form-check-label" for="flexRadioDefault3"> Private </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div>
                        <button
                          class="btn btn-primary btn-sm me-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsetwo"
                          aria-expanded="false"
                          aria-controls="collapsetwo"
                        >
                          Ok
                        </button>
                        <button
                          class="btn btn-danger light btn-sm"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsetwo"
                          aria-expanded="false"
                          aria-controls="collapsetwo"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="border-bottom-0">
                  <div>
                    <label class="form-label mb-0 me-2">
                      <i class="fa-solid fa-calendar-days"></i>
                      Published
                    </label>
                    <span class="font-w500">on :24-09-2023 16:22:52</span>
                    <a
                      href="javascript:void(0);"
                      class="badge badge-primary light ms-3"
                      id="headingthree"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsethree"
                      aria-controls="collapsethree"
                      aria-expanded="true"
                      role="button"
                      >Edit</a
                    >
                  </div>
                  <div id="collapsethree" class="collapse" aria-labelledby="headingthree" data-bs-parent="#accordion-one">
                    <div class="p-3 mt-3 border rounded">
                      <div class="input-hasicon">
                        <input name="datepicker" class="form-control bt-datepicker solid" />
                        <div class="icon"><i class="far fa-calendar"></i></div>
                      </div>
                      <div class="mt-3">
                        <button
                          class="btn btn-primary btn-sm me-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsethree"
                          aria-expanded="false"
                          aria-controls="collapsethree"
                        >
                          Ok
                        </button>
                        <button
                          class="btn btn-danger light btn-sm"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapsethree"
                          aria-expanded="false"
                          aria-controls="collapsethree"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="card-footer border-top text-end py-3">
              <a href="javascript:void(0);" class="btn btn-primary btn-sm">Publish</a>
            </div>
          </div>
        </div>
        <div class="filter cm-content-box box-primary">
          <div class="content-title SlideToolHeader" data-bs-toggle="collapse" data-bs-target="#CollapsePage" aria-controls="CollapsePage" aria-expanded="true">
            <div class="cpa">Page Attributes</div>
            <div class="tools">
              <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
            </div>
          </div>
          <div class="cm-content-body publish-content form excerpt collapse show" id="CollapsePage">
            <div class="card-body">
              <label class="form-label d-block">Title</label>
              <div class="dropdown bootstrap-select form-control default-select h-auto wide dropup">
                <JobSelectOption
                  :options="[
                    { title: '(No Parent)' },
                    { title: 'Privacy Policy' },
                    { title: 'Contact Us' },
                    { title: 'Important Information' },
                    { title: 'Free shipping' },
                    { title: 'Daily Gifts' },
                    { title: 'Blog' },
                    { title: 'About Us' },
                    { title: 'Dummy Co' },
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="filter cm-content-box box-primary">
          <div
            class="content-title SlideToolHeader collapse"
            data-bs-toggle="collapse"
            data-bs-target="#CollapsePageType"
            aria-controls="CollapsePageType"
            aria-expanded="true"
          >
            <div class="cpa">Content Type</div>
            <div class="tools">
              <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
            </div>
          </div>
          <div class="cm-content-body form excerpt collapse show" id="CollapsePageType">
            <div class="card-body">
              <div class="dropdown bootstrap-select form-control default-select h-auto wide dropup">
                <JobSelectOption :options="[{ title: 'Page' }, { title: 'Wedget' }]" />
              </div>
            </div>
          </div>
        </div>
        <div class="filter cm-content-box box-primary">
          <div
            class="content-title SlideToolHeader collapse"
            data-bs-toggle="collapse"
            data-bs-target="#CollapsePageType2"
            aria-controls="CollapsePageType2"
            aria-expanded="true"
          >
            <div class="cpa">Featured Image</div>
            <div class="tools">
              <a href="javascript:void(0);" class="expand handle"><i class="fal fa-angle-down"></i></a>
            </div>
          </div>
          <div class="cm-content-body publish-content form excerpt collapse show" id="CollapsePageType2">
            <div class="card-body">
              <div class="avatar-upload d-flex align-items-center">
                <div class="position-relative">
                  <div class="avatar-preview">
                    <div id="imagePreview" :style="`background-image: url(${src})`"></div>
                  </div>
                  <div class="change-btn d-flex align-items-center flex-wrap">
                    <input ref="fileInput" type="file" @change="handleUpload" class="form-control d-none" id="imageUpload" accept=".png, .jpg, .jpeg" />
                    <label for="imageUpload" class="btn btn-sm btn-primary light ms-0">Select Image</label>
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

<style scoped></style>
