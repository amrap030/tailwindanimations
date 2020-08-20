<template>
  <div @keydown.esc="hide" tabindex="0">
    <modal
      name="modal-delete-week"
      transition="scale"
      classes="modalClass"
      height="auto"
      :pivot-y="0.5"
      :pivot-x="0"
      :adaptive="true"
      :scrollable="true"
      :reset="true"
      @before-open="beforeOpen"
      @closed="close"
    >
      <!-- <div
        class="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      > -->
      <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <!-- <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div> -->

      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
      <!-- <div
        class="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      > -->
      <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-headline"
            >
              Delete Week
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                Are you sure you want to delete this week? All of your data will
                be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
            @click.prevent="removeWeekAndDays(programweek)"
            v-ripple
          >
            Delete
          </button>
        </span>
        <span class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
            @click.prevent="hide"
            v-ripple
          >
            Cancel
          </button>
        </span>
      </div>
      <!-- </div> -->
      <!-- </div> -->
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      programweek: "",
    };
  },
  computed: {
    ...mapGetters({
      getActiveProgram: "programs/getActiveProgram",
      getActiveProgramWeek: "programweeks/getActiveProgramWeek",
      getWeeks: "programweeks/getWeeks",
    }),
  },
  methods: {
    ...mapActions({
      deleteProgramWeek: "programweeks/deleteProgramWeek",
    }),
    setActiveWeek(programId) {
      const week = this.getWeeks.filter(
        (week) => week.programId === programId
      )[0];
      if (week) {
        this.$store.commit("programweeks/SET_ACTIVE_PROGRAMWEEK", week.id);
      } else {
        this.$store.commit("programweeks/SET_ACTIVE_PROGRAMWEEK", null); //else Fall bearbeiten!
      }
    },
    async removeWeekAndDays(programweek) {
      this.$modal.hide("modal-delete-week");
      this.$Progress.start();
      try {
        await this.deleteProgramWeek(programweek.id);
        this.$Progress.finish();
        if (programweek.id === this.getActiveProgramWeek.id) {
          this.setActiveWeek(this.getActiveProgram.id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.programweek = "";
    },
    hide() {
      this.$modal.hide("modal-delete-week");
      this.programweek = "";
    },
    beforeOpen(event) {
      this.programweek = event.params;
    },
  },
};
</script>

<style>
.vm--modal {
  @apply rounded-lg;
}
</style>
