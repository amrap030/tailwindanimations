//import { createProvider } from "../../vue-apollo";
import * as firebase from "firebase/app";
import "firebase/auth";
import Vue from "vue";
import { apolloClient } from "../../apollo-client";

export default {
  namespaced: true,
  state: {
    programDays: [],
  },
  mutations: {
    SET_PROGRAMDAYS(state, data) {
      state.programDays = data;
    },
    ADD_BLANK_PROGRAMDAY(state, data) {
      state.programDays.push(data);
    },
    ADD_BLANK_PROGRAMDAY_DB(state, data) {
      Vue.set(
        state.programDays.find((programday) => programday.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programDays.find((programday) => programday.id === data.oldId),
        "id",
        data.id
      );
    },
    ADD_PROGRAM_DAY(state, data) {
      const programday = {
        id: data.id,
        name: data.name,
        notes: data.notes,
        exercises: data.exercises,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        weekId: data.weekId,
      };
      state.programDays.push(programday);
    },
    UPDATE_LAST_PROGRAMDAY(state, data) {
      Vue.set(state.programDays[state.programDays.length - 1], "id", data.id);
      Vue.set(
        state.programDays[state.programDays.length - 1],
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programDays[state.programDays.length - 1],
        "updatedAt",
        data.updatedAt
      );
    },
    DELETE_PROGRAMDAYS_BY_WEEK_ID(state, data) {
      state.programDays = state.programDays.filter(
        (programday) => programday.weekId !== data
      );
    },
    UPDATE_EXERCISES_IN_PROGRAMDAY(state, data) {
      //console.log(data);
      Vue.set(
        state.programDays.find((programday) => programday.id === data.id),
        "exercises",
        data.exercises
      );
      //console.log(
      //state.programDays.find((programday) => programday.id === data.id)
      //);
    },
    DUPLICATE_PROGRAMDAYS(state, data) {
      //console.log(data);
      state.programDays.push(data);
    },
    SET_WEEK_ID(state, data) {
      //console.log(data);
      state.programDays
        .filter((programday) => programday.weekId === data.oldId)
        .forEach((element) => {
          //console.log(element);
          Vue.set(element, "weekId", data.id);
        });
    },
    DUPLICATE_PROGRAMDAYS_DB(state, data) {
      Vue.set(
        state.programDays.find((programday) => programday.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.programDays.find((programday) => programday.id === data.oldId),
        "id",
        data.id
      );
    },
  },
  actions: {
    async initializeProgramDays({ commit }, data) {
      // const queryResult = await createProvider().defaultClient.query({
      //   query: require("../../graphql/getAllProgramDays.gql"),
      //   variables: { user_id: data },
      // });

      if (data) {
        commit(
          "SET_PROGRAMDAYS",
          data.data.ProgramDay.map((programDay) => ({
            id: programDay.id,
            name: programDay.name,
            notes: programDay.notes,
            exercises: programDay.exercises,
            createdAt: Date.parse(programDay.createdAt),
            updatedAt:
              programDay.updatedAt !== null
                ? Date.parse(programDay.updatedAt)
                : programDay.updatedAt,
            weekId: programDay.weekId,
          }))
        );
      } else {
        commit("SET_PROGRAMDAYS", []);
      }
    },
    async addBlankProgramDay({ commit }, data) {
      if (data) {
        const dayCount =
          this.state.programdays.programDays.filter(
            (programday) => programday.weekId === data
          ).length + 1;
        const programday = {
          name: `Day ${dayCount}`,
          notes: "",
          exercises: [],
          weekId: data,
          userId: firebase.auth().currentUser.uid,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          id: Math.round(Math.random() * -1000000),
        };
        commit("ADD_BLANK_PROGRAMDAY", programday);
      }
    },
    async addBlankProgramDayDB({ commit }, data) {
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addBlankProgramDay.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              name: data.name,
              exercises: data.exercises,
              weekId: data.weekId,
            },
          })
          .then((response) => {
            const transfer = {
              oldId: data.id,
              ...response.data.insert_ProgramDay_one,
            };
            commit("ADD_BLANK_PROGRAMDAY_DB", transfer);
          });
      }
    },
    async addProgramDay({ commit }, data) {
      //console.log(queryResult);
      commit("ADD_PROGRAM_DAY", data);
    },
    async deleteProgramdaysByWeekId({ commit }, data) {
      if (data) {
        commit("DELETE_PROGRAMDAYS_BY_WEEK_ID", data);
        await apolloClient
          .mutate({
            mutation: require("../../graphql/deleteProgramDaysByWeekId.gql"),
            variables: {
              weekId: data,
            },
          })
          .then((data) => {
            console.log(data);
          });
      }
    },
    async updateExercisesInProgramDay({ commit }, data) {
      //console.log(data);
      if (data) {
        commit("UPDATE_EXERCISES_IN_PROGRAMDAY", data);
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addExerciseToProgramDay.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              exercises: data.exercises,
              id: data.id,
            },
          })
          .then((response) => {
            console.log(response);
          });
      }
    },
    async duplicateProgramDays({ commit, state }, data) {
      //console.log(data);
      if (data) {
        state.programDays
          .filter((programday) => programday.weekId === data.id)
          .forEach((element) => {
            //console.log(element);
            const date = new Date();
            const programday = {
              id: Math.round(Math.random() * -1000000),
              name: element.name,
              notes: element.notes,
              exercises: element.exercises,
              createdAt: date.toISOString(),
              updatedAt: null,
              weekId: data.tempId,
              userId: firebase.auth().currentUser.uid,
            };
            commit("DUPLICATE_PROGRAMDAYS", programday);
          });

        // const date = new Date();
        // const programweek = {
        //   name: element.name,
        //   programId: data.id,
        //   finished: false,
        //   createdAt: date.toISOString(),
        //   updatedAt: null,
        //   endDate: null,
        //   startDate: null,
        //   status: element.status,
        //   id: Math.round(Math.random() * -1000000),
        //   oldWeekId: element.id,
        // };
      }
    },
    async duplicateProgramDaysDB({ commit, state }, data) {
      console.log(data);
      if (data) {
        state.programDays
          .filter((programday) => programday.weekId === data.id)
          .forEach(async (element) => {
            await apolloClient
              .mutate({
                mutation: require("../../graphql/addBlankProgramDay.gql"),
                variables: {
                  user_id: firebase.auth().currentUser.uid,
                  exercises: element.exercises,
                  name: element.name,
                  weekId: element.weekId,
                },
              })
              .then((response) => {
                const transfer = {
                  oldId: element.id,
                  ...response.data.insert_ProgramDay_one,
                };
                commit("DUPLICATE_PROGRAMDAYS_DB", transfer);
              });
          });
      }
    },
    async setWeekId({ commit }, data) {
      if (data) {
        commit("SET_WEEK_ID", data);
      }
    },
  },
  getters: {
    getProgramDays(state) {
      return state.programDays;
    },
  },
};
