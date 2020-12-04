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
    login(context, data){
        return new Promise((resolve, reject) => {
            this.$auth.loginWith('local', {data: data})
            .then(response => {
                resolve(response)
            }).catch (error => { 
                context.dispatch('processError', error);
                reject(error)   
            })
        })
    },
    processError(context, error){
        this.$toast.error(error).goAway(4000)
    },
    processResponse(context, response){
        this.$toast.success(response.data.message).goAway(5000)
    }
}

export const getters = {
    
}