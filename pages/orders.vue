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
                        <div v-for="(transaction, i) in transactions" :key="i" class="pb-8">
                                <div v-for="product in transaction.products" :key="product.productId">
                                    <v-row class="pb-8">
                                        <v-col class="pb-0" cols="12" md="5" offset="1">
                                            <div>
                                                <v-card flat>
                                                    <v-img :src="product.imageSrc" :aspect-ratio="16/9"></v-img>
                                                </v-card>
                                            </div>
                                        </v-col>
                                        <v-col class="pb-0" cols="12" md="6">
                                            <div class="pl-12 pt-8">
                                                <div class="post-caption">Order Number: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="transaction.transSummary.transactionId"></span></div>
                                                <div class="post-caption py-1">Order Placed: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="transaction.transSummary.createdOn"></span></div>
                                                <div class="post-caption">Product Name: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.productName"></span></div>
                                                <div class="post-caption py-1">Product Quantity: <span class="font-weight-bold green--text text--darken-2 pl-4" v-text="product.quantity"></span> </div>
                                                <div class="post-caption">Product price: <span class="font-weight-bold green--text text--darken-2 pl-4"><v-icon small>mdi-currency-ngn</v-icon>{{ product.price }}</span> </div>
                                                <div class="mt-3">
                                                    <v-btn 
                                                        @click="addToCart({ 
                                                            productId: product.productId,
                                                            productName:  product.productName,
                                                            inventory: product.quantity,
                                                            quantity: 1,
                                                            price: product.price * 1,
                                                            isRefill: false 
                                                        })" 
                                                        class="white--text"
                                                        depressed tile 
                                                        color="green darken-2">
                                                        Buy Again
                                                    </v-btn>
                                                    <v-btn 
                                                        @click="$router.push({path: '/preview', query: {trx: transaction.transSummary.transactionSummaryId}})"
                                                        class="white--text"
                                                        depressed tile 
                                                        color="red darken-2">
                                                        View <v-icon right>mdi-arrow-right</v-icon>
                                                    </v-btn>
                                                </div>
                                            </div>
                                        </v-col>
                                        <!-- <v-col v-if="transactions.length < transactions.length - 1" class="mt-6" cols="12">
                                            <v-divider></v-divider>
                                        </v-col> -->
                                    </v-row>
                                </div> 
                        </div>
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
    }),

    computed: {
        ...mapGetters({
            transactions: 'productss/transProductsByUser',
            // stateName: 'productss/stateName',
            // transSummary: 'productss/transactionSummary'
        })
    },

    methods: {
        ...mapActions({
            addToCart: 'productss/addToCart'
        }),
        init(){
            let userId = this.$auth.user.userId
            this.$store.dispatch('productss/getTransactionByUserId', userId)
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        },
    },

    mounted(){
        this.setUser()
        this.init()
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