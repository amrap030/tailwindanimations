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

Vue.use(Vuex);

const subscriptions = (store) => {
  // called when the store is initialize
  store.subscribe((mutation) => {
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
        store.dispatch("exercises/addExerciseToListDB", mutation.payload);
        break;
      case "programdays/ADD_BLANK_PROGRAMDAY":
        store.dispatch("programdays/addBlankProgramDayDB", mutation.payload);
        break;
      case "programweeks/ADD_BLANK_PROGRAMWEEK":
        store.dispatch("programweeks/addBlankProgramWeekDB", mutation.payload);
        break;
      case "exercises/UPDATE_EXERCISE_LIKE":
        store.dispatch("exercises/updateExerciseLikeDB", mutation.payload);
        break;
      case "programs/DUPLICATE_PROGRAM":
        store.dispatch("programs/duplicateProgramDB", mutation.payload);
        break;
      case "programs/DUPLICATE_PROGRAM_DB":
        store.dispatch("programweeks/duplicateProgramWeeks", {
          ...mutation.payload,
          activeProgramId: store.getters["programs/getActiveProgram"].id,
        });
        break;
      case "programweeks/DUPLICATE_PROGRAMWEEKS":
        store.dispatch(
          "programweeks/duplicateProgramWeeksDB",
          mutation.payload
        );
        break;
      case "programweeks/DUPLICATE_PROGRAMWEEKS_DB":
        store.dispatch("programdays/setWeekId", mutation.payload);
        break;
      case "programdays/SET_WEEK_ID":
        //console.log(mutation.payload);
        store.dispatch("programdays/duplicateProgramDaysDB", mutation.payload);
        break;
    }
  });
};

export default new Vuex.Store({
  modules: { programdays, programs, muscles, programweeks, exercises },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
    subscriptions,
  ],
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    week: {
      edit: false,
      data: null,
    },
    dark: false,
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
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    getDark(state) {
      return state.dark;
    },
  },
});
