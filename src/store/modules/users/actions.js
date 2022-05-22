import axios from 'axios';
import config from '../../../utils/config';
const apiURL = config.apiURL;
export default {
  async adminLogin({ commit }, payload) {
    try {
      const { data } = await axios.post(`${apiURL}/users/login`, payload)
      console.log({ data });
      if (data.success) {
        if (data.data.user.role === 'ADMIN') {
          commit('setLoggedInUser', data.data.user);
          commit('setAuthToken', data.data.token);
          return data;
        }
        return { success: false, message: 'Unauthorized' };
      }
    } catch (error) {
      console.log({ error });
      return error.response.data
    }
  },
  async login({ commit }, payload) {
    try {
      const { data } = await axios.post(`${apiURL}/users/login`, payload)
      console.log({ data });
      if (data.success) {
        commit('setLoggedInUser', data.data.user);
        commit('setAuthToken', data.data.token);
        return data;
      }
    } catch (error) {
      console.log({ error });
      return error.response.data
    }
  },
  logout({ commit }) {
    commit('setLoggedInUser', null);
    commit('setAuthToken', null);
    commit('setRecordings', []);
  },
  async register({ commit }, payload) {
    try {
      const { data } = await axios.post(`${apiURL}/users/register`, payload)
      console.log({ data });
      if (data.success) {
        commit('setLoggedInUser', data.data.user);
        commit('setAuthToken', data.data.token);
        return data;
      }
    } catch (error) {
      console.log({ error });
      throw error;
    }
  },
  async getAllUsers({ commit }) {
    try {
      const { data } = await axios.get(`${apiURL}/users`)
      console.log({ data });
      if (data.success) {
        commit('setUsers', data.data);
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async getUserRecordings({ commit, state }) {
    console.log({ state });
    try {
      const { data } = await axios.get(`${apiURL}/recordings`, {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
      console.log({ data });
      if (data.success) {
        commit('setRecordings', data.data.recordings);
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async getAllRecordings({ commit, state }) {
    try {
      const { data } = await axios.get(`${apiURL}/admin/recordings`, {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
      console.log({ data });
      if (data.success) {
        commit('setRecordings', data.data.recordings);
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async saveRecording({ commit, state }, payload) {
    console.log({ commit });
    try {
      const { data } = await axios.post(`${apiURL}/recordings`, payload, {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
      console.log({ data });
      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async updateRecordTitle({ commit, state }, payload) {
    console.log({ commit });
    try {
      const { data } = await axios.put(`${apiURL}/recordings/${payload.recordId}`, payload, {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
      console.log({ data });
      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  async deleteUserRecording({ commit, state }, payload) {
    console.log({ commit });
    try {
      const { data } = await axios.delete(`${apiURL}/recordings/${payload.recordId}`, {
        headers: {
          Authorization: `Bearer ${state.authToken}`
        }
      })
      console.log({ data });
      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}