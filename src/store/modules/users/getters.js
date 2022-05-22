export default {
  users(state) {
    return state.users;
  },
  loggedInUser(state) {
    return state.loggedInUser;
  },
  authToken(state) {
    return state.authToken;
  },
  recordings(state) {
    return state.recordings;
  },
  isAdminUser(state) {
    if (!state.loggedInUser) return false;
    return state.loggedInUser.role === 'ADMIN';
  }
}