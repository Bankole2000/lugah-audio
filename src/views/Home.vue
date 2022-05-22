<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <SoundRecorder :key="componentKey" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <LoginModal @loginSuccess="componentKey++" />
  </div>
</template>

<script>
import LoginModal from "../components/features/LoginModal.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import SoundRecorder from "../components/features/SoundRecorder.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      componentKey: 1,
    };
  },
  components: {
    // HelloWorld,
    SoundRecorder,
    LoginModal,
  },
  computed: {
    ...mapGetters({
      loggedInUser: "users/loggedInUser",
    }),
  },
  methods: {
    ...mapActions({
      showLoginModal: "ui/showLoginModal",
    }),
  },
  mounted() {
    if (!this.loggedInUser) {
      this.showLoginModal({ show: true });
    }
  },
};
</script>
