export const state = () => ({
    view: 'login',
    authUser: {}
})

export const mutations = {
    setView(state, view){
        view == 'login' ? state.view = 'login' : state.view = 'register'
    },
    setAuthData(state, user){
        state.authUser = user
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
                    if(user) localStorage.setItem('signedInUser', JSON.stringify(user));
                }
                resolve(response)
            }).catch (error => { 
                context.dispatch('processError', error);
                reject(error)   
            })
        })
    },
    setUser(context){
        if(this.$auth.loggedIn){
            if(process.client){
                let user = localStorage.getItem('signedInUser')
                if(user != null || user != undefined || user != ''){
                    this.$auth.setUser(JSON.parse(user));
                    context.commit('setAuthData', JSON.parse(user))
                }
            }
        }
    },
    logout(context){
        if(process.client){
            let user = localStorage.getItem('signedInUser');
            if (user){
                localStorage.removeItem('signedInUser')
            }
            this.$auth.logout();
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
    authName(state){
        return state.authUser.firstName + ' ' + state.authUser.lastName 
    },
    authEmail(state){
        return state.authUser.email
    }
}