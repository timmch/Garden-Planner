<template>
  <v-col>
    <router-link :to="{ name: 'Home' }">Back to Homepage</router-link>
    <h1>Add a plant</h1>
    <plant-search />
    <div v-if="selectedPlant">
      <h4 ref="datepickerLabel">
        On what date did this seed go in the&nbsp;ground?
      </h4>
      <div ref="datepickerHolder">
        <v-date-picker
          color="primary"
          v-model="plantDate"
          :show-current="true"
          :fullWidth="true"
        />
      </div>
      <v-btn
        large
        :fullWidth="true"
        color="primary"
        @click="addPlant"
        v-if="plantDate"
        >Submit</v-btn
      >
    </div>
  </v-col>
</template>

<script>
import PlantSearch from "@/components/PlantSearch.vue";
export default {
  data() {
    return {
      plantDate: null
    };
  },
  computed: {
    selectedPlant() {
      console.log("here aaa");
      const plant = this.$store.state.selectedPlant;
      if (plant) {
        console.log("focus");
        this.focusInput();
      }
      return plant;
    }
  },
  methods: {
    addPlant() {
      const plant = this.selectedPlant;
      plant.plant_date = this.plantDate;
      this.$store.commit("addPlant", plant);
      this.$store.commit("setSelectedPlant", null);
      this.$router.push({
        name: "Home"
      });
    },
    focusInput() {
      if (this.$refs.datepickerHolder) {
        console.log("focus 2");
        this.$refs.datepickerHolder.$el.focus();
      }
    }
  },
  components: {
    PlantSearch
  }
};
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 5px;
}
button {
  margin-top: 20px;
  width: 100%;
}
</style>
