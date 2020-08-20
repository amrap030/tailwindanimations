<template>
  <div class="flex">
    <button
      class="flex items-center justify-center flex-1 min-w-0 px-4 py-3 mt-3 ml-6 text-sm font-semibold text-purple-600 rounded-lg shadow bg-purple-50 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:shadow-outline-purple"
      @click.prevent="addWeek"
      v-ripple
    >
      <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span class="text-xs">Add Week</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddWeekCard",
  data() {
    return {
      name: "",
      startDate: "",
      endDate: "",
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      getLastProgram: "programs/getLastProgram",
      getProgramById: "programs/getProgramById",
      getPrograms: "programs/getPrograms",
      getActiveProgram: "programs/getActiveProgram",
    }),
  },
  methods: {
    ...mapActions({
      addProgramWeek: "programweeks/addBlankProgramWeek",
    }),
    async addWeek() {
      this.$Progress.start();
      try {
        await this.addProgramWeek(this.getActiveProgram.id);
        this.$Progress.finish();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
