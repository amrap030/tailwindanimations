<template>
  <div id="app" :class="{ 'theme-dark': getDark }">
    <div class="flex flex-col h-screen">
      <StickyHeader />
      <div
        class="flex flex-1 min-w-0 overflow-hidden transition duration-300 ease-in-out bg-gray-50 dark:bg-gray-900"
      >
        <SideBar />
        <div class="w-full min-h-0">
          <router-view />
        </div>
      </div>
    </div>
    <vue-progress-bar></vue-progress-bar>
    <ModalIdle v-if="isIdle && this.$store.getters.user.loggedIn" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalIdle from "@/components/ModalIdle";
import SideBar from "@/components/SideBar";
import StickyHeader from "@/components/StickyHeader";

export default {
  components: { ModalIdle, SideBar, StickyHeader },
  computed: {
    ...mapGetters({
      getDark: "getDark"
    }),
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    }
  }
};
</script>

<style>
@import "assets/css/tailwind.css";

body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
}

body.home {
  @apply bg-purple-700;
}

.router-link-exact-active {
  @apply bg-purple-700 text-white;
}

/* purgecss ignore */
.tooltip {
  display: block !important;
  z-index: 10000;
}

/* purgecss ignore */
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 6px;
  padding: 8px 14px 8px;
  @apply text-xs font-semibold;
}

/* purgecss ignore */
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

/* purgecss ignore */
.tooltip[x-placement^="top"] {
  margin-bottom: 2px;
}

/* purgecss ignore */
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 6px 6px 0 6px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -6px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

/* purgecss ignore */
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

/* purgecss ignore */
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

/* purgecss ignore */
.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

/* purgecss ignore */
.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

/* purgecss ignore */
.tooltip-sidebar {
  display: none !important;
  z-index: 10000;
}

@media only screen and (max-width: 1279px) {
  /* purgecss ignore */
  .tooltip-sidebar {
    display: block !important;
    z-index: 10000;
  }
}

@media only screen and (max-width: 639px) {
  /* purgecss ignore */
  .tooltip-sidebar {
    display: none !important;
    z-index: 10000;
  }

  body.training {
    @apply bg-purple-700;
  }
}

.modalClass {
  max-width: 512px;
  margin: 0 auto;
}

@media only screen and (max-width: 639px) {
  .modalClass {
    max-width: 90%;
    margin: 0 auto;
  }
}
</style>
