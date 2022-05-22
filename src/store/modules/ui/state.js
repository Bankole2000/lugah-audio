export default () => ({
  toast: {
    sclass: "",
    message: "",
    // color: "",
    show: false,
    timeout: -1,
    icons: {
      success: "mdi-check",
      warning: "mdi-alert",
      error: "mdi-window-close",
      info: "mdi-information"
    },
    icon: ""
  },
  loader: {
    show: false,
    color: 'primary',
    message: "Loading - Please stand by",
  },
  showLoginModal: true,
})