<template>
  <div>
    <v-autocomplete
      v-model="selectedPlant"
      :items="seeds"
      hide-selected
      label="Seeds from Johnnyseeds"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      :autofocus="true"
      return-object
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          <v-avatar left>
            <v-img :src="data.item.image"></v-img>
          </v-avatar>
          <strong style="padding-right: 4px;">{{ data.item.name }}</strong>
        </v-chip>
      </template>

      <template v-slot:item="data">
        <v-list-item-avatar>
          <img :src="data.item.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
          <v-list-item-subtitle
            v-html="data.item.secondary_name"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  created() {
    this.loadSeeds();
  },
  data() {
    return {
      model: null,
      search: null
    };
  },
  computed: {
    selectedPlant: {
      get: function() {
        return this.$store.state.selectedPlant;
      },
      set: function(value) {
        this.$store.commit("setSelectedPlant", value);
      }
    },
    seeds() {
      const options = [...this.$store.state.seedOptions];
      for (let i = 0; i < options.length; i++) {
        options[i].text = options[i].name + options[i].secondary_name;
      }
      return options;
    }
  },
  methods: {
    selectPlant(plant) {
      this.$store.commit("setSelectedPlant", plant);
    },
    loadSeeds() {
      this.$store.dispatch("fetchSeeds").then(() => {});
    },
    remove() {
      this.$store.commit("setSelectedPlant", null);
    }
  },
  components: {}
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
