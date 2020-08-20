import * as firebase from "firebase/app";
import "firebase/auth";
import { apolloClient } from "../../apollo-client";
//import { createProvider } from "../../vue-apollo";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    programs: [],
    activeProgram: {},
  },
  mutations: {
    SET_PROGRAMS(state, data) {
      state.programs = data;
    },
    ADD_BLANK_PROGRAM(state, data) {
      state.programs.push(data);
    },
    SET_ACTIVE_PROGRAM(state, data) {
      state.activeProgram = data;
    },
    // UPDATE_LAST_PROGRAM(state, data) {
    //   Vue.set(
    //     state.programs[state.programs.length - 1],
    //     "createdAt",
    //     data.createdAt
    //   );
    //   Vue.set(
    //     state.programs[state.programs.length - 1],
    //     "updatedAt",
    //     data.updatedAt
    //   );
    //   Vue.set(state.programs[state.programs.length - 1], "id", data.id);
    // },
    UPDATE_PROGRAM(state, data) {
      Vue.set(
        state.programs.find((program) => program.id === data.id),
        "name",
        data.name
      );
    },
    DUPLICATE_PROGRAM(state, data) {
      state.programs.push(data);
    },
    DUPLICATE_PROGRAM_DB(state, data) {
      Vue.set(
        state.programs.find((program) => program.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programs.find((program) => program.id === data.oldId),
        "id",
        data.id
      );
    },
  },
  actions: {
    async initializePrograms({ commit }, data) {
      if (data) {
        commit(
          "SET_PROGRAMS",
          data.data.Program.map((program) => ({
            id: program.id,
            name: program.name,
            startDate: program.startDate,
            endDate: program.endDate,
            finished: program.finished,
            createdAt: program.createdAt,
            updatedAt: program.updatedAt,
          }))
        );
      } else {
        commit("SET_PROGRAMS", []);
      }
    },
    async addBlankProgram({ commit }, data) {
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addProgram.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              name: data.name,
              startDate: data.startDate,
              endDate: data.endDate,
            },
          })
          .then(
            (data) => {
              commit("ADD_BLANK_PROGRAM", data.data.insert_Program_one);
              commit("SET_ACTIVE_PROGRAM", data.data.insert_Program_one); // Success!
            },
            (error) => {
              console.log(error); // Error!
            }
          );
      }
    },
    async updateProgram({ commit }, data) {
      if (data) {
        commit("UPDATE_PROGRAM", data);
        await apolloClient.mutate({
          mutation: require("../../graphql/updateProgramName.gql"),
          variables: {
            id: data.id,
            name: data.name,
          },
        });
      }
    },
    async duplicateProgram({ commit }, data) {
      if (data) {
        const date = new Date();
        const program = {
          id: Math.round(Math.random() * -1000000),
          name: `${data.name} copy`,
          startDate: null,
          endDate: null,
          finished: false,
          createdAt: date.toISOString(),
          updatedAt: null,
        };
        commit("DUPLICATE_PROGRAM", program);
      }
    },
    async duplicateProgramDB({ commit }, data) {
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/duplicateProgram.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              name: data.name,
            },
          })
          .then((response) => {
            const transfer = {
              oldId: data.id,
              ...response.data.insert_Program_one,
            };
            commit("DUPLICATE_PROGRAM_DB", transfer);
          });
      }
    },
  },
  getters: {
    getPrograms(state) {
      return state.programs;
    },
    getProgramById(state, program_id) {
      return state.programs.find((program) => {
        program.id === program_id;
      });
    },
    getLastProgram(state) {
      return state.programs[state.programs.length - 1];
    },
    getActiveProgram(state) {
      return state.activeProgram;
    },
  },
};
