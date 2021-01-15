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
            <client-only>
                <loading 
                    :active.sync="isLoading" 
                    :can-cancel="true" 
                    :is-full-page="fullPage">
                </loading>
            </client-only>

            <v-container class="pt-0">
                <v-row>
                    <!-- Billing and Shipping address -->
                    <v-col v-if="cartProducts" md="7">
                        <div>                     
                            <v-container fluid>
                                <v-row>
                                    <div>   
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card color="green darken-2" :elevation="hover ? 15 : ''" flat>  
                                                <v-card class="mx-4">
                                                    <div class="font-weight-bold customm-caption pb-2 text-center green--text text-darken-2 pt-10 px-6">Billing Details</div>

                                                    <v-form ref="form" class="text-center" v-model="valid" lazy-validation>
                                                        <v-row class="px-12 pb-4">
                                                            <v-col md="6">
                                                                <v-text-field 
                                                                    @keyup="activateBtn"
                                                                    v-model="fullName" 
                                                                    :rules="fullNameRules"
                                                                    prepend-inner-icon="mdi-account" 
                                                                    color="green" label="Full Name">
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col md="6">
                                                                <v-text-field 
                                                                    @keyup="activateBtn"
                                                                    v-model="email" 
                                                                    :rules="emailRules"
                                                                    prepend-inner-icon="mdi-email"  
                                                                    color="green" label="Email">
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="py-0 my-0" md="6">
                                                                <v-text-field 
                                                                    @keyup="activateBtn"
                                                                    v-model="phoneNumber" 
                                                                    :rules="phoneRules"
                                                                    prepend-inner-icon="mdi-cellphone" 
                                                                    color="green" label="Phone Number">
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="py-0 my-0" md="6">
                                                                <v-text-field 
                                                                    @keyup="activateBtn"
                                                                    v-model="address" 
                                                                    prepend-inner-icon="mdi-map-marker"
                                                                    :rules="addressRules" 
                                                                    color="green" label="Address">
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="py-0" md="6">
                                                                <v-select
                                                                    prepend-inner-icon="mdi-map-marker"
                                                                    :rules="stateRules"
                                                                    v-model="stateId"
                                                                    :items="states"
                                                                    item-text="stateName"
                                                                    item-value="stateId"
                                                                    label="State"
                                                                    @change="activateBtn"
                                                                    chips>
                                                                </v-select>
                                                            </v-col>
                                                        
                                                            <v-col class="py-0" md="6">
                                                                <v-select
                                                                    readonly
                                                                    :rules="countryRules"
                                                                    v-model="country"
                                                                    :items="countries"
                                                                    hint="Default country is preselected" color="green" label="Country" chips>
                                                                </v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-form>

                                                    <v-col md="12">
                                                        <div class="text-center">
                                                            <paystack
                                                                :disabled="disabled"
                                                                style="margin:auto;"
                                                                class="v-btn post-caption my-3 v-btn--contained theme--light v-size--large white--text"
                                                                :class="disabled ? 'no-shadow grey lighten-2' : 'green darken-2'"
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
                                                        <!-- authEmail -->
                                                    </v-col>

                                                </v-card>

                                            </v-card>
                                        </v-hover>
                                    </div>
                                </v-row>

                            </v-container>                           
                        </div>
                    </v-col>

                    <!-- Review Your Order -->
                    <v-col  v-if="cartProducts" md="5">
                        <div style="width: 100%">
                            <v-container>
                                <v-row>
                                    <v-hover v-slot:default="{hover}">
                                        <v-card :elevation="hover ? 0 : ''" flat style="width: 100%">
                                            <div class="font-weight-bold customm-caption text-center green--text text--darken-2 pb-2 pt-10 px-6">Review Your Order</div>
                                            <v-container class="pt-0">
                                                <v-hover v-for="product in cartProducts" :key="product.productId" v-slot:default="{hover}">
                                                    <v-row class="px-2 py-0" :class="hover ? 'grey lighten-3' : ''">
                                                        <v-col md="4">
                                                            <v-img :aspect-ratio="16/9" :src="product.image_front"></v-img>
                                                        </v-col>
                                                        <v-col md="8">
                                                            <div class="subtitle-2" v-text="product.title"></div>
                                                            <div class="d-flex justify-space-between">
                                                                <div class="d-flex mt-2">
                                                                    <input disabled :value="product.quantity" class="my-0 mr-4 text-center" style="width: 35px; border: 1px solid grey">
                                                                    <v-btn 
                                                                        @click="updateCartQuantity({ product: product, type: 'decrease' })"
                                                                        class="title font-weight-thin" 
                                                                        depressed x-small fab 
                                                                        color="grey lighten-3">
                                                                        -
                                                                    </v-btn>
                                                                    <v-btn 
                                                                        @click="updateCartQuantity({ product: product, type: 'increase' })"
                                                                        class="ml-2 title font-weight-thin" 
                                                                        depressed x-small fab 
                                                                        color="grey lighten-3">
                                                                        +
                                                                    </v-btn>
                                                                </div>
                                                                <div class="d-flex justify-space-between">
                                                                    <div class="subtitle-2 green--text text--darken-2 mt-4"><v-icon small>mdi-currency-ngn</v-icon>{{ product.price * product.quantity }}</div>
                                                                    <div class="mt-2">
                                                                        <v-btn @click="removeCartItem(product.productId)" fab x-small depressed color="transparent">
                                                                            <v-icon color="red">mdi-close</v-icon>
                                                                        </v-btn>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <v-checkbox :input-value="product.isRefill"  @click="updateCartRefill({ product: product})" color="green">
                                                                    <template v-slot:label>
                                                                        <div @click.stop="">
                                                                            Want a refill?
                                                                        </div>
                                                                    </template>
                                                                </v-checkbox>
                                                            </div>
                                                            <div v-if="showDate">
                                                                <v-menu
                                                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                                                    transition="scale-transition" offset-y min-width="290px">

                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-text-field
                                                                            v-model="date"
                                                                            label="Date Of Birth"
                                                                            prepend-inner-icon="mdi-calendar"
                                                                            readonly
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            filled dense rounded 
                                                                        ></v-text-field>
                                                                    </template>

                                                                    <v-date-picker v-model="date" no-title scrollable>
                                                                        <v-spacer></v-spacer>

                                                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                                    </v-date-picker>
                                                                </v-menu>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-hover>
                                            </v-container>

                                            <v-container fluid>
                                                <v-row>
                                                    <!-- <div class="mx-4" style="border: 10px solid #b6bbc6; width: 100%">
                                                        <v-expansion-panels flat focusable>
                                                            <v-expansion-panel>
                                                                <v-expansion-panel-header>Use Loyalty Point</v-expansion-panel-header>
                                                                <v-expansion-panel-content>
                                                                    <div class="d-flex pt-8">
                                                                        <v-text-field label="" hint="Enter Loyalty Point" clearable outlined></v-text-field>
                                                                        <v-btn class="ml-2 mt-2" tile depressed color="primary" dark>Apply</v-btn>  
                                                                    </div> 
                                                                </v-expansion-panel-content>
                                                            </v-expansion-panel>
                                                        </v-expansion-panels>
                                                    </div> -->

                                                    <div class="ml-9 mb-6 mb-3 mt-2 pr-2" style="width: 50%; border: 8px solid #73AF75">
                                                        <v-simple-table fixed-header>
                                                            <template v-slot:default>
                                                                <thead>
                                                                    <tr>
                                                                        <th style="" class="title font-weight-bold">
                                                                            <span class="">Total</span>
                                                                            <span>
                                                                                <v-icon class="font-weight-bold green--text text--darken-2" small right>mdi-currency-ngn</v-icon>
                                                                            </span>
                                                                            <span class="amount-caption font-weight-light green--text text--darken-2" v-text="cartTotal"></span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                            </template>
                                                        </v-simple-table>
                                                    </div>                         
                                                </v-row>
                                            </v-container>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                            </v-container>
                        </div>
                    </v-col>

                    <v-col cols="12" md="12" v-else>
                        <div class="d-flex justify-center post-caption red--text grey lighten-2 pa-5 mt-12">
                            <div class="text-center">
                                <div>You do not have any item in your cart</div>
                                <div class="mt-2">
                                    <v-btn @click="$router.push({path: '/'})" color="green lighten-2" depressed small class="white--text">Continue shopping</v-btn>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>

            </v-container>

            <!-- <v-container v-else>
                 <v-row>
                     <div class="d-flex justify-center post-caption red--text grey lighten-2 pa-5 mt-4" v-else>
                        <div class="text-center">
                            <div>You do not have any item in your cart</div>
                            <div class="mt-2">
                                <v-btn @click="$router.push({path: '/'})" color="green lighten-2" depressed small class="white--text">Continue shopping</v-btn>
                            </div>
                        </div>
                    </div>
                </v-row>
            </v-container> -->
        </div>
    </div>
