<template>
  <div class="sound-recorder">
    <v-container class="pt-4">
      <v-row>
        <v-col cols="12" class="pb-0 pt-4">
          <div>
            <v-alert
              prominent
              type="info"
              color="secondary"
              text
              class="mb-0"
              dark
              dismissible
            >
              Click/tap (<v-icon color="primary">mdi-microphone</v-icon>) to
              record, (<v-icon color="primary">mdi-stop</v-icon>) to stop. Once
              done, select the recorded audio from the list (you can preview in
              the audio player), and click/tap (<v-icon color="primary"
                >mdi-content-save</v-icon
              >) to upload the selected recording, or (<v-icon color="primary"
                >mdi-download-box-outline</v-icon
              >
              ) to download the selected recording.
            </v-alert>
          </div>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="5">
          <p class="headline mb-2">New Recording</p>
          <v-divider class="mb-4"></v-divider>

          <div
            style="display: flex; align-items: start; justify-content: center"
            :style="{ minHeight: $vuetify.breakpoint.mdAndUp ? '60vh' : '' }"
          >
            <div>
              <!-- :filename="fileName" -->
              <audio-recorder
                ref="recorder"
                class="mb-4"
                :upload-url="uploadURL"
                :attempts="3"
                :time="2"
                :headers="headers"
                :format="format"
                :mic-failed="micFailed"
                :before-recording="callback"
                :pause-recording="callback"
                :after-recording="callback"
                :select-record="selectRecord"
                :startUpload="beforeUpload"
                :successful-upload="uploadSuccess"
                :failed-upload="uploadFailed"
              />

              <!-- <div class="d-flex align-center">
                    <div>
                      <v-btn
                        @click="uploadRecording"
                        class="mx-2 primary white--text text-capitalize"
                        ><v-icon left>mdi-upload</v-icon> Upload</v-btn
                      >
                    </div>
                  </div> -->
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="7" align-self="start">
          <div>
            <p class="headline mb-2">Uploaded Recordings</p>
            <v-divider class="mb-4"></v-divider>
            <RecordingList
              :recordings="recordings"
              @recordingDeleted="recordingDeleted"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RecordingList from "./RecordingList.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: { RecordingList },
  data() {
    return {
      // headers: {},
      // uploadURL: "http://localhost:3000/recordings",
      uploadURL: "https://lugahaudio.herokuapp.com/recordings",
      format: "wav",
      fileName: "",
      selectedRecord: null,
    };
  },
  computed: {
    ...mapState({
      authToken: (state) => state.users.authToken,
    }),
    ...mapGetters({
      recordings: "users/recordings",
    }),
    headers() {
      return { Authorization: `Bearer ${this.authToken}` };
    },
  },
  methods: {
    ...mapActions({
      showToast: "ui/showToast",
      showGlobalLoader: "ui/showGlobalLoader",
      saveRecording: "users/saveRecording",
      getUserRecordings: "users/getUserRecordings",
    }),
    callback(data) {
      console.log({ data });
    },
    selectRecord(e) {
      this.selectedRecord = e;
      console.log({ e });
    },
    beforeUpload(e) {
      console.log("before Upload", e);
      console.log({ headers: this.headers, newHeaders: this.realAuthToken });
      // if (!this.fileName) {
      //   this.showToast({
      //     show: true,
      //     message: "Invalid Record name",
      //     sclass: "error",
      //     timeout: 3000,
      //   });
      //   throw new Error("Invalid Record Name");
      // }
      this.showGlobalLoader({ show: true, message: "Uploading" });
    },
    async uploadRecording() {
      console.log({ recording: this.selectedRecord, filename: this.fileName });
      // const file = new File([this.selectedRecord], this.fileName, {
      //   type: "audio/mp3",
      // });
      const formData = new FormData();
      formData.append(
        "audio",
        this.selectedRecord.blob,
        `${this.fileName}.${this.format}`
      );
      await this.saveRecording(formData);
    },
    async recordingDeleted() {
      this.showGlobalLoader({
        show: true,
        message: "Loading...",
      });

      await this.getUserRecordings();
      this.showGlobalLoader({ show: false });
    },
    async uploadSuccess(e) {
      console.log("Upload Success", e);
      this.showToast({
        show: true,
        message: "Uploaded Successfully",
        sclass: "success",
        timeout: 4000,
      });
      await this.getUserRecordings();
      this.showGlobalLoader({ show: false });
    },
    uploadFailed(e) {
      console.log("Upload Failed", e);
      this.showGlobalLoader({ show: false });
      this.showToast({
        show: true,
        message: "Upload Failed",
        sclass: "error",
        timeout: 4000,
      });
    },
    micFailed(e) {
      console.log({ e });
    },
  },
  mounted() {
    console.log({ recorder: this.$refs.recorder });
  },
};
</script>

<style>
</style>