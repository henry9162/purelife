<template>
    <modal :classes="classes" name="product-modal" :width="800" :max-width="900" :adaptive="true" :scrollable="true" :height="600" transition="fade-transition" @before-open="productDetails">
            <v-container class="pt-0 custom-modal-container" fluid>
                <v-row class="mx-0 py-4 px-4">
                    <v-col cols="12" sm="12" md="6">
                        <v-row>
                            <v-card color="grey lighten-3" flat>
                                <div class="d-flex justify-space-between">
                                    <div>
                                        <v-card-title 
                                            v-text="product.productName" 
                                            class="pt-0 blue--text text-uppercase font-weight-bold title pl-0">
                                        </v-card-title>
                                    </div>

                                    <div>
                                        <v-icon 
                                            @click="$modal.hide('product-modal')"
                                            large class="d-md-flex d-lg-none red--text">
                                            mdi-close-circle
                                        </v-icon>
                                    </div>  
                                </div>
                                
                                <zoom :img-normal="imageSelected"></zoom>
                                <!-- <v-img :aspect-ratio="16/18" :src="product.image"></v-img> -->
                            </v-card>
                        </v-row>
                        <!-- <v-row>
                            <v-col class="pl-0">
                                <v-card @click="selectImage(product.productImage)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.productImage"></v-img>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card @click="selectImage(product.productImage)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.productImage"></v-img>
                                </v-card>
                            </v-col>
                            <v-col class="pr-0">
                                <v-card @click="selectImage(product.productImage)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.productImage"></v-img>
                                </v-card>
                            </v-col>
                        </v-row> -->
                    </v-col>
                    <v-col cols="12" sm="12" md="6" class="pl-8">
                        <div class="mt-1">
                            <div class="text-left d-md-flex d-lg-none">
                                <v-btn @click="$router.push({ path: '/ProductPage', query: {productId: product.productId} })" class="mb-3" small depressed dark color="orange darken-1">
                                    More Details <v-icon small right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                            <div class="d-none d-sm-flex text-right">
                                <v-btn @click="$router.push({ path: '/ProductPage', query: {productId: product.productId} })" class="mb-3" small depressed dark color="orange darken-1">
                                    More Details <v-icon small right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                            <v-card flat class="pt-3">
                                <v-card-title class="subtitle-2 pt-1 pb-0">Description</v-card-title>
                                <v-card-text class="caption grey--text text--darken-4" v-text="product.productName"></v-card-text>
                            </v-card>
                        </div>

                        <div class="mt-3">
                            <v-card flat >
                                <v-card-text class="caption">
                                    <div><span class="subtitle-2 font-weight-bold">Quantity: </span> <span class="font-weight-bold" :class="product.quantity > 0 ? 'green--text' : 'red--text'">{{ product.quantity > 0 ? product.quantity : 'Out Of Stock' }}</span></div>
                                    <div><span class="subtitle-2 font-weight-bold">Brand: </span> <span class="blue--text" v-text="product.productBrandName"></span></div>
                                </v-card-text>
                            </v-card>
                        </div>

                        <div class="mt-3">
                            <v-card flat >
                                <v-card-text class="text-center green--text font-weight-black display-1">
                                    ${{ product.price * quantity }}
                                </v-card-text>
                            </v-card>
                        </div>

                        <div class="mt-6">
                            <div class="d-flex justify-center">
                                <div class="quantity-div">
                                    <div class="d-flex">
                                        <v-btn tile @click="updateQuantity({ product: product, type: 'decrease' })" color="blue darken-3" class="my-0 mt-4" dark x-small depressed>
                                            <v-icon x-small>mdi-minus</v-icon>
                                        </v-btn>

                                        <v-text-field class="custom-input-height" disabled dense flat solo v-model="quantity"></v-text-field>

                                        <v-btn @click="updateQuantity({ product: product, type: 'increase' })" tile color="blue darken-3 mt-0" class="my-0 mt-4" dark x-small depressed>
                                            <v-icon x-small>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                
                            <v-btn 
                                @click="addToCart({ 
                                    productId: product.productId, 
                                    productName: product.productName, 
                                    inventory: product.quantity,
                                    quantity: quantity,
                                    price: product.price * quantity,
                                    isRefill: false
                                })" 
                                class="white--text rounded-0 text-capitalize" x-large block depressed color="primary">
                                    Add to Cart <v-icon right>mdi-cart-arrow-down</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </modal>
</template>

<script>
import zoom from './zoomOnHover'
//import cart from '../../mixins/Carts.js'
import { mapState, mapGetters, mapActions } from 'vuex'
//import products from '../../plugins/products';

export default {
    components: { zoom },

    data: () => ({
        product: {},
        snackbar: false,
        imageSelected: ''
    }),

    computed: {
         ...mapGetters({
            quantity: 'productss/quantity'
        }),
        classes() {
            return ['grey lighten-3 product-modal'];
        }
    },

    methods: {
        ...mapActions({
            updateQuantity: 'productss/updateQuantity',
            addToCart: 'productss/addToCart'
        }),
        selectImage(image){
            this.imageSelected = image;
        },
        productDetails(event) {
            this.product = event.params.product;
            this.imageSelected = event.params.product.imageSrc
        },
    }
}
</script>

<style lang="scss" scoped>
    .custom-input-height {
        padding: 5px 0px !important;
    }
    .quantity-div {
        width: 40%;
    }
    .custom-modal-container {
        max-height: 600px !important;
        overflow-y: auto !important;
    }
</style>