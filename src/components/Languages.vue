<template>
  <Listbox v-model="selectedLanguage" v-slot="{ isOpen }" class="relative">
    <ListboxLabel class="sr-only">Select a Language:</ListboxLabel>
    <label
      for="choose_language"
      class="block text-sm font-medium leading-5 text-gray-700"
      >Language</label
    >
    <ListboxButton
      v-slot="{ isFocused }"
      class="w-48 mt-1 bg-white focus:outline-none"
      id="choose_language"
    >
      <span
        :class="
          isFocused || isOpen
            ? 'border-purple-300 shadow-outline-purple'
            : 'outline-none'
        "
        class="relative inline-flex items-center justify-between w-48 px-3 py-2 text-sm leading-5 text-left text-gray-400 whitespace-no-wrap border rounded-md"
      >
        <span v-if="selectedLanguage" class="text-gray-900 pl-11">
          <span class="absolute inset-y-0 left-0 flex items-center pr-2">
            <country-flag :country="getCountryIcon" size="normal" />
          </span>
          {{ selectedLanguage.name }}</span
        >
        <span v-else>Choose Language ...</span>

        <svg
          class="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
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
        class="absolute z-50 w-48 mt-1 overflow-y-auto bg-white rounded-md shadow-lg max-h-56 focus:outline-none"
      >
        <ListboxOption
          v-for="language in languages"
          :key="language.name"
          :value="language"
          v-slot="{ isActive, isSelected }"
          class="cursor-pointer select-none"
          v-ripple
        >
          <div
            class="relative px-3 py-2 pl-14"
            :class="
              isActive ? 'bg-purple-700 text-white' : 'bg-white text-gray-900'
            "
          >
            <span class="absolute inset-y-0 left-0 flex items-center pr-2">
              <country-flag :country="language.icon" size="normal" />
            </span>
            {{ language.name }}
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
                />
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

export default {
  name: "Languages",
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxList,
    ListboxOption
  },
  data() {
    return {
      languages: [
        { name: "German", icon: "de" },
        { name: "French", icon: "fr" },
        { name: "English", icon: "gb" }
      ],
      selectedLanguage: ""
    };
  },
  computed: {
    selectedLanguages() {
      return this.languages.find(language => this.languages === language);
    },
    getCountryIcon() {
      return this.languages.find(
        language => this.selectedLanguage.name === language.name
      ).icon;
    }
  }
};
</script>
