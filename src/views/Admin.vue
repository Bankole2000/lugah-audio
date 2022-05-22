<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline my-2">
            <p class="display-2 mb-0">Admin</p>
            <v-divider></v-divider>
          </div>
        </v-col>
        <v-col cols="12" v-if="!isAdminUser">
          <AdminLogin @loginSuccess="componentKey++" />
        </v-col>
        <v-col cols="12" v-else>
          <div>
            <v-tabs v-model="tab">
              <v-tab>Manage Recordings</v-tab>
              <v-tab>Manage Users</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item :value="0">
                <ManageRecordings :key="componentKey" />
              </v-tab-item>
              <v-tab-item :value="1">
                <ManageUsers :key="componentKey" />
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AdminLogin from "../components/forms/AdminLogin.vue";
import { mapGetters } from "vuex";
import ManageRecordings from "../components/features/ManageRecordings.vue";
import ManageUsers from "../components/features/ManageUsers.vue";
export default {
  components: { AdminLogin, ManageRecordings, ManageUsers },
  data() {
    return {
      tab: 0,
      componentKey: 0,
    };
  },
  computed: {
    ...mapGetters({
      isAdminUser: "users/isAdminUser",
    }),
  },
  methods: {},
};
</script>
