export const state = () => ({
    transactions: [],
    loader: false,
    total: 0
})

export const mutations = {
    setTransactions(state, data){
        state.transactions = data
    },
    setLoader(state, data) {
        state.loader = data;
    },
    setTotal(state, data) {
        state.total = data;
    },
}

export const actions = {
    getAllTransactions(context) {
        context.commit('setLoader', true)
        this.$axios.get('/Transaction/GetAllTransactions')
            .then(response => {
                let data = [...response.data.data];
                context.commit('setTransactions', data);

                context.commit('setLoader', false);
            }).catch(error => {
                context.dispatch('processError', error);
            })
    },
    processError(context, error){
        this.$toast.error(error).goAway(3500)
    },
    addTransaction(context, data){
        return new Promise((resolve, reject) => {
            this.$axios.post('/Transaction/AddTransaction', data).then(response => {
                context.dispatch('processResponse', response);
                context.dispatch('getAllTransactions');
                resolve(response);
            })
            .catch(error => {
                context.dispatch('processError', error);
                reject(error);
            })
        })
    },
    filterTransaction(context, data){
        this.$axios.post('/Transaction/FilterTransactionByDateAndPaymentMethod', data)
            .then(response => {
                let data = [...response.data.data.transactions];
                let total = response.data.data.totalSum;

                context.commit('setTransactions', data);
                context.commit('setTotal', total);
            })
            .catch(error => {
                context.dispatch('processError', error);
                reject(error);
            })
    },
    cancelTransaction(context, id){
        this.$axios.get(`/Transaction/RemoveTransactionSummary/${id}`).then(response => {
            this.loading = false;
            context.dispatch('processResponse', response);
            context.dispatch('getAllTransactions');
        })
        .catch(error => {
            context.dispatch('processError', error);
        })
    },
    processResponse(context, response){
        this.$toast.success(response.data.message).goAway(3500)
    }
}

export const getters = {
    allTransactions(state){
        return state.transactions;
    },
    getLoader(state){
        return state.loader;
    },
    getTotal(state){
        return state.total;
    },
}
