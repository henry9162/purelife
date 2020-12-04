export const state = () => ({
    users: [],
})

export const mutations = {
    setUsers(state, data){
        state.users = data
    }
}

export const actions = {
    getAllUsers(context){
        this.$axios.get('/ManageUser/GetAllUsers')
            .then(response => {
                context.commit('setUsers', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addUser(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ManageUser', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateUser(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ManageUser/${data.userId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteUser(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ManageUser/${id}`).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    processError(context, error){
        this.$toast.error(error).goAway(3500)
    },
    processResponse(context, response){
        this.$toast.success(response.data.message).goAway(3500)
    }
}

export const getters = {
    allUsers(state){
        return state.users;
    }
}
