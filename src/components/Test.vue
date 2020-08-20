<template>
  <Listbox
    v-model="selectedProgramId"
    v-slot="{ isOpen }"
    class="relative mr-4"
  >
    <ListboxLabel class="sr-only">
      Select a program:
    </ListboxLabel>
    <ListboxButton v-slot="{ isFocused }" class="bg-white focus:outline-none">
      <span
        :class="
          isFocused || isOpen
            ? 'border-purple-300 shadow-outline-purple'
            : 'outline-none'
        "
        class="inline-flex items-center justify-between w-40 py-2 text-sm font-semibold text-left text-gray-700 whitespace-no-wrap rounded dark:text-gray-200"
      >
        <span v-if="selectedProgramId">{{ selectedProgram.name }}</span>
        <span v-else>Choose Workout ...</span>

        <svg
          class="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </ListboxButton>
    <transition
      leave-active-class="transition duration-300"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ListboxList
        v-show="isOpen"
        class="absolute w-56 mt-1 overflow-y-auto bg-white rounded-md shadow-lg max-h-56 focus:outline-none"
      >
        <ListboxOption
          v-for="program in programs"
          :key="program.id"
          :value="program.id"
          v-slot="{ isActive, isSelected }"
          class="cursor-pointer select-none"
          v-ripple
        >
          <div
            class="relative px-3 py-2"
            :class="
              isActive ? 'bg-purple-700 text-white' : 'bg-white text-gray-900'
            "
          >
            {{ program.name }}
            <span
              v-show="isSelected"
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <svg
                :class="{ 'text-gray-700': !isActive, 'text-white': isActive }"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </ListboxOption>
      </ListboxList>
    </transition>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxList,
  ListboxOption
} from "@tailwindui/vue";
import { mapGetters } from "vuex";

export default {
  name: "Test",
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxList,
    ListboxOption
  },
  data() {
    return {
      selectedProgramId: "",
      programs: [{ name: "Blank Template", id: 12345 }]
    };
  },
  computed: {
    selectedProgram() {
      return this.programs.find(
        program => this.selectedProgramId === program.id
      );
    },
    ...mapGetters({
      getPrograms: "programs/getPrograms"
    })
  },
  created() {
    this.getPrograms.forEach(element => {
      this.programs.push(element);
    });
  }
};
</script>
