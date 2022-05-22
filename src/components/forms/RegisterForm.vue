<template>
  <div class="login-form">
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-slide-y-transition class="py-0" leave-absolute group>
              <v-alert
                v-for="(error, i) in errors"
                :key="i + 1"
                text
                type="error"
                style="border-radius: 15px"
                class="text-left"
                dense
                >{{ error }}</v-alert
              >
            </v-slide-y-transition>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              :disabled="loading"
              label="Full Name"
              :rules="[rules.required]"
              v-model="fullname"
            ></v-text-field>
            <v-text-field
              outlined
              :disabled="loading"
              label="Email"
              :rules="[rules.required]"
              v-model="email"
            ></v-text-field>
            <v-text-field
              outlined
              :disabled="loading"
              label="Password"
              :rules="[rules.required]"
              :type="showPassword1 ? 'text' : 'password'"
              v-model="password"
              :append-icon="showPassword1 ? 'mdi-eye ' : 'mdi-eye-off'"
              @click:append="showPassword1 = !showPassword1"
            ></v-text-field>
            <v-text-field
              outlined
              :disabled="loading"
              label="Confirm Password"
              :rules="[rules.required]"
              :type="showPassword2 ? 'text' : 'password'"
              @keypress.enter="registerNewUser"
              v-model="confirmPassword"
              :append-icon="showPassword2 ? 'mdi-eye ' : 'mdi-eye-off'"
              @click:append="showPassword2 = !showPassword2"
            ></v-text-field>
            <div>
              <v-btn
                block
                :disabled="loading"
                :loading="loading"
                large
                class="primary white--text text-capitalize"
                @click="registerNewUser"
                ><v-icon left>mdi-account-plus</v-icon> Register</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
      loading: false,
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      requiredFields: {
        fullname: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
      },
      showPassword1: false,
      showPassword2: false,
    };
  },
  methods: {
    ...mapActions({
      register: "users/register",
      showGlobalLoader: "ui/showGlobalLoader",
      showToast: "ui/showToast",
    }),
    async registerNewUser() {
      console.log({
        firstname: this.fullname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
      for (const key in this.requiredFields) {
        if (!this.$data[key]) {
          this.errors.push(`${this.requiredFields[key]} is required`);
        }
      }
      if (this.password !== this.confirmPassword) {
        this.errors.push("Passwords don't match");
        this.showToast({
          show: true,
          message: "Passwords don't match",
          sclass: "error",
          timeout: 4000,
        });
        this.clearErrors();
        return;
      }
      if (this.errors.length) {
        this.showToast({
          show: true,
          sclass: "error",
          message: "Missing required Fields",
          timeout: 4000,
        });
        this.clearErrors();
        return;
      }
      try {
        this.loading = true;
        await this.register({
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        this.showToast({
          show: true,
          message: "Registration Successful",
          sclass: "success",
          timeout: 4000,
        });
        this.$refs.form.reset();
        this.$emit("registrationSuccess");
      } catch (error) {
        console.log({ error });
        if (error.response) {
          this.errors.push(error.response.data.message);
          this.showToast({
            show: true,
            message: error.response.data.message,
            sclass: "error",
            timeout: 4000,
          });
        }
      } finally {
        this.loading = false;
        this.clearErrors();
      }
    },
    clearErrors() {
      setTimeout(() => {
        this.errors = [];
      }, 4000);
    },
  },
};
</script>

<style>
</style>