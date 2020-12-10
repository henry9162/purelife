<template>
    <v-app>
        <!-- SnackBar -->
        <v-snackbar :color="color" :timeout=3000 top right v-model="snackBar">
            <span v-text="alertMessage"></span>
            <v-btn color="white" text @click="deactivateSnackbar">
                <v-icon>mdi-close-outline</v-icon>
            </v-btn>
        </v-snackbar>

        <v-app-bar elevation="3" color="#fff" class="custom-bar" height="90px" fixed app>
            <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                <img src="~assets/logos/newLogo.png" height="60px">
            </v-toolbar-title>

            <v-spacer />

            <v-autocomplete
                v-model="select"
                :loading="loading"
                :items="items"
                :search-input.sync="search"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                rounded
                label="Search products?"
                solo-inverted>
            </v-autocomplete>

            <v-spacer />

            <v-menu z-index="99999999999999999999999999999999999" tile v-model="menu2" close-delay="200" 
                max-width="380" :close-on-content-click="false" nudge-bottom="16" nudge-left="55" 
                open-on-hover :nudge-width="400" offset-y>

                <template v-slot:activator="{ on }">
                    <v-btn icon class="mx-4" v-on="on">
                        <span class="custom-red post-caption text-capitalize">Cart</span>
                        <v-badge class="title" overlap color="750C0D">
                            <template v-if="cartItem" class="cart-notification" v-slot:badge>
                                <span dark v-text="cartItem"></span>
                            </template>
                            <v-icon class="text-h6 custom-red">mdi-cart-outline</v-icon>
                        </v-badge>
                    </v-btn>
                </template>

                <div v-if="cartItem" class="menu-container">
                    <div class="arrow-up"></div>
                    <v-card tile class="mx-auto">
                        <v-list class="pb-0">
                            <v-list-item-group>
                                <template v-for="(product, index) in cartProducts">
                                    <v-list-item :key="product.title">
                                        
                                            <v-list-item-avatar class="mr-4" style="border-radius: 0px">
                                                <v-img :aspect-ratio="16/9" :src="product.image_front"></v-img>
                                            </v-list-item-avatar>
                                    
                                            <v-list-item-content>
                                                <v-list-item-title class="subtitle-2 font-weight-regular custom-red" v-text="product.title"></v-list-item-title>
                                                <v-list-item-subtitle class="caption pa-0 ma-0 grey--text text--darken-2 font-weight-regular">
                                                    Quantity - x {{ product.quantity }}
                                                </v-list-item-subtitle>
                                                <!-- <v-list-item-subtitle class="caption pa-0 ma-0">Size - </v-list-item-subtitle> -->
                                            </v-list-item-content>
                                            <v-spacer></v-spacer>

                                            <v-list-item-action> 
                                                <v-list-item-title class="subtitle-2 green--text ml-4 font-weight-thin">
                                                    <v-icon color="success" class="font-weight-thin" x-small right>mdi-currency-ngn</v-icon>{{ product.price * product.quantity }}
                                                </v-list-item-title>
                                            </v-list-item-action>

                                            <v-list-item-action>
                                                <v-icon @click="removeCartItem(product.id)" color="red">mdi-close</v-icon>
                                            </v-list-item-action>
                                        
                                    </v-list-item>

                                    <v-divider v-if="index <= cartProducts.length" :key="index"></v-divider>
                                </template>
                            </v-list-item-group>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list-item class="blue lighten-5">
                            <template>
                                <v-list-item-content></v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-title class="grey--text font-weight-bold">Total</v-list-item-title>
                                </v-list-item-action>
                                <v-list-item-action>
                                    <v-list-item-title class="green--text">
                                        <v-icon color="success" class="font-weight-thin" small right>mdi-currency-ngn</v-icon>{{ cartTotal }}
                                    </v-list-item-title>
                                </v-list-item-action>
                            </template>
                        </v-list-item>

                        <v-divider></v-divider>
                        <v-list-item class="custom-red">
                            <div class="d-flex justify-center py-4">
                                <v-btn @click="$router.push({ path: '/ShowCart' })" color="success" depressed tile dark class="mr-1">
                                    <v-icon small>mdi-cart</v-icon> Show Cart
                                </v-btn>
                                <v-btn @click="$router.push({ path: '/checkOut' })" depressed tile dark color="#ED0000" class="ml-1">
                                    Check Out <v-icon small right>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                        </v-list-item>
                    </v-card>
                </div>

                <div v-else class="pa-4 white red--text font-weight-bold">You have no item in cart</div>
            </v-menu>

            
            <v-btn v-if="!$auth.loggedIn" href="/auth" large text
                class="custom-red post-caption text-capitalize px-3 mr-2 d-none d-sm-flex">
                    Log In
            </v-btn>

            <v-btn v-if="!$auth.loggedIn" href="/auth" large text 
                class="custom-red post-caption text-capitalize px-3 mr-2 d-none d-sm-flex">
                    Create Account
            </v-btn>

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
                                <div>
                                    <v-list-item v-for="(item, i) in itemsss" :key="i" :to="item.url">
                                        <v-list-item-icon class="mr-4">
                                            <v-icon v-text="item.icon"></v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.text"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </div>

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
            
           
            <!-- <v-btn @click="logout" depressed outlined rounded class="custom-green custom-h6 px-8 py-3 text-capitalize">SignIn/Logout</v-btn> -->
        </v-app-bar>

        <div class="sub-nav">
            <v-card class="d-flex justify-center align-center" color="rgb(237,0,0)" elevation="6" width="100%" height="70px">
                <div class="text-center d-flex">
                    <!-- <v-btn href="/" large text
                        class="white--text post-caption text--darken-5 text-capitalize px-3 mr-2 d-none d-sm-flex">
                            Home
                    </v-btn> -->

                    <v-btn @click="$router.push({ path: '/', query: { name: '' } })" large text 
                        class="white--text post-caption text-capitalize px-3 mr-2 d-none d-sm-flex">
                            Shop/Order
                    </v-btn>

                    <v-menu z-index="99999999999999999999999999999" transition="slide-x-transition" open-on-hover nudge-bottom="60" bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="post-caption white--text text-capitalize" large text v-bind="attrs" v-on="on">
                                Pharmacy
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item v-for="(item, i) in itemss" :key="i" link>
                                <v-list-item-title class="post-caption custom-green">{{ item.text }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <!-- <v-menu z-index="9999999999999999999999999999999" transition="scale-transition" close-delay="1000" open-on-hover nudge-bottom="60" bottom origin="center right">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="post-caption white--text text-capitalize" large text v-bind="attrs" v-on="on">
                                Book Consultations/Appointment
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item v-for="(item, i) in appointments" :key="i" link>
                                <v-list-item-title class="post-caption custom-green">{{ item.text }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu> -->

                    <!-- <v-btn href="/" large text
                        class="white--text post-caption text-capitalize px-3 mr-2 d-none d-sm-flex">
                            Loyalty Cards/Rewards
                    </v-btn> -->
                </div>
            </v-card>
        </div>

        <v-main style="background: #f4f0ec; padding-top: 0px">
            <div>
                <nuxt />
            </div>
        </v-main>

        <!-- Newsletter and Footer -->
        <newsletter-footer />
    </v-app>      
</template>

<script>
import newsletterFooter from '../components/footer.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {newsletterFooter },

    data: () => ({
        defaultImage: 'https://via.placeholder.com/150',
        loading: false,
        menu2: false,
        userMenu: false,
        items: [],
        categories: [ { title: 'MEN' }, { title: 'WOMEN'}, { title: 'KIDS'} ],
        categories2: [ { title: 'ACCESORIES' }, { title: 'BAGS'}, { title: 'MORE'} ],
        itemss: [
            { text: 'Add Prescription', href: '/prescription', icon: 'mdi-account'},
            { text: 'Refill Prescription', href: 'refill', icon: 'mdi-view-dashboard-outline' },
            // { text: 'Upload Laboratory Results', icon: 'mdi-view-dashboard-outline' },
            { text: 'Prescription History', href: '/admin/history', icon: 'mdi-view-dashboard-outline' },
            // { text: 'Pill Reminder', icon: 'mdi-view-dashboard-outline' },
        ],
        appointments : [
            { text: 'Laboratory', icon: 'mdi-account'},
            { text: 'Consultation', icon: 'mdi-view-dashboard-outline' },
            { text: 'Mental Health Expert', icon: 'mdi-view-dashboard-outline' },
            { text: 'Dietitian', icon: 'mdi-view-dashboard-outline' },
            { text: 'Cosmetologist/Skin Expert', icon: 'mdi-view-dashboard-outline' },
        ],
        search: null,
        select: null,
        states: [
          'Paracetamol',
          'Buscopan',
          'Amoxil',
          'Atesunate',
          'Tetracyclin',
          'Lonart DS',
          'Amaterm Soft Gel'
        ],
        itemsss: [
            { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', url: '/admin/dashboard' },
        ],
        // itemsss: [
        //     { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', url: '/admin/myThreads' },
        // ],
    }),

    watch: {
        search (val) {
            val && val !== this.select && this.querySelections(val)
        },
    },

    computed: {
         ...mapGetters({
            //isAuth: 'isAuthenticated',
            //user: 'loggedUser',
            cartItem: 'productss/numberOfCartItems',
            cartProducts: 'productss/cartProducts',
            cartTotal: 'productss/cartTotal'
        }),
        snackBar: {
            get: function() { return this.$store.getters['snackBar'] },
            set: function() { this.$store.commit('hideAlert') }
        },

        alertMessage() { return this.$store.getters['alertMessage']},
        color() { return this.$store.getters['alertColor'] },
    },

    methods: {
        ...mapActions({
            //logout: 'logout',
            removeCartItem: 'productss/removeCartItem'
        }),
        querySelections (v) {
            this.loading = true
            // Simulated ajax query
            setTimeout(() => {
            this.items = this.states.filter(e => {
                return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            this.loading = false
            }, 500)
        },
        getAll(){
           
        },
        deactivateSnackbar(){
            this.$store.dispatch('deactivateSnackbar')
        },
        initialise(){
            //this.getAll()
            //this.deactivateSnackbar();
            this.$store.dispatch('products/getAllProducts');
            this.$store.dispatch('products/persistCart');
            this.$store.dispatch('categories/getAllCategories');
            this.$store.dispatch('filters/getAllProducts');
            
            this.$store.dispatch('brands/getAllBrands');
            this.$store.dispatch('classifications/getAllClassifications');
            this.$store.dispatch('packages/getAllPackages');
            this.$store.dispatch('groups/getAllProductGroups');
            this.$store.dispatch('branches/getAllBranches');
            this.$store.dispatch('productss/getAllProducts');
            this.$store.dispatch('getAllStates');
            this.$store.dispatch('getAccountTypes');
            this.$store.dispatch('users/getAllUsers');
            this.$store.dispatch('prescriptions/getAllPrescriptions');
            this.$store.dispatch('diseases/getAllDiseases');
            this.$store.dispatch('filters/getAllCategories');
        },
        async logout() {
            await this.$store.dispatch('auths/logout');
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        }
    },    

    mounted(){
        this.initialise()
        this.setUser()
    }
}
</script>

<style lang="scss" scoped>
    .v-list-item__icon.v-list__group__header__prepend-icon .v-icon {
        color: #22A64E !important;
    } 
    .category-menu-background {
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://tinuiti.com/wp-content/uploads/legacysitecontent/cpcs/posts_01/2018/01/23173041/photo-1511511450040-677116ff389e-1024x680.jpg');
        background-position: center;
        background-size: cover;
    }
    .custom-bar {
        // padding-left: 120px;
        // padding-right: 120px;
    }
    .custom-light-green {
        background: #58D68D !important;
    }

    .sub-nav {
        margin-top: 85px;
    }

    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
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
    .custom-green {
        color: #009933 !important;
    }
    .custom-red {
        color: #F60809 !important;
    }
    .custom-h4.home {
        &:hover {
            cursor: pointer !important;
        }
    }
</style>