<template>
  <div class="seed">
    <div>
      <img :src="seed.image" :alt="seed.name" />
    </div>
    <div class="names">
      <h2 class="primary">{{ seed.name }}</h2>
      <h4 class="secondary">{{ seed.secondary_name }}</h4>
    </div>
    <div class="controls" v-if="status == 'selected'">
      <button class="btn" @click="removeSeed">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seed: {
      type: Object,
      default: null
    },
    status: {
      type: String,
      default: "search"
    }
  },
  methods: {
    removeSeed() {
      this.$store.commit("setSelectedPlant", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.seed {
  display: flex;
  align-items: center;
  margin: 0 0 2px;
  border: 2px solid #eee;
  padding: 3px 9px;
  img {
    width: 75px;
  }
  div.names {
    margin: 0 0 0 10px;
    h2 {
      margin: 0px;
    }
    h4 {
      margin: 0px;
    }
  }
  .btn {
    background: white;
    border: 1px solid #999;
    margin-left: 5px;
    color: #333;
    border-radius: 3px;
    font-size: 14px;
  }
}
</style>
