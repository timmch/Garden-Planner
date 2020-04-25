<template>
  <v-row align="center" justify="center">
    <v-col>
      <plant-list :plants="plants" />
    </v-col>
  </v-row>
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
