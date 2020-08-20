<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-edit-program"
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
              Edit Program
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
              Edit the selected program by filling in the information below.
            </p>
          </div>
        </div>
        <!-- Modal Content -->
        <div class="divide-y divide-gray-200">
          <div class="px-4 py-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium leading-5 text-gray-900"
                >Name</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  id="name"
                  class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                  v-focus
                  v-model="programName"
                />
              </div>
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
                @click.prevent="editProgram"
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
  components: {},
  data() {
    return {
      programName: "",
      program: ""
    };
  },
  methods: {
    ...mapActions({
      updateProgram: "programs/updateProgram"
    }),
    close() {
      this.program = "";
      this.programName = "";
    },
    hide() {
      this.$modal.hide("modal-edit-program");
      this.program = "";
      this.programName = "";
    },
    beforeOpen(event) {
      this.program = event.params;
      this.programName = this.program.name;
    },
    async editProgram() {
      this.program.name = this.programName;
      try {
        await this.updateProgram(this.program);
      } catch (error) {
        console.log(error);
      }
      this.program = "";
      this.programName = "";
      this.$modal.hide("modal-edit-program");
    }
  }
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
