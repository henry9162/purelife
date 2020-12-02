<template>
    <div>
        <!-- Newsleetter -->
        <!-- <v-container class="px-0 pb-0 white dark--text" fluid>
            <v-row class="pa-2">
                <v-col md="12">
                    <div class="d-flex justify-center">
                        <v-card width="80%" flat light color="white">
                            <v-card-title class="text-center title">New Here?</v-card-title>
                            <div class="subtitle-2 grey--text pl-4">Subscribe to our news letter to get update on latest products</div>
                            <div class="px-4 mt-2 d-flex">
                                <v-text-field class="mr-10" outlined label="Email Address" prepend-inner-icon="mdi-email"></v-text-field>
                                <div class="mt-3">
                                    <v-btn color="dark" outlined>Submit</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container> -->

            <!-- Footer -->
        <v-container style="background: #424242" class="px-0 py-0" fluid>
            <v-row class="pl-12 pr-0 grey darken-4">
                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Quick Links</v-card-title>
                        <div class="footer-list-items">
                            <ul class="pl-0">
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Home</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Pharmacy</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Shop/Order</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Book Consultations/Appointment</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Loyalty Cards/Reward</a></li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>

                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">About Us</v-card-title>
                        <div class="footer-list-items">
                            <ul class="pl-0">
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">About Us</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Terms and Condition</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Privacy policy</a></li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>

                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Follow Us On</v-card-title>
                        <v-card-actions class="pl-4">
                            <v-btn small dark color="blue">
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn small dark color="#C13584">
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn small dark color="red">
                                <v-icon>mdi-youtube</v-icon>
                            </v-btn>
                            <v-btn small dark color="blue lighten-1">
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <!-- <v-row class="pl-12 pr-0 grey darken-4">
                <v-col md="4" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Follow Us On</v-card-title>
                        <v-card-actions class="pl-4">
                            <v-btn small dark color="blue">
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn small dark color="#C13584">
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn small dark color="red">
                                <v-icon>mdi-youtube</v-icon>
                            </v-btn>
                            <v-btn small dark color="blue lighten-1">
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col md="3" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Contact Us</v-card-title>
                        <v-card-text class="grey--text text--lighten-1">01 888 1100 / 0700 600 0000</v-card-text>
                    </v-card>
                </v-col>

                <v-col md="5" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Payment Methods And Delivery Partners</v-card-title>
                    </v-card>
                </v-col>
            </v-row> -->
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .footer-list-items {
        padding-left: 15px;
        font-size: small;

        ul {
            list-style-type: none;
            li a {
                text-decoration: none;
            }

            li a:hover {
                text-decoration: underline
            }
        }
    }
</style>