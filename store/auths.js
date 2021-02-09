export const state = () => ({
    view: 'login',
    authUser: {},
    loggedUser: {}
})

export const mutations = {
    setView(state, view){
        view == 'login' ? state.view = 'login' : state.view = 'register'
    },
    setAuthData(state, user){
        state.authUser = user
    },
    setLoggedUser(state, user){
        state.loggedUser = user
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
                    if(response.state == -3){
                        this.$toast.error(response.message).goAway(4000)
                        return
                    } else {
                        context.dispatch('processResponse', response)
                        resolve(response)
                    }
                }).catch(error => {
                    context.dispatch('processError', error)
                    reject(error)
                })
        })
    },
    login(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/Account/Login', data).then(response => {
                debugger
                if(response.data.state == -3){
                    this.$toast.error(response.data.message).goAway(4000)
                    return
                } else {
                    let user = response.data.data
                    if(user) {
                        this.$auth.setUserToken(response.data.loginToken)
                        this.$auth.setUser(user)
                        process.client ? localStorage.setItem('signedInUser', JSON.stringify(user)) : '';
                        resolve(response)
                    }   
                }
            }).catch(error => {
                context.dispatch('processError', error);
                    reject(error)   
                })
            });
            // this.$auth.loginWith('local', {data: data})
            // .then(response => {
            //     if(response.data.state == -3){
            //         this.$toast.error(response.data.message).goAway(4000)
            //         return
            //     } else {
            //         let user = response.data.data
            //         if(user) {
            //             this.$auth.setUser(user)
            //             process.client ? localStorage.setItem('signedInUser', JSON.stringify(user)) : '';
            //             resolve(response)
            //         }   
            //     }
            // }).catch (error => { 
            //     context.dispatch('processError', error);
            //     reject(error)   
            // })
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
    resetUser(context){
        if(this.$auth.loggedIn){
            if(process.client){
                let user = localStorage.getItem('signedInUser')
                if(user != null || user != undefined || user != ''){
                    context.commit('setAuthData', JSON.parse(user))
                }
            }
        }
    },
    getUser(context, id){
        this.$axios.get(`/ManageUser/GetUser/${id}`).then(response => {
            let user = response.data.data
            context.commit('setLoggedUser', user);
        })
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
        return state.loggedUser.firstName + ' ' + state.loggedUser.lastName 
    },
    authEmail(state){
        return state.loggedUser.email
    },
    getUser(state){
        return state.loggedUser
    }
}