<template>
    <div>
        <!-- Breadcrumbs -->
        <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div>

        <!-- Product title parallax -->
        <title-paralax>{{ selectedProduct.title }}</title-paralax>

        <!-- Product Details -->
        <v-container class="pt-3 my-5">
            <v-row class="mx-1">

                <!-- Image Side Views section -->
                <v-col class="px-0" md="1">
                    <div>
                        <v-card @click="selectImage(selectedProduct.image_front)" tile flat max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.image_front"></v-img>
                        </v-card>

                        <v-card @click="selectImage(selectedProduct.image_back)" tile flat class="my-4" max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.image_back"></v-img>
                        </v-card>

                        <v-card @click="selectImage(selectedProduct.image_side)" tile flat max-width="100" color="white">
                            <v-img :aspect-ratio="16/16" :src="selectedProduct.image_side"></v-img>
                        </v-card>
                    </div>
                </v-col>

                <!-- Zoomable Image -->
                <v-col md="4">
                    <v-card tile color="white" flat>
                        <zoom :img-normal="imageSelected" :scale="2"></zoom>
                    </v-card>
                </v-col>

                <!-- Product Description And Specification -->
                <v-col md="7" class="px-15">
                    <v-card class="mb-3" color="transparent" flat>
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
                    </v-card>

                    <v-card class="mt-5" flat>
                        <v-tabs v-model="tab" grow background-color="#313846" centered dark>
                            <v-tabs-slider></v-tabs-slider>

                            <v-tab href="#tab-1"> Description</v-tab>

                            <!-- <v-tab href="#tab-2"> Specification</v-tab>

                            <v-tab href="#tab-3"> Review</v-tab> -->
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item value="tab-1">
                                <v-card flat>
                                    <v-card-text>{{ selectedProduct.description }}</v-card-text>
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
                                <div><span class="subtitle-2 font-weight-bold">Quantity: </span> <span class="font-weight-bold" :class="selectedProduct.inventory > 0 ? 'green--text' : 'red--text'">{{ selectedProduct.inventory > 0 ? selectedProduct.inventory : 'Out Of Stock' }}</span></div>
                                <div><span class="subtitle-2 font-weight-bold">Brand: </span> <span class="blue--text"></span></div>
                                <div>
                                    <span class="subtitle-2 font-weight-bold">Available Type:</span> 
                                    <span>
                                        <v-chip x-small class="ma-2" color="#ED0000" label text-color="white">
                                            <v-icon x-small left>mdi-label</v-icon> Example type
                                        </v-chip>
                                    </span>
                                    <!-- <span>
                                        <v-chip x-small class="mx-1" color="primary" label text-color="white">
                                            <v-icon x-small left>mdi-label</v-icon> Medium
                                        </v-chip>
                                    </span> -->
                                </div>
                            </v-card-text>

                            <v-card-text class="text-center mt-2 green--text font-weight-black display-2">
                                <v-icon color="success" x-large right>mdi-currency-ngn</v-icon>{{ selectedProduct.price * quantity }}
                            </v-card-text>
                        </div>
                    </v-card>

                    <div class="mt-10 d-flex justify-space-between">
                        <div class="d-flex">
                            <v-btn tile @click="updateQuantity({ product: selectedProduct, type: 'decrease' })" color="#ED0000" class="my-0 mt-4" dark x-small depressed>
                                <v-icon x-small>mdi-minus</v-icon>
                            </v-btn>

                            <v-text-field class="custom-input-height" style="width: 40px" dense flat solo v-model="quantity"></v-text-field>

                            <v-btn @click="updateQuantity({ product: selectedProduct, type: 'increase' })" tile color="#ED0000" class="my-0 mt-4" dark x-small depressed>
                                <v-icon x-small>mdi-plus</v-icon>
                            </v-btn>
                        </div>

                        <div>
                            <v-btn @click="addToCart({ productId: selectedProduct.id, quantity: quantity })" tile class="ml-6 mt-1" depressed color="success" dark>
                                <v-icon left>mdi-cart-arrow-down</v-icon> Add to Cart
                            </v-btn>

                            <v-btn @click="$router.push({ path: '/checkOut' })" tile class="ml-2 mt-1" depressed color="#ED0000" dark>
                                <v-icon left>mdi-currency-ngn</v-icon> Buy Now
                            </v-btn>
                        </div>
                
                        

                        
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import productList from '../plugins/products.js'
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
                text: 'Dashboard',
                disabled: false,
                href: 'breadcrumbs_dashboard',
            },
            {
                text: 'Link 1',
                disabled: false,
                href: 'breadcrumbs_link_1',
            },
            {
                text: 'Link 2',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
        tab: null
    }),

    computed: {
        ...mapGetters({
            quantity: 'products/quantity'
        })
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
    },

    mounted() {
        let products = productList.filter(product => product.id == this.$route.query.productId);
        products.forEach(product => this.selectedProduct = product)
        this.imageSelected = this.selectedProduct.image_front
    }
}
</script>

<style lang="scss" scoped>
    .custom-input-height {
        padding: 5px 0px !important;
    }
</style>