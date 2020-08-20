<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-add-exercise"
      transition="scale"
      :min-width="200"
      height="auto"
      :pivot-y="0.5"
      :adaptive="true"
      :scrollable="true"
      :reset="true"
      @before-open="beforeOpen"
      @closed="close"
    >
      <div class="bg-white">
        <!-- Modal Header -->
        <div class="px-4 py-6 space-y-1 bg-purple-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium leading-7 text-white">
              Add Exercise
            </h2>

            <button
              aria-label="Close panel"
              class="text-purple-200 hover:text-white focus:outline-none"
              @click.prevent="hide"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <p class="text-sm leading-5 text-purple-300">
              Create a new exercise in the selected day by filling in the
              information below.
            </p>
          </div>
        </div>
        <!-- Modal Content -->
        <div class="divide-y divide-gray-200">
          <div class="px-4 py-6">
            <div class="relative">
              <div class="flex items-center justify-between py-2 -mt-2">
                <label
                  for="filter"
                  class="block text-sm font-medium leading-5 text-gray-900"
                  >Filter</label
                >
                <button
                  id="filter"
                  type="button"
                  class="flex items-center justify-center px-2 py-2 -my-2 text-sm font-medium leading-5 text-gray-700 align-middle transition duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple active:text-gray-800"
                  v-ripple
                  @click="toggleDropdown"
                  @keydown.esc.exact="isOpen = false"
                >
                  <!-- <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg> -->

                  <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path
                      d="M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z"
                      fill="#000"
                    />
                  </svg>
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
                  class="absolute right-0 z-10 w-56 mt-1 origin-bottom-right rounded-md shadow-lg"
                >
                  <div class="text-sm bg-white rounded-md shadow-xs">
                    <div class="p-3">
                      <div>
                        <div class="flex items-center">
                          <input
                            id="chest"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="chestChecked"
                            @change="toggleChest($event)"
                          />
                          <label
                            for="chest"
                            class="block ml-4 leading-5 text-gray-700"
                            >Chest</label
                          >
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center">
                          <input
                            id="back"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="backChecked"
                            @change="toggleBack($event)"
                          />
                          <label
                            for="back"
                            class="block ml-4 leading-5 text-gray-700"
                            >Back</label
                          >
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center">
                          <input
                            id="biceps"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="bicepsChecked"
                            @change="toggleBiceps($event)"
                          />
                          <label
                            for="biceps"
                            class="block ml-4 leading-5 text-gray-700"
                            >Biceps</label
                          >
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center">
                          <input
                            id="triceps"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="tricepsChecked"
                            @change="toggleTriceps($event)"
                          />
                          <label
                            for="triceps"
                            class="block ml-4 leading-5 text-gray-700"
                            >Triceps</label
                          >
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center">
                          <input
                            id="shoulders"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="shoulderChecked"
                            @change="toggleShoulders($event)"
                          />
                          <label
                            for="shoulders"
                            class="block ml-4 leading-5 text-gray-700"
                            >Shoulders</label
                          >
                        </div>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center">
                          <input
                            id="legs"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                            :checked="legsChecked"
                            @change="toggleLegs($event)"
                          />
                          <label
                            for="legs"
                            class="block ml-4 leading-5 text-gray-700"
                            >Legs</label
                          >
                        </div>
                      </div>
                      <button
                        class="w-full px-3 py-2 mt-3 text-purple-600 rounded-md bg-purple-50"
                        @click.prevent="applyFilter"
                      >
                        Apply Filter ({{ filterTempExercises.length }})
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div
              class="flex items-center justify-between mt-3 text-xs font-medium leading-5 text-gray-900"
            >
              <span> {{ filterExercises.length }} Exercises found </span>

              <button
                class="flex px-3 py-2 -my-2 rounded-md hover:bg-gray-50"
                @click.prevent="clearAllFilters"
                :class="filterArray.length === 0 ? 'cursor-not-allowed' : ''"
                :disabled="filterArray.length === 0"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="ml-1 text-gray-800">Clear filters</span>
              </button>
            </div>
            <div
              class="flex items-center space-x-2 text-xs font-medium leading-5 text-gray-900"
              :class="filterTempArray.length > 0 ? 'mt-3' : ''"
            >
              <button
                v-for="(muscle, index) in filterTempArray"
                :key="muscle"
                :index="index"
                class="flex items-center px-3 py-2 rounded-md bg-gray-50"
                @click.prevent="removeFilter(muscle)"
              >
                <span class="mr-1 text-gray-800">
                  {{ getMuscleName(muscle) }}
                </span>
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <!-- <button class="flex items-center px-3 py-2 rounded-md bg-gray-50">
                <span class="mr-1 text-gray-800">Biceps</span>
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button> -->
            </div>
            <!-- <div class="relative">
              <button
                type="button"
                class="flex items-center justify-center px-3 py-2 -my-2 -mr-3 text-sm font-medium leading-5 text-gray-700 align-middle transition duration-150 ease-in-out rounded-md hover:bg-gray-50 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple active:text-gray-800"
                v-ripple
                @click="toggleDropdown"
                @keydown.esc.exact="isOpen = false"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  class="w-5 h-5 text-gray-500"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-2">Filter</span>
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
                  class="absolute left-0 z-10 w-56 mt-3 origin-bottom-left rounded-md shadow-lg"
                >
                  <div class="bg-white rounded-md shadow-xs">
                    <div class="p-3">
                      <div>
                        <div class="flex items-center">
                          <input
                            id="updates"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label
                            for="updates"
                            class="block ml-4 leading-5 text-gray-700"
                            >Updates</label
                          >
                        </div>
                      </div>
                      <div class="mt-4">
                        <div class="flex items-center">
                          <input
                            id="content"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label
                            for="content"
                            class="block ml-4 leading-5 text-gray-700"
                            >New content</label
                          >
                        </div>
                      </div>
                      <div class="mt-4">
                        <div class="flex items-center">
                          <input
                            id="ads"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label
                            for="ads"
                            class="block ml-4 leading-5 text-gray-700"
                            >Advertisement</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div> -->

            <ExerciseList
              :exercises="filterExercises"
              v-model="exercise"
              @update="update"
              class="mt-6"
            />
            <div class="mt-6">
              <label
                for="weight"
                class="block text-sm font-medium leading-5 text-gray-900"
                >Weight</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  id="weight"
                  class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                  placeholder="100"
                  v-model="weight"
                />
              </div>
            </div>
            <div class="flex items-center justify-between mt-6 space-x-2">
              <span>
                <label
                  for="sets"
                  class="block text-sm font-medium leading-5 text-gray-900"
                  >Sets</label
                >
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="sets"
                    class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                    placeholder="4"
                    v-model="sets"
                  />
                </div>
              </span>
              <span>
                <label
                  for="reps"
                  class="block text-sm font-medium leading-5 text-gray-900"
                  >Reps</label
                >
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="reps"
                    class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                    placeholder="8"
                    v-model="reps"
                  />
                </div>
              </span>
              <span>
                <label
                  for="rir"
                  class="block text-sm font-medium leading-5 text-gray-900"
                  >RIR</label
                >
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="rir"
                    class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                    placeholder="2"
                    v-model="rir"
                  />
                </div>
              </span>
            </div>
          </div>
          <div class="flex justify-end px-4 py-4 space-x-4">
            <span class="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple active:text-gray-800"
                v-ripple
                @click.prevent="hide"
              >
                Cancel
              </button>
            </span>
            <span class="inline-flex rounded-md shadow-sm">
              <button
                type="submit"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple"
                v-ripple
                @click.prevent="addExerciseToProgramDay"
              >
                Create
              </button>
            </span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import ExerciseList from "@/components/ExerciseList";
