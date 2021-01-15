<template>
    <v-app>
        <v-card flat color="#F4F0EC" height="350px" tile>
            <div class="mx-12 mt-12">
                <v-row>
                    <v-col cols="12" md="3">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 20 : 8"  flat height="140">
                                <div class="d-flex justify-space-between px-4"> 
                                    <div>
                                        <v-btn height="80" color="green" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-calendar-today</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Today Sales</div>
                                        <div class="green--text d-flex justify-end text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span v-text="todaySales"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <!-- <v-icon color="green">mdi-arrow-up</v-icon> -->
                                        <!-- <div class="green--text subtitle-1 mt-1 mr-4">0%</div> -->
                                        <div class="grey--text text--darken-1 post-caption mt-2">Today</div>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 20 : 8" flat height="140">
                                <div class="d-flex justify-space-between px-4"> 
                                    <div>
                                        <v-btn height="80" color="#F72628" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-view-week</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Weekly Sales</div>
                                        <div class="green--text d-flex justify-end text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span v-text="weeklySales"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <!-- <v-icon color="red">mdi-arrow-down</v-icon> -->
                                        <!-- <div class="red--text subtitle-1 mt-1 mr-4">0%</div> -->
                                        <div class="grey--text text--darken-1 post-caption mt-2">This week</div>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 20 : 8" flat height="140">
                                <div class="d-flex justify-space-between px-4"> 
                                    <div>
                                        <v-btn height="80" color="green" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-calendar-month-outline</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Monthly Sales</div>
                                        <div class="green--text text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span v-text="monthlySales"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <!-- <v-icon color="red">mdi-arrow-down</v-icon> -->
                                        <!-- <div class="red--text subtitle-1 mt-1 mr-4">0%</div> -->
                                        <div class="grey--text text--darken-1 post-caption mt-2">This month</div>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 20 : 8"  flat height="140">
                                <div class="d-flex justify-space-between px-4"> 
                                    <div>
                                        <v-btn height="80" color="#F72628" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-bullseye-arrow</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Yearly Sales</div>
                                        <div class="green--text d-flex justify-end text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span v-text="yearlySales"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <!-- <v-icon color="green">mdi-arrow-up</v-icon> -->
                                        <!-- <div class="green--text subtitle-1 mt-1 mr-4">0%</div> -->
                                        <div class="grey--text text--darken-1 post-caption mt-2">This year</div>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </div>
        </v-card>

        <div class="mx-12 charts">
            <v-row class="mb-6">
                <v-col cols="12" md="6">
                    <div class="selling-product">
                        <v-data-table :headers="headers" :items="topProducts" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top selling Products</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>

                     <div class="selling-categories mt-6">
                        <v-data-table :headers="categoryHeaders" :items="topCategories" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top selling Categories</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>
                </v-col>

                <v-col cols="12" md="6">
                    <div class="top-diseases">
                        <v-data-table :headers="leastProductHeaders" :items="top5LeastSellingProducts" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Least Selling Products</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>
                   
                    <!-- <div class="selling-branch">
                        <v-data-table :headers="headers" :items="drugs" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top selling Branches</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div> -->

                    <div class="selling-brands mt-6">
                       <v-data-table :headers="brandHeaders" :items="topBrands" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top selling Brands</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>  

                    <!-- <div class="top-sales-alltime mt-6">
                       <v-data-table :headers="headers" :items="drugs" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top sales of all time</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>   -->
                </v-col>
            </v-row>

            <!-- <v-row>
                <v-col cols="12">
                    <v-card color="#fff">
                        <div style="color: #ED0000" class="text-center py-4 text-h6 custom-style">Sales Chart</div>
                        <div class="px-4 pb-4">
                            <line-chart :data="chartdata" :options="options"></line-chart>
                        </div>    
                    </v-card>
                </v-col>
            </v-row> -->
        </div>
    </v-app>      
</template>

<script>
export default {
    layout: 'admin',
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        drawer: false,
        miniVariant: true,
        userMenu: false,
        defaultImage: 'https://via.placeholder.com/150',
        itemsss: [
            { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', url: '/admin/dashboard' },
            { text: 'Orders', icon: 'mdi-sale', url: '/orders' },
            { text: 'Profile', icon: 'mdi-face-profile', url: '/profile' }
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false
        },
        chartdata: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#ED0000',
                    data: [10, 80, 20, 70, 30, 60, 40, 50 ]
                }
            ]
        },
        chartdata1: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#22A64E',
                    data: [10, 80, 20, 70, 30, 60, 40, 50 ]
                }
            ]
        },
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'product.productName',
            },
            { text: 'Price', value: 'product.price' },
            { text: 'Inventory', value: 'product.quantity' },
        ],
        brandHeaders: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productBrandName',
            },
            { text: 'Code', value: 'productBrandCode' }
        ],
        categoryHeaders: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productCategyName',
            },
            { text: 'Description', value: 'description', }
        ],
        leastProductHeaders: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'product.productName',
            },
            { text: 'Price', value: 'product.price' },
            { text: 'Inventory', value: 'product.quantity' },
        ]
    }),

    computed: {
        userImage(){
            let url = this.$store.state.productionUrl
            return this.$auth.user.image ? url+this.$auth.user.image.image : this.defaultImage;
        },
        authName(){
            return this.$store.getters['auths/authName']
        },
        authEmail(){
            return this.$store.getters['auths/authEmail']
        },
        topProducts(){
            return this.$store.getters['topProducts']
        },
        topCategories(){
            return this.$store.getters['topCategories']
        },
        topBrands(){
            return this.$store.getters['topBrands']
        },
        topBranches(){
            return this.$store.getters['topBranches']
        },
        top5LeastSellingProducts(){
            return this.$store.getters['top5LeastSellingProducts']
        },
        topSales(){
            return this.$store.getters['topSales']
        },
        todaySales(){
            return this.$store.getters['todaySales']
        },
        weeklySales(){
            return this.$store.getters['weeklySales']
        },
        monthlySales(){
            return this.$store.getters['monthlySales']
        },
        yearlySales(){
            return this.$store.getters['yearlySales']
        },
    },

    methods: {
        navEvent(){
            console.log('You just hovered over ma')
        },
        async logout(){
            await this.$store.dispatch('auths/logout');
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        },
        async getDashboard(){
            await this.$store.dispatch('getDashboard', this.$auth.user.userId)
        }
    },
    mounted(){
        this.setUser()
        this.getDashboard()
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/variables.scss";

    .v-list-item__icon.v-list__group__header__prepend-icon .v-icon {
        color: #22A64E !important;
    } 
    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
    }
    .custom-style {
        font-family: font(family) !important;
    }
    .navLink {
        color: $navLinkColor !important;
        &:hover {
            cursor: pointer;
        }

        @include media("<=phone"){
			padding-left: 0px !important;
        }

        @include media("<=tablet"){
			padding-left: 16px !important;
        }
    }
    .navLinkColor {
        color: $navLinkColor !important;

        @include media("<=phone"){
			margin-right: 0px !important;
        }

        @include media("<=tablet"){
			margin-right: 24px !important;
        }
    }
    .custom-h4.home {
        &:hover {
            cursor: pointer !important;
        }
    }
    .list-color { color: #22A64E !important}
    .charts {
        margin-top: -80px;
    }
    .brandColor {
        color: #F95254
    }
</style>
