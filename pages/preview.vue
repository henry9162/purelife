<template>
    <div>
        <div id="pdfDom" class="mt-2">
            <!-- <loading 
                :active.sync="isLoading" 
                :can-cancel="true" 
                :is-full-page="fullPage">
            </loading> -->

            <v-container class="pt-0">
                <v-card class="mt-8 mb-6 py-6 px-10" color="#fff" flat>
                    <v-row class="">
                        <v-col cols="12" md="5">
                            <div class="amount-caption green--text text--darken-2">Details of your order</div>
                        </v-col>
                        <v-col cols="12" md="7">
                            <div class="text-right">
                                <div class="caption">Order Number: <span class="font-weight-bold" v-text="transSummary.transactionId"></span></div>
                                <div class="caption">Order Placed: <span class="font-weight-bold">December 19, 2020</span></div>
                                <div>
                                    <v-btn @click="getPdf('Order Preview')" text x-small color="blue">Download</v-btn>
                                </div>
                            </div>
                        </v-col>
                    </v-row>

                    <v-row v-for="product in transProducts" :key="product.productId" class="py-6">
                        <v-col class="pb-0" cols="12" md="5" offset="1">
                            <div>
                                <v-card flat>
                                    <v-img :src="product.imageSrc" :aspect-ratio="16/9"></v-img>
                                </v-card>
                            </div>
                        </v-col>
                        <v-col class="pb-0" cols="12" md="6">
                            <div class="pl-12 pt-8">
                                <div class="post-caption">Product Name: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.productName"></span></div>
                                <div class="post-caption py-3">Product Brand: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.productBrandName"></span></div>
                                <div class="post-caption">Product Packaging: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.productPackageName"></span></div>
                                <div class="post-caption py-3">Product Quantity: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.quantity"></span> </div>
                                <div class="post-caption">Product price: <span class="font-weight-bold green--text text--darken-2 pl-4"><v-icon color="green darken-2" small>mdi-currency-ngn</v-icon> {{ product.price }}</span> </div>
                            </div>
                        </v-col>

                        <v-col cols="12" class="pt-12">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>

                    <!-- <div class="pt-8 pb-4">
                        <v-divider></v-divider>
                    </div> -->

                    <div class="mb-6">
                        <div class="amount-caption green--text text--darken-2 pt-6 pb-5">Payment Summary</div>
                        
                        <v-row>
                            <v-col cols="12" md="5" offset="1">
                                <div class="green--text text--darken-2 pb-3 post-caption">Paid in full with:</div>
                                <div class="blue--text text-darken-2 font-weight-bold">PAYSTACK</div>

                                <div class="mt-15">
                                    <div class="d-flex justify-space-between">
                                        <div class="caption">Subtotal</div>
                                        <div class="caption"><v-icon small>mdi-currency-ngn</v-icon>{{ transSummary.totalSum }} </div>
                                    </div>
                                    <div class="d-flex justify-space-between py-2">
                                        <div class="caption">Shipping</div>
                                        <div class="caption">FREE</div>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="d-flex justify-space-between pt-2">
                                        <div class="post-caption red--text">Your total</div>
                                        <div class="post-caption red--text text--darken-2"><v-icon class="red--text" small>mdi-currency-ngn</v-icon> {{ transSummary.totalSum }} </div>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div class="green--text post-caption text--darken-2 pb-3">Billing Information:</div>
                                        <div class="">
                                            <div class="post-caption">Full Name: <span class="font-weight-bold pl-4" v-text="billInfo.fullName"></span></div>
                                            <div class="post-caption py-2">Email: <span class="font-weight-bold pl-4" v-text="billInfo.email"></span> </div>
                                            <div class="post-caption">Phone Number: <span class="font-weight-bold pl-4" v-text="billInfo.phoneNumber"></span> </div>
                                            <div class="post-caption py-2">Address: <span class="font-weight-bold pl-4" v-text="billInfo.address"></span></div>
                                            <div class="post-caption">State: <span class="font-weight-bold pl-4" v-text="stateName"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-container>                           
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'home',

    data: () => ({
        defaultImage: 'https://via.placeholder.com/150',
        isLoading: false
    }),

    computed: {
        ...mapGetters({
            billInfo: 'productss/transactionBillInfo',
            transProducts: 'productss/transactionProducts',
            stateName: 'productss/stateName',
            transSummary: 'productss/transactionSummary'
        })
    },
    methods: {
        async initialise(transactionId){
            this.isLoading = true
            await this.$store.dispatch('productss/getTransactionById', transactionId).then(response => {
                this.isLoading = false
            });
        }
    },
    mounted(){
        let transactionId = this.$route.query.trx;
        if (transactionId != '') {
            this.initialise(transactionId);
        } else {
           this.$router.push({path: '/'})
        }
    }
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