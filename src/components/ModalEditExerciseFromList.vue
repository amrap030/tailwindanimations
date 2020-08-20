<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-edit-exercise-from-list"
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
              Edit an existing exercise by filling in the information below.
            </p>
          </div>
        </div>
        <!-- Modal Content -->
        <div class="divide-y divide-gray-200">
          <div class="px-4 py-6 space-y-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium leading-5 text-gray-900"
                >Name</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  v-model="exerciseName"
                  id="name"
                  class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                />
              </div>
            </div>
            <!-- <div class="flex items-center justify-between space-x-2">
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
                  />
                </div>
              </span>
            </div> -->
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
                @click.prevent="editExercise"
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      exercise: "",
      exerciseName: ""
    };
  },
  methods: {
    ...mapActions({
      updateExerciseName: "exercises/updateExerciseName"
    }),
    hide() {
      this.$modal.hide("modal-edit-exercise-from-list");
      this.exercise = "";
      this.exerciseName = "";
    },
    beforeOpen(event) {
      console.log(event.params);
      this.exercise = event.params;
      this.exerciseName = this.exercise.name;
    },
    close() {
      this.exercise = "";
      this.exerciseName = "";
    },
    async editExercise() {
      try {
        this.exercise.name = this.exerciseName;
        await this.updateExerciseName(this.exercise);
      } catch (error) {
        console.log(error);
      }
      this.$modal.hide("modal-edit-exercise-from-list");
      this.exercise = "";
      this.exerciseName = "";
    }
  }
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
