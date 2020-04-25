<template>
  <v-col>
    <h1>Add a plant</h1>
    <plant-search />
    <div v-if="selectedPlant">
      <h4>On what date did this seed go in the&nbsp;ground?</h4>
      <v-date-picker
        color="primary"
        v-model="plantDate"
        :show-current="true"
        :fullWidth="true"
      />
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
      return this.$store.state.selectedPlant;
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
