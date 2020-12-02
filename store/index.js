export const state = () => ({
    loader: false,
    snackBar: false,
    alertMessage: '',
    alertColor: '',
    states: [],
    lgas: []
})

export const mutations = {
    setLoader(state, data){
       data.state == true ? state.loader = true : state.loader = false
    },
    displayAlert(state, alertData){
        state.snackBar = true;
        state.alertMessage = alertData.message;
        state.alertColor = alertData.color
    },
    hideAlert(state){
        state.snackBar = false;
    },
    setStates(state, data){
        state.states = data
    },
    setLgas(state, data){
        state.lgas = data
    }
}

export const actions = {
    getAllStates(context){
      this.$axios.get('/CommonMethod/GetAllStates')
        .then(response => {
            context.commit('setStates', response.data.data)
        }).catch(error => {
            this.$toast.error(error).goAway(3500)
        })
    },
    getLga(context, id){
      this.$axios.get(`/CommonMethod/GetLGAsByState/${id}`)
        .then(response => {
            context.commit('setLgas', response.data.data)
        }).catch(error => {
            this.$toast.error(error).goAway(3500)
        })
    }
}

export const getters = {
    snackBar(state){
        return state.snackBar;
    },
    alertMessage(state){
        return state.alertMessage;
    },
    alertColor(state) {
        return state.alertColor;
    },
    loader(state){
        return state.loader
    },
    allStates(state){
        return state.states
    },
    allLgas(state){
        return state.lgas
    }
}
