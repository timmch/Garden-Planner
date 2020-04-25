import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

Vue.config.productionTip = false;

Vue.filter("timeFromNow", function(value, secondDate) {
  if (!value) return "";
  if (secondDate) {
    return "in " + value.fromNow(true) + " to " + secondDate.fromNow(true);
  }
  return value.fromNow();
});

Vue.filter("formattedDate", function(value, secondDate) {
  let momentFormat = "MMMM Do";
  if (!value) return "";
  if (value > moment().add(364, "days")) {
    momentFormat = "MMMM Do, YYY";
  }
  if (secondDate) {
    return value.format(momentFormat) + " - " + secondDate.format(momentFormat);
  }
  return value.format(momentFormat);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