</template>

<script>
import titleParalax from '../components/TitleParalax'
import { mapState, mapGetters, mapActions } from 'vuex'
import uniqid from 'uniqid';

export default {
    layout: 'home',
    components: { titleParalax },
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        checkbox: true,
        radios: 'regularShipping',
        fullName: '',
        fullNameRules: [
            v => !!v || 'Full name is required',
            v => (v && v.length >= 6) || 'Full name must not be less than 6 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
        ],
        phoneNumber: '',
        phoneRules: [
            v => !!v || 'Phone is required',
            v => (v && v.length <= 11 || v.length > 11) || 'Phone must be 11 characters',
        ],
        address: '',
        addressRules: [
            v => !!v || 'Address is required'
        ],
        stateRules: [
            v => !!v || 'State is required'
        ],
        stateId: '',
        countryRules: [
            v => !!v || 'Country is required'
        ],
        stateName: '',
        town: '',
        country: 'Nigeria',
        countries: ['Nigeria'],
        loading: false,
        valid: true,
        PUBLIC_KEY: 'pk_live_3f9bd55ca82c67fa47f64d80490f14ac49c510e8',
        fullPage: false,
        disabled: true,
        refill: false,
        showDate: false,
        transactionStatus: {
            pending: 1,
            success: 2,
            declined: 3
        },
        methodOfPayment: {
            cash: 1,
            online: 2
        },
        transSummaryId: ''
    }),

    watch: {
        refill(val){
            if (val == true){
                this.showDate = true
            } else {
                this.showDate = false
                this.menu = false
            }
        }
    },

    computed: {
         ...mapGetters({
            cartProducts: 'productss/cartProducts',
            cartTotal: 'productss/cartTotal',
            isLoading: 'filters/getLoader',
            states: 'allStates',
            cartItem: 'productss/numberOfCartItems',
            cartCheckout: 'productss/cartCheckout'
        }),
        authEmail(){
            return this.$auth.user.email
        }
    },

    methods: {
        ...mapActions({
            clearCart: 'productss/removeAllCartItems',
            updateCartQuantity: 'productss/updateCartQuantity',
            removeCartItem: 'productss/removeCartItem',
            updateCartRefill: 'productss/updateCartRefill'
        }),
        activateBtn(){
            if(this.$refs.form.validate()){
                this.disabled = false
            }
        },
        close() {
            this.$toast.error("User cancelled payment").goAway(3000);
        },
        genRef() {
           return uniqid("pstk-");
        },
        processPayment(response) {
            this.loading = true
            let data = {
                fullName: this.fullName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                address: this.address,
                stateId: this.stateId,
                transactionStatusId: this.transactionStatus.success,
                totalSum: this.cartTotal,
                methodOfPaymentId: this.methodOfPayment.online,
                userId: this.$auth.user.userId,
                itemsCount: this.cartItem,
                isRemoved: false,
                transactionId: response.trxref,
                products: this.cartCheckout
            }

            this.$store.dispatch('productss/addTransaction', data).then(response => {
                this.transSummaryId = response.data.data
                this.$toast.success("User successfully made payment").goAway(4000);
                this.clearCart();
                this.loading = false
                setTimeout(() => {
                    this.$router.push({ path: '/preview', query: {trx: this.transSummaryId} });
                }, 1000);
            })
            
        },
        async resetUser(){
            await this.$store.dispatch('auths/resetUser');
        },
        async initialise(){
            await this.$store.dispatch('getAllStates');
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