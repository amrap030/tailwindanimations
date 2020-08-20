<template>
  <div
    class="relative text-gray-700 transition duration-300 ease-in-out bg-white dark:text-gray-100 dark:bg-gray-800"
  >
    <nav
      class="fixed z-50 flex flex-col justify-between h-full px-8 py-3 pb-3 transform bg-white shadow-xl sm:static sm:shadow-none sm:border-r sm:translate-x-0 dark:border-none sidebar"
      :class="[
        sideBarOpen ? 'w-64' : 'w-20',
        sideBarOpen ? 'translate-x-0' : '-translate-x-64',
      ]"
    >
      <div>
        <div class="h-10 -mx-3">
          <router-link
            to="/dashboard"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:text-white hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Dashboard',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4 leading-tight"
            >
              <path
                d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z"
              />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Dashboard</span
            >
          </router-link>
        </div>

        <div class="h-10 mt-2 -mx-3">
          <router-link
            to="/training"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:text-white hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Training',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Training</span
            >
          </router-link>
        </div>
        <div class="h-10 mt-2 -mx-3">
          <router-link
            to="/exercises"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:text-white hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Exercises',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4"
            >
              <path
                d="M12 8c4.97 0 9-1.343 9-3s-4.03-3-9-3-9 1.343-9 3 4.03 3 9 3zM21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
              />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Exercises</span
            >
          </router-link>
        </div>
        <div class="h-10 mt-2 -mx-3">
          <router-link
            to="/calendar"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:text-white hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Calendar',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4"
            >
              <path
                d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
              />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Calendar</span
            >
          </router-link>
        </div>
        <div class="h-10 mt-2 -mx-3">
          <router-link
            to="/calculator"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:text-white hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Calculator',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4"
            >
              <path
                d="M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
              />
              <path
                d="M15 9H9v6h6V9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"
              />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Calculator</span
            >
          </router-link>
        </div>
      </div>
      <div class="flex-row px-8 -mx-8 border-t">
        <div class="h-10 mt-2 -mx-3">
          <router-link
            to="/settings"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 rounded-lg hover:bg-purple-700 hover:text-white focus:outline-none focus:shadow-outline-purple"
            v-ripple
            v-tooltip="{
              content: 'Settings',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: tooltipClasses,
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              class="absolute w-4 h-4"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a1.998 1.998 0 010 2.83 1.998 1.998 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a1.998 1.998 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 013.417 1.415 2 2 0 01-.587 1.415l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1v0z"
              />
            </svg>

            <span class="pl-8 overflow-hidden text-sm font-medium"
              >Settings</span
            >
          </router-link>
        </div>
        <div class="h-10 mt-2 -mx-3">
          <button
            to="/"
            class="relative inline-flex items-center w-full h-10 px-3 py-2 text-white bg-gray-800 rounded-lg dark:bg-gray-700 focus:outline-none focus:shadow-outline-purple"
            v-ripple
            @click.prevent="signOut"
            v-tooltip="{
              content: 'Sign Out',
              popperOptions: {
                modifiers: {
                  preventOverflow: {
                    boundariesElement: 'offsetParent',
                  },
                },
              },
              classes: [sideBarOpen ? 'tooltip-sidebar' : 'block'],
              placement: 'right',
              offset: 10,
            }"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute w-4 h-4"
            >
              <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
            </svg>

            <span
              class="pl-8 overflow-hidden text-sm font-medium whitespace-no-wrap"
              >Sign out</span
            >
          </button>
        </div>
      </div>
    </nav>
    <div
      class="fixed z-10 bg-black sm:static sm:inline-block sm:bg-transparent background"
      :class="sideBarOpen ? 'bg-opacity-50 inset-0' : 'bg-opacity-0'"
      @click.prevent="toggleSidebar"
    ></div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { isMobileOnly } from "mobile-device-detect";

export default {
  name: "SideBar",
  data() {
    return {
      sideBarOpen: true,
      mobileActive: isMobileOnly,
      //windowSize: { windowWidth },
    };
  },
  computed: {
    tooltipClasses() {
      if (this.sideBarOpen === true) {
        return "tooltip-sidebar";
      } else {
        return "block";
      }
    },
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        window.localStorage.removeItem("vuex");
        this.$router.replace({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    },
    toggleSidebar() {
      this.sideBarOpen = false;
      this.$root.$emit("bgclick", false);
      // if (this.windowWidth > 640) {
      //   this.mobileActive = false;
      // }
    },
  },
  mounted() {
    this.$root.$on("eventing", (data) => {
      this.sideBarOpen = data;
    });
    // window.onresize = () => {
    //   if (this.windowWidth >= 640) {
    //     this.mobileActive = false;
    //   } else {
    //     this.mobileActive = true;
    //     this.sideBarOpen = false;
    //   }
    // };
    // if (this.windowWidth < 640) {
    //   this.mobileActive = true;
    //   this.sideBarOpen = false;
    // }
  },
  created() {
    if (window.innerWidth < 640) {
      this.sideBarOpen = false;
    }
  },
};
</script>

<style scoped>
.sidebar {
  transition: width 0.2s, transform 0.2s;
  -webkit-transition: width 0.2s, transform 0.2s;
  -moz-transition: width 0.2s, transform 0.2s;
  -ms-transition: width 0.2s, transform 0.2s;
  -o-transition: width 0.2s, transform 0.2s;
  transition: width 0.2s, transform 0.2s;
  transition-timing-function: cubic-bezier(0.24, 0.87, 0.48, 1);
}

.background {
  transition: background 0.2s;
  -webkit-transition: background 0.2s;
  -moz-transition: background 0.2s;
  -ms-transition: background 0.2s;
  -o-transition: background 0.2s;
  transition: background 0.2s;
  transition-timing-function: cubic-bezier(0.24, 0.87, 0.48, 1);
}

@media only screen and (max-width: 1279px) {
  .sidebar {
    @apply w-20;
  }
}

@media only screen and (max-width: 639px) {
  .sidebar {
    /* position: fixed; */
    @apply inset-0 w-64;
  }
}
</style>