import { mapActions, mapGetters } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: { ExerciseList },
  data() {
    return {
      exercise: "",
      weight: "",
      sets: "",
      reps: "",
      rir: "",
      day: "",
      isOpen: false,
      exercises: [],
      bicepsChecked: false,
      chestChecked: false,
      legsChecked: false,
      shoulderChecked: false,
      backChecked: false,
      tricepsChecked: false,
      chestID: "",
      bicepsID: "",
      legsID: "",
      backID: "",
      tricepsID: "",
      shoulderID: "",
      filterArray: [],
      filterTempArray: [],
      filterExercises: [],
    };
  },
  computed: {
    ...mapGetters({
      getMuscles: "muscles/getMuscles",
      getExercises: "exercises/getExercises",
    }),
    filterTempExercises() {
      if (this.filterArray.length === 0) {
        return this.exercises.slice().sort((a, b) => {
          const exerciseA = a.name.toUpperCase();
          const exerciseB = b.name.toUpperCase();
          return exerciseA < exerciseB ? -1 : exerciseA > exerciseB ? 1 : 0;
        });
      } else {
        return this.exercises
          .filter(
            (exercise) =>
              exercise.muscle_id === this.chestID ||
              exercise.muscle_id === this.bicepsID ||
              exercise.muscle_id === this.legsID ||
              exercise.muscle_id === this.shoulderID ||
              exercise.muscle_id === this.backID ||
              exercise.muscle_id === this.tricepsID
          )
          .sort((a, b) => {
            const exerciseA = a.name.toUpperCase();
            const exerciseB = b.name.toUpperCase();
            return exerciseA < exerciseB ? -1 : exerciseA > exerciseB ? 1 : 0;
          });
      }
    },
  },
  methods: {
    ...mapActions({
      updateExercisesInProgramDay: "programdays/updateExercisesInProgramDay",
    }),
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    hideDropdown() {
      this.isOpen = false;
    },
    hide() {
      this.$modal.hide("modal-add-exercise");
      this.day = "";
      this.weight = "";
      this.sets = "";
      this.reps = "";
      this.rir = "";
    },
    beforeOpen(event) {
      this.day = event.params;
    },
    close() {
      this.day = "";
      this.weight = "";
      this.sets = "";
      this.reps = "";
      this.rir = "";
    },
    update(exercise) {
      this.exercise = exercise;
    },
    async addExerciseToProgramDay() {
      const muscle_group = this.getExercises.find(
        (exercise) => exercise.id === this.exercise
      ).muscle_id;
      console.log(muscle_group);
      const exercise = {
        exercise: this.exercise,
        muscle_group: muscle_group,
        reps: Number(this.reps),
        sets: Number(this.sets),
        weight_used: Number(this.weight),
        rir: Number(this.rir),
      };
      this.day.exercises.push(exercise);
      try {
        await this.updateExercisesInProgramDay(this.day);
      } catch (error) {
        console.log(error);
      }
      this.day = "";
      this.weight = "";
      this.sets = "";
      this.reps = "";
      this.rir = "";
      this.$modal.hide("modal-add-exercise");
    },
    getMuscleName(muscle) {
      return this.getMuscles.find((muscleGroup) => muscle === muscleGroup.id)
        .name;
    },
    toggleChest(event) {
      this.chestChecked = event.target.checked;
      if (this.chestChecked) {
        this.chestID = this.getMuscles.find(
          (muscle) => muscle.name === "Chest"
        ).id;
        this.filterArray.push(this.chestID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.chestID
        );
        this.chestID = "";
      }
    },
    toggleBack(event) {
      this.backChecked = event.target.checked;
      if (this.backChecked) {
        this.backID = this.getMuscles.find(
          (muscle) => muscle.name === "Back"
        ).id;
        this.filterArray.push(this.backID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.backID
        );
        this.backID = "";
      }
    },
    toggleBiceps(event) {
      this.bicepsChecked = event.target.checked;
      if (this.bicepsChecked) {
        this.bicepsID = this.getMuscles.find(
          (muscle) => muscle.name === "Biceps"
        ).id;
        this.filterArray.push(this.bicepsID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.bicepsID
        );
        this.bicepsID = "";
      }
    },
    toggleTriceps(event) {
      this.tricepsChecked = event.target.checked;
      if (this.tricepsChecked) {
        this.tricepsID = this.getMuscles.find(
          (muscle) => muscle.name === "Triceps"
        ).id;
        this.filterArray.push(this.tricepsID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.tricepsID
        );
        this.tricepsID = "";
      }
    },
    toggleLegs(event) {
      this.legsChecked = event.target.checked;
      if (this.legsChecked) {
        this.legsID = this.getMuscles.find(
          (muscle) => muscle.name === "Legs"
        ).id;
        this.filterArray.push(this.legsID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.legsID
        );
        this.legsID = "";
      }
    },
    toggleShoulders(event) {
      this.shoulderChecked = event.target.checked;
      if (this.shoulderChecked) {
        this.shoulderID = this.getMuscles.find(
          (muscle) => muscle.name === "Shoulder"
        ).id;
        this.filterArray.push(this.shoulderID);
      } else {
        this.filterArray = this.filterArray.filter(
          (muscleName) => muscleName !== this.shoulderID
        );
        this.shoulderID = "";
      }
    },
    applyFilter() {
      this.filterExercises = this.filterTempExercises;
      this.filterTempArray = this.filterArray;
      this.isOpen = !this.isOpen;
    },
    removeFilter(muscle) {
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Chest"
      ) {
        this.chestChecked = false;
        this.chestID = "";
      }
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Biceps"
      ) {
        this.bicepsChecked = false;
        this.bicepsID = "";
      }
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Back"
      ) {
        this.backChecked = false;
        this.backID = "";
      }
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Triceps"
      ) {
        this.tricepsChecked = false;
        this.tricepsID = "";
      }
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Shoulder"
      ) {
        this.shoulderChecked = false;
        this.shoulderID = "";
      }
      if (
        this.getMuscles.find((muscleName) => muscleName.id === muscle).name ===
        "Legs"
      ) {
        this.legsChecked = false;
        this.legsID = "";
      }
      this.filterArray = this.filterArray.filter(
        (element) => element !== muscle
      );
      this.filterTempArray = this.filterArray.filter(
        (element) => element !== muscle
      );
      this.filterExercises = this.filterTempExercises;
    },
    clearAllFilters() {
      this.filterExercises = this.exercises;
      this.filterArray = [];
      this.filterTempArray = this.filterArray;
      this.filterArray = [];
      this.chestID = "";
      this.backID = "";
      this.bicepsID = "";
      this.tricepsID = "";
      this.legsID = "";
      this.shoulderID = "";
      this.chestChecked = false;
      this.backChecked = false;
      this.bicepsChecked = false;
      this.tricepsChecked = false;
      this.legsChecked = false;
      this.shoulderChecked = false;
    },
  },
  created() {
    this.getExercises.forEach((element) => {
      this.exercises.push(element);
    });
    this.filterExercises = this.exercises;
  },
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
