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
    plants: [],
    ricks: [
      {
        name: "Seminole Sweet XR",
        maturity: "80 Days",
        secondary_name: "(F1) Corn Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe7cf11a8/images/products/vegetables/4104_01_seminolesweet.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196",
        link:
          "https://www.johnnyseeds.com/vegetables/corn/seminole-sweet-xr-f1-corn-seed-4104.html?cgid=corn",
        text: "Seminole Sweet XR(F1) Corn Seed",
        plant_date: "2020-03-21"
      },
      {
        name: "Crimson Sweet",
        maturity: "85 Days",
        secondary_name: "Watermelon Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwed29c2b1/images/products/fruit/02133_01_crimson_sweet.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196",
        link:
          "https://www.johnnyseeds.com/vegetables/watermelons/crimson-sweet-watermelon-seed-2133.html?cgid=watermelons",
        text: "Crimson SweetWatermelon Seed",
        plant_date: "2020-03-24"
      },
      {
        name: "Fortex",
        maturity: "60 Days",
        secondary_name: "Bean Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw19011217/images/products/vegetables/00034_01_fortex.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196",
        link:
          "https://www.johnnyseeds.com/vegetables/beans/fortex-bean-seed-34.html?cgid=beans",
        text: "FortexBean Seed",
        plant_date: "2020-03-29"
      },
      {
        name: "General Lee",
        maturity: "52 Days",
        secondary_name: "Treated (F1) Cucumber Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw131bb59d/images/products/vegetables/02417_02_generallee.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196",
        link:
          "https://www.johnnyseeds.com/vegetables/cucumbers/general-lee-treated-f1-cucumber-seed-4536T.html?cgid=cucumbers",
        text: "General LeeTreated (F1) Cucumber Seed",
        plant_date: "2020-03-30"
      },
      {
        name: "Jedi",
        maturity: "72 green; 82 red ripe",
        secondary_name: "(F1) Jalapeño Pepper Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw65491875/images/products/vegetables/03528_01_jedi.jpg?sw=387&cx=398&cy=106&cw=1000&ch=1000",
        link:
          "https://www.johnnyseeds.com/vegetables/peppers/jedi-f1-jalapeno-pepper-seed-3528.html?cgid=peppers",
        text: "Jedi(F1) Jalapeño Pepper Seed",
        plant_date: "2020-03-30"
      },
      {
        name: "Habanero",
        maturity: "80 green; 100 orange ripe",
        secondary_name: "Organic Habanero Pepper Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwda07cecd/images/products/vegetables/0598g_01_habanero.jpg?sw=387&cx=346&cy=58&cw=1138&ch=1138",
        link:
          "https://www.johnnyseeds.com/vegetables/peppers/habanero-organic-habanero-pepper-seed-598G.html?cgid=peppers",
        text: "HabaneroOrganic Habanero Pepper Seed",
        plant_date: "2020-03-30"
      },
      {
        name: "Sugar Baby",
        maturity: "76 Days",
        secondary_name: "Watermelon Seed",
        description: null,
        image:
          "https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe79f9915/images/products/fruit/00476_01_sugar_baby.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196",
        link:
          "https://www.johnnyseeds.com/vegetables/watermelons/sugar-baby-watermelon-seed-476.html?cgid=watermelons",
        text: "Sugar BabyWatermelon Seed",
        plant_date: "2020-04-02"
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
    },
    removePlant(state, index) {
      state.plants.splice(index, 1);
    },
    setPlants(state, plants) {
      state.plants = plants;
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
