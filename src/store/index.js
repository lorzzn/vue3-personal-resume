import { createStore } from 'vuex'

export default new createStore({
    state: {
        resume: {
            content: []
        }
    },
    getters: {
        readResumeContent(state) {
            return state.resume.content
        }
    },
    mutations: {
        storeResumeContent(state, content) {
            state.resume.content = content
        },
        newResumeItem(state) {
            state.resume.content.push({
                type: 'title-1',
                data: {
                    content: ''
                }
            })
        }
    }
})
