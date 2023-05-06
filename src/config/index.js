
export default {
    site: {
        domain: "ppengryuu.cn",
        home: "https://ppengryuu.cn/vue3-personal-resume"
    },
    resume: {
        url: () => {
            if (process.env.NODE_ENV == 'development') {
                return "markdown.dev/resume.md"
            }
            else if (process.env.NODE_ENV == 'production') {
                return "markdown/resume.md"
            }
        }
    }
}
