import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      globalHeading: {},
      salesForm: {},
      address: {},
      hours: {}
    },

    mutations: {
      setHeader(state, info) {
        state.globalHeading = info;
      },

      setSalesForm(state, info) {
        state.salesForm = info;
      },

      setAddress(state, info) {
        state.address = info;
      },

      setHours(state, info) {
        state.hours = info;
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
      },

      loadSalesForm({ commit }, context) {
        return this.$storyapi
          .get(`cdn/stories/beerfinder-form`, {
            version: context.version
          })
          .then(res => {
            commit("setSalesForm", res.data.story.content);
          });
      },

      loadAddress({ commit }) {
        return this.$storyapi
          .get(`cdn/stories/ni-address`, {
            version: "published"
          })
          .then(res => {
            commit("setAddress", res.data.story.content);
          });
      },

      loadHours({ commit }) {
        return this.$storyapi
          .get(`cdn/stories/ni-hours`, {
            version: "published"
          })
          .then(res => {
            commit("setHours", res.data.story.content);
          });
      }
    }
  });
};

export default createStore;
