// Libraries
import Vuetify from "vuetify";

// Utilities
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

import Htpasswd from "../../src/components/Htpasswd";
import { shallowMount } from "@vue/test-utils";

import worker from "../../src/encrypt/worker";

jest.mock("../../src/encrypt/worker", () => {
  return {
    postMessage: jest.fn(),
    onmessage: jest.fn()
  };
});

describe("Htpasswd", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Htpasswd, {
      localVue,
      vuetify
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has name 'Htpasswd'", () => {
    expect(Htpasswd.name).toBe("Htpasswd");
  });
  it("renders as expected", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("resets inputs when calling reset()", () => {
    wrapper.setData({ password: "abc" });
    expect(wrapper.vm.password).toBe("abc");
    wrapper.vm.reset();
    expect(wrapper.vm.password).toBe("");
  });
  it("sends message to generate password to web worker", () => {
    const username = "abc";
    const password = "abc";
    const defaultSaltLength = 10;
    wrapper.setData({
      username: username,
      password: password,
      valid: true
    });
    const button = wrapper.find("#generate-password");
    button.trigger("click");
    expect(wrapper.vm.calculating).toBe(true);
    expect(worker.postMessage).toHaveBeenCalledWith([
      password,
      defaultSaltLength
    ]);
  });
});
