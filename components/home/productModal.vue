<template>
    <modal :classes="classes" name="product-modal" :min-width="700" :max-width="900" :adaptive="true" :scrollable="true" height="auto" transition="fade-transition" @before-open="productDetails">
            <v-container class="pt-0" fluid>
                <v-row class="mx-0">
                    <v-col>
                        <v-row>
                            <v-card color="grey lighten-3" flat>
                                <v-card-title v-text="product.title" class="pt-0 title pl-0"></v-card-title>
                                <zoom :img-normal="imageSelected"></zoom>
                                <!-- <v-img :aspect-ratio="16/18" :src="product.image"></v-img> -->
                            </v-card>
                        </v-row>
                        <v-row>
                            <v-col class="pl-0">
                                <v-card @click="selectImage(product.image_front)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.image_front"></v-img>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card @click="selectImage(product.image_back)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.image_back"></v-img>
                                </v-card>
                            </v-col>
                            <v-col class="pr-0">
                                <v-card @click="selectImage(product.image_side)" tile flat max-width="100" color="white">
                                    <v-img :aspect-ratio="16/16" :src="product.image_side"></v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <div>
                            <div class="text-right">
                                <v-btn @click="$router.push({ path: '/ProductPage', query: {productId: product.id} })" class="mb-3" small depressed dark color="orange darken-1">
                                    More Details <v-icon small right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                            <v-card flat class="pt-3">
                                <v-card-title class="subtitle-2 pt-1 pb-0">Description</v-card-title>
                                <v-card-text class="caption grey--text text--darken-4" v-text="product.description"></v-card-text>
                            </v-card>
                        </div>

                        <div class="mt-3">
                            <v-card flat >
                                <v-card-text class="caption">
                                    <div><span class="subtitle-2 font-weight-bold">Quantity: </span> <span class="font-weight-bold" :class="product.inventory > 0 ? 'green--text' : 'red--text'">{{ product.inventory > 0 ? product.inventory : 'Out Of Stock' }}</span></div>
                                    <div><span class="subtitle-2 font-weight-bold">Brand: </span> <span class="blue--text">Example Brand</span></div>
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

                        <div class="mt-6 d-flex justify-space-between">
                            <div class="d-flex">
                                <v-btn tile @click="updateQuantity({ product: product, type: 'decrease' })" color="blue darken-3" class="my-0 mt-4" dark x-small depressed>
                                    <v-icon x-small>mdi-minus</v-icon>
                                </v-btn>

                                <v-text-field class="custom-input-height" dense flat solo v-model="quantity"></v-text-field>

                                <v-btn @click="updateQuantity({ product: product, type: 'increase' })" tile color="blue darken-3 mt-0" class="my-0 mt-4" dark x-small depressed>
                                    <v-icon x-small>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                    
                            <v-btn @click="addToCart({ productId: product.id, quantity: quantity })" tile class="ml-6 mt-1" large depressed color="primary" dark>
                                <v-icon left>mdi-cart-arrow-down</v-icon> Add to Cart
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
import products from '../../plugins/products';

export default {
    components: { zoom },

    data: () => ({
        product: {},
        snackbar: false,
        imageSelected: ''
    }),

    computed: {
         ...mapGetters({
            quantity: 'products/quantity'
        }),
        classes() {
            return ['grey lighten-3'];
        }
    },

    methods: {
        ...mapActions({
            updateQuantity: 'products/updateQuantity',
            addToCart: 'products/addToCart'
        }),
        selectImage(image){
            this.imageSelected = image;
        },
        productDetails(event) {
            this.product = event.params.product;
            this.imageSelected = event.params.product.image_front
        },
    }
}
</script>

<style lang="scss" scoped>
    .custom-input-height {
        padding: 5px 0px !important;
    }
</style>