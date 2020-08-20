<template>
  <div class="flex">
    <button
      class="flex items-center justify-center flex-1 min-w-0 py-3 text-sm font-semibold text-purple-600 rounded-lg shadow bg-purple-50 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:shadow-outline-purple"
      @click.prevent="show"
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

      <span class="text-xs">Add Exercise</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AddExerciseCard",
  props: {
    muscle_group: {
      type: String
    }
  },
  methods: {
    show() {
      this.$modal.show("modal-add-exercise-to-list", this.muscle_group);
    },
    hide() {
      this.$modal.hide("modal-add-exercise-to-list");
    }
  }
};
</script>

<style lang="scss" scoped></style>
