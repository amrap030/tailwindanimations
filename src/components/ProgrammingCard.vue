<template>
  <div>
    <div
      class="bg-white border-t-8 rounded-lg shadow dark:bg-gray-800"
      :class="`border-${getMuscleColor(item.muscle_group)}-400`"
    >
      <!-- <div
        class="h-40 p-4 bg-center bg-cover"
        style="background-image: url(https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80)"
      >
        <div class="flex justify-between">
          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path
              d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"
            ></path>
          </svg>
          <button @click.prevent="removeExercise(index)">
            <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-white">
              <path
                d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div> -->

      <div class="relative p-4">
        <button
          class="absolute text-gray-500 top-4 right-4 hover:text-gray-700 focus:outline-none "
          @click.stop.prevent="toggleDropdown"
          @keydown.esc.exact="isOpen = false"
          v-on-clickaway="hideDropdown"
        >
          <svg
            class="w-5 h-5 overflow-visible transition duration-150 ease-in-out"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
            ></path>
          </svg>
        </button>
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
            class="absolute right-0 z-10 w-56 mr-4 origin-bottom-right rounded-md shadow-lg mt-7"
          >
            <div class="bg-white rounded-md shadow-xs">
              <div class="py-1">
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  v-ripple
                  v-on-clickaway="hideDropdown"
                  @click.prevent="editExerciseFromProgramDay"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  v-ripple
                  v-on-clickaway="hideDropdown"
                  @click.prevent="duplicateExerciseFromProgramDay()"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  v-ripple
                  v-on-clickaway="hideDropdown"
                  @click.prevent="deleteExerciseFromProgramDay()"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </transition>
        <p
          class="text-xs font-bold tracking-wide text-gray-700 uppercase dark:text-gray-100"
        >
          {{ getExerciseName(item.exercise) }}
        </p>
        <p class="text-xl font-bold text-gray-600 dark:text-gray-200">
          {{ item.weight_used
          }}<span class="text-base font-bold">&nbsp;KG</span>
        </p>
        <span
          class="inline-flex px-2 text-xs font-semibold leading-5 rounded-md"
          :class="
            `bg-${getMuscleColor(item.muscle_group)}-100 text-${getMuscleColor(
              item.muscle_group
            )}-800`
          "
        >
          {{ getMuscleGroup(item.muscle_group) }} </span
        >&nbsp;
        <span
          class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-md"
        >
          %1RM {{ item.percent1rm }} </span
        >&nbsp;
        <span
          class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-md"
        >
          e1RM {{ item.estimated1rm }}
        </span>
      </div>
      <div
        class="flex items-center justify-between p-4 text-xs text-gray-700 border-t border-gray-300"
      >
        <div class="inline-flex items-center">
          <!-- <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> -->
          <p class="dark:text-gray-200">
            <span class="font-bold text-gray-900 dark:text-gray-50">{{
              item.sets
            }}</span>
            Sets
          </p>
        </div>
        <div class="inline-flex items-center">
          <!-- <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M17 1l4 4-4 4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 13v2a4 4 0 01-4 4H3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> -->
          <!-- <p class="pl-4"> -->
          <p class="dark:text-gray-200">
            <span class="font-bold text-gray-900 dark:text-gray-50">{{
              item.reps
            }}</span>
            Reps
          </p>
        </div>
        <div class="inline-flex items-center">
          <!-- <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
            <path
              d="M22 11.08V12a10 10 0 11-5.93-9.14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 4L12 14.01l-3-3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> -->
          <p class="dark:text-gray-200">
            <span class="font-bold text-gray-900 dark:text-gray-50">{{
              item.rir
            }}</span>
            RIR
          </p>
        </div>
      </div>
      <div class="py-3 pl-3.5 pr-4 border-t border-gray-300 rounded-b-lg">
        <!-- <div class="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Notes
        </div> -->
        <div class="flex items-center justify-between">
          <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              class="w-5 h-5 overflow-visible transition duration-150 ease-in-out"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            class="focus:outline-none"
            :class="
              getExercises.find(exercise => exercise.id === item.exercise).like
                ? 'text-red-500 hover:text-gray-500'
                : 'text-gray-500 hover:text-red-500'
            "
            @click.prevent="
              setLike(
                getExercises.find(exercise => exercise.id === item.exercise)
              )
            "
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
          <!-- <div
            class="w-10 h-10 mr-3 bg-center bg-cover rounded-full"
            style="background-image: url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)"
          ></div>
          <div>
            <p class="text-xs text-gray-700">
              "lief heute nicht so gut"
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "ProgrammingCard",
  mixins: [clickaway],
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    day: {
      type: Object
    },
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getMuscles: "muscles/getMuscles",
      getExercises: "exercises/getExercises"
    })
  },
  methods: {
    ...mapActions({
      updateExerciseLike: "exercises/updateExerciseLike",
      updateExercisesInProgramDay: "programdays/updateExercisesInProgramDay"
    }),
    removeExercise() {
      this.$store.commit("removeExercise", this.index);
    },
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
    getExerciseName(id) {
      return this.getExercises.find(exercise => {
        return exercise.id === id;
      }).name;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    hideDropdown() {
      this.isOpen = false;
    },
    async setLike(exercise) {
      try {
        exercise.like = !exercise.like;
        await this.updateExerciseLike(exercise);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteExerciseFromProgramDay() {
      const index = this.index;
      if (index > -1) {
        this.day.exercises.splice(index, 1);
      }
      try {
        await this.updateExercisesInProgramDay(this.day);
      } catch (error) {
        console.log(error);
      }
    },
    async duplicateExerciseFromProgramDay() {
      let index = this.index;
      index++;
      this.day.exercises.splice(index, 0, this.day.exercises[this.index]);
      try {
        await this.updateExercisesInProgramDay(this.day);
      } catch (error) {
        console.log(error);
      }
    },
    editExerciseFromProgramDay() {
      this.$modal.show("modal-edit-exercise", {
        index: this.index,
        ...this.day
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
