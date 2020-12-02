export const state = () => ({
    packages: [],
})

export const mutations = {
    setPackages(state, data){
        state.packages = data
    }
}

export const actions = {
    getAllPackages(context){
        this.$axios.get('/ProductPackage/GetAllProductPackage')
            .then(response => {
                context.commit('setPackages', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addPackage(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ProductPackage', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updatePackage(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ProductPackage/${data.productPackageId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deletePackage(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ProductPackage/${id}`).then(response => {
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
        context.commit('setLoader', { state: false }, {root: true})
        this.$toast.error(error).goAway(3500)
    },
    processResponse(context, response){
        context.commit('setLoader', { state: false }, {root: true})
        this.$toast.success(response.data.message).goAway(3500)
    }
}

export const getters = {
    allPackages(state){
        return state.packages;
    }
}
