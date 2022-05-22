<template>
  <div class="manage-users">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="(item, i) in users" :key="i">
          <div>
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="indigo">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.fullname"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.email"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      users: "users/users",
    }),
  },
  methods: {},
};
</script>

<style>
</style>