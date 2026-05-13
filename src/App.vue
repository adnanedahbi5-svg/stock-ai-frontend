<script setup lang="ts">
import { RouterView } from "vue-router";
import NavHeader from "./layouts/NavHeader.vue";
import Header from "./layouts/Header.vue";
import ChatBox from "./layouts/chatbox/ChatBox.vue";
import Sidebar from "./layouts/Sidebar.vue";
import AddNewTask from "./components/AddNewTask.vue";
import { useStore } from "./stores/Store";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, watchEffect, ref } from "vue";
import router from "./router";

const store = useStore();
const { naveHeader, iconHover } = storeToRefs(store);
const contentHeight = ref<HTMLElement | null>(null);

const responSiveSize = () => {
  if (window.matchMedia("(max-width: 775px)").matches) {
    document.body.setAttribute("data-sidebar-style", "overlay");
  } else {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      document.body.setAttribute("data-sidebar-style", "mini");
    } else {
      document.body.setAttribute("data-sidebar-style", "full");
    }
  }
};
function MediaHandler() {
  responSiveSize();
  contentHeight.value?.setAttribute("style", `min-height:${window.innerHeight - 60}px`);
}
watchEffect(() => {
  contentHeight.value?.setAttribute("style", `min-height:${window.innerHeight - 60}px`);
});
onMounted(() => {
  window.addEventListener("resize", MediaHandler);
  responSiveSize();
});

watchEffect(() => {
  let query = router.currentRoute.value.query.theme;
  if (query) {
    localStorage.setItem("MODE", String(query));
  }
  const getQuery = localStorage.getItem("MODE");
  switch (getQuery) {
    case "light":
      document.body.setAttribute("data-theme-version", "light");
      break;
    case "dark":
      document.body.setAttribute("data-theme-version", "dark");
      break;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", MediaHandler);
});
</script>

<template>
  <div id="main-wrapper" :class="`show ${naveHeader ? 'menu-toggle' : ''} ${iconHover ? 'iconhover-toggle' : ''}`">
    <component :is="$route.meta.layout">
      <NavHeader />
      <ChatBox />
      <Header />
      <Sidebar />
      <div class="content-body">
        <RouterView />
      </div>
      <div class="footer">
        <div class="copyright">
          <p>
            Copyright © Designed & Developed by
            <a href="https://dexignzone.com/" target="_blank">DexignLab</a>
            {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </component>
    <component :is="$route.meta.layout2">
      <NavHeader />
      <ChatBox />
      <Header />
      <Sidebar />
      <RouterView />
    </component>
    <component :is="$route.meta.layout3">
      <NavHeader />
      <ChatBox />
      <Header />
      <Sidebar />
      <div class="content-body" ref="contentHeight">
        <RouterView />
      </div>
      <div class="footer">
        <div class="copyright">
          <p>
            Copyright © Designed & Developed by
            <a href="https://dexignzone.com/" target="_blank">DexignLab</a>
            {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </component>
    <component :is="$route.meta.layout4">
      <div class="vh-100">
        <RouterView />
      </div>
    </component>
    <component :is="$route.meta.layout5">
      <NavHeader />
      <ChatBox />
      <Header />
      <Sidebar />
      <div class="content-body">
        <RouterView />
      </div>
    </component>
    <AddNewTask />
  </div>
</template>
