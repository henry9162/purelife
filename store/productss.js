export const state = () => ({
    products: [],
    cart: [],
    quantity: 1,
    productId: '',
    show: false,
})

export const mutations = {
    setProducts(state, data){
        state.products = data
    },
    toggleShow(state, id){
        state.productId = id
        state.show = !state.show
    },
    updateQuantity(state, data) {
        if ( data.type == 'increase') state.quantity < data.product.quantity ? state.quantity++ : '';
        if ( data.type == 'decrease') state.quantity != 1 ? state.quantity-- : state.quantity = 1;    
    },
    addToCart(state, cartData) {
        state.cart.push(cartData)
        localStorage.setItem('cartItem', JSON.stringify(state.cart))
        state.quantity = 1;
    },
    removeItem (state, id) {
        const cartItem = state.cart.find(item => item.productId === id);
        state.cart.splice(state.cart.indexOf(cartItem), 1);
    },
    increaseCartItemQuantity(state, data) {
        data.cartItem.quantity += data.quantity;
        state.quantity = 1;
    }
}

export const actions = {
    // getAllProducts(context){
    //     context.commit('setProducts', products);
    // },
    toggleProductDropdown(context, id) {
        context.commit('toggleShow', id)
    },
    persistCart(context) {
        let storedCartItem = JSON.parse(localStorage.getItem('cartItem'));
        if (storedCartItem) {
            storedCartItem.forEach(cartItem => {
                context.commit('addToCart', cartItem);
            })
        }
    },
    addToCart(context, cartItemData) {
        let cartItem = context.state.cart.find(cartItem => cartItem.productId == cartItemData.productId);
        if (!cartItem) {
            if (cartItemData.inventory < 1) {
                let info = { message: 'This product is out of stock', color: 'red' }
                //.dispatch('activateSnackbar', info, {root:true})
                context.dispatch('activateSnackbar', info);
            } else {
                context.commit('addToCart', cartItemData)
                context.dispatch('activateSnackbar');
            }
        } else {
            context.commit('increaseCartItemQuantity', { cartItem: cartItem, quantity: cartItemData.quantity })
            let info = { message: 'Product quantity was increased', color: 'info' }
            context.dispatch('activateSnackbar', info);
        }
    },
    removeCartItem(context, cartId) {
        context.commit('removeItem', cartId);
    },
    activateSnackbar(context, info = null){
        context.commit('displayAlert', {
            message: info ? info.message : 'Product was added cart successfully',
            color: info ? info.color : 'success'
        }, {root: true});
    },
    updateQuantity(context, data) {
        context.commit('updateQuantity', data);
    },
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
    },
    products(state) { return state.products },

    show(state) { return state.show },

    productId(state) { return state.productId },

    quantity(state) { 
        return state.quantity 
    },

    numberOfCartItems(state) { return state.cart.length },

    cartProducts(state) {
        if (state.cart.length > 0) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.productId == cartItem.productId);
                return {
                    productId: product.productId,
                    title: product.productName,
                    price: product.price,
                    image_front: product.productImage,
                    quantity: cartItem.quantity
                };
            })
        }
    },

    cartTotal(state, getters) {
        let total = 0
        if (getters.cartProducts){
            getters.cartProducts.forEach(product => {
                total = total + product.price * product.quantity
            });
        }
        return total;
    }
}
