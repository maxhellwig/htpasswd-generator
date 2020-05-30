import bcrypt from "bcryptjs";
import { encrypt } from "../../../src/encrypt/encrypt";

jest.mock("bcryptjs", () => {
  return {
    hashSync: jest.fn(() => "mockedResult"),
    genSaltSync: jest.fn(() => "salt")
  };
});

describe("encrypt", () => {
  beforeEach(() => {
    global.postMessage = jest.fn();
    global.console = { log: jest.fn() };
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("uses bcrypt to generate salt, hash password and post message", () => {
    const saltLength = "a";
    const password = "b";
    encrypt(password, saltLength);
    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(saltLength);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, "salt");
    expect(global.postMessage).toHaveBeenCalledWith("mockedResult");
  });
});
