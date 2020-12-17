export const state = () => ({
    refills: [],
    customers: [],
    refilProducts: [],
    refillPrescriptions: [],
    loader: false
})

export const mutations = {
    setRefills(state, data){
        state.refills = data
    },
    setCustomers(state, data){
        state.customers = data
    },
    setRefilProducts(state, data){
        state.refilProducts = data
    },
    setRefillPrescriptions(state, data){
        state.refillPrescriptions = data
    },
    setLoader(state, data) {
        state.loader = data;
    }
}

export const actions = {
    getAllRefills(context) {
        context.commit('setLoader', true)
        this.$axios.get('/RefillManagement/GetAllRefills')
            .then(response => {
                let data = [...response.data.data];
                context.commit('setRefills', data);
                context.commit('setLoader', false);
            }).catch(error => {
                context.dispatch('processError', error);
            })
    },
    getAllCustomers(context) {
        this.$axios.get('/ManageCustomer/GetAllCustomers')
            .then(response => {
                let data = [...response.data.data];
                context.commit('setCustomers', data);
            }).catch(error => {
                context.dispatch('processError', error);
            })
    },
    getAllProducts(context){
        this.$axios.get('/Products/GetAllProducts')
            .then(response => {
                let data = [...response.data.data];
                context.commit('setRefilProducts', data);
            }).catch(error => {
                context.dispatch('processError', error);
            })
    },
    getAllPrescriptions(context){
        this.$axios.get('/PrescriptionManagement/GetAllPrescription')
            .then(response => {
                let data = [...response.data.data];
                context.commit('setRefillPrescriptions', data);
            }).catch(error => {
                context.dispatch('processError', error);
            })
    },
    processError(context, error){
        this.$toast.error(error).goAway(3500)
    }
}

export const getters = {
    allRefills(state){
        return state.refills;
    },
    getLoader(state){
        return state.loader;
    },
    getCustomers(state) {
        return state.customers;
    },
    getProducts(state) {
        return state.refilProducts;
    },
    getPrescription(state) {
        return state.refillPrescriptions;
    }
}
