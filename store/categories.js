export const state = () => ({
    categories: [],
})

export const mutations = {
    setCategories(state, data){
        state.categories = data
    }
}

export const actions = {
    getAllCategories(context){
        //context.commit('setLoader', { state: true }, {root: true})
        this.$axios.get('/ProductCategory/GetAllProductCategory')
            .then(response => {
                context.commit('setCategories', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addCategory(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ProductCategory', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateCategory(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ProductCategory/${data.productCategyId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteCategory(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ProductCategory/${id}`).then(response => {
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
    allCategories(state){
        return state.categories;
    }
}
