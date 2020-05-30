import { encrypt } from "./encrypt";

export default global.onmessage = function(e) {
  // eslint-disable-next-line no-console
  console.log("Worker: Message received from main script");
  const [password, saltLength] = e.data;
  encrypt(password, saltLength);
};
