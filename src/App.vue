<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-icon>mdi-sprout</v-icon>
        <h1>Garden Planner</h1>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content fluid>
      <!-- <HelloWorld /> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  created() {
    this.$vuetify.theme.dark = false;
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss" scoped>
h1 {
  margin-left: 10px;
  color: white;
}
.v-toolbar__content .v-icon {
  color: white;
}
</style>
