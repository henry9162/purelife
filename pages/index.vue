<template>
    <div>
        <!-- Breadcrumbs -->
        <!-- <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div> -->

        <!-- <loading 
            :active.sync="isLoading" 
            :can-cancel="true" 
            :is-full-page="fullPage">
        </loading> -->

        <!-- Product title parallax -->
        <titleParalax class="post-caption">{{ $route.query.name ? $route.query.name : 'All-Product' }}</titleParalax>

        <v-container class="white px-0 pt-0 pb-0" fluid>
            <v-row class="white mx-0 px-0 pb-0">
                <transition enter-active-class="animated pulse" mode="out-in">
                    <v-col v-if="visible" class="px-0" md="3" style="border-right: 1px solid lightgrey">
                        <div class="px-4 pt-2">
                            <div class="post-caption font-weight-bold text-uppercase">Filters</div>
                            <v-divider class="mt-2"></v-divider>
                        </div>
                        <!-- Price -->
                        <div class="px-4 pt-2">
                            <v-list>
                                <v-list-group v-model="expandPrice" no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div class="grey--text text--darken-2 post-caption font-weight-bold">Price</div>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    <v-list-item class="pl-0" @click="">
                                        <v-list-item-content>
                                            <div class="px-3">
                                                <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center"></v-range-slider>
                                                <div class="d-flex justify-space-between">
                                                    <div>
                                                        <v-text-field v-model="range[0]" class="mt-0 pt-0" prepend-icon="mdi-currency-ngn" hide-details single-line type="number" style="width: 100px"></v-text-field>
                                                    </div>
                                                    <div>
                                                        <v-text-field v-model="range[1]" class="mt-0 pt-0" prepend-icon="mdi-currency-ngn" hide-details single-line type="number" style="width: 100px"></v-text-field>
                                                    </div>   
                                                </div>    
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-group>
                            </v-list>
                        </div>
                        <!-- Availability -->
                        <!-- <div class="px-4">
                            <v-list class="pb-0">
                                <v-list-group v-model="expandAvailability" no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div class="grey--text text--darken-2 font-weight-bold">Availability</div>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    <v-list-item class="pl-0 pb-0" @click="">
                                        <v-list-item-content class="pb-0">
                                            <div class="px-3">
                                                <v-checkbox class="mt-0" v-model="inStock" label="In Stock"></v-checkbox>
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-group>
                            </v-list>
                        </div> -->
                        <!-- Categories -->
                        <div class="px-4">
                             <v-list class="pb-0">
                                <v-list-group v-model="expandCategories" no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div class="grey--text text--darken-2 post-caption font-weight-bold">Categories</div>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    <v-list-item class="pl-10 post-caption" v-for="(category, i) in categories" :key="i" @click="">
                                        <v-list-item-title @click="$store.dispatch('filters/displayBaseFilter', { name: category.productCategyName, id: category.productCategyId, type: 'category' });" v-text="category.productCategyName"></v-list-item-title>
                                    </v-list-item>
                                    <!-- <v-list-item class="pl-0 pb-0" @click="">
                                        <v-list-item-content class="pb-0">
                                            <div class="px-3">
                                                <v-checkbox class="mt-0" v-model="inStock" label="In Stock"></v-checkbox>
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item> -->
                                </v-list-group>
                            </v-list>


                            <!-- <v-list>
                                <v-list-group v-model="expandCategories">
                                    <template v-slot:activator>
                                        <v-list-item-title>
                                            <div class="grey--text text--darken-2 font-weight-bold">Categories</div>
                                        </v-list-item-title>
                                    </template>

                                    <v-list-group v-for="(category, i) in categories" :key="i" no-action sub-group>
                                        <template v-slot:activator>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="category.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>

                                        <v-list-item v-for="(subcategory, index) in category.subcategories" :key="index" @click="">
                                            <v-list-item-title @click="$store.dispatch('filters/displayBaseFilter', { name: subcategory.name, id: subcategory.id, type: 'subcategory' });" v-text="subcategory.name"></v-list-item-title>
                                        </v-list-item>
                                    </v-list-group>
                                </v-list-group>
                            </v-list> -->
                        </div>
                    </v-col>
                </transition>

                <!-- Products lists -->
                <v-col :md="visible ? '9' : '12'">
                    <div class="header mt-5 mb-2">
                        <div class="d-flex px-2 justify-space-between">
                            <div>
                                <v-btn v-if="visible" depressed @click="toggleVisibility('hidden')" small tile color="red" dark>
                                    <v-icon small left>mdi-arrow-left</v-icon> Hide Filter
                                </v-btn>
                                <v-btn v-if="!visible" depressed @click="toggleVisibility('open')" small tile color="blue" dark>
                                    Open Filter <v-icon small right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                            <div class="d-flex">
                                <div class="blue--text mt-1 mr-2">Change Layout</div>
                                <div class="d-flex">
                                    <v-tooltip color="primary" top>
                                        <template v-slot:activator="{ on }">                                   
                                            <v-icon class="font-weight-bold mx-2 black--text" @click="changeGrid('3')" v-on="on">mdi-format-list-bulleted</v-icon>                                   
                                        </template>
                                        <span>3 Grid View</span>
                                    </v-tooltip>

                                    <v-tooltip color="primary" top>
                                        <template v-slot:activator="{ on }">                                   
                                            <v-icon class="font-weight-bold black--text mx-2" @click="changeGrid('4')" v-on="on">mdi-filter-variant</v-icon>                               
                                        </template>
                                        <span>4 Grid View</span>
                                    </v-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Product Cards -->
                    <product-modal @cartAdded="$store.dispatch('activateSnackbar')"></product-modal>
                    <transition enter-active-class="animated pulse" leave-active-class="animated fadeOut" mode="out-in">
                        <product-list :visible="visible" :gridValue="gridValue" :products="products"></product-list>
                    </transition>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import titleParalax from '../components/TitleParalax'
