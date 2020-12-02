<template>
    <v-app>
        <v-navigation-drawer width="330" color="#fff" light @update:mini-variant="navEvent" v-model="drawer" fixed permanent :mini-variant.sync="miniVariant" app expand-on-hover>
            <v-list style="padding: 0px" two-line>
                <v-list-item class="pl-2 post-caption">
                    <v-list-item-avatar style="margin-bottom: 13px">
                        <img src="~assets/images/deborah.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="post-caption list-color">Henry Ekwonwa</v-list-item-title>
                        <v-list-item-subtitle>henimastic@gmail.com</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider class="mt-3"></v-divider>
            </v-list>

            <v-list>
                <v-list-item class="post-caption" @click="$router.push({path: '/admin/dashboard'})" link>
                    <v-list-item-icon>
                        <v-icon color="#22A64E">mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-color">Dashboard</v-list-item-title>
                </v-list-item>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-post-outline">
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

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-account">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">User Management</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: user.url})" v-for="(user, i) in userList" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="user.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-hammer-screwdriver">
                    <template v-slot:activator>
                        <v-list-item-title class="list-color">Settings</v-list-item-title>
                    </template>

                    <v-list-item @click="$router.push({path: setting.url})" v-for="(setting, i) in settings" :key="i" link class="post-caption">
                        <v-list-item-title class="list-color" v-text="setting.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar color="#fff" height="80px" fixed app>
            <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                <img src="~assets/logos/newLogo.png" height="60px">
            </v-toolbar-title>
            <v-spacer />
            <v-btn @click="logout" depressed outlined rounded class="navLinkColor custom-h6 px-8 py-3 text-capitalize">Logout</v-btn>
        </v-app-bar>

        <v-main style="background: #f4f0ec">
            <div>
                <nuxt />
            </div>
        </v-main>
    </v-app>
</template>

<script>
export default {
    components: { },

    data: () => ({
        drawer: false,
        miniVariant: true,
        adminList: [
            { name: 'Product Categories', icon: 'mdi-shape', url: '/admin/categories' },
            { name: 'Product Brands', icon: 'mdi-grain', url: '/admin/brands' },
            { name: 'Product Classifications', icon: 'mdi-shape', url: '/admin/classifications' },
            { name: 'Product Packages', icon: 'mdi-account-supervisor', url: '/admin/packages' },
            { name: 'Product Groups', icon: 'mdi-shape', url: '/admin/groups' },
            { name: 'Products', icon: 'mdi-post-outline', url: '/admin/products' },
        ],
        branchList: [
            { name: 'Pharmacy Branch', icon: 'mdi-shape', url: '/admin/branches' },
        ],
        userList: [
            { name: 'Users', icon: 'mdi-account', url: '/admin/users' },
        ],
        settings: [
            { name: 'Roles', icon: 'mdi-post', url: '/admin/roles' },
            { name: 'Branches', icon: 'mdi-account', url: '/admin/branches' },
        ],
        defaultImage: 'https://via.placeholder.com/150',
    }),

    computed: {
        userImage(){
            let url = this.$store.state.productionUrl
            return this.$auth.user.image ? url+this.$auth.user.image.image : this.defaultImage;
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
        },
        navEvent(){
            console.log('You just hovered over ma')
        },
        logout(){
            //this.$auth.logout();
            this.$router.push({path: '/'})
        }
    },
    mounted(){
        this.getAll()
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
