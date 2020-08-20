<template>
  <div
    class="mt-3 ml-6 text-gray-700 bg-white rounded-lg shadow dark:text-gray-200 dark:bg-gray-800"
  >
    <div
      class="w-full px-4 py-3 rounded-lg cursor-pointer focus:outline-none focus:shadow-outline-purple focus:bg-purple-700 focus:text-white hover:bg-purple-700 hover:text-white"
      v-ripple
      role="button"
      tabindex="0"
      @click.prevent="setActiveWeek(item)"
      :class="
        item.id === getActiveProgramWeek.id
          ? 'bg-purple-700 text-white focus:outline-none focus:shadow-outline-purple focus:bg-purple-700'
          : ''
      "
    >
      <div>
        <div class="flex items-center justify-between text-sm font-semibold">
          <div class="flex flex-col">
            <span class="text-xs text-left">{{ item.name }}</span>
            <span
              class="inline-flex px-2 mt-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-md"
            >
              {{ item.status }}
            </span>
          </div>
          <div>
            <div class="relative inline-block">
              <div class="flex ml-2">
                <button
                  @click.stop.prevent="toggleDropdown"
                  @keydown.esc.exact="isOpen = false"
                  class="focus:outline-none"
                  v-on-clickaway="hideDropdown"
                >
                  <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
                    <path
                      d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out transform"
                enter-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in transform"
                leave-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="isOpen"
                  class="absolute right-0 z-50 w-56 mt-2 origin-bottom-right rounded-md shadow-lg"
                >
                  <div class="bg-white rounded-md shadow-xs">
                    <div class="py-1">
                      <button
                        type="button"
                        class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        @click.stop.prevent="show(item)"
                        v-on-clickaway="hideDropdown"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        v-on-clickaway="hideDropdown"
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        class="block w-full px-4 py-2 text-sm font-medium leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        v-ripple
                        @click.stop.prevent="remove(item)"
                        v-on-clickaway="hideDropdown"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { mapGetters } from "vuex";
//import ModalEditWeek from "./ModalEditWeek.vue";

export default {
  name: "WeekCard",
  mixins: [clickaway],
  components: {
    //ModalEditWeek,
  },
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      lightMode: true,
      darkMode: false,
    };
  },
  computed: {
    ...mapGetters({
      getActiveProgramWeek: "programweeks/getActiveProgramWeek",
    }),
  },
  methods: {
    setActiveWeek(programweek) {
      console.log(programweek.id);
      this.$store.commit("programweeks/SET_ACTIVE_PROGRAMWEEK", programweek.id);
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    hideDropdown() {
      this.isOpen = false;
    },
    show(item) {
      this.$modal.show("modal-edit-week", item);
    },
    remove(item) {
      this.$modal.show("modal-delete-week", item);
    },
    hide() {
      this.$modal.hide("modal-edit-week");
    },
  },
};
</script>

<style lang="scss" scoped></style>
