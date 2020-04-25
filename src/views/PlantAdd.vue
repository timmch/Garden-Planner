<template>
  <div>
    <h1>Add a plant</h1>
    <form action="" @submit="addPlant">
      <plant-search v-if="!selectedPlant" />
      <div v-if="selectedPlant">
        <h3>Your selected plant</h3>
        <seed-item :seed="selectedPlant" status="selected" />
        <label for="plantDate">
          On what date did this seed go in the ground?
          <input name="plantDate" v-model="plantDate" type="date" />
        </label>
        <input
          name="submit"
          type="submit"
          class="btn btn-submit"
          value="Submit"
          v-if="plantDate"
        />
      </div>
    </form>
  </div>
</template>

<script>
import PlantSearch from "@/components/PlantSearch.vue";
import SeedItem from "@/components/SeedItem.vue";
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
    PlantSearch,
    SeedItem
  }
};
</script>

<style lang="scss" scoped>
label {
  margin-top: 20px;
  display: block;
}
input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 6px 12px;
  box-sizing: border-box;
  font-size: 16px;
}
.btn-submit {
  margin-top: 20px;
}
</style>
