<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-add-program"
      transition="scale"
      :min-width="200"
      height="auto"
      :pivot-y="0.5"
      :adaptive="true"
      :scrollable="true"
      :reset="true"
    >
      <div class="bg-white">
        <!-- Modal Header -->
        <div class="px-4 py-6 space-y-1 bg-purple-700">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium leading-7 text-white">
              New Program
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
              Get started by filling in the information below to create your new
              program.
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
                >Project Name</label
              >
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  id="name"
                  class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                  placeholder="Project Name"
                  v-focus
                  v-model="project_name"
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
export default {
  components: {},
  data() {
    return {
      project_name: ""
    };
  },
  methods: {
    hide() {
      this.$modal.hide("modal-add-program");
    }
  }
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
