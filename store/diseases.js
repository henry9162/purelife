export const state = () => ({
    diseases: [],
    patients: []
})

export const mutations = {
    setDiseases(state, data){
        state.diseases = data
    },
    setPatients(state, data){
        state.patients = data
    }
}

export const actions = {
    getAllDiseases(context){
        this.$axios.get('/Disease/GetAllDisease')
            .then(response => {
                context.commit('setDiseases', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addDisease(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/Disease', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    addDiseaseToPatient(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/Disease/AddDiseaseToPatient', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updateDisease(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/Disease/${data.diseaseId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    getPatients(context, id){
        this.$axios.get(`/Disease/GetPatientsPerDisease?id=${id}`).then(response => {
            context.commit("setPatients", response.data.data)
            context.dispatch('processResponse', response)
        })
        .catch(error => {
            context.dispatch('processError', error)
        })
    },
    deleteDisease(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/Disease/${id}`).then(response => {
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
    allDiseases(state){
        return state.diseases;
    },
    patients(state){
        return state.patients
    }
}
