<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Htpasswd generator</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                This app uses
                <a href="https://github.com/dcodeIO/bcrypt.js#readme"
                  >bcrypt.js@2.4.3</a
                >
                and a
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
                  >web worker</a
                >
                to generated Copy&Paste ready htaccess entries without blocking
                your UI.
                <p>
                  Your private data are <strong>not</strong> leaving your
                  computer.
                </p>
              </v-card-text>
              <Htpasswd />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer height="48" color="secondary" padless>
      <v-row justify="center" no-gutters>
        Made by <a href="https://maxhellwig.de">Max Hellwig</a>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Htpasswd from "./components/Htpasswd";
export default {
  name: "App",

  components: {
    Htpasswd
  }
};
</script>
