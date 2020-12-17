<template>
    <div>
        <!-- Breadcrumbs -->
        <!-- <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div> -->

        <loading 
            :active.sync="isLoading" 
            :can-cancel="true" 
            :is-full-page="fullPage">
        </loading>

        <!-- Product title parallax -->
        <title-paralax>{{ product.productName }}</title-paralax>

        <!-- Product Details -->
        <v-container class="pt-3 my-5">
            <v-row v-if="product" class="mx-1">

                <!-- Image Side Views section -->
                <!-- <v-col class="px-0" md="1">
                    <div>
                        <v-card @click="selectImage(product.productImage)" tile flat max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.productImage"></v-img>
                        </v-card>

                        <v-card @click="selectImage(product.productImage)" tile flat class="my-4" max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.productImage"></v-img>
                        </v-card>

                        <v-card @click="selectImage(product.productImage)" tile flat max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.productImage"></v-img>
                        </v-card>
                    </div>
                </v-col> -->

                <!-- Zoomable Image -->
                <v-col md="6">
                    <v-card v-if="product.productImage" tile color="white">
                        <zoom :img-normal="product.productImage" :scale="2"></zoom>
                    </v-card>
                    <v-card tile color="inherit" v-else>
                        <v-img :src="defaultImage"></v-img>
                    </v-card>
                </v-col>

                <!-- Product Description And Specification -->
                <v-col md="6" class="px-15">
                    <!-- <v-card class="mb-3" color="transparent" flat>
                        <div class="d-flex">
                            <div class="pl-2">
                                <v-icon style="font-size: 50px" color="green">mdi-truck-fast</v-icon>
                            </div>
                            <div class="pl-3 pt-0">
                                <h5>This product qualifies for free shipping</h5>
                                <p class="caption text--grey font-weight-regular">
                                    This block is set to appear automatically on products above a certain price, 
                                    which may qualify for free shipping or other perks.
                                </p>
                            </div>
                        </div>
                    </v-card> -->

                    <v-card class="" flat>
                        <v-tabs v-model="tab" grow background-color="#313846" centered dark>
                            <v-tabs-slider></v-tabs-slider>

                            <v-tab href="#tab-1"> Description</v-tab>

                            <!-- <v-tab href="#tab-2"> Specification</v-tab>

                            <v-tab href="#tab-3"> Review</v-tab> -->
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item value="tab-1">
                                <v-card flat>
                                    <v-card-text>{{ product.productName }}</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <!-- <v-tab-item value="tab-2">
                                <v-card flat>
                                    <v-card-text>{{ selectedProduct.description }}</v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item value="tab-3">
                                <v-card flat>
                                    <div class="pa-3">Coming Soon!</div>
                                </v-card>
                            </v-tab-item> -->
                        </v-tabs-items>
                    </v-card>

                    <v-card class="mt-8" flat>
                        <div class="d-flex justify-between">
                            <v-card-text class="caption">
                                <div><span class="subtitle-2 font-weight-bold">Quantity: </span> <span class="font-weight-bold" :class="product.quantity > 0 ? 'green--text' : 'red--text'">{{ product.quantity > 0 ? product.quantity : 'Out Of Stock' }}</span></div>
                                <div><span class="subtitle-2 font-weight-bold">Brand: </span> <span class="blue--text" v-text="product.productBrandName"></span></div>
                                <div style="width: 100%">
                                    <span class="subtitle-2 font-weight-bold">Serial Number:</span> 
                                    <span>
                                        <v-chip x-small class="ma-2" color="red" label text-color="white">
                                            <v-icon x-small left>mdi-label</v-icon> {{ product.serialNumber }}
                                        </v-chip>
                                    </span>
                                    <!-- <span>
                                        <v-chip x-small class="mx-1" color="primary" label text-color="white">
                                            <v-icon x-small left>mdi-label</v-icon> Medium
                                        </v-chip>
                                    </span> -->
                                </div>
                            </v-card-text>

                            <v-card-text class="text-center mt-2 green--text font-weight-black text-h4">
                                <v-icon color="success" right>mdi-currency-ngn</v-icon>{{ product.price * quantity }}
                            </v-card-text>
                        </div>
                    </v-card>

                    <div class="mt-8 d-flex justify-space-between">
                        <div class="d-flex">
                            <v-btn  
                                @click="updateQuantity({ product: product, type: 'decrease' })" 
                                color="red darken-2" class="my-0 mt-4" 
                                dark x-small tile depressed>
                                    <v-icon x-small>mdi-minus</v-icon>
                            </v-btn>

                            <v-text-field 
                                class="custom-input-height" 
                                style="width: 40px" disabled dense 
                                flat solo v-model="quantity">
                            </v-text-field>

                            <v-btn 
                                @click="updateQuantity({ product: product, type: 'increase' })" 
                                tile color="red darken-2" 
                                class="my-0 mt-4" dark x-small depressed>
                                    <v-icon x-small>mdi-plus</v-icon>
                            </v-btn>
                        </div>

                        <div>
                            <v-btn 
                                @click="addToCart({ 
                                    productId: product.productId,
                                    productName:  product.productName,
                                    inventory: product.quantity,
                                    quantity: quantity,
                                    price: product.price * quantity 
                                })" 
                                tile class="ml-6 mt-1" depressed color="success" dark>

                                <v-icon left>mdi-cart-arrow-down</v-icon> Add to Cart
                            </v-btn>

                            <v-btn @click="$router.push({ path: '/checkOut' })" tile class="ml-2 mt-1" depressed color="red darken-2" dark>
                                <v-icon left>mdi-currency-ngn</v-icon> Buy Now
                            </v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-else>
                <div class="d-flex justify-center post-caption red--text grey lighten-2 pa-5 mt-4">
                    <div class="text-center">
                        <div>Ooops.. Product not found!</div>
                        <div class="mt-2">
                            <v-btn @click="$router.push({path: '/'})" color="green lighten-2" depressed small class="white--text">Continue shopping</v-btn>
                        </div>
                    </div>
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// import productList from '../plugins/products.js'
import zoom from '../components/home/zoomOnHover'
import titleParalax from '../components/TitleParalax'
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'home',
    components: { zoom, titleParalax },

    data: () => ({
        imageSelected: '',
        selectedProduct: {},
        items: [
            {
                text: 'Shop & Order',
                disabled: false,
                href: '/',
            },
            {
                text: 'Link 2',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
        tab: null,
        test: '',
        isLoading: false,
        fullPage: false,
        defaultImage: 'https://via.placeholder.com/150',
    }),

    computed: {
        ...mapGetters({
            quantity: 'productss/quantity',
            product: 'productss/product'
        })
    },

    watch: {
        productList(products){
            this.initialise(products)
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
        async initialise(productId){
            this.isLoading = true
            await this.$store.dispatch('productss/getProductById', productId).then(response => {
                this.isLoading = false
            });
        }
    },

    mounted() {
        //this.$store.dispatch('productss/persistCart')
        let productId = this.$route.query.productId;
        if (productId != '') {
            this.initialise(productId);
        } else {
           this.$router.push({path: '/'})
           //set loader to wait for the watch handler
        }
    }
}
</script>

<style lang="scss" scoped>
    .custom-input-height {
        padding: 5px 0px !important;
    }
</style>