<template>
  <div class="user-list">
    <div v-if="users.length">
      <v-item-group @change="userSelected" v-model="selectedUser">
        <v-container>
          <v-row>
            <v-col cols="12" v-for="(user, i) in filteredUsers" :key="i">
              <v-item :value="user" v-slot:default="{ active, toggle }">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    elevation="0"
                    style="transition: all 0.3s ease"
                    :class="hover || active ? 'elevated' : 'elevated-light'"
                  >
                    <v-card-title
                      :class="{ 'primary white--text': active }"
                      @click.self="toggle"
                    >
                      {{ user.fullname }}
                    </v-card-title>
                    <v-slide-y-transition>
                      <v-card-text v-show="active" class="pt-4">
                        <div class="d-flex align-center">
                          <v-text-field
                            outlined
                            :disabled="loading"
                            dense
                            hide-details
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            @keypress.enter="loginAsSelectedUser"
                            :append-icon="
                              showPassword ? 'mdi-eye ' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                          ></v-text-field>
                          <div>
                            <v-btn
                              :loading="loading"
                              :disabled="loading"
                              @click="loginAsSelectedUser"
                              class="primary text-capitalize mx-2"
                              >Login
                              <v-icon right>mdi-location-enter</v-icon></v-btn
                            >
                          </div>
                        </div>
                      </v-card-text>
                    </v-slide-y-transition>
                  </v-card>
                </v-hover>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </div>
    <div v-else class="pa-4">
      <v-alert prominent type="info" text> No registered Users. </v-alert>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["filteredUsers"],
  data() {
    return {
      showPassword: false,
      selectedUser: null,
      password: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      users: "users/users",
    }),
  },
  methods: {
    ...mapActions({
      getAllUsers: "users/getAllUsers",
      showToast: "ui/showToast",
      showGlobalLoader: "ui/showGlobalLoader",
      login: "users/login",
    }),
    async loginAsSelectedUser() {
      console.log({
        password: this.password,
        selectedUser: this.selectedUser,
      });
      if (!this.password) {
        this.showToast({
          show: true,
          sclass: "error",
          message: "Password is required",
          timeout: 3000,
        });
        return;
      }
      try {
        // this.showGlobalLoader({ show: true, message: "loading" });
        this.loading = true;
        const data = await this.login({
          password: this.password,
          email: this.selectedUser.email,
        });
        this.showToast({
          show: true,
          sclass: data.success ? "success" : "error",
          message: data.message,
          timeout: 3000,
        });
        if (data.success) {
          this.$emit("loginSuccess");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // this.showGlobalLoader({ show: true, message: "loading" });
        this.loading = false;
      }
    },
    userSelected(e) {
      console.log({ e });
      this.password = "";
    },
  },
  async mounted() {
    this.showGlobalLoader({ show: true, message: "Loading..." });
    try {
      await this.getAllUsers();
    } catch (error) {
      console.log(error);
    } finally {
      this.showGlobalLoader({ show: false, message: "" });
    }
  },
};
</script>

<style>
</style>