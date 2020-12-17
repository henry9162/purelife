export const state = () => ({
    products: [],
    product: {},
    cart: [],
    quantity: 1,
    productId: '',
    show: false,
    loader: false
})

export const mutations = {
    setProducts(state, data){
        state.products = data
    },
    setLoader(state, value){
        value == true ? state.loader = true : state.loader = false
    },
    setProduct(state, data){
        state.product = data
    },
    toggleShow(state, id){
        state.productId = id
        state.show = !state.show
    },
    updateCartQuantity(state, data){
        if(state.cart.length > 0){
            const cartItem = state.cart.find(item => data.product.productId == item.productId)
            const index = state.cart.indexOf(cartItem)
            if(data.type == 'increase'){
                state.cart[index].quantity < state.cart[index].inventory ? state.cart[index].quantity++ : ''
            } 
            else if(data.type == 'decrease'){
                state.cart[index].quantity != 1 ? state.cart[index].quantity-- : state.cart[index].quantity = 1
            }
        }
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
    persistCart(state, cartItems){
        state.cart = cartItems
    },
    removeItem (state, id) {
        const cartItem = state.cart.find(item => item.productId === id);
        state.cart.splice(state.cart.indexOf(cartItem), 1);
        localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    removeAllItems (state) {
        state.cart = [];
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
        debugger
        if(process.client){
            let storedCartItems = JSON.parse(localStorage.getItem('cartItem'));
            if (storedCartItems) {
                context.commit('persistCart', storedCartItems);
            }
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
    removeAllCartItems(context){
        context.commit('removeAllItems');
    },
    activateSnackbar(context, info = null){
        context.commit('displayAlert', {
            message: info ? info.message : 'Product was added cart successfully',
            color: info ? info.color : 'success'
        }, {root: true});
    },
    updateCartQuantity(context, data) {
        context.commit('updateCartQuantity', data);
    },
    updateQuantity(context, data) {
        context.commit('updateQuantity', data);
    },
    getAllProducts(context){
        debugger
        context.commit('setLoader', true)
        this.$axios.get('/Products/GetAllProducts')
            .then(response => {
                context.commit('setProducts', response.data.data)
                context.commit('setLoader', false)
                context.dispatch('persistCart')
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    getProductById(context, id){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/Products/GetProducts/${id}`)
                .then(response => {
                    context.commit('setProduct', response.data.data)
                    resolve(response)
                }).catch(error => {
                    context.dispatch('processError', error)
                    reject(error)
                })
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
        console.log(data);
        return new Promise((resolve, reject) => {
            this.$axios.put(`/Products/${data.id}`, data.data, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
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

    product(state) { return state.product },

    show(state) { return state.show },

    productId(state) { return state.productId },

    quantity(state) { 
        return state.quantity 
    },

    numberOfCartItems(state) { 
        return state.cart.length 
    },

    cartProducts(state) {
        if (state.cart.length > 0) {
            return state.cart.map(cartItem => {
                debugger
                const product = state.products.find(product => product.productId == cartItem.productId);
                return {
                    productId: product.productId,
                    title: product.productName,
                    price: product.price,
                    image_front: product.productImage,
                    quantity: cartItem.quantity,
                    inventory: cartItem.inventory
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
    },
    getLoader(state){
        return state.loader
    }
}
