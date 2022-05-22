<template>
  <div class="admin-login">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="Email"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            type="password"
            @keypress.enter="loginAsAdmin"
            v-model="password"
            label="Password"
          ></v-text-field>
          <div>
            <v-btn
              block
              large
              class="primary white--text text-capitalize"
              @click="loginAsAdmin"
            >
              <v-icon left>mdi-badge-account</v-icon> Admin Login
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      adminLogin: "users/adminLogin",
      showToast: "ui/showToast",
      showGlobalLoader: "ui/showGlobalLoader",
    }),
    async loginAsAdmin() {
      if (!this.email || !this.password) {
        this.showToast({
          show: true,
          sclass: "error",
          message: "Invalid data",
          timeout: 3000,
        });
        return;
      }
      try {
        this.showGlobalLoader({ show: true, message: "loading..." });
        console.log({ email: this.email, password: this.password });
        const data = await this.adminLogin({
          email: this.email,
          password: this.password,
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
        console.log({ error });
      } finally {
        this.showGlobalLoader({ show: false, message: "" });
      }
    },
  },
};
</script>

<style>
</style>