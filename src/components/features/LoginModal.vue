<template>
  <div class="login-modal">
    <v-dialog
      :fullscreen="!$vuetify.breakpoint.mdAndUp"
      persistent
      scrollable
      v-model="dialog"
      width="500"
    >
      <v-card height="580">
        <v-card-title class="headline primary white--text">
          Who will be recording today?
        </v-card-title>

        <v-card-text class="pa-0">
          <v-tabs v-model="tab" fixed-tabs>
            <v-tab>Login (Previous User)</v-tab>
            <v-tab>Register (New User)</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :value="0">
              <v-card flat>
                <div class="px-4 pt-4">
                  <v-text-field
                    outlined
                    clearable
                    hide-details
                    autocomplete="off"
                    autofill="off"
                    placeholder="Search by full name or email"
                    label="Search Users"
                    type="text"
                    v-model="filterText"
                    prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                </div>
                <UserList
                  @loginSuccess="loginSuccess"
                  :filteredUsers="filteredUsers"
                />
              </v-card>
            </v-tab-item>
            <v-tab-item :value="1">
              <v-card flat>
                <v-card-text>
                  <RegisterForm @registrationSuccess="registrationSuccessful" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="goAdminPage"> Admin </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RegisterForm from "../forms/RegisterForm.vue";
import UserList from "./UserList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { UserList, RegisterForm },
  data() {
    return {
      // dialog: true,
      filterText: "",
      tab: 0,
    };
  },
  computed: {
    ...mapGetters({
      users: "users/users",
      dialog: "ui/loginModal",
    }),
    filteredUsers() {
      if (this.filterText) {
        return this.users.filter((x) => {
          return (
            x.fullname.toLowerCase().includes(this.filterText.toLowerCase()) ||
            x.email.toLowerCase().includes(this.filterText.toLowerCase())
          );
        });
      }
      return this.users;
    },
  },
  methods: {
    ...mapActions({
      getAllUsers: "users/getAllUsers",
      getUserRecordings: "users/getUserRecordings",
      showGlobalLoader: "ui/showGlobalLoader",
      showLoginModal: "ui/showLoginModal",
    }),
    async loginSuccess() {
      this.showGlobalLoader({ show: true, message: "Loading..." });
      await this.getUserRecordings();
      this.showGlobalLoader({ show: false, message: "" });
      this.$emit("loginSuccess");
      this.showLoginModal({ show: false });
    },
    async registrationSuccessful() {
      this.showGlobalLoader({ show: true, message: "Loading..." });
      await this.getAllUsers();
      await this.getUserRecordings();
      this.showGlobalLoader({ show: false, message: "" });
      this.$emit("loginSuccess");
      this.showLoginModal({ show: false });
    },
    async goAdminPage() {
      await this.$router.push({ name: "pages.admin" });
      await this.showLoginModal({ show: false });
    },
  },
};
</script>

<style>
</style>