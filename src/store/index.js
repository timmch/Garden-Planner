import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seedOptions: [],
    selectedPlant: null,
    plants: [
      // {
      //   id: 1,
      //   name: "Habaneros",
      //   strategy: "transplant",
      //   // sow_date: "2020-03-14",
      //   plant_date: "2020-03-30",
      //   secondary_name: "Organic Habanero Pepper Seed",
      //   maturity: "80 green; 100 orange ripe"
      // },
      {
        id: 2,
        name: "Dunja",
        strategy: "direct",
        plant_date: "2020-03-28",
        secondary_name: "Organic (F1) Zucchini Squash Seed",
        maturity: "47 Days"
      },
      {
        id: 3,
        name: "Marina",
        secondary_name: "Organic Cilantro/Coriander Seed",
        strategy: "direct",
        plant_date: "2020-03-28",
        maturity: "50-55 to leaf harvest; 90-105 to seed"
      }
    ]
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
  modules: {}
});
