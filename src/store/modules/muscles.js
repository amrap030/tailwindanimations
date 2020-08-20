export default {
  namespaced: true,
  state: {
    muscles: []
  },
  mutations: {
    SET_MUSCLES(state, data) {
      state.muscles = data;
    }
  },
  actions: {
    async initializeMuscles({ commit }, data) {
      if (data) {
        commit(
          "SET_MUSCLES",
          data.data.Muscle.map(muscle => ({
            id: muscle.id,
            name: muscle.name,
            color: muscle.color,
            createdAt: muscle.createdAt,
            updatedAt: muscle.updatedAt
          }))
        );
      } else {
        commit("SET_MUSCLES", []);
      }
    }
  },
  getters: {
    getMuscles(state) {
      return state.muscles;
    }
  }
};
