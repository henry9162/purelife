export const state = () => ({
    products: [],
    totalQuantity: 0
})

export const mutations = {
    setProducts(state, data){
        let productIndex = state.products.findIndex(el => el.serial == data.serial);
        if (productIndex > -1){
            if (data.type == "increase"){
                state.products[productIndex].quantity += 1;
                state.products[productIndex].total = state.products[productIndex].quantity * state.products[productIndex].unitPrice;
            } else {

                if (state.products[productIndex].quantity > 0){
                    state.products[productIndex].quantity -= 1;
                    state.products[productIndex].total = state.products[productIndex].quantity * state.products[productIndex].unitPrice;
                }
            }
            
        } else {
            delete data.type;
            state.products.push(data);
        }
    },
    removePOSItem(state, serial){
        let productIndex = state.products.findIndex(product => product.serial == serial);
        if (productIndex > -1) {
            state.products.splice(productIndex, 1);
        }
    },
    clearProducts(state) {
        state.products = [];
    }
}

export const actions = {
    updateQuantity(context, payload) {
        let item = payload.product;
        let type = payload.type;
        item = { ...item, type};
        
        context.commit("setProducts", item);
        
    },
    removeItem(context, serial) {
        context.commit("removePOSItem", serial);
    },
    getProduct(context, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get('/Products/GetPOSBySerialNumber/' + payload)
                .then(response => {
                    let data = response.data.data;
                    if (data.quantity < 1){
                        this.$toast.error("Product not in stock").goAway(5000)
                    } else {
                        let dataToSend = {
                            productName: data.productName,
                            quantity: 1,
                            serial: data.serialNumber,
                            unitPrice: data.price,
                            total: data.price,
                            type: "increase"
                        };

                        context.commit("setProducts", dataToSend);
                    }

                    this.scanning = false;
                    document.getElementById("scanInput").style.display = "block";
                    document.getElementById("mdlText").style.display = "block";
                    document.getElementById("mdlSpinner").style.display = "none";
                    document.querySelector("#barcoeMdl .v-input__append-inner button").click()
                    document.getElementById("scanInput").focus();
                    this.scanNumber = 0;
                    resolve(response);
            }).catch(error => {
                context.dispatch('processError', error);
                reject(error);
            })
        })
    },
    getProductByCode(context, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/Products/GetProductsBySerialNumber/${payload}`)
                .then(response => {
                    resolve(response);
                }).catch(error => {
                    context.dispatch('processError', error);
                    reject(error);
                })
        })
    },
    processPayment(context, payload){
        return new Promise((resolve, reject) => {
            this.$axios.post('/Transaction/AddTransaction', payload)
                .then(response => {
                    let data = response.data.data;
                    console.log(data);
                    resolve(response);
            }).catch(error => {
                context.dispatch('processError', error);
                reject(error);
            })
        })
    },
    processError(context, error){
        this.$toast.error(error).goAway(3500)
    },
    clearProducts({commit}){
        commit("clearProducts");
    }

}

export const getters = {
    allProducts(state){
        return state.products;
    },
    totalPrice(state){
        let price = 0;
        state.products.map(el => {
            price += el["quantity"] * el["unitPrice"]
        });

        return price;
    },
    totalQuantity(state){
        let quantity = 0;
        state.products.map(el => {
            quantity += el["quantity"];
        });

        return quantity;
    }
}
