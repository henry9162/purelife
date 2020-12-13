export const state = () => ({
    loyaltyPoint: '',
    value: '',
    loyaltyPointToBuy: '',
    valueToBuy: '',
    loyaltySetUp: {}
})

export const mutations = {
    setLoyaltyPoint(state, value){
        state.loyaltyPoint = value
    },
    setValue(state, value){
        state.value = value
    },
    setLoyaltyPointToBuy(state, value){
        state.loyaltyPointToBuy = value
    },
    setValueToBuy(state, value){
        state.valueToBuy = value
    },
    loyaltySetUp(state, data){
        state.loyaltySetUp = data
        state.loyaltyPoint = data.toAcquire.loyaltyPoint
        state.value = data.toAcquire.value
        state.loyaltyPointToBuy = data.toBuy.loyaltyPoint
        state.valueToBuy = data.toBuy.value
    }
}

export const actions = {
    setLoyalty(context, value){
        context.commit('setLoyaltyPoint', value)
    },
    setValue(context, value){
        context.commit('setValue', value)
    },
    setLoyaltyToBuy(context, value){
        context.commit('setLoyaltyPointToBuy', value)
    },
    setValueToBuy(context, value){
        context.commit('setValueToBuy', value)
    },
    getLoyaltySetUp(context){
        this.$axios.get('/LoyaltyManagement/GetLoyaltySetup').then(response => {
            context.commit('loyaltySetUp', response.data.data)
        })
        .catch(error => {
            context.dispatch('processError', error)
        })
        
    },
    updateLoyalty(context){
        let data = {
            toAcquire: {
                id: context.state.loyaltySetUp.toAcquire.id,
                loyaltyPoint: context.state.loyaltyPoint,
                value: context.state.value,
                toAcquire: true
            },
            toBuy: {
                id:  context.state.loyaltySetUp.toBuy.id,
                loyaltyPoint: context.state.loyaltyPointToBuy,
                value: context.state.valueToBuy,
                toAcquire: false
            }
        }
        return new Promise((resolve, reject) => {
            this.$axios.post('/LoyaltyManagement/SetUpLoyaltyPoint', data).then(response => {
                context.dispatch('getLoyaltySetUp')
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
    loyaltyPoint(state){
        return state.loyaltySetUp.toAcquire.loyaltyPoint
    },
    value(state){
        return state.loyaltySetUp.toAcquire.value
    },
    loyaltyPointToBuy(state){
        return state.loyaltySetUp.toBuy.loyaltyPoint
    },
    valueToBuy(state){
        return state.loyaltySetUp.toBuy.value
    },
}
