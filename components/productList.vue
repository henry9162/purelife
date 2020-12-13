<template>
    <div>
        <v-container class="pt-0" fluid>
            <v-row v-if="products.length > 0">
                <v-col class="px-3 py-4" v-for="product in products" :key="product.productId" :md="gridValue == 3 ? '4' : gridValue == 4 ? '3' : '4'">
                    <v-hover v-slot:default="{ hover }">
                        <v-card color="white" max-width="400" :elevation="hover ? 20 : '4'">
                            <v-img :aspect-ratio="16/12" :src="product.productImage">
                                <v-expand-transition>
                                    <div v-if="hover"
                                        class="d-flex transition-fast-in-fast-out darken-2 font-weight-bold v-card--reveal display-3 white--text"
                                        :class="product.color"
                                        style="height: 100%;"
                                    >
                                        <v-btn @click="$modal.show('product-modal', { product: product })" fab>
                                            <v-icon large>mdi-magnify-plus-cursor</v-icon>
                                        </v-btn>
                                    
                                </div>
                                </v-expand-transition>

                                <div class="product-label-div">
                                    <div class="product-labels-left">
                                        <div class="product-labels-left-div mt-5">
                                            <!-- <div style="min-width: 180px" class="py-1 px-8 font-weight-bold white--text caption">Custom Labels</div> -->
                                            <!-- <v-btn class="ml-0" min-width="180" tile rounded x-small :color="product.color + ' darken-3'" dark>Custom Labels</v-btn> -->
                                        </div>
                                    </div>
                                </div>
                            </v-img>

                            <v-card-text class="pt-6" style="position: relative;">
                                <v-hover v-slot:default="{ hover }">
                                    <v-btn :elevation="hover ? 12 : 2" absolute class="white--text custom-red" fab small right top
                                        @click="addToCart({ 
                                            productId: product.productId, 
                                            productName: product.productName,
                                            quantity: quantity, 
                                            inventory: product.quantity,
                                            price: product.price * quantity 
                                        })">
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </v-hover>
                                <!-- <div class="font-weight-light grey--text subtitle-2 mb-1">For the perfect meal</div> -->
                                <div style="display: flex; justify-content: space-between; max-height: 20px">
                                    <div class="subtitle-1 font-weight-bold grey--text text--darken-3" v-text="product.productName"></div>
                                    <h3 class="font-weight-black title ml-1" v-text="'N' + product.price"></h3>
                                </div>
                            </v-card-text>

                            
                            <div class="d-flex pb-2 justify-space-between">
                                <div class="d-flex pt-4 pl-4">
                                    <v-btn @click="checkOut(product)" class="px-0 mr-2" x-small text>
                                        <v-icon small color="green darken-1" class="mr-1">mdi-currency-ngn</v-icon> Buy Now
                                    </v-btn>
                                    <!-- <v-btn class="px-0" x-small text color="purple">
                                        <v-icon small>mdi-email-outline</v-icon> Ask Question
                                    </v-btn> -->
                                </div>

                                <!-- <div class="flex-grow-1"></div> -->

                                <v-btn class="mt-2" icon @click="toggleProductDropdown(product.productId)">
                                    <v-icon>{{ show == true && productId == product.productId ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                            </div>
                            

                            <v-expand-transition>
                                <div v-show="show == true && productId == product.productId">
                                    <v-card-text>
                                        {{ product.productName }}
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

            <v-row v-else>
                <v-col v-for="n in 9" :key="n" md="4">
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['products', 'gridValue', 'visible'],

    computed: {
        ...mapGetters({
            show: 'productss/show',
            productId: 'productss/productId',
            quantity: 'productss/quantity',
        })
        // show(){
        //     return this.$store.getters['products/show'];
        // }
    },

    methods: {
        ...mapActions({
            toggleProductDropdown: 'productss/toggleProductDropdown',
            // activateSnackbar: 'activateSnackbar',
            addToCart: 'productss/addToCart',
        }),

        async checkOut(product){
            let cart = {
                productId: product.productId, 
                productName: product.productName,
                quantity: this.quantity, 
                inventory: product.quantity,
                price: product.price * this.quantity 
            }
            await this.$store.dispatch("productss/addToCart", cart);
            this.$router.push({ path: '/checkOut' })
        }
    }

}
</script>

<style lang="scss" scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }

    .custom-red {
        color: #F60204 !important;
    }

    .product-label-div {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .product-labels-left {
            .product-labels-left-div {
                transform: rotate(-42deg);
                width: 100%;
                margin-left: -30px
            }
        }
    }
</style>>