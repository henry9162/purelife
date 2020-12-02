<template>
    <div>
        <!-- Filter Buttons -->
        <v-container fluid>
            <v-row class="mx-4">
                <v-col>
                    <div class="filter-products">
                        <div class="filters" >
                            <v-hover v-for="(filter, i) in filters" :key="i" v-slot:default="{ hover }">
                                <v-btn tile height="60" @click="filterButtons(filter)" x-large :class="hover || active == filter.title ? 'white--text' : 'border grey--text text--darken-3'" :color="hover || active == filter.title ? 'rgba(231, 40, 77, 1)' : ''" depressed light>
                                    <span class="font-weight-black" v-text="filter.title"></span>
                                    <div :class="active == filter.title ? 'arrow-down' : ''"></div>
                                </v-btn>
                            </v-hover>
                        </div>
                        <div class="all-categories-filter">
                            <v-hover v-slot:default="{ hover }">
                                <v-btn @click="$router.push({ name: 'allProduct' })" tile height="60" x-large :class="hover ? 'white--text' : 'border grey--text text--darken-3'" :color="hover ? 'rgba(231, 40, 77, 1)' : ''" depressed>
                                    <v-btn depressed class="mr-2" max-width="20" height="20" :color="hover ? '#fff' : 'rgba(231, 40, 77, 1)'" fab x-small dark>
                                        <v-icon :class="hover ? 'red--text' : ''" x-small>mdi-arrow-right</v-icon>
                                    </v-btn>    
                                    <span class="font-weight-black">See All Products</span> 
                                </v-btn>
                            </v-hover>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <!-- Product Cards -->
        <product-modal @cartAdded="activateSnackbar"></product-modal>

        <div class="mx-8">
            <product-list :visible="true" :gridValue="4" :products="products"></product-list>
        </div>  

    </div>
</template>

<script>
import productModal from './productModal'
import productList from '../productList'
import productss from '../../plugins/products'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: { productList, productModal },

    data: () => ({
        active: 'Latest',
        filters: [ { title:  'Latest'}, { title: 'Featured' }, { title: 'Women' }, { title: 'Men' }, { title: 'Kids' } ],
        products: [],
        snackbar: false,
    }),

    computed: {
        ...mapGetters({
            allProducts: 'products/products',
            show: 'products/show',
            productId: 'products/productId',
            quantity: 'products/quantity'
        }),
    },

    methods: {
        ...mapActions({
            toggleProductDropdown: 'products/toggleProductDropdown',
            activateSnackbar: 'products/activateSnackbar',
            addToCart: 'products/addToCart'
        }),
        
        filterButtons(filterTitle){
            this.active = filterTitle.title;
            this.selectFilter(filterTitle.title);
        },

        selectFilter(title){
            if (title == 'Latest') {
                //let all = this.allProducts
                this.products = productss;
            } 
            if (title == 'Featured') this.products = this.allProducts.filter(product => product.featured == true);
            if (title == 'Men') this.products = this.allProducts.filter(product => product.category.name == 'Men');
            if (title == 'Women') this.products = this.allProducts.filter(product => product.category.name == 'Women');
            if (title == 'Kids') this.products = this.allProducts.filter(product => product.category.name == 'Kids');
        },
    },

    mounted() {
        this.selectFilter('Latest');
    }
}
</script>

<style lang="scss" scoped>
    .filter-products {
        background: #fff;
        display: flex;
        justify-content: space-between;

        .filters {
            .border {
                border-right: 1px solid grey;
                background: white !important;
            }

            .arrow-down {
                width: 0; 
                height: 0; 
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;      
                border-top: 10px solid rgba(231, 40, 77, 1);
                position: absolute;
                top: 36px;
            }
            
        }

        .all-categories-filter {
            .border {
                border-left: 1px solid gray;
                background: white !important;
            }
        }
    }
</style>