export const state = () => ({
  branches: [],
})

export const mutations = {
  setBranches(state, data){
      state.branches = data
  }
}

export const actions = {
  getAllBranches(context){
      this.$axios.get('/PharmacyBranch/GetAllPharmacyBranch')
          .then(response => {
              context.commit('setBranches', response.data.data)
          }).catch(error => {
              context.dispatch('processError', error)
          })
  },
  addBranch(context, data){
      return new Promise((resolve, reject) => {
          this.$axios.post('/PharmacyBranch/AddPharmacyBranch', data).then(response => {
              context.dispatch('processResponse', response)
              resolve(response)
          })
          .catch(error => {
              context.dispatch('processError', error)
              reject(error)
          })
      })
  },
  updateBranch(context, data){
      return new Promise((resolve, reject) => {
          this.$axios.put(`/PharmacyBranch/${data.pharmacyBranchId}`, data).then(response => {
              context.dispatch('processResponse', response)
              resolve(response)
          })
          .catch(error => {
              context.dispatch('processError', error)
              reject(error);
          })
      })
  },
  deleteBranch(context, id){
      return new Promise((resolve, reject) => {
          this.$axios.delete(`/PharmacyBranch/${id}`).then(response => {
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
  allBranches(state){
      return state.branches;
  }
}
