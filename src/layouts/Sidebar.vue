<template>
  <div
    class="dlabnav"
    @mouseenter="iconHover = true"
    @mouseleave="iconHover = false"
  >
    <div class="dlabnav-scroll">
      <div class="dropdown header-profile2">
        <a
          class="nav-link"
          href="javascript:void(0);"
          role="button"
          data-bs-toggle="dropdown"
        >
          <div class="header-info2 d-flex align-items-center">
            <div class="header-info-img">
              <span class="avatar-text">{{ authInitials }}</span>
            </div>
            <div class="d-flex align-items-center sidebar-info">
              <div>
                <span class="font-w400 d-block">{{
                  authUser?.name ?? "User"
                }}</span>
                <small class="text-end font-w400">{{
                  authUser?.role ?? ""
                }}</small>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <RouterLink to="/app-profile" class="dropdown-item ai-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-primary"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="ms-2">Profile </span>
          </RouterLink>
          <RouterLink to="/email-inbox" class="dropdown-item ai-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-success"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span class="ms-2">Inbox </span>
          </RouterLink>
          <RouterLink
            to="/page-login"
            class="dropdown-item ai-icon"
            @click.prevent="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-danger"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span class="ms-2">Logout </span>
          </RouterLink>
        </div>
      </div>
      <ul class="metismenu" id="menu">
        <template
          v-for="(
            { title, icons, className, subMenuItems, to }, ind
          ) in MenuItems"
          :key="ind"
        >
          <li
            v-if="className == 'sub-menu'"
            :class="addActive == title ? (!showMenu ? 'mm-active' : '') : ''"
          >
            <RouterLink
              class="has-arrow"
              to="?"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapseExample${ind}`"
              aria-expanded="false"
              @click="addActive == title ? (showMenu = !showMenu) : null"
            >
              <i :class="icons"></i>
              <span class="nav-text">{{ title }}</span>
            </RouterLink>
            <ul
              :class="`collapse mm-show ${addActive == title ? 'mm-active show' : ''}`"
              :id="`collapseExample${ind}`"
            >
              <template
                v-for="(
                  { menu, subMenuDownItems, className, to }, index
                ) in subMenuItems"
                :key="index"
              >
                <li v-if="className == 'sub-menu-down'">
                  <RouterLink
                    class="has-arrow collapsed"
                    to="?"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapseExample2${index}`"
                    aria-expanded="false"
                    >{{ menu }}</RouterLink
                  >
                  <ul
                    aria-expanded="false"
                    :class="`collapse`"
                    :id="`collapseExample2${index}`"
                  >
                    <li
                      v-for="({ child, to }, ind) in subMenuDownItems"
                      :key="ind"
                    >
                      <RouterLink
                        :to="`${to}`"
                        :class="{ active: $route.path === to }"
                        >{{ child }}</RouterLink
                      >
                    </li>
                  </ul>
                </li>
                <li v-else>
                  <RouterLink
                    :class="{ active: $route.path === to }"
                    :to="`${to}`"
                    >{{ menu }}</RouterLink
                  >
                </li>
              </template>
            </ul>
          </li>
          <li class="menu-title" v-else-if="className == 'menu-title'">
            OUR FEATURES
          </li>
          <li v-else>
            <RouterLink
              :to="`${to}`"
              aria-expanded="false"
              :class="{ active: $route.path === to }"
            >
              <i :class="icons"></i>
              <span class="nav-text">{{ title }}</span>
            </RouterLink>
          </li>
        </template>
      </ul>
      <div class="plus-box">
        <p class="fs-14 font-w600 mb-2">
          Let Jobick Managed<br />Your Resume Easily<br />
        </p>
        <p class="plus-box-p">Lorem ipsum dolor sit amet</p>
      </div>
      <div class="copyright">
        <p>
          <strong>Jobick Job Admin</strong> © {{ new Date().getFullYear() }} All
          Rights Reserved
        </p>
        <p class="fs-12">
          Made with
          <span
            class="heart"
            @click="
              (e) => {
                (e.target as HTMLSpanElement).classList.toggle('heart-blast');
              }
            "
          ></span
          >by DexignLab
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from "vue";
import MenuItems from "@/layouts/Menu";
import router from "@/router";
import { useStore } from "@/stores/Store";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "sidebar_",
  setup() {
    const { iconHover } = storeToRefs(useStore());
    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);

    const isAdmin = computed(() => {
      return authUser.value?.role === "administrateur";
    });
    const filteredMenu = computed(() => {
      return MenuItems.filter((item: any) => {
        if (item.adminOnly) {
          return isAdmin.value;
        }
        return true;
      });
    });

    const authInitials = computed(() => {
      const name = authUser.value?.name ?? "";
      return (
        name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "U"
      );
    });

    const logout = async () => {
      await authStore.logout();
      router.push("/page-login");
    };

    const addActive = ref("Dashboard");
    const showMenu = ref(false);
    function menuActive() {
      filteredMenu.value.map((el) => {
        if (router.currentRoute.value.fullPath == el.to) {
          addActive.value = String(el.title);
        }
        el.subMenuItems?.map((ell) => {
          if (router.currentRoute.value.fullPath == ell.to) {
            addActive.value = String(el.title);
          }
          ell.subMenuDownItems?.map((ele) => {
            if (router.currentRoute.value.fullPath == ele.to) {
              addActive.value = String(el.title);
            }
          });
        });
      });

      // for (const list of document.querySelectorAll(".has-arrow")) {
      //   if (list.classList.contains("active")) {
      //     console.log(list);
      //   }
      // }
    }
    watchEffect(() => {
      menuActive();
    });
    return {
      showMenu,
      MenuItems: filteredMenu,
      addActive,
      iconHover,
      authUser,
      authInitials,
      logout,
    };
  },
});
</script>

<style>
.mm-show {
  transition: all 0.3s linear;
}
.metismenu .active {
  color: var(--primary) !important;
}
</style>
