export const state = () => ({
    brands: [],
})

export const mutations = {
    setBrands(state, data){
        state.brands = data
    }
}

export const actions = {
    getAllBrands(context){
        this.$axios.get('/ProductBrand/getAllProductBrand')
            .then(response => {
                context.commit('setBrands', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addBrand(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ProductBrand', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateBrand(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ProductBrand/${data.productBrandId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteBrand(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ProductBrand/${id}`).then(response => {
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
    allBrands(state){
        return state.brands;
    }
}
