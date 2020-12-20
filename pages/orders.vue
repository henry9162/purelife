<template>
    <div>
        <!-- Product title parallax -->
        <!-- <titleParalax>My Orders</titleParalax> -->
        <div id="pdfDom" class="mt-2">
            <!-- <loading 
                :active.sync="isLoading" 
                :can-cancel="true" 
                :is-full-page="fullPage">
            </loading> -->

            <v-container class="pt-0">
                <v-card class="mt-8 mb-6 px-4" color="green darken-2" flat>
                    <v-card class="mx-4 my-0">
                    <div class="amount-caption pt-10 pb-10 text-center green--text text--darken-2">
                        My Orders
                    </div>
                    <v-row class="pb-8">
                        <v-col class="pb-0" cols="12" md="5" offset="1">
                            <div>
                                <v-card flat>
                                    <v-img :src="defaultImage" :aspect-ratio="16/9"></v-img>
                                </v-card>
                            </div>
                        </v-col>
                        <v-col class="pb-0" cols="12" md="6">
                            <div class="pl-12 pt-8">
                                <div class="post-caption">Order Number: <span class="font-weight-bold green--text text--darken-2 pl-4">xxxxxxxxxx</span></div>
                                <div class="post-caption py-1">Order Placed: <span class="font-weight-bold green--text text--darken-2 pl-4">December 19, 2020</span></div>
                                <div class="post-caption">Product Name: <span class="font-weight-bold green--text text--darken-2 pl-4">Encap Paracetamol</span></div>
                                <div class="post-caption py-1">Product Quantity: <span class="font-weight-bold green--text text--darken-2 pl-4">10</span> </div>
                                <div class="post-caption">Product price: <span class="font-weight-bold green--text text--darken-2 pl-4"><v-icon small>mdi-currency-ngn</v-icon> 3000</span> </div>
                                <div class="mt-3">
                                    <v-btn 
                                        class="white--text"
                                        depressed tile 
                                        color="green darken-2">
                                        Buy Again
                                    </v-btn>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="mt-6" cols="12">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>

                    <v-row class="pb-8">
                        <v-col class="pb-0" cols="12" md="5" offset="1">
                            <div>
                                <v-card flat>
                                    <v-img :src="defaultImage" :aspect-ratio="16/9"></v-img>
                                </v-card>
                            </div>
                        </v-col>
                        <v-col class="pb-0" cols="12" md="6">
                            <div class="pl-12 pt-8">
                                <div class="post-caption">Order Number: <span class="font-weight-bold green--text text--darken-2 pl-4">xxxxxxxxxx</span></div>
                                <div class="post-caption py-1">Order Placed: <span class="font-weight-bold green--text text--darken-2 pl-4">December 19, 2020</span></div>
                                <div class="post-caption">Product Name: <span class="font-weight-bold green--text text--darken-2 pl-4">Encap Paracetamol</span></div>
                                <div class="post-caption py-1">Product Quantity: <span class="font-weight-bold green--text text--darken-2 pl-4">10</span> </div>
                                <div class="post-caption">Product price: <span class="font-weight-bold green--text text--darken-2 pl-4"><v-icon small>mdi-currency-ngn</v-icon> 3000</span> </div>
                                <div class="mt-3">
                                    <v-btn 
                                        class="white--text"
                                        depressed tile 
                                        color="green darken-2">
                                        Buy Again
                                    </v-btn>
                                </div>
                            </div>
                        </v-col>
                        
                    </v-row>
                    </v-card>
                </v-card>
            </v-container>                           
        </div>
    </div>
</template>

<script>
import titleParalax from '../components/TitleParalax'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'home',
    components: {titleParalax},

    data: () => ({
        defaultImage: 'https://via.placeholder.com/150'
    })
}
</script>

<style lang="scss">
    .customm-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
        font-size: 24px;
    }
    .amount-caption {
        font-family: font(family) !important;
        font-size: 24px;
    }
    .post-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
    }
    .no-shadow {
        box-shadow: none !important;
    }
</style>