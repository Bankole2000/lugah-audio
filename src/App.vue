<template>
  <v-app>
    <v-app-bar app color="primary" elevate-on-scroll dark>
      <v-container>
        <div style="width: 100%" class="d-flex align-center">
          <div class="d-flex align-center">
            <!-- <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            /> -->
            <p
              @click="$router.push({ name: 'Home' })"
              class="headline mb-0 white--text"
            >
              Lugah <span v-if="$vuetify.breakpoint.mdAndUp">Recordings</span>
            </p>
            <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
          </div>

          <v-spacer></v-spacer>
          <v-btn
            v-if="$route.name === 'Home' && isAdminUser"
            :icon="!$vuetify.breakpoint.mdAndUp"
            @click="$router.push({ name: 'pages.admin' })"
          >
            <v-icon :left="$vuetify.breakpoint.mdAndUp"
              >mdi-badge-account</v-icon
            >
            <span v-if="$vuetify.breakpoint.mdAndUp"> Admin </span>
          </v-btn>
          <v-btn
            v-if="$route.name !== 'Home'"
            :icon="!$vuetify.breakpoint.mdAndUp"
            @click="$router.push({ name: 'Home' })"
          >
            <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-home</v-icon>
            <span v-if="$vuetify.breakpoint.mdAndUp"> Home </span>
          </v-btn>
          <v-btn
            v-if="$route.name === 'Home'"
            :icon="!$vuetify.breakpoint.mdAndUp"
            @click="logoutUser"
            class="secondary white--text text-capitalize mx-2"
          >
            <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-power</v-icon>
            <span v-if="$vuetify.breakpoint.mdAndUp"> Logout </span>
          </v-btn>

          <v-btn
            v-if="$route.name === 'Home'"
            :icon="!$vuetify.breakpoint.mdAndUp"
            @click="showLoginModal({ show: true })"
            text
          >
            <v-icon :left="$vuetify.breakpoint.mdAndUp"
              >mdi-account-arrow-left</v-icon
            >
            <span
              v-if="$vuetify.breakpoint.mdAndUp"
              class="mr-2 text-capitalize"
              >Login as a different User</span
            >
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <transition name="router-anim">
        <router-view />
      </transition>
    </v-main>
    <Snackbar />
    <GlobalLoader />
  </v-app>
</template>

<script>
import GlobalLoader from "./components/shared/GlobalLoader.vue";
import Snackbar from "./components/shared/Snackbar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Snackbar, GlobalLoader },
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      isAdminUser: "users/isAdminUser",
    }),
  },
  methods: {
    ...mapActions({
      logout: "users/logout",
      showLoginModal: "ui/showLoginModal",
    }),
    logoutUser() {
      this.logout();
      this.showLoginModal({ show: true });
    },
  },
};
</script>
<style scoped>
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: #e91e63;
  border-radius: 10px;
  border: transparent;
}
</style>
