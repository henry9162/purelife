export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, data){
      state.products = data
  }
}

export const actions = {
  getAllProducts(context){
      this.$axios.get('/Products/GetAllProducts')
          .then(response => {
              context.commit('setProducts', response.data.data)
          }).catch(error => {
              context.dispatch('processError', error)
          })
  },
  addProduct(context, data){
      return new Promise((resolve, reject) => {
          this.$axios.post('/Products', data).then(response => {
              context.dispatch('processResponse', response)
              resolve(response)
          })
          .catch(error => {
              context.dispatch('processError', error)
              reject(error)
          })
      })
  },
  updateProduct(context, data){
      return new Promise((resolve, reject) => {
          this.$axios.put(`/Products/${data.productId}`, data).then(response => {
              context.dispatch('processResponse', response)
              resolve(response)
          })
          .catch(error => {
              context.dispatch('processError', error)
              reject(error);
          })
      })
  },
  deleteProduct(context, id){
      return new Promise((resolve, reject) => {
          this.$axios.delete(`/Products/${id}`).then(response => {
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
  allProducts(state){
      return state.products;
  }
}
