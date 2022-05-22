export default {
  setUsers(state, payload) {
    state.users = payload;
  },
  setLoggedInUser(state, payload) {
    state.loggedInUser = payload;
  },
  setAuthToken(state, payload) {
    state.authToken = payload;
  },
  setRecordings(state, payload) {
    state.recordings = payload;
  },
  setSelectedUser(state, payload) {
    state.selectedUser = payload;
  }
}