<template>
  <div class="flex items-center justify-center min-h-screen bg-purple-700">
    <div class="w-full px-4 py-16 mx-4 bg-gray-100 rounded-lg shadow-2xl sm:max-w-md sm:p-16">
      <div>
        <h1 class="text-3xl font-medium leading-tight text-center text-gray-900">Sign in</h1>
      </div>
      <form class="mt-8" @submit.prevent="signIn">
        <input type="hidden" name="remember" value="true" />
        <div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <input
              aria-label="Email address"
              name="email"
              type="email"
              class="w-full px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 bg-gray-200 border border-transparent rounded-lg appearance-none form__input focus:outline-none focus:shadow-outline-red focus:border-red-700 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="E-mail"
              v-model="email"
            />
          </div>

          <div class="relative mt-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
            <input
              aria-label="Password"
              name="password"
              :type="passwordFieldType"
              class="w-full px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 bg-gray-200 border border-transparent rounded-lg appearance-none focus:outline-none focus:shadow-outline-blue focus:border-purple-700 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Password"
              v-model="password"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
              <button @click.prevent="switchVisibility">
                <svg
                  class="w-5 h-5 text-gray-500"
                  :class="[
                    this.passwordFieldType == 'password' ? 'block' : 'hidden'
                  ]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>

                <svg
                  class="w-5 h-5 text-gray-500"
                  :class="[
                    this.passwordFieldType == 'text' ? 'block' : 'hidden'
                  ]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
            />
            <label for="remember_me" class="block ml-2 text-sm leading-5 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-5">
            <a
              href="#"
              class="font-medium text-purple-700 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
            >Forgot your password?</a>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-700 rounded-lg focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >Sign in</button>
        </div>
      </form>
      <div class="flex items-center justify-center mt-6 text-sm">
        <span>
          Don't have an account?
          <a href class="text-purple-700">Create</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, email, between } from "vuelidate/lib/validators";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password"
    };
  },
  beforeCreate: function() {
    document.body.className = "home";
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async signIn() {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        if (user) this.$router.replace({ name: "Training" });
      } catch (error) {
        console.log(error);
      }
    }
  }
  // validations: {
  //   email: { required, email },
  //   password: { required, between: between(20, 30) },
  // },
};
</script>
