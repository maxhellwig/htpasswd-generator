<template>
  <div>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          name="username"
          type="text"
          v-model.trim="username"
        >
        </v-text-field>
        <v-text-field
          label="Password"
          name="password"
          type="password"
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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="generatePassword">Generate</v-btn>
    </v-card-actions>
    <v-card-text>
      <code class="w-full p-4">{{ username }}{{ separator }}{{ result }}</code>
    </v-card-text>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import debounce from "lodash.debounce";

const METHODS = { BCRYPT: "bcrypt" };
export default {
  name: "Htpasswrd",
  data() {
    return {
      username: "",
      password: "",
      saltLength: 10,
      result: "",
      debounceTimer: 500,
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
    generatePassword() {
      const self = this;
      if (self.password !== "") {
        if (this.selectedMethod === METHODS.BCRYPT) {
          this.debouncedBcrypt();
        }
      } else {
        self.result = "";
      }
    },
    setBcryptHash() {
      const self = this;
      self.calculating = true;
      bcrypt.genSalt(self.saltLength, (err, salt) => {
        if (!err) {
          bcrypt.hash(self.password, salt, (err, hash) => {
            if (!err) {
              self.result = `${hash}`;
              self.calculating = false;
            }
          });
        }
      });
    }
  },
  created() {
    this.debouncedBcrypt = debounce(this.setBcryptHash, this.debounceTimer);
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
