<template>
  <div>
    <input
      type="text"
      placeholder="Search for a plant"
      v-model="plantSearchTerm"
    />
    <ol>
      <li
        v-for="(result, index) in results"
        :key="index"
        @click="selectPlant(result)"
      >
        <seed-item :seed="result" />
      </li>
    </ol>
  </div>
</template>

<script>
import SeedItem from "@/components/SeedItem.vue";
export default {
  created() {
    console.log("created");
    this.loadSeeds();
  },
  data() {
    return {
      plantSearchTerm: null,
      plant: null
    };
  },
  computed: {
    results() {
      if (!this.plantSearchTerm) return null;
      const lowerCaseTerm = this.plantSearchTerm.toLowerCase();
      var seedsState = this.$store.state.seedOptions;
      let clonedSeeds = [...seedsState];
      let filteredSeeds = [];
      if (lowerCaseTerm) {
        filteredSeeds = clonedSeeds.filter(
          seed =>
            seed.name.toLowerCase().includes(lowerCaseTerm) ||
            seed.secondary_name.toLowerCase().includes(lowerCaseTerm)
        );
      }
      return filteredSeeds.slice(0, 10);
    }
  },
  methods: {
    selectPlant(plant) {
      this.$store.commit("setSelectedPlant", plant);
    },
    loadSeeds() {
      this.$store.dispatch("fetchSeeds").then(() => {
        console.log("seeds loaded");
      });
    }
  },
  components: {
    SeedItem
  }
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 6px 12px;
  box-sizing: border-box;
  font-size: 16px;
}
ol {
  padding: 0px;
  list-style: none;
  margin-top: 2px;
}
</style>
