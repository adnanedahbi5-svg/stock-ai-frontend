import "bootstrap";
import "vue3-colorpicker/style.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@/assets/css/bootstrap-select.min.css";
import "vue-select/dist/vue-select.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue3-toastify/dist/index.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "swiper/css";
import "@/assets/css/common.css";
import "@/assets/css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import CKEditor from "@ckeditor/ckeditor5-vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useAuthStore } from "@/stores/authStore";

const app = createApp(App);

// ✅ create pinia instance
const pinia = createPinia();
app.use(pinia);

// ✅ NOW we can use the store
const authStore = useAuthStore(pinia);

// restore token after refresh - handled by api service interceptor
// if (authStore.token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.token}`;
// }

app.component("v-select", vSelect);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.use(CKEditor);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
