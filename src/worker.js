
import init, {hash_input} from "../bcrypt-wasm/pkg/bcrypt_wasm.js";

export default global.onmessage = function(event) {
    // eslint-disable-next-line no-console
    console.log("Worker: Message received from main script");
    const [password] = event.data;
    if (password) {
        init().then(() => {
           global.postMessage(hash_input(password));
        });
    }
};
