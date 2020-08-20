import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import Ripple from "vue-material-design-ripple";
import "vue-material-design-ripple/dist/vue-material-design-ripple.css";
import vuescroll from "vuescroll";
import firebase from "firebase/app";
import { apolloClient } from "./apollo-client";
import VueProgressBar from "vue-progressbar";
import VTooltip from "v-tooltip";
import VModal from "vue-js-modal";
import "./registerServiceWorker";
import * as TastyBurgerButton from "vue-tasty-burgers";
import IdleVue from "idle-vue";
import CountryFlag from "vue-country-flag";

Vue.component("country-flag", CountryFlag);

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 3600000,
  startAtIdle: false,
});

Vue.use(TastyBurgerButton);

//Vue.use(VueApollo);

Vue.use(VModal);

Vue.use(VTooltip);

const options = {
  color: "#6D28D3",
  failedColor: "#874b4b",
  thickness: "3px",
  autoRevert: true,
  location: "top",
  inverse: false,
};

Vue.use(VueProgressBar, options);

Vue.use(Vuelidate);

Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: "myScroll", // customize component name, default -> vueScroll
});

Vue.directive("ripple", Ripple);
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  },
});
Vue.config.productionTip = false;

// Vue.use(VueProgressBar, {
//   color: "rgb(143, 255, 199)",
//   failedColor: "red",
//   height: "2px",
// });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAczlxGniw6iUEavp1cOQU718DCurWFhw",
  authDomain: "workoutapp-ed641.firebaseapp.com",
  databaseURL: "https://workoutapp-ed641.firebaseio.com",
  projectId: "workoutapp-ed641",
  storageBucket: "workoutapp-ed641.appspot.com",
  messagingSenderId: "1068612630628",
  appId: "1:1068612630628:web:4dd75fec51ab2f58520771",
  measurementId: "G-PF223K6P4C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

//Executes if the auth states of a user changes
firebase.auth().onAuthStateChanged(async (user) => {
  //Create App
  if (!app) {
    app = new Vue({
      router,
      store,
      apolloClient,
      render: (h) => h(App),
    }).$mount("#app");
  }
  //Set user in Store
  store.dispatch("fetchUser", user);
  if (user) {
    return user
      .getIdToken()
      .then((token) =>
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((result) => {
            if (result.claims["https://hasura.io/jwt/claims"]) {
              return token;
            }
            const endpoint =
              "https://us-central1-workoutapp-ed641.cloudfunctions.net/refreshToken";
            return fetch(`${endpoint}?uid=${user.uid}`).then((res) => {
              if (res.status === 200) {
                return user.getIdToken(true);
              }
              return res.json().then((e) => {
                throw e;
              });
            });
          })
      )
      .then((validToken) => {
        if (typeof localStorage !== "undefined" && validToken) {
          localStorage.setItem("apollo-token", validToken);
        }
      })
      .catch(console.error);
  } else {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("apollo-token");
    }
    try {
      apolloClient.clearStore();
    } catch (e) {
      console.log(
        "%cError on cache reset (logout)",
        "color: orange;",
        e.message
      );
    }
  }
});
