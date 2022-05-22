<template>
  <div class="edit-record-title-modal">
    <v-dialog persistent v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary white--text">
          Edit Record
        </v-card-title>

        <v-card-text>
          <v-text-field
            outlined
            class="mt-4"
            :disabled="loading"
            clearable
            hide-details
            autofocus
            @keypress.enter="updateTitle"
            autocomplete="off"
            label="Title"
            type="text"
            v-model="title"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="loading"
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="loading"
            class="primary text-capitalize"
            @click="updateTitle"
            ><v-icon right>mdi-content-save</v-icon> Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["record"],
  data() {
    return {
      dialog: false,
      loading: false,
      title: "",
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.title = this.record.title;
      }
    },
  },
  methods: {
    ...mapActions({
      updateRecordTitle: "users/updateRecordTitle",
      showToast: "ui/showToast",
    }),
    async updateTitle() {
      try {
        await this.updateRecordTitle({
          recordId: this.record.id,
          title: this.title,
        });
        this.showToast({
          show: true,
          message: "Record title updated successfully",
          sclass: "success",
          timeout: 3000,
        });
        this.$emit("titleUpdated");
        this.dialog = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.title = this.record.title;
  },
};
</script>

<style>
</style>