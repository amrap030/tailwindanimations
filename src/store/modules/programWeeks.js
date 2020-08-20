import * as firebase from "firebase/app";
import "firebase/auth";
import { apolloClient } from "../../apollo-client";
import { mapGetters } from "vuex";
import Vue from "vue";
//import { apolloProvider } from "../../vue-apollo3";
//import { apolloProvider } from "../../vue-apollo3";

export default {
  namespaced: true,
  state: {
    programWeeks: [],
    activeProgramWeek: {},
  },
  computed: {
    ...mapGetters({
      getLastProgram: "programs/getLastProgram",
      getActiveProgram: "programs/getActiveProgram",
    }),
  },
  mutations: {
    SET_PROGRAMWEEKS(state, data) {
      state.programWeeks = data;
    },
    ADD_BLANK_PROGRAMWEEK(state, data) {
      state.programWeeks.push(data);
    },
    ADD_BLANK_PROGRAMWEEK_DB(state, data) {
      console.log(data);
      Vue.set(
        state.programWeeks.find((programweek) => programweek.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programWeeks.find((programweek) => programweek.id === data.oldId),
        "id",
        data.id
      );
    },
    SET_ACTIVE_PROGRAMWEEK(state, data) {
      if (data === null) {
        state.activeProgramWeek = null;
      } else {
        state.activeProgramWeek = state.programWeeks.find((programweek) => {
          return programweek.id === data;
        });
      }
    },
    DELETE_PROGRAMWEEK(state, data) {
      state.programWeeks.splice(
        state.programWeeks.findIndex((programweek) => programweek.id === data),
        1
      );
    },
    DUPLICATE_PROGRAMWEEKS(state, data) {
      state.programWeeks.push(data);
    },
    DUPLICATE_PROGRAMWEEKS_DB(state, data) {
      Vue.set(
        state.programWeeks.find((programweek) => programweek.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programWeeks.find((programweek) => programweek.id === data.oldId),
        "id",
        data.id
      );
    },
  },
  actions: {
    async initializeProgramWeeks({ commit }, data) {
      if (data) {
        commit(
          "SET_PROGRAMWEEKS",
          data.data.ProgramWeek.map((programweek) => ({
            id: programweek.id,
            startDate: programweek.startDate,
            endDate: programweek.endDate,
            status: programweek.status,
            finished: programweek.finished,
            name: programweek.name,
            createdAt: programweek.createdAt,
            updatedAt: programweek.updatedAt,
            programId: programweek.programId,
          }))
        );
      } else {
        commit("SET_PROGRAMWEEKS", []);
      }
    },
    async addBlankProgramWeek({ commit }, data) {
      if (data) {
        const length =
          this.state.programweeks.programWeeks.filter(
            (programweek) => programweek.programId === data
          ).length + 1;
        const programweek = {
          name: `Week ${length}`,
          programId: data,
          startDate: "2020-06-01",
          endDate: "2020-06-07",
          status: "Intro Week",
          finished: false,
          id: Math.round(Math.random() * -1000000),
        };
        commit("ADD_BLANK_PROGRAMWEEK", programweek);
        commit("SET_ACTIVE_PROGRAMWEEK", programweek.id);
        // await apolloClient
        //   .mutate({
        //     mutation: require("../../graphql/addProgramWeek.gql"),
        //     variables: {
        //       user_id: firebase.auth().currentUser.uid,
        //       startDate: programweek.startDate,
        //       endDate: programweek.endDate,
        //       status: programweek.status,
        //       name: programweek.name,
        //       programId: programweek.programId,
        //     },
        //   })
        //   .then((data) => {
        //     commit("UPDATE_LAST_PROGRAMWEEK", data.data.insert_ProgramWeek_one);
        //     commit(
        //       "SET_ACTIVE_PROGRAMWEEK",
        //       data.data.insert_ProgramWeek_one.id
        //     );
        //   });
      }
    },
    async addBlankProgramWeekDB({ commit }, data) {
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addProgramWeek.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              status: data.status,
              name: data.name,
              programId: data.programId,
            },
          })
          .then((response) => {
            const transfer = {
              oldId: data.id,
              ...response.data.insert_ProgramWeek_one,
            };
            commit("ADD_BLANK_PROGRAMWEEK_DB", transfer);
            commit(
              "SET_ACTIVE_PROGRAMWEEK",
              response.data.insert_ProgramWeek_one.id
            );
          });
      }
    },
    async deleteProgramWeek({ commit }, data) {
      if (data) {
        commit("DELETE_PROGRAMWEEK", data);
        await apolloClient
          .mutate({
            mutation: require("../../graphql/deleteProgramWeek.gql"),
            variables: {
              id: data,
            },
          })
          .then((data) => {
            console.log(data);
          });
      }
    },
    async duplicateProgramWeeks({ commit, state }, data) {
      if (data) {
        console.log(state);
        state.programWeeks
          .filter(
            (programweek) => programweek.programId === data.activeProgramId
          )
          .forEach((element) => {
            //console.log(element);
            const date = new Date();
            const programweek = {
              name: element.name,
              programId: data.id,
              finished: false,
              createdAt: date.toISOString(),
              updatedAt: null,
              endDate: null,
              startDate: null,
              status: element.status,
              id: Math.round(Math.random() * -1000000),
            };
            commit("DUPLICATE_PROGRAMWEEKS", programweek);
          });
      }
    },
    async duplicateProgramWeeksDB({ commit }, data) {
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addProgramWeek.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              status: data.status,
              name: data.name,
              programId: data.programId,
            },
          })
          .then((response) => {
            const transfer = {
              oldId: data.id,
              ...response.data.insert_ProgramWeek_one,
            };
            commit("DUPLICATE_PROGRAMWEEKS_DB", transfer);
          });
      }
    },
  },
  getters: {
    getWeeks(state) {
      return state.programWeeks;
    },
    getLastWeek(state) {
      return state.programWeeks[state.programWeeks.length - 1];
    },
    getActiveProgramWeek(state) {
      return state.activeProgramWeek;
    },
  },
};