import productModal from '../components/home/productModal'
import productList from '../components/productList'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'home',
    components: { titleParalax, productModal, productList },

    data: () => ({
        expandPrice: true,
        expandAvailability: false,
        expandCategories: true,
        expandSizes: true,
        expandMaterials: false,
        expandStyles: true,
        expandBrands: false,
        expandColors: true,
        min: 0,
        max: 30000,
        range: [0, 30000],
        inStock: false,
        outOfStock: false,
        open: false,
        gridValue: '',
        visible: true,
        items: [
            {
                text: 'Shop/Order',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
        fullPage: true
    }),

    computed: {
        ...mapGetters({
            allProducts: 'filters/filteredProducts',
            categories: 'filters/getCategories',
            isLoading: 'filters/getLoader'
        }),
        products(){
            return this.getAllProducts().filter(product => {
                return this.inStock ? product.price > this.range[0] && product.price < this.range[1] && product.quantity > 0 : product.price > this.range[0] && product.price < this.range[1];
            })
        }
    },

     methods: {
        //Please change the ordering later
        getAllProducts() { return this.allProducts.sort((a, b) => (a.date > b.date) ? 1 : -1); }, 

        // onChangeSelectbox(event, name, type) {
        //     let payload = { name: name, type: type}
        //     if (event) {
        //         this.$store.dispatch('addToFilter', payload);
        //     } else {
        //         this.$store.dispatch('removeFromFilter', payload);
        //     }
        // },

        changeGrid(value) {
            this.gridValue = value
        },

        toggleVisibility(mode) {
            if (mode == 'hidden') this.visible = false
            if (mode == 'open') this.visible = true
        },
        initialise(){
           // this.$store.dispatch('productss/persistCart');
             let name = this.$route.query.name;
            if (name) {
                this.$store.dispatch('filters/categoryProducts', name)
                this.expandCategories = true
            } else {
                this.$store.commit('filters/emptyFilteredProduct');
            }
        }
    },

    mounted() {
        this.initialise()
    }
}

</script>

<style lang="scss">
    .post-caption {
        font-family: light-font(family);
        font-weight: 100 !important;
    }
</style>
