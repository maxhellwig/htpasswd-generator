import bcrypt from "bcryptjs";

export function encrypt(password, saltLength) {
  const salt = bcrypt.genSaltSync(saltLength);
  let result = "";
  if (salt) {
    result = bcrypt.hashSync(password, salt);
  }
  global.postMessage(result);
}
