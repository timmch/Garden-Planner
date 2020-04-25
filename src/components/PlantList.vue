<template>
  <div>
    <v-col cols="12" sm="4">
      <router-link :to="{ name: 'AddPlant' }">
        <v-btn large color="primary">Add a plant</v-btn>
      </router-link>
    </v-col>
    <v-col v-if="!plants || plants.length == 0">
      <h3>No plants found.</h3>
    </v-col>
    <plant-item
      v-for="(plant, index) in plants"
      :key="index"
      :plant="plant"
      :index="index"
    />
  </div>
</template>

<script>
import PlantItem from "@/components/PlantItem.vue";
export default {
  props: {
    plants: {
      type: Array,
      default: null
    }
  },
  components: {
    PlantItem
  }
};
</script>

<style lang="scss" scoped></style>
