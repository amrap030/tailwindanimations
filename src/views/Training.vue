<template>
  <div class="h-full">
    <main class="flex max-h-full p-6 overflow-hidden">
      <!-- EMPTY workout section
          <div class="my-auto">
          <p
            class="w-full text-sm font-bold text-center text-gray-900"
          >Your workout section looks empty</p>
          <p class="w-full mt-2 text-sm font-medium text-center text-gray-700">
            Start building your first workout with
            <span class="font-bold">+ New Program</span>
          </p>
          <div class="flex justify-center mt-4">
            <span>
              <button
                class="flex items-center py-2 pl-2 pr-4 text-sm font-medium text-white bg-purple-700 rounded-lg shadow hover:bg-purple-600"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="ml-1">New Program</span>
              </button>
            </span>
          </div>
          </div>
      -->

      <div
        class="flex-1 max-h-full min-w-0 mt-2 ml-2 overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg sm:shadow"
      >
        <div
          class="flex items-center justify-between px-4 py-2 overflow-hidden border-b dark:border-black"
        >
          <div>
            <nav class="flex space-x-4">
              <button
                class="relative text-sm font-semibold text-gray-500 whitespace-no-wrap hover:text-gray-900 focus:outline-none"
                v-for="(program, index) in getSortedPrograms"
                :key="program.id"
                :index="index"
                @click.prevent="setActiveProgram(program)"
                :class="
                  program.id === getActiveProgram.id
                    ? 'text-purple-700 hover:text-purple-700'
                    : ''
                "
              >{{ program.name }}</button>
            </nav>
          </div>
          <div>
            <div class="flex space-x-2">
              <button
                @click.prevent="editProgram"
                class="text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                v-ripple
                v-tooltip="{
                  content: 'Edit',
                  popperOptions: {
                    modifiers: {
                      preventOverflow: {
                        boundariesElement: 'offsetParent'
                      }
                    }
                  },
                  placement: 'top',
                  offset: 10,
                  targetClasses: ['it-has-a-tooltip']
                }"
              >
                <svg
                  class="overflow-visible h-10 w-10 px-2.5 py-2.5 transition ease-in-out duration-150"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                class="text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                v-ripple
                v-tooltip="{
                  content: 'Duplicate',
                  popperOptions: {
                    modifiers: {
                      preventOverflow: {
                        boundariesElement: 'offsetParent'
                      }
                    }
                  },
                  placement: 'top',
                  offset: 10
                }"
                @click.prevent="duplicateActiveProgram"
              >
                <svg
                  class="overflow-visible h-10 w-10 px-2.5 py-2.5 transition ease-in-out duration-150"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                class="text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                v-ripple
                v-tooltip="{
                  content: 'Delete',
                  popperOptions: {
                    modifiers: {
                      preventOverflow: {
                        boundariesElement: 'offsetParent'
                      }
                    }
                  },
                  placement: 'top',
                  offset: 10
                }"
                @click.prevent="show"
              >
                <svg
                  class="overflow-visible h-10 w-10 px-2.5 py-2.5 transition ease-in-out duration-150"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button
                class="text-gray-700 bg-gray-200 rounded-full dark:text-gray-100 dark:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                v-ripple
                v-tooltip="{
                  content: 'Share',
                  popperOptions: {
                    modifiers: {
                      preventOverflow: {
                        boundariesElement: 'offsetParent'
                      }
                    }
                  },
                  placement: 'top',
                  offset: 10
                }"
              >
                <svg
                  class="overflow-visible h-10 w-10 px-2.5 py-2.5 transition ease-in-out duration-150"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <vuescroll :ops="ops">
          <div class="h-full p-8">
            <div class="mb-14">
              <TrainingDayCard
                v-for="(programday, index) in filterActiveWeekDays"
                :key="programday.id"
                :item="programday"
                :index="index"
              />
              <AddDayCard :programdays="programdays" />
            </div>
          </div>
        </vuescroll>
      </div>
      <div class="hidden max-h-full mt-2 overflow-hidden sm:flex sm:flex-col">
        <vuescroll :ops="ops">
          <div class="pb-2 pr-2">
            <ChooseWorkout :programs="programs" />
            <WeekCard
              v-for="(programweek, index) in filterActiveProgramWeeks"
              :key="programweek.id"
              :item="programweek"
              :index="index"
            />

            <AddWeekCard />
          </div>
        </vuescroll>
      </div>
    </main>
    <ModalEditWeek />
    <ModalDeleteWeek />
    <ModalAddExercise />
    <ModalEditExercise />
    <ModalDeleteProgram />
    <ModalEditProgram />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import WeekCard from "@/components/WeekCard";
