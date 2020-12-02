import { categories } from '../plugins/productRelatedTables'
import { filterProducts } from "../plugins/productFilters";
import { buildFilters } from '../plugins/buildFilters';
//import brands from '../plugins/brands'
//import colors from '../plugins/colors'
import subcategories from '../plugins/subcategories'
import productss from '../plugins/products'

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
    filteredProducts: []
})

export const mutations = {
    addToFilter(state, payload) {
        if (payload.type == 'sizes') state.filters.size.push(payload.name)
        if (payload.type == 'materials') state.filters.material.push(payload.name)
        if (payload.type == 'Styles') state.filters.style.push(payload.name)
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
    },
    setStyles(state, payload) {
        state.styles = payload;
    },
    setMaterials(state, payload) {
        state.materials = payload;
    },
    setColors(state, payload) {
        state.colors = payload;
    },
    setBrands(state, payload) {
        state.brands = payload;
    },
    setSizes(state, payload) {
        state.sizes = payload;
    }
}

export const actions = {
    addToFilter(context, payload) { context.commit('addToFilter', payload) },

    removeFromFilter(context, payload) { context.commit('removeFromFilter', payload) },

    displayBaseFilter(context, payload) {
        if (payload.type == 'subcategory'){
            let subcategory = subcategories.find(subcategory => subcategory.id == payload.id);
            subcategory ? context.commit('setFilteredProduct', subcategory.products)  : '';
        } 
        else if (payload.type == 'brand') {
            let brand = brands.find(brand => brand.name == payload.name);
            brand ? context.commit('setFilteredProduct', brand.products)  : '';
        } 
        else if (payload.type == 'color') {
            let color = colors.find(color => color.name == payload.name);
            color ? context.commit('setFilteredProduct', color.products)  : '';
        }
    },
    categoryProducts(context, categoryName) {
        let categoryProducts = categories.find(category => category.name == categoryName);
        categoryProducts ? context.commit('setFilteredProduct', categoryProducts.products) : '';
    },
    getAllCategories(context) { context.commit('setCategories', categories) },
    // getAllStyles(context) { context.commit('setStyles', styles) },
    // getAllMaterials(context) { context.commit('setMaterials', materials) },
    // getAllColors(context) { context.commit('setColors', colors) },
    // getAllBrands(context) { context.commit('setBrands', brands) },
    // getAllSizes(context) { context.commit('setSizes', sizes) }
}

export const getters = {
    filteredProducts(state, getters) {
        let products = [];
        let filters = buildFilters(state.filters)
        if (state.filteredProducts.length < 1) {
            //debugger
            products = filterProducts(productss, filters);
            //products = filterProducts(getters.products, filters);
        } else {
            products = filterProducts(state.filteredProducts, filters);
        }
        return products;
    },
    getCategories(state){ return state.categories },
    getStyles(state){ return state.styles },
    getMaterials(state) { return state.materials },
    getColors(state) { return state.colors },
    getBrands(state) { return state.brands },
    getSizes(state) { return state.sizes }
}
