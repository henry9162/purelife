<template>
    <v-app>
        <v-navigation-drawer width="330" color="#fff" light @update:mini-variant="navEvent" v-model="drawer" fixed permanent :mini-variant.sync="miniVariant" app expand-on-hover>
            <v-list style="padding: 0px" two-line>
                <v-list-item class="pl-2 post-caption">
                    <v-list-item-avatar  style="margin-bottom: 13px">
                        <!-- <img @click="$router.push({path: '/'})" :src="require(`~/assets/logos/${imgSrc.src}`)" weight="120px" height="120px"> -->
                        <img :src="defaultImage">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="post-caption list-color" v-text="authName"></v-list-item-title>
                        <v-list-item-subtitle v-text="authEmail"></v-list-item-subtitle>
                        <!-- <img @click="$router.push({path: '/'})" :src="require(`~/assets/logos/${imgSrc.src}`)" weight="30px" height="43px"> -->
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="mt-3"></v-divider>
            </v-list>

            <!-- <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                <img src="~assets/logos/newLogo.png" height="60px">
            </v-toolbar-title> -->

            <v-list>
                <v-list-item class="post-caption" @click="$router.push({path: '/admin/dashboard'})" link>
                    <v-list-item-icon>
                        <v-icon color="#22A64E">mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-color">Dashboard</v-list-item-title>
                </v-list-item>

                <v-list-group class="post-caption list-color" no-action prepend-icon="mdi-source-branch">
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

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-post-outline">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Refill Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: refill.url})" v-for="(refill, i) in refillList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="refill.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-point-of-sale">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Point of Sale</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: transaction.url})" v-for="(transaction, i) in transactionList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="transaction.name"></v-list-item-title>
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

        <v-app-bar color="#fff" height="82px" fixed app>
            <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                <img src="~assets/logos/newLogo.png" height="50px">
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
                        <v-btn class="post-caption white--text" text style="height: 57px" v-on="on">
                            <v-avatar class="mr-4" size="36">
                                <img :src="$auth.user.image ? url+$auth.user.image.image : defaultImage" :alt="$auth.user.firstName">
                            </v-avatar>
                            <span class="grey--text text--darken-2" v-text="userName"></span> <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list nav dense>
                            <v-list-item-group color="primary">
                                <div>
                                    <v-list-item v-for="(item, i) in itemsss" :key="i" :to="item.url">
                                        <v-list-item-icon class="mr-4">
                                            <v-icon small v-text="item.icon"></v-icon>
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
                                        <v-icon small>mdi-logout</v-icon>
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
                <v-btn @click="logout" depressed outlined rounded class="navLinkColor custom-h6 px-8 py-3 text-capitalize">Logout</v-btn>
            </div>
        </v-app-bar>

        <v-main style="background: #f4f0ec">
            <div>
                <nuxt />
            </div>
        </v-main>
    </v-app>
</template>

<script>
import adminSideBar from '~/plugins/mixins/adminSideBar'

export default {
    components: { },
    mixins: [ adminSideBar ],
    data: () => ({
        drawer: false,
        miniVariant: true,
        userMenu: false,
        imgSrc: {
            state: false,
            src: 'logo1.png'
        },
        itemsss: [
            { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', url: '/admin/dashboard' },
            { text: 'Orders', icon: 'mdi-sale', url: '/orders' },
            { text: 'Profile', icon: 'mdi-face-profile', url: '/profile' }
        ],
        defaultImage: 'https://via.placeholder.com/150'
    }),

    computed: {
        userName(){
            return this.$auth.user.firstName;
        },
        userImage(){
            let url = this.$store.state.productionUrl
            return this.$auth.user.image ? url+this.$auth.user.image.image : this.defaultImage;
        },
        authName(){
           return this.$store.getters['auths/authName']
        },
        authEmail(){
            return this.$store.getters['auths/authEmail']
        }
    },

    methods: {
        getAll(){
            this.$store.dispatch('categories/getAllCategories');
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
            this.$store.dispatch('roles/getAllRoles');
            this.$store.dispatch('loyalties/getLoyaltySetUp');
        },
        navEvent(){
            if(this.imgSrc.state == false){
                this.imgSrc.state = true
                this.imgSrc.src = 'newLogo.png'
            } else {
                this.imgSrc.state = false
                this.imgSrc.src = 'logo1.png'
            }
            console.log('You just hovered over ma')
        },
        async logout(){
            await this.$store.dispatch('auths/logout');
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        }
    },
    mounted(){
        this.getAll()
        this.setUser()
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
</style>
