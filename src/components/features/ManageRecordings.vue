<template>
  <div class="manage-recordings">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            outlined
            class="mb-4"
            hide-details
            label="Filter Recordings by User"
            :items="users"
            item-text="fullname"
            clearable
            return-object
            v-model="selectedUser"
          ></v-select>
          <RecordingList :recordings="filteredRecordings" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RecordingList from "./RecordingList.vue";
export default {
  components: { RecordingList },
  data() {
    return {
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters({
      isAdminUser: "users/isAdminUser",
      recordings: "users/recordings",
      users: "users/users",
    }),
    filteredRecordings() {
      if (!this.selectedUser) {
        return this.recordings;
      }
      return this.recordings.filter(
        (recording) => recording.userId === this.selectedUser.id
      );
    },
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast",
      showGlobalLoader: "ui/showGlobalLoader",
      saveRecording: "users/saveRecording",
      getAllRecordings: "users/getAllRecordings",
    }),
  },
  async mounted() {
    if (!this.isAdminUser) {
      return;
    }
    this.showGlobalLoader({
      message: "Loading recordings...",
      show: true,
    });
    await this.getAllRecordings();
    this.showGlobalLoader({
      show: false,
      message: "",
    });
  },
};
</script>

<style>
</style>