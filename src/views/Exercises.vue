<template>
  <div>
    <div class="flex flex-col h-screen">
      <StickyHeader />
      <div class="flex flex-1 min-w-0 overflow-hidden bg-gray-100">
        <SideBar />

        <div class="w-full min-h-0">
          <main class="flex h-full p-8 overflow-hidden">
            <div
              class="w-full bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow"
            >
              <vuescroll :ops="ops">
                <div class="grid gap-4 p-8 grid-switcher">
                  <div
                    class="p-4 space-y-2 bg-gray-100 rounded-lg"
                    v-for="(id, index) in exerciseIds"
                    :key="id"
                    :index="index"
                  >
                    <div
                      class="flex items-center justify-between hidden mb-8 sm:block"
                    >
                      <div class="flex items-center">
                        <h2
                          class="text-xl font-bold leading-tight text-gray-700"
                        >
                          {{ getMuscleGroup(id) }} Exercises
                        </h2>
                      </div>
                    </div>
                    <div
                      class="grid grid-cols-4 gap-4 px-6 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase"
                    >
                      <div>
                        Name
                      </div>
                      <div>
                        Muscle Group
                      </div>
                      <div>
                        Like
                      </div>
                      <!-- <div>
                        Personal Best
                      </div> -->
                      <div class="text-right">
                        Actions
                      </div>
                    </div>
                    <div
                      class="grid grid-cols-4 gap-4 px-6 py-4 text-sm font-medium leading-5 text-gray-700 bg-white rounded-lg shadow hover:bg-gray-50"
                      v-for="(exercise, index) in filterExercises(id)"
                      :key="exercise.id"
                      :index="index"
                    >
                      <div>
                        {{ exercise.name }}
                      </div>
                      <div>
                        <span
                          class="inline-flex px-2 text-xs font-semibold leading-5 rounded-md"
                          :class="
                            `bg-${getMuscleColor(
                              exercise.muscle_id
                            )}-100 text-${getMuscleColor(
                              exercise.muscle_id
                            )}-800`
                          "
                        >
                          {{ getMuscleGroup(exercise.muscle_id) }}
                        </span>
                      </div>
                      <div>
                        <button
                          class="focus:outline-none"
                          :class="
                            exercise.like
                              ? 'text-red-500 hover:text-gray-500'
                              : 'text-gray-500 hover:text-red-500'
                          "
                          v-tooltip="{
                            content: exercise.like ? 'Dislike' : 'Like',
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
                          @click="setLike(exercise)"
                        >
                          <svg
                            class="w-5 h-5 overflow-visible transition duration-150 ease-in-out"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <!-- <div>
                        150 KG
                      </div> -->
                      <div>
                        <div
                          class="flex items-center justify-end text-gray-500"
                        >
                          <button
                            class="mr-1 hover:text-gray-700"
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
                              offset: 10
                            }"
                            @click.prevent="editExerciseFromList(exercise)"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              class="w-5 h-5"
                            >
                              <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            class="hover:text-red-500"
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
                            @click.prevent="deleteExerciseFromList(exercise)"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              class="w-5 h-5"
                            >
                              <path
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <AddExerciseCard :muscle_group="id" />
                  </div>
                </div>
              </vuescroll>
            </div>
          </main>
        </div>
      </div>
    </div>
    <ModalAddExerciseToList />
    <ModalEditExerciseFromList />
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import StickyHeader from "@/components/StickyHeader";
import ModalAddExerciseToList from "@/components/ModalAddExerciseToList";
import ModalEditExerciseFromList from "@/components/ModalEditExerciseFromList";
import AddExerciseCard from "@/components/AddExerciseCard";
import { mapGetters, mapActions } from "vuex";
import vuescroll from "vuescroll";

export default {
  name: "Exercises",
  components: {
    SideBar,
    StickyHeader,
    AddExerciseCard,
    vuescroll,
    ModalAddExerciseToList,
    ModalEditExerciseFromList
  },
  data() {
    return {
      exercises: [],
      exerciseIds: [],
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
      }
    };
  },
  computed: {
    ...mapGetters({
      getExercises: "exercises/getExercises",
      getMuscles: "muscles/getMuscles"
    })
  },
  methods: {
    ...mapActions({
      updateExerciseLike: "exercises/updateExerciseLike",
      deleteExercise: "exercises/deleteExercise"
    }),
    getMuscleGroup(id) {
      return this.getMuscles.find(muscle => {
        return muscle.id === id;
      }).name;
    },
    getMuscleColor(id) {
      return this.getMuscles.find(muscle => {
        return muscle.id === id;
      }).color;
    },
    filterExercises(id) {
      return this.getExercises
        .filter(exercise => {
          return exercise.muscle_id === id;
        })
        .sort((a, b) => {
          const exerciseA = a.name.toUpperCase();
          const exerciseB = b.name.toUpperCase();
          return exerciseA < exerciseB ? -1 : exerciseA > exerciseB ? 1 : 0;
        });
    },
    async setLike(exercise) {
      try {
        exercise.like = !exercise.like;
        await this.updateExerciseLike(exercise);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteExerciseFromList(exercise) {
      try {
        console.log(exercise);
        await this.deleteExercise(exercise);
      } catch (error) {
        console.log(error);
      }
    },
    editExerciseFromList(exercise) {
      this.$modal.show("modal-edit-exercise-from-list", exercise);
    }
  },
  created() {
    this.exercises = this.getExercises;
    this.exerciseIds = [
      ...new Set(this.getExercises.map(exercise => exercise.muscle_id))
    ];
  }
};
</script>

<style scoped>
.grid-switcher {
  @apply grid-cols-2;
}

@media only screen and (max-width: 1560px) {
  .grid-switcher {
    @apply grid-cols-1;
  }
}
</style>
