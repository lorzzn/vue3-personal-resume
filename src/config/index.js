export default {
  site: {
    domain: "lorzzn.com",
    home: "https://lorzzn.com/vue3-personal-resume",
  },
  resume: {
    url: () => {
      return "markdown/resume.md";
      // if (process.env.NODE_ENV == 'development') {
      //     return "markdown.dev/resume.md"
      // }
      // else if (process.env.NODE_ENV == 'production') {
      //     return "markdown/resume.md"
      // }
    },
  },
};
