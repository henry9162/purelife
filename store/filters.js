
import { filterProducts } from "../plugins/productFilters";
import { buildFilters } from '../plugins/buildFilters';

export const state = () => ({
    categories: [],
    styles: [],
    materials: [],
    colors: [],
    brands: [],
    sizes: [],
    filters: {
        size: [],
        material: [],
        style: []
    },
    filteredProducts: [],
    products: [],
    isClicked: false,
    loader: false
})

export const mutations = {
    addToFilter(state, payload) {
        if (payload.type == 'sizes') state.filters.size.push(payload.name)
        if (payload.type == 'materials') state.filters.material.push(payload.name)
        if (payload.type == 'Styles') state.filters.style.push(payload.name)
    },
    setProducts(state, data){
        state.products = data
    },
    setLoader(state, value){
        value == true ? state.loader = true : state.loader = false
    },
    removeFromFilter(state, payload){
        if (payload.type == 'sizes') state.filters.size = state.filters.size.filter(size => size != payload.name)
        if (payload.type == 'materials') state.filters.material = state.filters.material.filter(material => material != payload.name)
        if (payload.type == 'styles') state.filters.style = state.filters.style.filter(style => style != payload.name)
    },
    setFilteredProduct(state, payload) {
        state.filteredProducts = payload;
        state.isClicked = true
    },
    emptyFilteredProduct(state) {
        state.filteredProducts = []
    },
    setCategories(state, payload){
        state.categories = payload;
    }
}

export const actions = {
    addToFilter(context, payload) { context.commit('addToFilter', payload) },

    removeFromFilter(context, payload) { context.commit('removeFromFilter', payload) },

    displayBaseFilter(context, payload) {
        if (payload.type == 'category'){
            let categories = context.rootState.categories.categories
            let category = categories.find(category => category.productCategyId == payload.id);
            context.dispatch('getCategoryById', category.productCategyId)
        } 
        if (payload.type == 'search'){
            context.dispatch('getProductById', payload.id) 
        }
        // else if (payload.type == 'brand') {
        //     let brand = brands.find(brand => brand.name == payload.name);
        //     brand ? context.commit('setFilteredProduct', brand.products)  : '';
        // } 
    },
    getCategoryById(context, id){
        context.commit('setLoader', true)
        this.$axios.get(`/Products/GetProductsByCategoryId/${id}`)
            .then(response => {
                context.commit('setFilteredProduct', response.data.data) 
                context.commit('setLoader', false)
                //context.commit('setFilteredProduct', categories.productList) 
            }).catch(error => {
                console.log(error)
            }) 
    },
    getProductById(context, id){
        this.$axios.get(`/Products/GetProducts/${id}`)
            .then(response => {
                let data = []
                data.push(response.data.data)
                context.commit('setFilteredProduct', data) 
                context.commit('setLoader', false)
                //context.commit('setFilteredProduct', categories.productList) 
            }).catch(error => {
                console.log(error)
            }) 
    },
    // categoryProducts(context, categoryName) {
    //     let categories = context.state.categories
    //     let categoryProducts = categories.find(category => category.productCategyName == categoryName);
    //     categoryProducts ? context.commit('setFilteredProduct', categoryProducts.productList) : '';
    // },
    getAllCategories(context) { 
        this.$axios.get('/ProductCategory/GetAllProductCategory')
            .then(response => {
                context.commit('setCategories', response.data.data) 
            }).catch(error => {
                console.log(error)
            }) 
    },
    getAllProducts(context){
        context.commit('setLoader', true)
        this.$axios.get('/Products/GetAllProducts').then(response => {
            context.commit('setProducts', response.data.data)
            context.commit('setLoader', false)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const getters = {
    filteredProducts(state, getters) {
        let products = [];
        let filters = buildFilters(state.filters)
        if(state.filteredProducts.length < 1 && state.isClicked == false){
            products = filterProducts(state.products, filters);
        } else if(state.filteredProducts.length < 1 && state.isClicked == true) {
            products = [];
        } else {
            products = filterProducts(state.filteredProducts, filters)
        }
        return products;

        // if(state.isClicked == false){
        //     products = state.products
        // } else if(state.isClicked == true && state.filteredProducts.length < 1){
        //     products = filterProducts(state.products, filters);
        // } else if(state.isClicked == true && state.filteredProducts.length > 0){
        //     products = filterProducts(state.filteredProducts, filters);
        // }
        // return products;
    },
    getCategories(state){ return state.categories },
    getLoader(state) { return state.loader }
}
