import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    seedOptions: [],
    selectedPlant: null,
    plants: []
  },
  mutations: {
    setSeedOptions(state, payload) {
      state.seedOptions = payload;
    },
    setSelectedPlant(state, plant) {
      state.selectedPlant = plant;
    },
    addPlant(state, plant) {
      state.plants.push(plant);
    },
    removePlant(state, index) {
      state.plants.splice(index, 1);
    }
  },
  actions: {
    async fetchSeeds({ commit }) {
      try {
        const seedsUrl =
          "https://raw.githubusercontent.com/timmch/johnnyseeds-crawler/master/json-output/detailed-seeds.json";
        const response = await axios.get(seedsUrl);
        commit("setSeedOptions", response.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin]
});
