export const state = () => ({
    products: [],
    product: {},
    cart: [],
    billInfo: {},
    productPreview: [],
    quantity: 1,
    productId: '',
    show: false,
    loader: false,
    billInfo: '',
    transSummary: '',
    stateName: '',
    transProducts: [],
    transProductsByUser: [],
    expiredProducts: [],
    productsAboutToExpire: [],
    outOfStockProducts: []
})

export const mutations = {
    setProducts(state, data){
        state.products = data
    },
    setexpiredProducts(state, data){
        state.expiredProducts = data
    },
    setOutOfStockProducts(state, data){
        state.outOfStockProducts = data
    },
    setLoader(state, value){
        value == true ? state.loader = true : state.loader = false
    },
    setProduct(state, data){
        state.product = data
    },
    setPreview(state, data){
        state.billInfo = data.billInfo
        state.productPreview = data.cart
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
                localStorage.setItem('cartItem', JSON.stringify(state.cart))
            } 
            else if(data.type == 'decrease'){
                state.cart[index].quantity != 1 ? state.cart[index].quantity-- : state.cart[index].quantity = 1
                localStorage.setItem('cartItem', JSON.stringify(state.cart))
            }
        }
    },
    updateCartRefill(state, data){
        if(state.cart.length > 0){
            const cartItem = state.cart.find(item => data.product.productId == item.productId)
            const index = state.cart.indexOf(cartItem)
            if(state.cart[index].isRefill == false){
                state.cart[index].isRefill = true
                localStorage.setItem('cartItem', JSON.stringify(state.cart))
            } else {
                state.cart[index].isRefill = false
                localStorage.setItem('cartItem', JSON.stringify(state.cart))
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
        localStorage.removeItem('cartItem');
    },
    increaseCartItemQuantity(state, data) {
        data.cartItem.quantity += data.quantity;
        state.quantity = 1;
        localStorage.setItem('cartItem', JSON.stringify(state.cart))
    },
    setTransaction(state, data){
        state.billInfo = data.billingInfo
        state.transSummary = data.transSummary
        state.transProducts = data.products
        state.stateName = data.state.stateName
    },
    setTransactionByUserId(state, data){
        state.transProductsByUser = data
    },
    setProductsAboutToExpire(state, data){
        state.productsAboutToExpire = data
    }
}

export const actions = {
    toggleProductDropdown(context, id) {
        context.commit('toggleShow', id)
    },
    persistCart(context) {
        if(this.$auth.loggedIn){
            this.$axios.get(`/Cart/GetCartByUserId/${this.$auth.user.userId}`)
            .then(response => {
                // console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }

        if(process.client){
            let storedCartItems = JSON.parse(localStorage.getItem('cartItem'));
            if (storedCartItems) {
                context.commit('persistCart', storedCartItems);
            }
        }
    },
    persistToDb(context, cartData){
        if(this.$auth.loggedIn){
            let data = {
                productId: cartData.productId,
                inventory: cartData.inventory,
                quantity: cartData.quantity,
                price: cartData.price,
                userId: this.$auth.user.userId
            }
            this.$axios.post('/Cart', data).then(response => {
            //    console.log(response)
            }).catch(error => {
                console.log(error)
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
                context.dispatch('persistToDb', cartItemData)
            }
        } else {
            if(cartItemData.inventory < 1){
                let info = { message: 'This product is out of stock', color: 'red' }
                context.dispatch('activateSnackbar', info);
            } else {
                context.commit('increaseCartItemQuantity', { cartItem: cartItem, quantity: cartItemData.quantity })
                let info = { message: 'Product quantity was increased', color: 'info' }
                context.dispatch('activateSnackbar', info);
            } 
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
    updateCartRefill(context, data){
        context.commit('updateCartRefill', data);
    },
    updateQuantity(context, data) {
        context.commit('updateQuantity', data);
    },
    getAllProducts(context){
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
    getExpiredProducts(context){
        context.commit('setLoader', true)
        this.$axios.get('/Products/GetExpiredProducts')
            .then(response => {
                context.commit('setexpiredProducts', response.data.data)
                context.commit('setLoader', false)
            }).catch(error => {
                context.commit('setLoader', false)
                context.dispatch('processError', error)
            })
    },
    getOutOfStockProducts(context){
        context.commit('setLoader', true)
        this.$axios.get('/Products/GetOutOfStockProducts')
            .then(response => {
                context.commit('setOutOfStockProducts', response.data.data)
                context.commit('setLoader', false)
            }).catch(error => {
                context.commit('setLoader', false)
                context.dispatch('processError', error)
            })
    },
    getProductsAboutToExpire(context, data){
        context.commit('setLoader', true)
        var date1;
        var date2;
        if(data == null){
            date1 = new Date().toISOString().substr(0, 10);
            date2 = new Date(); 
            date2.setDate(date2.getDate() + 120);
            date2 = date2.toISOString().substr(0, 10);
        } else {
            date1 = data.date1;
            date2 = data.date2;
        }
        this.$axios.get(`/Products/GetProductsAboutToExpire/${date1}/${date2}`)
            .then(response => {
                context.commit('setProductsAboutToExpire', response.data.data)
                context.commit('setLoader', false)
            }).catch(error => {
                context.commit('setLoader', false)
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
            this.$axios.post('/Products', data, {
                'headers': {
                    'Content-type': 'multipart/form-data'
                } 
            }).then(response => {
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
        // console.log(data);
        return new Promise((resolve, reject) => {
            this.$axios.put(`/Products/${data.id}`, data.data, {
                'headers': {
                    'Content-Type': 'multipart/form-data'
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
    getTransactionById(context, id){
        this.$axios.get(`/Transaction/GetTransactionSummaryById/${id}`)
            .then(response => {
                context.commit('setTransaction', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    getTransactionByUserId(context, userId){
        this.$axios.get(`/Transaction/GetAllTransactionsByUserId/${userId}`)
            .then(response => {
                context.commit('setTransactionByUserId', response.data.data)
            }).catch(error => {
                context.dispatch('processError', error)
            })
    },
    addTransaction(context, data){
        return new Promise((resolve, reject) => {
            let payload = {
                transactionStatusId: data.transactionStatusId,
                totalSum: data.totalSum,
                methodOfPaymentId: data.methodOfPaymentId,
                userId: data.userId,
                itemsCount: data.itemsCount,
                transactionId: data.transactionId,
                isRemoved: data.isRemoved,
                billingInformation: {
                    fullName: data.fullName,
                    email: data.email,
                    address: data.address,
                    stateId: data.stateId,
                    userId: data.userId
                },
                products: data.products
            }
            this.$axios.post('/Transaction/AddTransaction', payload)
                .then(response => {
                    if(response.data.state === -3){
                        this.$toast.error(response.data.message).goAway(4000); 
                    } else {
                        resolve(response)
                    }
                }).catch(error => {
                    context.dispatch('processError', error)
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
                const product = state.products.find(product => product.productId == cartItem.productId);
                return {
                    productId: !product ? '' : product.productId,
                    title: !product ? '' : product.productName,
                    price: !product ? '' : product.price,
                    image_front: !product ? '' : product.imageSrc,
                    quantity: cartItem.quantity,
                    inventory: cartItem.inventory,
                    packageName: !product ? '' : product.productPackageName,
                    brandName: !product ? '' : product.productBrandName,
                    isRefill: cartItem.isRefill
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
    cartCheckout(state){
        if (state.cart.length > 0) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.productId == cartItem.productId);
                return {
                    productId: product.productId,
                    price: product.price,
                    quantity: cartItem.quantity,
                    isRefil: cartItem.isRefill
                };
            })
        }
    },
    getLoader(state){
        return state.loader
    },
    billInfo(state){
        return state.billInfo
    },
    productPreview(state){
        return state.productPreview
    },
    transactionBillInfo(state){
        return state.billInfo
    },
    transactionSummary(state){
        return state.transSummary
    },
    transactionProducts(state){
        return state.transProducts
    },
    stateName(state){
        return state.stateName
    },
    transProductsByUser(state){
        return state.transProductsByUser
    },
    expiredProducts(state){
        return state.expiredProducts
    },
    expiredProductsCount(state){
        return state.expiredProducts.length
    },
    productsAboutToExpire(state){
        return state.productsAboutToExpire
    },
    productsAboutToExpireCount(state){
        return state.productsAboutToExpire.length
    },
    outOfStockProducts(state){
        return state.outOfStockProducts
    },
    outOfStockCount(state){
        return state.outOfStockProducts.length
    }
}
