<template>
    <div>
        <!-- Breadcrumbs -->
        <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div>

        <!-- Product title parallax -->
        <titleParalax>Quick Checkout</titleParalax>

        <!-- checkout forms section -->
        <div class="mt-4">
            <v-container class="pt-0" fluid>
                <v-row>
                    <!-- Billing and Shipping address -->
                    <v-col md="4">
                        <div>                     
                            <v-container fluid>
                                <v-row>
                                    <billingform></billingform>
                                </v-row>
                                <v-checkbox v-model="checkbox" label="Ship to the same address"></v-checkbox>
                                <v-row v-if="checkbox == false">
                                    <shippingform></shippingform>
                                </v-row>
                            </v-container>                           
                        </div>
                    </v-col>

                    <!-- Shipping and Payment method -->
                    <v-col md="4">
                        <div style="width: 100%">
                            <v-container>
                                <!-- Shipping Method -->
                                <v-row>
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card :elevation="hover ? 10 : ''" style="width: 100%" class="px-4 pb-3" flat>
                                            <v-card-title class="font-weight-bold text--grey text--darken-2 title orange--text pb-4 pt-6">SHIPPING METHOD</v-card-title>
                                            <div class="px-4">
                                                <div class="d-flex justify-space-between">
                                                    <v-radio-group class="pa-0 ma-0" v-model="radios">
                                                        <v-radio value="regularShipping" label="Regular (Flat rate)"></v-radio>
                                                    </v-radio-group>
                                                    <span class="font-weight-bold"><v-icon color="black" small>mdi-currency-ngn</v-icon>1000.00</span>
                                                </div>
                                                <div class="d-flex justify-space-between">
                                                    <v-radio-group class="pa-0 ma-0" v-model="radios">
                                                        <v-radio value="officeShipping" label="Office pick up"></v-radio>
                                                    </v-radio-group>
                                                    <span class="font-weight-bold"><v-icon color="black" small>mdi-currency-ngn</v-icon>0.00</span>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                                <!-- Payment method -->
                                <v-row class="mt-8">
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card :elevation="hover ? 10 : ''" flat style="width: 100%">
                                            <v-card-title class="font-weight-bold text--grey text--darken-2 title orange--text pb-4 pt-6">PAYMENT METHOD</v-card-title>

                                            <v-card-actions>
                                                <v-btn tile depressed x-large color="orange" dark>CASH</v-btn>
                                                <paystack
                                                    style="margin:auto;"
                                                    class="v-btn v-btn--contained theme--light v-size--large green white--text"
                                                    :amount="cartTotal * 100"
                                                    email="folake@gmail.com"
                                                    :paystackkey="PUBLIC_KEY"
                                                    :callback="processPayment"
                                                    :reference="genRef()"
                                                    :close="close"
                                                    :embed="false"
                                                >PAYSTACK (PAY NGN {{cartTotal}})</paystack>
                                            </v-card-actions>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                            </v-container>
                        </div>
                    </v-col>

                    <!-- Review Your Order -->
                    <v-col md="4">
                        <orderReview />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import billingform from '../components/checkout/BillingForm'
import shippingform from '../components/checkout/ShippingForm'
import orderReview from '../components/checkout/OrderReview'
import titleParalax from '../components/TitleParalax'
//import paystack from "vue-paystack";

import { mapActions } from 'vuex';

import uniqid from 'uniqid';

export default {
    layout: 'home',
    components: { billingform, shippingform, orderReview, titleParalax },

    data: () => ({
        checkbox: true,
        radios: 'regularShipping',
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
        amount: 760,
        PUBLIC_KEY: 'pk_test_c19414215f1bee0bd8d754fc85c30e216b2b5ae9'
    }),

    computed: {
        cartProducts(){
            return this.$store.getters['productss/cartProducts']
        },
        cartTotal(){
            return this.$store.getters['productss/cartTotal']
        }
    },

    methods: {
        ...mapActions({
            clearCart: 'productss/removeAllCartItems'
        }),
        close() {
            this.$toast.warning("User cancelled payment").goAway(3000);
        },
        genRef() {
            return uniqid("pstk-");
        },
        processPayment() {
            this.$toast.success("User successfully made payment").goAway(4000);
            this.$router.push({ path: '/' });
            this.clearCart();
        }
    }
}
</script>

<style lang="scss">

</style>