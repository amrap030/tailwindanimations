<template>
  <div id="app" :class="{ 'theme-dark': getDark }">
    <router-view />
    <vue-progress-bar></vue-progress-bar>
    <ModalIdle v-if="isIdle && this.$store.getters.user.loggedIn" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalIdle from "@/components/ModalIdle";

export default {
  components: { ModalIdle },
  computed: {
    ...mapGetters({
      getDark: "getDark"
    }),
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    }
  }
  // methods: {
  //   handleStyles() {
  //     // Red style to the body tag for the home page
  //     if (["/"].includes(this.$route.path))
  //       document.body.className = "bg-purple-700";
  //     // Pink style to the body tag for all other pages
  //     else if (document.body.classList.contains("bg-purple-700"))
  //       document.body.className = "bg-white";
  //   },
  // },
  // // Handle styles when the app is initially loaded
  // mounted() {
  //   this.handleStyles();
  // },
  // // Handle styles when the route changes
  // watch: {
  //   $route() {
  //     this.handleStyles();
  //   },
  // },
  // watch: {
  //   $route: {
  //     handler(to, from) {
  //       const body = document.getElementsByTagName("body")[0];
  //       if (from !== undefined) {
  //         body.classList.remove("page--" + from.name.toLowerCase());
  //       }
  //       body.classList.add("page--" + to.name.toLowerCase());
  //     },
  //     immediate: true,
  //   },
  // },
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

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 6px;
  padding: 8px 14px 8px;
  @apply text-xs font-semibold;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 2px;
}

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

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

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

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.tooltip-sidebar {
  display: none !important;
  z-index: 10000;
}

@media only screen and (max-width: 1279px) {
  .tooltip-sidebar {
    display: block !important;
    z-index: 10000;
  }
}

@media only screen and (max-width: 639px) {
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
