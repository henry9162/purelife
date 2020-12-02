export const state = () => ({
    view: 'login',
})

export const mutations = {
    setView(state, view){
        view == 'login' ? state.view = 'login' : state.view = 'register'
    }
}

export const actions = {
    changeView(context, view){
        context.commit('setView', view)
    },
    register(context, data){
        return new Promise((resolve, reject) => {
            context.commit('setLoader', { state: true }, {root: true})
            this.$axios.post('/Account/Signup', data)
                .then(response => {
                    context.dispatch('processResponse', response)
                    resolve(response)
                }).catch(error => {
                    context.dispatch('processError', error)
                    reject(error)
                })
        })
    },
    login(context){
        context.commit('setLoader', { state: true }, {root: true})
        setTimeout(() => {
            context.commit('setLoader', { state: false }, {root: true})
            this.$toast.success('Login was successful').goAway(3500)
            setTimeout(() => {
                this.$router.push({path: '/admin/dashboard'})
            }, 3500);
        }, 3000);
        // return new Promise((resolve, reject) => {
        //     context.commit('setLoader', { state: true }, {root: true})
        //     this.$axios.post('/Login', data)
        //         .then(response => {
        //             context.dispatch('processResponse', response)
        //             resolve(response)
        //         }).catch(error => {
        //             context.dispatch('processError', error)
        //             reject(error)
        //         })
        // })
    },
    processError(context, error){
        context.commit('setLoader', { state: false }, {root: true})
        this.$toast.error(error).goAway(3500)
    },
    processResponse(context, response){
        context.commit('setLoader', { state: false }, {root: true})
        this.$toast.success(response.data.message).goAway(3500)
    }
}

export const getters = {
    
}