<template>
  <div>
    <h1>Garden Planner</h1>
    <plant-list :plants="plants" />
  </div>
</template>

<script>
import PlantList from "@/components/PlantList.vue";
export default {
  components: {
    PlantList
  },
  computed: {
    plants() {
      return this.$store.state.plants;
    }
  }
};
</script>

<style lang="scss" scoped></style>
