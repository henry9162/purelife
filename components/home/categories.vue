<template>
     <!-- Categories -->
        <v-container fluid class="mt-5">
            <v-row class="pl-4">
                <v-col md="4">
                    <v-hover v-slot:default="{ hover }">
                        <v-card flat height="424" :elevation="hover ? 15 : ''" href="#">
                            <v-img :src="require(`~/assets/images/pharmacy/pharmacy1.jpg`)" height="100%" position="down down">
                                <v-hover v-slot:default="{ hover }">
                                    <v-btn 
                                        @click="$router.push({ path: '/allProduct' })" 
                                        :elevation="hover ? 12 : ''" 
                                        absolute bottom left x-large dark 
                                        class="font-weight-black" color="#750C0D">All CATEGORIES</v-btn>
                                </v-hover>   
                            </v-img>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col md="8" class="py-0">
                    <v-row>
                        <v-col md="6">
                            <v-hover v-slot:default="{ hover }">
                                <v-card 
                                    flat class="backgroundPharmacy"
                                    @click="$router.push({ path: 'allProduct', query: { name: 'Women' } })" 
                                    height="200" :elevation="hover ? 15 : ''">
                                    <div 
                                        class="d-flex categoryHeight justify-center align-center subtitle-1 white--text">
                                        <div class="halfBlack px-3 py-1">Pharmacy</div>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col md="6">
                            <v-hover v-slot:default="{ hover }">
                                <v-card 
                                    flat class="backgroundPersonalCare"
                                    @click="$router.push({ path: 'allProduct', query: { name: 'Men' } })" 
                                    height="200" :elevation="hover ? 15 : ''" href="#">
                                    <div 
                                        class="d-flex categoryHeight justify-center align-center subtitle-1 white--text">
                                        <div class="halfBlack px-3 py-1">Personal Care</div>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="6">
                            <v-hover v-slot:default="{ hover }">
                                <v-card 
                                    flat class="backgroundBeauty"
                                    @click="$router.push({ path: 'allProduct', query: { name: 'Kids' } })" 
                                    :elevation="hover ? 15 : ''" height="200" href="#">
                                    <div 
                                        class="d-flex categoryHeight justify-center align-center subtitle-1 white--text">
                                        <div class="halfBlack px-3 py-1">Perfume/Aromaterapy</div>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col md="6">
                            <v-hover v-slot:default="{ hover }">
                                <v-card 
                                    flat class="backgroundBaby"
                                    @click="$router.push({ path: 'allProduct', query: { name: 'Kids' } })" 
                                    :elevation="hover ? 15 : ''" height="200" width="" href="#">
                                    <div 
                                        class="d-flex categoryHeight justify-center align-center subtitle-1 white--text">
                                        <div class="halfBlack px-3 py-1">Baby/Child Care</div>
                                    </div>
                                </v-card> 
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
    export default {
        data: () => ({
            image1: '~assets/images/pharmacy/pharmacy1.jpg',
            image2: 'https://blog.stylewe.com/wp-content/uploads/2016/11/types-of-fashion.jpg',
            image3: 'https://www.realmenrealstyle.com/wp-content/uploads/2015/04/Balmoral-oxford-leather-dress-shoes-brown.jpg',
            image4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz83K7tM0o6_FT25BYcqFrmmmOvysq_kLB9jZJoahtVJA0Cafw',
        })
    }
</script>

<style lang="scss" scoped>
    .backgroundPharmacy {
        background: url("~assets/images/pharmacy/pharmacy2.jpg");
        background-size: cover;
    }

    .backgroundPersonalCare {
        background: url("~assets/images/beauty/beauty3.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }

    .backgroundBeauty {
        background: url("~assets/images/perfumes/pef5.jpg");
        background-size: cover;
    }

    .backgroundBaby {
        background: url("~assets/images/baby/baby1.jpg");
        background-size: cover;
    }

    .categoryHeight {
        height: 200px !important;
    }

    .halfBlack {
        background: rgba(black, 0.5) !important;
    }
</style>