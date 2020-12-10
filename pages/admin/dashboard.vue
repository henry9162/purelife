<template>
    <v-app>
        <v-navigation-drawer width="330" color="#fff" light @update:mini-variant="navEvent" v-model="drawer" fixed permanent :mini-variant.sync="miniVariant" app expand-on-hover>
            <v-list style="padding: 0px" two-line>
                <v-list-item class="pl-2 post-caption">
                    <v-list-item-avatar style="margin-bottom: 13px">
                        <img src="~assets/images/deborah.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="post-caption list-color" v-text="authName"></v-list-item-title>
                        <v-list-item-subtitle class="" v-text="authEmail"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item class="post-caption" @click="$router.push({path: '/admin/dashboard'})" link>
                    <v-list-item-icon>
                        <v-icon color="#22A64E">mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-color">Dashboard</v-list-item-title>
                </v-list-item>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-source-branch">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Branch Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: branch.url})" v-for="(branch, i) in branchList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="branch.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-post-outline">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Product Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: admin.url})" v-for="(admin, i) in adminList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="admin.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-shape">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Disease Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: disease.url})" v-for="(disease, i) in diseaseList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="disease.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-pill">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Prescription Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: prescription.url})" v-for="(prescription, i) in prescriptionList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="prescription.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-grain">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Loyalty Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: loyalty.url})" v-for="(loyalty, i) in loyaltyList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="loyalty.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-account">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">User Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: user.url})" v-for="(user, i) in userList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="user.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-card flat color="#F4F0EC" height="400px" tile>
            <v-toolbar color="#fff" extended extension-height="6">
                <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                    <div class="mt-2 rounded">
                        <img src="~assets/logos/newLogo.png" height="50px">
                    </div>   
                </v-toolbar-title>

                <v-spacer />

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="" v-bind="attrs" v-on="on">
                            <v-badge class="title" overlap color="red">
                                <template class="cart-notification" v-slot:badge>
                                    <span dark>0</span>
                                </template>
                                <v-icon class="custom-red pt-2">mdi-atom</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <span>Items to expire</span>
                </v-tooltip>

                 <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="" v-bind="attrs" v-on="on">
                            <v-badge class="title" overlap color="red">
                                <template class="cart-notification" v-slot:badge>
                                    <span dark>0</span>
                                </template>
                                <v-icon class="custom-red pt-2">mdi-atom-variant</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <span>Items to expire in a month</span>
                </v-tooltip>

                <v-spacer />

                <div v-if="$auth.loggedIn">
                    <v-menu v-model="userMenu" close-delay="200" 
                        max-width="200" :close-on-content-click="false" 
                        nudge-bottom="13" nudge-right="20" open-on-hover 
                        :nudge-width="200" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn class="post-caption" text style="height: 57px" v-on="on">
                                <v-avatar class="mr-4" size="36">
                                    <img :src="$auth.user.image ? url+$auth.user.image.image : defaultImage" :alt="$auth.user.firstName">
                                </v-avatar>
                                <span v-text="$auth.user.firstName"></span> <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-list nav dense>
                                <v-list-item-group color="primary">
                                    <!-- <div>
                                        <v-list-item v-for="(item, i) in itemsss" :key="i" :to="item.url">
                                            <v-list-item-icon class="mr-4">
                                                <v-icon v-text="item.icon"></v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.text"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </div> -->

                                    <!-- <div v-else>
                                        <v-list-item v-for="(item, i) in itemsss" :key="i" :to="item.url">
                                            <v-list-item-icon class="mr-4">
                                                <v-icon v-text="item.icon"></v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.text"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </div> -->

                                    <!-- <v-divider></v-divider> -->

                                    <v-list-item @click="logout">
                                        <v-list-item-icon class="mr-4">
                                            <v-icon>mdi-logout</v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content>
                                            <v-list-item-title>Logout</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>

                <div v-else>
                    <v-btn @click="logout" depressed outlined rounded class="brandColor custom-h6 px-8 py-3 text-capitalize">Logout</v-btn>
                </div>
        
            </v-toolbar>

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
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span>0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="green">mdi-arrow-up</v-icon>
                                        <div class="green--text subtitle-1 mt-1 mr-4">0%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since today</div>
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
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Week Sales</div>
                                        <div class="green--text d-flex justify-end text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span>0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="red">mdi-arrow-down</v-icon>
                                        <div class="red--text subtitle-1 mt-1 mr-4">0%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since this week</div>
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
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Month Sales</div>
                                        <div class="green--text text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span>0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="red">mdi-arrow-down</v-icon>
                                        <div class="red--text subtitle-1 mt-1 mr-4">0%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since this month</div>
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
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Year Sales</div>
                                        <div class="green--text d-flex justify-end text-h5">
                                            <v-icon class="green--text">mdi-currency-ngn</v-icon> <span>0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="green">mdi-arrow-up</v-icon>
                                        <div class="green--text subtitle-1 mt-1 mr-4">0%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since this year</div>
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

                    <div class="top-diseases mt-6">
                        <v-data-table :headers="diseaseHeaders" :items="topDiseases" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top diseases by patients</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>
                        </v-data-table>
                    </div>
                </v-col>

                <v-col cols="12" md="6">
                    <div class="selling-categories">
                        <v-data-table :headers="categoryHeaders" :items="topCategories" sort-by="" class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">Top selling Categories</v-toolbar-title>
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
import adminSideBar from '~/plugins/mixins/adminSideBar'

export default {
    mixins: [ adminSideBar ],
    data: () => ({
        drawer: false,
        miniVariant: true,
        userMenu: false,
        defaultImage: 'https://via.placeholder.com/150',
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
                value: 'productName',
            },
            { text: 'Price', value: 'price' },
            { text: 'Inventory', value: 'quantity' },
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
        diseaseHeaders: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'diseaseName',
                class: ['text-button', 'grey--text text--darken-1']
            },
            { text: 'Severity', value: 'severity' },
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
        topDiseases(){
            return this.$store.getters['topDiseases']
        },
        topSales(){
            return this.$store.getters['topSales']
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

        @include phone {
            padding-left: 0px !important;
        }
        @include tablet {
            padding-left: 16px !important;
        }
    }
    .navLinkColor {
        color: $navLinkColor !important;

        @include phone {
            margin-right: 0px !important;
        }
        @include tablet {
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
