<template>
  <div>
    <div
      class="transition duration-300 ease-in-out border-b dark:border-black dark:bg-gray-800"
      :class="
        mobileActive ? 'bg-purple-700 text-white' : 'bg-white text-gray-700'
      "
    >
      <header class="px-6">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <tasty-burger-button
              :type="buttonType"
              :active="isActive"
              :size="size"
              :color="mobileActive ? 'white' : '#374151'"
              :active-color="mobileActive ? 'white' : '#374151'"
              v-on:toggle="onToggle"
              class="translation transform -translate-y-0.5"
              :class="[sideBarOpen && mobileActive ? 'translate-x-64' : '']"
            />
            <h1
              class="ml-4 text-2xl font-semibold leading-tight sm:ml-0 lg:ml-4 dark:text-gray-50"
            >
              {{ this.$route.name }}
            </h1>
          </div>
          <div class="flex">
            <button
              class="text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              v-ripple
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-10 h-10 px-2 py-2 overflow-visible transition duration-150 ease-in-out"
              >
                <path
                  d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0"
                />
              </svg>
            </button>
            <button
              @click="toggleDarkMode"
              aria-label="Toggle theme"
              class="ml-2 text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                v-if="!getDark"
                aria-label="Apply dark theme"
                role="image"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-10 h-10 px-2 py-2 overflow-visible transition duration-150 ease-in-out"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79v0z" />
              </svg>
              <svg
                v-if="getDark"
                aria-label="Apply light theme"
                role="image"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-10 h-10 px-2 py-2 overflow-visible transition duration-150 ease-in-out"
              >
                <path
                  d="M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            </button>

            <div class="relative inline-block">
              <div class="flex ml-2">
                <button
                  @click="toggleDropdown"
                  @keydown.esc.exact="isOpen = false"
                  class="z-10 focus:outline-none"
                  v-on-clickaway="hideDropdown"
                >
                  <Avatar
                    username="amrap030"
                    :customStyle="{
                      height: '2.5rem !important',
                      width: '2.5rem !important',
                      fontSize: '15px !important'
                    }"
                  ></Avatar>
                  <!-- <img
                    class="object-cover w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=144&h=144&q=80"
                    alt="profile img"
                  /> -->
                </button>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out transform"
                enter-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in transform"
                leave-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="isOpen"
                  class="absolute right-0 z-10 w-56 mt-2 origin-bottom-right rounded-md shadow-lg"
                >
                  <div class="bg-white rounded-md shadow-xs">
                    <div class="py-1">
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        >Account settings</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        >Support</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        >License</a
                      >
                      <form @submit.prevent="signOut">
                        <button
                          type="submit"
                          class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          v-ripple
                        >
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";
import { TastyBurgerButton } from "vue-tasty-burgers";
import { isMobileOnly } from "mobile-device-detect";
import Avatar from "vue-avatar";

export default {
  mixins: [clickaway],
  name: "StickyHeader",
  components: { TastyBurgerButton, Avatar },
  data() {
    return {
      isOpen: false,
      buttonType: "spring",
      isActive: true,
      size: "s",
      color: "white",
      activeColor: "white",
      sideBarOpen: true,
      mobileActive: isMobileOnly
      // color: "#384150",
      // activeColor: "#384150",
      //windowWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapGetters({
      getDark: "getDark"
    })
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    hideDropdown() {
      this.isOpen = false;
    },
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.$store.dispatch("clearState").then(() => {
          window.localStorage.removeItem("vuex");
          this.$router.replace({ name: "Home" });
        });
      } catch (err) {
        console.log(err);
      }
    },
    toggleDarkMode() {
      this.$store.commit("SET_DARK", !this.getDark);
    },
    onToggle(active) {
      // Toggle men
      console.log(active);
      this.sideBarOpen = active;
      this.$root.$emit("eventing", active);
    }
  },
  mounted() {
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    // };
    this.$root.$on("bgclick", data => {
      this.onToggle(data);
      this.isActive = !this.isActive;
    });
    if (window.innerWidth < 640) {
      this.isActive = false;
    }
  }
};
</script>

<style>
.hamburger {
  z-index: 50;
}

@media only screen and (max-width: 1279px) {
  .hamburger {
    display: none !important;
    @apply cursor-not-allowed;
  }
}

@media only screen and (max-width: 639px) {
  .hamburger {
    display: inline-block !important;
  }
}
</style>

<style scoped>
.translation {
  transition: transform 0.2s;
  -webkit-transition: transform 0.2s;
  -moz-transition: transform 0.2s;
  -ms-transition: transform 0.2s;
  -o-transition: transform 0.2s;
  transition: transform 0.2s;
  transition-timing-function: cubic-bezier(0.24, 0.87, 0.48, 1);
}
</style>
