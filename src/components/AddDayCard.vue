<template>
  <div class="flex justify-center">
    <button
      class="flex items-center justify-center flex-1 py-3 -mt-3 text-sm font-semibold text-gray-500 bg-gray-200 border border-dashed rounded-lg hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:shadow-outline-purple"
      @click="addBlank"
      v-ripple
      :class="filterActiveDays.length >= 7 ? 'cursor-not-allowed' : ''"
      :disabled="filterActiveDays.length >= 7"
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

      <span class="text-xs">Add Day</span>
    </button>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
//import { createProvider } from "../vue-apollo";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddDayCard",
  props: {
    programdays: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters({
      getLastProgram: "programs/getLastProgram",
      getProgramById: "programs/getProgramById",
      getPrograms: "programs/getPrograms",
      getActiveProgram: "programs/getActiveProgram",
      getActiveProgramWeek: "programweeks/getActiveProgramWeek",
    }),
    filterActiveDays() {
      if (this.getActiveProgramWeek) {
        return this.programdays.filter((programday) => {
          return programday.weekId === this.getActiveProgramWeek.id;
        });
      }
      return [];
    },
  },
  methods: {
    ...mapActions({
      addBlankProgramDay: "programdays/addBlankProgramDay",
    }),
    addBlank() {
      this.addBlankProgramDay(this.getActiveProgramWeek.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
