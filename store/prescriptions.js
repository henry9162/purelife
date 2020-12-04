export const state = () => ({
    prescriptions: [],
})

export const mutations = {
    setPrescriptions(state, data){
        state.prescriptions = data
    }
}

export const actions = {
    getAllPrescriptions(context){
        this.$axios.get('/PrescriptionManagement/GetAllPrescription')
            .then(response => {
                context.commit('setPrescriptions', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addPrescription(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/PrescriptionManagement', data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error)
            })
        })
    },
    updatePrescription(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/PrescriptionManagement/${data.prescriptionId}`, data).then(response => {
                context.dispatch('processResponse', response)
                resolve(response)
            })
            .catch(error => {
                context.dispatch('processError', error)
                reject(error);
            })
        })
    },
    deletePrescription(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/PrescriptionManagement/${id}`).then(response => {
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
    allPrescriptions(state){
        return state.prescriptions;
    }
}
