/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
export default {
    state: {
        adverts: 'All'
    },
    mutations: {
        changeToMyAdverts(state) {
            if (state.adverts != 'My') {
                state.adverts = 'My'
            }
        }
    }
};