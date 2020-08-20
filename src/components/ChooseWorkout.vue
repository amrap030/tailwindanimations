<template>
  <div>
    <div
      class="px-4 py-3 ml-6 text-gray-500 bg-white rounded-lg shadow dark:text-gray-200 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between">
        <!-- <div class="relative mr-14">
          <span>
            <button
              class="flex items-center text-sm font-semibold text-gray-700 focus:outline-none focus:shadow-outline-purple"
              placeholder="Choose Workout"
              @click.prevent="isOpen = !isOpen"
              v-on-clickaway="hideDropdown"
            >
              <span class="whitespace-no-wrap">Choose Workout</span>
              <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 ml-1">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </span>
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
              class="absolute left-0 z-10 clearfix w-56 mt-2 overflow-y-auto origin-bottom-right rounded-md shadow-lg max-h-64"
            >
              <div class="bg-white rounded-md shadow-xs">
                <div class="py-1">
                  <a
                    v-for="(program, index) in programs"
                    :key="program.id"
                    :item="program"
                    :index="index"
                    href="#"
                    class="block px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    v-ripple
                    @click.prevent="renderActiveProgram(program)"
                    >{{ program.name }}</a
                  >
                </div>
              </div>
            </div>
          </transition>
        </div> -->
        <Test />
        <div class="flex items-center justify-between">
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <button
            class="flex items-center px-4 py-2 ml-4 text-white bg-purple-700 rounded-full focus:outline-none focus:shadow-outline-purple"
            @click.prevent="show"
            v-ripple
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="px-2 py-2 transition duration-150 ease-in-out rounded-full hover:bg-gray-200"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <ModalAddProgram />
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
//import { createProvider } from "../vue-apollo";
import { mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import ModalAddProgram from "./ModalAddProgram.vue";
import Test from "@/components/Test.vue";

export default {
  name: "ChooseWorkout",
  mixins: [clickaway],
  components: {
    ModalAddProgram,
    Test
  },
  data() {
    return {
      name: "",
      startDate: "",
      endDate: "",
      isOpen: false
    };
  },
  props: {
    programs: {
      type: Array
    }
  },
  methods: {
    ...mapActions({
      addBlankProgram: "programs/addBlankProgram",
      addProgramWeek: "programweeks/addBlankProgramWeek",
      setActive: "programs/setActiveProgram"
    }),
    async addProgram() {
      this.$Progress.start();
      const program = {
        name: "Push/Pull7",
        startDate: "2020-06-01",
        endDate: "2020-06-25"
      };
      try {
        await this.addBlankProgram(program);
        this.$Progress.finish();
      } catch (error) {
        console.log(error);
      }
    },
    hideDropdown() {
      this.isOpen = false;
    },
    renderActiveProgram(program) {
      this.$store.commit("programs/SET_ACTIVE_PROGRAM", program);
    },
    show() {
      this.$modal.show("modal-add-program");
    },
    hide() {
      this.$modal.hide("modal-add-program");
    }
  }
};
</script>

<style></style>
