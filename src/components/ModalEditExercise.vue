<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-edit-exercise"
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
              Edit Exercise
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
              Edit the selected exercise by filling in the information below.
            </p>
          </div>
        </div>
        <!-- Modal Content -->
        <div class="divide-y divide-gray-200">
          <div class="px-4 py-6 space-y-6">
            <ExerciseList
              :exercises="getExercises"
              :exercise="exercise"
              v-model="exercise"
              @update="update"
            />
            <div>
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
            <div class="flex items-center justify-between space-x-2">
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
                @click.prevent="editExerciseFromProgramDay"
              >
                Save
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
import Vue from "vue";

export default {
  components: { ExerciseList },
  data() {
    return {
      exercise: "",
      weight: "",
      sets: "",
      reps: "",
      rir: "",
      day: "",
      index: "",
    };
  },
  computed: {
    ...mapGetters({
      getMuscles: "muscles/getMuscles",
      getExercises: "exercises/getExercises",
    }),
  },
  methods: {
    ...mapActions({
      updateExercisesInProgramDay: "programdays/updateExercisesInProgramDay",
    }),
    hide() {
      this.$modal.hide("modal-edit-exercise");
      this.day = "";
      this.weight = "";
      this.sets = "";
      this.reps = "";
      this.rir = "";
      this.exercise = "";
      this.index = "";
    },
    beforeOpen(event) {
      console.log(event.params);
      this.day = {
        id: event.params.id,
        name: event.params.name,
        notes: event.params.notes,
        createdAt: event.params.createdAt,
        updatedAt: event.params.updatedAt,
        weekId: event.params.weekId,
        exercises: event.params.exercises,
      };
      this.index = event.params.index;
      this.weight = this.day.exercises[this.index].weight_used;
      this.sets = this.day.exercises[this.index].sets;
      this.reps = this.day.exercises[this.index].reps;
      this.rir = this.day.exercises[this.index].rir;
      this.exercise = this.day.exercises[this.index].exercise;
    },
    close() {
      this.day = "";
      this.weight = "";
      this.sets = "";
      this.reps = "";
      this.rir = "";
      this.exercise = "";
      this.index = "";
    },
    update(exercise) {
      this.exercise = exercise;
    },
    async editExerciseFromProgramDay() {
      const muscle_group = this.getExercises.find(
        (exercise) => exercise.id === this.exercise
      ).muscle_id;
      const exercise = {
        exercise: this.exercise,
        muscle_group: muscle_group,
        reps: Number(this.reps),
        sets: Number(this.sets),
        weight_used: Number(this.weight),
        rir: Number(this.rir),
      };
      Vue.set(this.day.exercises, this.index, exercise);
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
      this.exercise = "";
      this.index = "";
      this.$modal.hide("modal-edit-exercise");
    },
  },
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
