<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__title">
        <span>Session Expired</span>
      </div>
      <div class="p-3">
        <p>You have left this browser idle for 1 hour.</p>
        <p>{{ time / 1000 }} second left</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      time: 10000
    };
  },
  methods: {
    async signOut() {
      try {
        await firebase.auth().signOut();
        window.localStorage.removeItem("vuex");
        this.$router.replace({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    let timerId = setInterval(() => {
      this.time -= 1000;
      if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);
      if (this.time < 1) {
        clearInterval(timerId);
        // Your logout function should be over here
        this.signOut();
      }
    }, 1000);
  }
};
</script>

<style lang="postcss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 500px;
  box-shadow: 1px 2px 4px rgba(153, 155, 168, 0.12);
  border-radius: 4px;
  @apply bg-white p-2;
}
.modal__title {
  color: #38404f;
  @apply flex items-center justify-between p-3 font-bold;
}
</style>
