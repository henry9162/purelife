export const state = () => ({
    roles: [],
})

export const mutations = {
    setRoles(state, data){
        state.roles = data
    }
}

export const actions = {
    getAllRoles(context){
        //context.commit('setLoader', { state: true }, {root: true})
        this.$axios.get('/ManageRole/GetAllRoles')
            .then(response => {
                context.commit('setRoles', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addRole(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ManageRole', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateRole(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ManageRole/${data.roleId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteRole(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ManageRole/${id}`).then(response => {
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
    allRoles(state){
        return state.roles;
    }
}