import AddWeekCard from "@/components/AddWeekCard";
import ChooseWorkout from "@/components/ChooseWorkout";
import TrainingDayCard from "@/components/TrainingDayCard";
import AddDayCard from "@/components/AddDayCard";
import vuescroll from "vuescroll";
import ModalEditWeek from "@/components/ModalEditWeek.vue";
import ModalDeleteWeek from "@/components/ModalDeleteWeek.vue";
import ModalDeleteProgram from "@/components/ModalDeleteProgram.vue";
import ModalAddExercise from "@/components/ModalAddExercise.vue";
import ModalEditExercise from "@/components/ModalEditExercise.vue";
import ModalEditProgram from "@/components/ModalEditProgram.vue";
import { apolloClient } from "../apollo-client";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Training",
  components: {
    TrainingDayCard,
    WeekCard,
    AddWeekCard,
    AddDayCard,
    ChooseWorkout,
    vuescroll,
    ModalEditWeek,
    ModalDeleteWeek,
    ModalAddExercise,
    ModalDeleteProgram,
    ModalEditExercise,
    ModalEditProgram
  },
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right"
        },
        rail: {},
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#c0c0c0",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false
        }
      },
      programdays: [],
      programs: [],
      programweeks: [],
      exercises: [],
      muscles: [],
      last_received: ""
    };
  },
  beforeCreate: function() {
    document.body.className = "training";
  },
  computed: {
    ...mapGetters({
      getProgramDays: "programdays/getProgramDays",
      getPrograms: "programs/getPrograms",
      getProgramWeeks: "programweeks/getWeeks",
      getActiveProgram: "programs/getActiveProgram",
      getActiveProgramWeek: "programweeks/getActiveProgramWeek"
    }),
    filterActiveProgramWeeks() {
      return this.programweeks.filter(programweek => {
        return programweek.programId === this.getActiveProgram.id;
      });
    },
    filterActiveWeekDays() {
      if (this.getActiveProgramWeek) {
        const test = this.getProgramDays
          .filter(programday => {
            return programday.weekId === this.getActiveProgramWeek.id;
          })
          .sort((a, b) => a.createdAt - b.createdAt);
        console.log(test);
        return test;
      }
      return null;
    },
    getSortedPrograms() {
      return this.programs.slice().sort((a, b) => a.createdAt - b.createdAt);
    }
  },
  methods: {
    ...mapActions({
      initializeProgramDays: "programdays/initializeProgramDays",
      duplicateProgram: "programs/duplicateProgram"
    }),
    show() {
      this.$modal.show("modal-delete-program");
    },
    hide() {
      this.$modal.hide("modal-delete-program");
    },
    setActiveProgram(program) {
      this.$store.commit("programs/SET_ACTIVE_PROGRAM", program);
      const weeks = this.getProgramWeeks.filter(programweek => {
        return programweek.programId === program.id;
      });
      if (weeks.length === 0) {
        this.$store.commit("programweeks/SET_ACTIVE_PROGRAMWEEK", null);
      } else {
        this.$store.commit("programweeks/SET_ACTIVE_PROGRAMWEEK", weeks[0].id);
      }
    },
    editProgram() {
      this.$modal.show("modal-edit-program", this.getActiveProgram);
    },
    async duplicateActiveProgram() {
      try {
        await this.duplicateProgram(this.getActiveProgram);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    const that = this;
    apolloClient
      .query({
        query: require("../graphql/getAllProgramDays.gql"),
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(data => {
        that.last_received = Date.now();
        this.$store.dispatch("programdays/initializeProgramDays", data);
        // start a subscription
        this.programdays = this.getProgramDays;
        apolloClient
          .subscribe({
            query: require("../graphql/getNewProgramDay.gql"),
            variables: {
              last_received: new Date(that.last_received).toISOString(),
              user_id: firebase.auth().currentUser.uid
            }
          })
          .subscribe({
            next(data) {
              console.log(data);
            },
            error(err) {
              console.error("err", err);
            }
          });
      });
    apolloClient
      .query({
        query: require("../graphql/getAllPrograms.gql"),
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(data => {
        //that.last_received = Date.now();
        this.$store.dispatch("programs/initializePrograms", data);
        //       // start a subscription
        //       // this.$apollo
        //       //   .subscribe({
        //       //     query: require("../graphql/getNewProgramDay.gql"),
        //       //     variables: {
        //       //       last_received: new Date(that.last_received).toISOString(),
        //       //       user_id: firebase.auth().currentUser.uid,
        //       //     },
        //       //   })
        //       //   .subscribe({
        //       //     next(data) {
        //       //       console.log(data);
        //       //     },
        //       //     error(err) {
        //       //       console.error("err", err);
        //       //     },
        //       //   });
        this.programs = this.getPrograms;
      });
    apolloClient
      .query({
        query: require("../graphql/getAllProgramWeeks.gql"),
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(data => {
        this.$store.dispatch("programweeks/initializeProgramWeeks", data);
        //       // start a subscription
        //       // this.$apollo
        //       //   .subscribe({
        //       //     query: require("../graphql/getNewProgramDay.gql"),
        //       //     variables: {
        //       //       last_received: new Date(that.last_received).toISOString(),
        //       //       user_id: firebase.auth().currentUser.uid,
        //       //     },
        //       //   })
        //       //   .subscribe({
        //       //     next(data) {
        //       //       console.log(data);
        //       //     },
        //       //     error(err) {
        //       //       console.error("err", err);
        //       //     },
        //       //   });
        this.programweeks = this.getProgramWeeks;
      });
    apolloClient
      .query({
        query: require("../graphql/getAllExercises.gql"),
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(data => {
        this.$store.dispatch("exercises/initializeExercises", data);
        //       // start a subscription
        //       // this.$apollo
        //       //   .subscribe({
        //       //     query: require("../graphql/getNewProgramDay.gql"),
        //       //     variables: {
        //       //       last_received: new Date(that.last_received).toISOString(),
        //       //       user_id: firebase.auth().currentUser.uid,
        //       //     },
        //       //   })
        //       //   .subscribe({
        //       //     next(data) {
        //       //       console.log(data);
        //       //     },
        //       //     error(err) {
        //       //       console.error("err", err);
        //       //     },
        //       //   });
        this.exercises = this.getExercises;
      });
    apolloClient
      .query({
        query: require("../graphql/getAllMuscles.gql")
        //variables: { user_id: firebase.auth().currentUser.uid },
      })
      .then(data => {
        this.$store.dispatch("muscles/initializeMuscles", data);
        //       // start a subscription
        //       // this.$apollo
        //       //   .subscribe({
        //       //     query: require("../graphql/getNewProgramDay.gql"),
        //       //     variables: {
        //       //       last_received: new Date(that.last_received).toISOString(),
        //       //       user_id: firebase.auth().currentUser.uid,
        //       //     },
        //       //   })
        //       //   .subscribe({
        //       //     next(data) {
        //       //       console.log(data);
        //       //     },
        //       //     error(err) {
        //       //       console.error("err", err);
        //       //     },
        //       //   });
        this.muscles = this.getMuscles;
      });
  }
};
</script>

<style scoped></style>
