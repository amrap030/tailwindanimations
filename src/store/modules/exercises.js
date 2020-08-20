import Vue from "vue";
import { apolloClient } from "../../apollo-client";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  namespaced: true,
  state: {
    exercises: [],
  },
  mutations: {
    SET_EXERCISES(state, data) {
      state.exercises = data;
    },
    UPDATE_EXERCISE(state, data) {
      state.exercises = [
        ...state.exercises.filter((element) => element.id !== data.id),
        data,
      ];
    },
    ADD_EXERCISE_TO_LIST(state, data) {
      state.exercises.push(data);
    },
    ADD_EXERCISE_TO_LIST_DB(state, data) {
      console.log(data);
      Vue.set(
        state.exercises.find((exercise) => exercise.id === data.oldId),
        "createdAt",
        data.createdAt
      );
      Vue.set(
        state.exercises.find((exercise) => exercise.id === data.oldId),
        "id",
        data.id
      );
    },
    UPDATE_EXERCISE_LIKE(state, data) {
      Vue.set(
        state.exercises.find((exercise) => exercise.id === data.id),
        "like",
        data.like
      );
    },
    UPDATE_EXERCISE_LIKE_DB(state, data) {
      console.log(data);
      // ERROR HANDLING FALLS WAS FALSCHES VOM SERVER ZURÜCK KOMMT
      //   if (
      //     state.exercises.find((exercise) => exercise.id === data.id).like !==
      //     data.like
      //   ) {
      //     Vue.set(
      //       state.exercises.find((exercise) => exercise.id === data.id),
      //       "like",
      //       data.like
      //     );
      //   }
    },
    UPDATE_EXERCISE_NAME(state, data) {
      Vue.set(
        state.exercises.find((exercise) => exercise.id === data.id),
        "name",
        data.name
      );
    },
    DELETE_EXERCISE(state, data) {
      const index = state.exercises.indexOf(
        state.exercises.find((exercise) => exercise.id === data.id)
      );
      if (index > -1) {
        state.exercises.splice(index, 1);
      }
    },
  },
  actions: {
    async initializeExercises({ commit }, data) {
      if (data) {
        commit(
          "SET_EXERCISES",
          data.data.Exercise.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            createdAt: exercise.createdAt,
            updatedAt: exercise.updatedAt,
            muscle_id: exercise.muscle_id,
            like: exercise.like,
          }))
        );
      } else {
        commit("SET_EXERCISES", []);
      }
    },
    async updateExercise({ commit }, data) {
      if (data) {
        commit("UPDATE_EXERCISE", data);
      }
    },
    async addExerciseToList({ commit }, data) {
      if (data) {
        const exercise = {
          name: data.name,
          muscle_id: data.muscle_id,
          createdAt: null,
          updatedAt: null,
          userId: firebase.auth().currentUser.uid,
          like: false,
          id: Math.round(Math.random() * -1000000),
        };
        commit("ADD_EXERCISE_TO_LIST", exercise);
      }
    },
    async addExerciseToListDB({ commit }, data) {
      console.log(data);
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/addExerciseToList.gql"),
            variables: {
              user_id: firebase.auth().currentUser.uid,
              muscle_id: data.muscle_id,
              name: data.name,
            },
          })
          .then((response) => {
            const transfer = {
              oldId: data.id,
              ...response.data.insert_Exercise_one,
            };
            commit("ADD_EXERCISE_TO_LIST_DB", transfer);
          });
      }
    },
    async updateExerciseLike({ commit }, data) {
      if (data) {
        commit("UPDATE_EXERCISE_LIKE", data);
      }
    },
    async updateExerciseLikeDB({ commit }, data) {
      console.log(data);
      if (data) {
        await apolloClient
          .mutate({
            mutation: require("../../graphql/updateExerciseLike.gql"),
            variables: {
              id: data.id,
              like: data.like,
            },
          })
          .then((data) => {
            commit("UPDATE_EXERCISE_LIKE_DB", data.data);
          });
      }
    },
    async updateExerciseName({ commit }, data) {
      console.log(data);
      if (data) {
        commit("UPDATE_EXERCISE_NAME", data);
        await apolloClient.mutate({
          mutation: require("../../graphql/updateExerciseName.gql"),
          variables: {
            id: data.id,
            name: data.name,
          },
        });
      }
    },
    async deleteExercise({ commit }, data) {
      if (data) {
        commit("DELETE_EXERCISE", data);
        await apolloClient.mutate({
          mutation: require("../../graphql/deleteExercise.gql"),
          variables: {
            id: data.id,
          },
        });
      }
    },
  },
  getters: {
    getExercises(state) {
      return state.exercises;
    },
  },
};
