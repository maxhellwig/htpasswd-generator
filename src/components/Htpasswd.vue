<template>
  <div>
    <v-form v-on:submit="generatePassword" ref="form" v-model="valid">
      <v-card-text>
        <v-text-field
          label="Username"
          name="username"
          type="text"
          :rules="[v => !!v || 'Password is required']"
          required
          v-model.trim="username"
        >
        </v-text-field>
        <v-text-field
          label="Password"
          name="password"
          type="password"
          :rules="[v => !!v || 'Email is required']"
          required
          v-model.trim="password"
        >
        </v-text-field>
        <v-select label="Method" v-model="selectedMethod" :items="methods">
        </v-select>
        <v-text-field
          label="Salt length"
          type="number"
          id="salt"
          v-model.number="saltLength"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          id="generate-password"
          color="primary"
          :disabled="!valid"
          @click="generatePassword"
          >Generate</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn @click="reset">Reset form</v-btn>
      </v-card-actions>
      <v-card-text>
        <template v-if="calculating">
          <code class="w-full p-4"
            ><v-progress-circular indeterminate color="primary"
          /></code>
        </template>
        <template v-else>
          <code class="w-full p-4"
            >{{ username }}{{ separator }}{{ result }}</code
          >
        </template>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
import Worker from "worker-loader!../encrypt/worker.js";
import { encrypt } from "../encrypt/encrypt";
let worker;
if (window.Worker) {
  worker = new Worker();
}
const METHODS = { BCRYPT: "bcrypt" };

export default {
  name: "Htpasswd",

  data() {
    return {
      valid: false,
      username: "",
      password: "",
      saltLength: 10,
      result: "",
      calculating: false,
      selectedMethod: METHODS.BCRYPT,
      methods: [METHODS.BCRYPT]
    };
  },
  computed: {
    separator() {
      return this.password !== "" ? ":" : "";
    }
  },
  methods: {
    reset() {
      this.username = "";
      this.password = "";
      this.result = "";
      this.calculating = false;
    },
    generatePassword() {
      if (this.valid) {
        this.calculating = true;
        this.result = "";
        if (window.Worker) {
          worker.postMessage([this.password, this.saltLength]);
        } else {
          encrypt(this.password, this.saltLength);
        }
      }
    }
  },
  mounted() {
    if (window.Worker) {
      worker.onmessage = ({ data }) => {
        this.calculating = false;
        this.result = data;
      };
    }
  }
};
</script>
<style>
.w-full {
  width: 100%;
}
.p-4 {
  padding: 1rem;
}
</style>
