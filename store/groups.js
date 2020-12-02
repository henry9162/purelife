export const state = () => ({
    productGroups: [],
})

export const mutations = {
    setGroups(state, data){
        state.productGroups = data
    }
}

export const actions = {
    getAllProductGroups(context){
        this.$axios.get('/ProductGroup/GetAllProductGroup')
            .then(response => {
                context.commit('setGroups', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addProductGroup(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ProductGroup', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateProductGroup(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ProductGroup/${data.productGroupId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteProductGroup(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ProductGroup/${id}`).then(response => {
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
    allProductGroups(state){
        return state.productGroups;
    }
}
