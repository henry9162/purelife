export const state = () => ({
    classifications: [],
    categoryClassfications: []
})

export const mutations = {
    setClassifications(state, data){
        state.classifications = data
    },
    setCategoryClassifications(state, data){
        state.categoryClassfications = data
    }
}

export const actions = {
    getAllClassifications(context){
        this.$axios.get('/ProductClassification/GetAllProductClassification')
            .then(response => {
                context.commit('setClassifications', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    getAllClassificationsByCategoryId(context, categoryId){
        this.$axios.get('/ProductClassification/GetProductClassificationByCategoryID/' + categoryId)
            .then(response => {
                context.commit('setCategoryClassifications', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addClassification(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/ProductClassification', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateClassification(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/ProductClassification/${data.productGroupClassificationId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deleteClassification(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/ProductClassification/${id}`).then(response => {
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
    allClassifications(state){
        return state.classifications;
    },
    allCategoryClassifications(state){
        return state.categoryClassfications;
    },
}
