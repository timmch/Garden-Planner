import Vue from "vue";
import Counter from "../../src/components/Counter.vue";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

describe("Counter.vue", () => {
  it("increments count when button is clicked", async () => {
    const wrapper = shallowMount(Counter);
    wrapper.find("button").trigger("click");
    await Vue.nextTick();
    expect(wrapper.find("div span").text()).to.equal("1");
  });
});
