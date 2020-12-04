// import { categories } from '../plugins/productRelatedTables'
import { filterProducts } from "../plugins/productFilters";
import { buildFilters } from '../plugins/buildFilters';
//import brands from '../plugins/brands'
//import colors from '../plugins/colors'
import subcategories from '../plugins/subcategories'
//import productss from '../plugins/products'

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
    products: []
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
    removeFromFilter(state, payload){
        if (payload.type == 'sizes') state.filters.size = state.filters.size.filter(size => size != payload.name)
        if (payload.type == 'materials') state.filters.material = state.filters.material.filter(material => material != payload.name)
        if (payload.type == 'styles') state.filters.style = state.filters.style.filter(style => style != payload.name)
    },
    setFilteredProduct(state, payload) {
        state.filteredProducts = payload;
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
            let categories = context.state.categories
            categories.find(category => category.id == payload.id);
            categories ? context.commit('setFilteredProduct', categories.productList)  : '';
        } 
        // else if (payload.type == 'brand') {
        //     let brand = brands.find(brand => brand.name == payload.name);
        //     brand ? context.commit('setFilteredProduct', brand.products)  : '';
        // } 
        // else if (payload.type == 'color') {
        //     let color = colors.find(color => color.name == payload.name);
        //     color ? context.commit('setFilteredProduct', color.products)  : '';
        // }
    },
    categoryProducts(context, categoryName) {
        let categories = context.state.categories
        let categoryProducts = categories.find(category => category.productCategyName == categoryName);
        categoryProducts ? context.commit('setFilteredProduct', categoryProducts.productList) : '';
    },
    getAllCategories(context) { 
        this.$axios.get('/ProductCategory/GetAllProductCategory')
            .then(response => {
                context.commit('setCategories', response.data.data) 
            }).catch(error => {
                console.log(error)
            }) 
    },
    getAllProducts(context){
        this.$axios.get('/Products/GetAllProducts').then(response => {
            context.commit('setProducts', response.data.data)
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
        if (state.filteredProducts.length < 1) {
            products = filterProducts(state.products, filters);
        } else {
            products = filterProducts(state.filteredProducts, filters);
        }
        return products;
    },
    getCategories(state){ return state.categories },
    // getStyles(state){ return state.styles },
    // getMaterials(state) { return state.materials },
    // getColors(state) { return state.colors },
    // getBrands(state) { return state.brands },
    // getSizes(state) { return state.sizes }
}
