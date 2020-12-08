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
                if(process.client){
                    let user = response.data.data
                    localStorage.setItem('signedInUser', JSON.stringify(user));
                }
                resolve(response)
            }).catch (error => { 
                context.dispatch('processError', error);
                reject(error)   
            })
        })
    },
    setUser(context){
        if(process.client){
            let user = localStorage.getItem('signedInUser')
            if(user != null){
                this.$auth.setUser(JSON.parse(user));
            }
        }
    },
    logout(context){
        if(process.client){
            let user = localStorage.getItem('signedInUser');
            if (user){
                localStorage.removeItem('signedInUser')
                this.$auth.logout();
            }
        }
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