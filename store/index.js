import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      globalHeading: {}
    },

    mutations: {
      setHeader(state, info) {
        state.globalHeading = info;
      }
    },

    actions: {
      loadHeader({ commit }, context) {
        return this.$storyapi
          .get(`cdn/stories/beer-header`, {
            version: context.version
          })
          .then(res => {
            commit("setHeader", res.data.story.content);
          });
      }
    }
  });
};

export default createStore;
