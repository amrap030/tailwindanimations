import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
import programdays from "./modules/programDays";
import programs from "./modules/programs";
import muscles from "./modules/muscles";
import programweeks from "./modules/programWeeks";
import exercises from "./modules/exercises";
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex);

const subscriptions = store => {
  // called when the store is initialize
  store.subscribe(mutation => {
    switch (mutation.type) {
      case "programs/ADD_BLANK_PROGRAM":
        store.dispatch("programweeks/addBlankProgramWeek", mutation.payload.id);
        break;
      case "programweeks/ADD_BLANK_PROGRAMWEEK_DB":
        store.dispatch("programdays/addBlankProgramDay", mutation.payload.id);
        break;
      case "programweeks/DELETE_PROGRAMWEEK":
        store.dispatch(
          "programdays/deleteProgramdaysByWeekId",
          mutation.payload
        );
        break;
      case "exercises/UPDATE_EXERCISE":
        console.log(store.get("exercises/getExercises", null));
        break;
      case "exercises/ADD_EXERCISE_TO_LIST":
        console.log(mutation.payload);
        store.dispatch("exercises/addExerciseToListDB", mutation.payload);
        break;
      case "programdays/ADD_BLANK_PROGRAMDAY":
        console.log(mutation.payload);
        store.dispatch("programdays/addBlankProgramDayDB", mutation.payload);
        break;
      case "programweeks/ADD_BLANK_PROGRAMWEEK":
        console.log(mutation.payload);
        store.dispatch("programweeks/addBlankProgramWeekDB", mutation.payload);
        break;
      case "exercises/UPDATE_EXERCISE_LIKE":
        console.log(mutation.payload);
        store.dispatch("exercises/updateExerciseLikeDB", mutation.payload);
        break;
      case "programs/DUPLICATE_PROGRAM":
        console.log(mutation.payload);
        store.dispatch("programs/duplicateProgramDB", mutation.payload);
        break;
      case "programs/DUPLICATE_PROGRAM_DB":
        console.log(mutation.payload);
        //console.log(store.getters["programs/getActiveProgram"]);
        //console.log(store);
        store.dispatch("programweeks/duplicateProgramWeeks", {
          ...mutation.payload,
          activeProgramId: store.getters["programs/getActiveProgram"].id
        });
        break;
      case "programweeks/DUPLICATE_PROGRAMWEEKS":
        console.log(mutation.payload);
        //console.log(store.getters["programs/getActiveProgram"]);
        //console.log(store);
        store.dispatch(
          "programweeks/duplicateProgramWeeksDB",
          mutation.payload
        );
        break;
    }
  });
};

export default new Vuex.Store({
  modules: { programdays, programs, muscles, programweeks, exercises },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    }),
    createMutationsSharer({
      predicate: [
        "programdays/SET_PROGRAMDAYS",
        "programdays/ADD_PROGRAM_DAY",
        "programdays/ADD_BLANK_PROGRAMDAY"
      ]
    }),
    subscriptions
  ],
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    week: {
      edit: false,
      data: null
    },
    dark: false
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_WEEK_EDIT(state, value) {
      state.week.edit = value;
    },
    SET_WEEK(state, data) {
      state.week.data = data;
    },
    SET_DARK(state, data) {
      state.dark = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    getDark(state) {
      return state.dark;
    }
  }
});
