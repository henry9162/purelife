<template>
<div class="ma-4">
    <!-- Product title parallax -->
    <titleParalax>Quick Checkout</titleParalax>

     <v-form ref="form" class="text-center" v-model="valid" lazy-validation>
        <paystack
            :disabled="disabled"
            style="margin:auto;"
            class="v-btn post-caption my-3 v-btn--contained theme--light v-size--large white--text"
            :class="disabled ? 'no-shadow grey lighten-2' : 'green darken-2'"
            :amount="cartTotal * 100"
            :email="emaill"
            :paystackkey="PUBLIC_KEY"
            :callback="processPayment"
            :reference="genRef()"
            :close="close"
            :embed="false"
        >
        MAKE PAYMENT (N {{cartTotal}})</paystack>
    </v-form>
</div>
</template>

<script>
import titleParalax from '../components/TitleParalax'
import uniqid from 'uniqid';


export default {
    layout: 'home',
    components: { titleParalax },
    data: () => ({
        disabled: false,
        emaill: 'henimastic@gmail.com',
        PUBLIC_KEY: 'pk_test_c19414215f1bee0bd8d754fc85c30e216b2b5ae9',
        cartTotal: 5000,
        valid: true
    }),

    methods: {
        processPayment(data){
            console.log(data)
        },
        genRef() {
           return uniqid("pstk-");
        },
        close() {
            this.$toast.error("User cancelled payment").goAway(3000);
        },
    }
}
</script>