export default {
  showToast(context, { show, sclass = "", message = "", timeout = 1000 }) {
    return new Promise(resolve => {
      context.commit("showToast", { show, sclass, message, timeout });
      resolve(timeout);
    });
  },
  showGlobalLoader(context, { show, color = "primary", message = "Loading" }) {
    return new Promise(resolve => {
      context.commit("showGlobalLoader", { show, color, message });
      resolve();
    });
  },
  showLoginModal(context, { show }) {
    return new Promise(resolve => {
      context.commit("showLoginModal", { show });
      resolve();
    });
  },
}