<template>
    <div>
        <!-- Breadcrumbs -->
        <!-- <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div> -->

        <!-- Product title parallax -->
        <titleParalax>Quick Checkout</titleParalax>

        <!-- checkout forms section -->
        <div class="mt-2">
            <v-container class="pt-0">
                <v-row>
                    <!-- Billing and Shipping address -->
                    <v-col md="7">
                        <div>                     
                            <v-container fluid>
                                <v-row>
                                    <div>   
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card :elevation="hover ? 15 : ''" flat>  
                                                <div class="font-weight-bold customm-caption pb-2 text-center red--text pt-6 px-6">Billing Details</div>
                                                <v-row class="px-12 pb-4">
                                                    <v-col md="6">
                                                        <v-text-field 
                                                            v-model="fullName" dense color="green" label="Full Name">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col md="6">
                                                        <v-text-field 
                                                            v-model="email" dense color="green" label="Email">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col class="py-0 my-0" md="6">
                                                        <v-text-field 
                                                            v-model="phoneNumber" dense color="green" label="Phone Number">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col class="py-0 my-0" md="6">
                                                        <v-text-field 
                                                            v-model="address" dense color="green" label="Address">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col class="py-0" md="6">
                                                         <v-select
                                                                v-model="stateId"
                                                                :items="states" dense
                                                                item-text="stateName"
                                                                item-value="stateId"
                                                                label="State"
                                                                chips>
                                                        </v-select>
                                                    </v-col>
                                                
                                                    <v-col class="py-0" md="6">
                                                        <v-text-field 
                                                            v-model="country" readonly class="mt-5" hint="Default country is preselected" dense color="green" label="Country">
                                                        </v-text-field>
                                                    </v-col>
                                                    
                                                    <v-col md="12">
                                                        <div class="text-center">
                                                            <!-- <v-btn @click="save" depressed prepend-inner-icon="mdi-map-marker" clearable
                                                                class="white--text text-center rounded-0 mt-3 mb-4 px-8 py-5 text-capitalize"
                                                                color="#009933" :loading="loading" :disabled="loading">
                                                                Make Payment
                                                                <v-icon right>mdi-send</v-icon>
                                                                <template v-slot:loader>
                                                                    <span class="custom-loader">
                                                                        <v-icon light>mdi-cached</v-icon>
                                                                    </span>
                                                                </template>
                                                            </v-btn> -->

                                                             <paystack
                                                                style="margin:auto;"
                                                                class="v-btn my-3 v-btn--contained theme--light v-size--large green white--text"
                                                                :amount="cartTotal * 100"
                                                                :email="authEmail"
                                                                :paystackkey="PUBLIC_KEY"
                                                                :callback="processPayment"
                                                                :reference="genRef()"
                                                                :close="close"
                                                                :embed="false"
                                                            >
                                                            MAKE PAYMENT (N {{cartTotal}})</paystack>

                                                        </div>
                                                    </v-col>
                                                    
                                                </v-row>

                                            </v-card>
                                        </v-hover>
                                    </div>
                                </v-row>

                            </v-container>                           
                        </div>
                    </v-col>

                    <!-- Review Your Order -->
                    <v-col md="5">
                        <div style="width: 100%">
                            <v-container>
                                <v-row>
                                    <v-hover v-slot:default="{hover}">
                                        <v-card :elevation="hover ? 10 : ''" flat style="width: 100%">
                                            <v-card-title class="font-weight-bold text--grey text--darken-2 title orange--text pb-4 pt-6" >PAYMENT METHOD</v-card-title>

                                            <v-card-actions>
                                                <v-btn tile depressed x-large color="orange" dark @click="processCashPayment()">CASH</v-btn>
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
                                                >
                                                PAYSTACK (PAY N {{cartTotal}})</paystack>
                                            </v-card-actions>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                            </v-container>
                        </div>
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
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        states: [],
        stateId: '',
        stateName: '',
        town: '',
        country: 'Nigeria',
        loading: false,
        PUBLIC_KEY: 'pk_test_c19414215f1bee0bd8d754fc85c30e216b2b5ae9'
    }),

    computed: {
        cartProducts(){
            return this.$store.getters['productss/cartProducts']
        },
        cartTotal(){
            return this.$store.getters['productss/cartTotal']
        },
        authEmail(){
            return this.$store.state.auths.authUser.email
        }
    },

    methods: {
        ...mapActions({
            clearCart: 'productss/removeAllCartItems'
        }),
        close() {
            this.$toast.error("User cancelled payment").goAway(3000);
        },
        genRef() {
            return uniqid("pstk-");
        },
        processPayment(data) {
            debugger
            this.$toast.success("successfully made payment").goAway(4000);
            this.$router.push({ path: '/' });
            this.clearCart();
        },
        processCashPayment(){
            this.$toast.success("successfully made payment").goAway(4000);
            this.$router.push({ path: '/' });
            this.clearCart();
        },
        async resetUser(){
            await this.$store.dispatch('auths/resetUser');
        },
        async initialise(){
            //await this.$store.dispatch('productss/persistCart')
        }
    },

    mounted(){
        this.resetUser()
        this.initialise()
    }
}
</script>

<style lang="scss">
    .customm-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
        font-size: 24px;
    }
</style>