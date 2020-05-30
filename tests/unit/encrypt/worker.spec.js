import { encrypt } from "../../../src/encrypt/encrypt";
import Worker from "worker-loader!../../../src/encrypt/worker";

jest.mock("../../../src/encrypt/encrypt", () => {
  return {
    encrypt: jest.fn()
  };
});

describe("Worker", () => {
  beforeEach(() => {
    global.postMessage = jest.fn();
    global.console = { log: jest.fn() };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("onmessage", () => {
    new Worker({ data: ["abc", "123"] });
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(
      "Worker: Message received from main script"
    );
    expect(encrypt).toHaveBeenCalledWith("abc", "123");
  });
});
