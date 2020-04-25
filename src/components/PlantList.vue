<template>
  <div>
    <router-link :to="{ name: 'AddPlant' }" class="btn"
      >+ Add a plant</router-link
    >
    <plant-item v-for="plant in plants" :key="plant.id" :plant="plant" />
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

<style lang="scss" scoped>
.btn {
  background: white;
  border: 1px solid #999;
  display: inline-block;
  color: #333;
  border-radius: 3px;
  font-size: 14px;
  text-decoration: none;
  padding: 6px 12px;
  margin-bottom: 15px;
}
</style>
