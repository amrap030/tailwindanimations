<template>
  <div class="w-full">
    <div
      class="flex-1 min-w-0 bg-gray-100 dark:bg-gray-700 sm:mb-6 sm:p-8 sm:rounded-lg"
    >
      <div class="flex items-center justify-between hidden sm:block">
        <div class="flex items-center">
          <h2
            class="text-xl font-bold leading-tight text-gray-700 dark:text-gray-100"
          >
            {{ item.name }}
          </h2>
        </div>
      </div>
      <div class="hidden mt-2 text-sm font-medium text-gray-400 sm:block">
        Notizen
      </div>

      <!-- <div class="grid gap-4 grid-switcher sm:mt-8"> -->
      <!-- Exercise in Training Day -->
      <!-- <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard>
        <ProgrammingCard class="w-full"></ProgrammingCard> -->

      <Draggable
        tag="ul"
        class="grid gap-4 grid-switcher sm:mt-8"
        :animation="200"
        v-model="item.exercises"
        ghost-class="moving-card"
        handle=".handle"
        draggable=".js-draggable-file-list-item"
        @change="updateExercises"
      >
        <li
          v-for="(exercise, index) in item.exercises"
          :key="exercise.id"
          :item="exercise"
          :index="index"
          class="handle js-draggable-file-list-item"
        >
          <ProgrammingCard
            class="w-full"
            :key="exercise.id"
            :item="exercise"
            :index="index"
            :day="item"
          ></ProgrammingCard>
        </li>
        <AddProgramExerciseCard :day="item" />
      </Draggable>

      <!-- <ProgrammingCard
          class="w-full"
          v-for="(exercise, index) in item.exercises"
          :key="exercise.id"
          :item="exercise"
          :index="index"
          :day="item"
        ></ProgrammingCard>
        <AddProgramExerciseCard :day="item" />
      </div> -->
    </div>
  </div>
</template>

<script>
import ProgrammingCard from "@/components/ProgrammingCard";
import AddProgramExerciseCard from "@/components/AddProgramExerciseCard";
import Draggable from "vuedraggable";
import { mapActions } from "vuex";
//import gql from "graphql-tag";

export default {
  name: "TrainingDayCard",
  data() {
    return {
      exercises: null,
      programs: null,
      weeks: null,
      days: null,
      drag: false,
      list: ""
    };
  },
  props: {
    item: {
      required: true
    }
  },
  components: {
    ProgrammingCard,
    AddProgramExerciseCard,
    Draggable
  },
  computed: {
    getExercises() {
      return this.$store.getters.getExercises;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    ...mapActions({
      updateExercisesInProgramDay: "programdays/updateExercisesInProgramDay"
    }),
    async updateExercises() {
      try {
        await this.updateExercisesInProgramDay(this.item);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.moving-card {
  @apply opacity-25 bg-gray-100;
}

.grid-switcher {
  @apply grid-cols-6;
}

@media only screen and (max-width: 2080px) {
  .grid-switcher {
    @apply grid-cols-4;
  }
}

@media only screen and (max-width: 1830px) {
  .grid-switcher {
    @apply grid-cols-3;
  }
}

@media only screen and (max-width: 1560px) {
  .grid-switcher {
    @apply grid-cols-2;
  }
}

@media only screen and (max-width: 1110px) {
  .grid-switcher {
    @apply grid-cols-1;
  }
}
</style>
