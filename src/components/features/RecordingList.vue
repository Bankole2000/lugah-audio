<template>
  <div class="recording-list">
    <v-progress-linear indeterminate :active="loading"></v-progress-linear>
    <div v-if="recordings.length" class="mt-n4">
      <v-slide-y-transition group>
        <div v-for="(record, i) in recordings" :key="i">
          <v-hover v-slot:default="{ hover }">
            <v-card
              rounded="lg"
              style="transition: all 0.3s ease"
              :class="hover ? 'elevated' : 'elevated-light'"
              elevation="0"
              class="px-4 py-3 my-4 d-flex align-center"
            >
              <v-row align="center">
                <v-col cols="12" md="3">
                  <div class="d-flex align-center">
                    <v-slide-x-transition>
                      <div v-show="hover || !$vuetify.breakpoint.mdAndUp">
                        <EditRecordTitleModal
                          @titleUpdated="titleUpdated"
                          :record="record"
                        />
                      </div>
                    </v-slide-x-transition>
                    <p class="subtitle-1 mb-0">{{ record.title }}</p>
                  </div>
                </v-col>
                <v-col cols="12" md="7">
                  <!-- :src="`http://localhost:3000/recordings/${record.key}`" -->
                  <audio-player
                    :src="`https://lugahaudio.herokuapp.com/recordings/${record.key}`"
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <div class="d-flex justify-center">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <a
                          :href="record.url"
                          target="_blank"
                          :download="record.title"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-btn
                            color="primary"
                            large
                            class="mx-auto"
                            :icon="$vuetify.breakpoint.mdAndUp"
                            ><v-icon :left="!$vuetify.breakpoint.mdAndUp"
                              >mdi-download</v-icon
                            >
                            <span v-if="!$vuetify.breakpoint.mdAndUp"
                              >Download</span
                            >
                          </v-btn>
                        </a>
                      </template>
                      <span>Download</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          large
                          class="mx-auto"
                          :icon="$vuetify.breakpoint.mdAndUp"
                          :disabled="loading"
                          :loading="loading"
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteRecording(record)"
                          ><v-icon :left="!$vuetify.breakpoint.mdAndUp"
                            >mdi-close-box</v-icon
                          >
                          <span v-if="!$vuetify.breakpoint.mdAndUp"
                            >Delete</span
                          >
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </div>
      </v-slide-y-transition>
    </div>
    <div v-else>
      <v-alert type="info" text>
        You don't have any uploaded recordings.
      </v-alert>
    </div>
  </div>
</template>

<script>
import EditRecordTitleModal from "./EditRecordTitleModal.vue";
import { mapActions } from "vuex";
export default {
  components: { EditRecordTitleModal },
  props: ["recordings"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getUserRecordings: "users/getUserRecordings",
      deleteUserRecording: "users/deleteUserRecording",
      showToast: "ui/showToast",
    }),
    async titleUpdated() {
      this.loading = true;
      await this.getUserRecordings();
      this.loading = false;
    },
    async deleteRecording(record) {
      this.loading = true;
      try {
        await this.deleteUserRecording({
          recordId: record.id,
        });
        this.showToast({
          show: true,
          message: "Record deleted successfully",
          sclass: "success",
          timeout: 3000,
        });
        this.$emit("recordingDeleted");
      } catch (error) {
        console.log({ error });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>