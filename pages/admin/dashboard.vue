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
                        <v-list-item-subtitle class="">henimastic@gmail.com</v-list-item-subtitle>
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

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-shape">
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

                <v-list-group color="#22A64E" class="post-caption list-color" no-action prepend-icon="mdi-post-outline">
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

        <v-card flat color="#F4F0EC" height="400px" tile>
            <v-toolbar color="#fff" extended extension-height="10">
                <v-toolbar-title class="custom-h4 navLink" @click="$router.push({path: '/'})">
                    <div class="mt-2 rounded">
                        <img src="~assets/logos/newLogo.png" height="60px">
                    </div>   
                </v-toolbar-title>
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
                                        <v-btn height="80" color="#F72628" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-chart-bar</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Traffic</div>
                                        <div class="green--text d-flex justify-end text-h5">350,897</div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="green">mdi-arrow-up</v-icon>
                                        <div class="green--text subtitle-1 mt-1 mr-4">3.48%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since last month</div>
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
                                        <v-btn height="80" color="#ED0000" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-chart-pie</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">New Users</div>
                                        <div class="green--text d-flex justify-end text-h5">2,356</div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="red">mdi-arrow-down</v-icon>
                                        <div class="red--text subtitle-1 mt-1 mr-4">3.48%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since last week</div>
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
                                        <v-btn height="80" color="#ED0000" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-account-group</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Sales</div>
                                        <div class="green--text text-h5">924</div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="red">mdi-arrow-down</v-icon>
                                        <div class="red--text subtitle-1 mt-1 mr-4">3.48%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since yesterday</div>
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
                                        <v-btn height="80" color="#ED0000" 
                                            :elevation="hover ? 20 : 0" large class="rounded-o white--text mt-n6">
                                            <v-icon large>mdi-percent-outline</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="content mt-3">
                                        <div class="text-uppercase d-flex justify-end grey--text text--lighten-1 subtitle-2">Performance</div>
                                        <div class="green--text d-flex justify-end text-h5">49,65</div>
                                    </div>
                                </div>
                                <div class="baseline px-4 mt-7">
                                    <div class="d-flex mr-4">
                                        <v-icon color="green">mdi-arrow-up</v-icon>
                                        <div class="green--text subtitle-1 mt-1 mr-4">3.48%</div>
                                        <div class="grey--text text--darken-1 post-caption mt-2">Since last month</div>
                                    </div>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </div>
        </v-card>

        <div class="mx-12 charts">
            <v-row>
                <v-col cols="12" md="8">
                    <v-card color="#fff">
                        <div style="color: #ED0000" class="text-center py-4 text-h6 custom-style">Sales Chart</div>
                        <div class="px-4 pb-4">
                            <line-chart :data="chartdata" :options="options"></line-chart>
                        </div>    
                    </v-card>

                     <v-card class="mt-6">
                        <v-data-table :headers="headers" :items="drugs" sort-by="calories" class="elevation-1 px-4 py-4">
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="custom-style list-color">All Products</v-toolbar-title>
                                    <v-divider class="mx-4" inset vertical></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog v-model="dialog" max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="#22A64E" dark class="mb-2 rounded-0" v-bind="attrs" v-on="on">
                                                <v-icon left>mdi-plus-circle-outline</v-icon> Add Product
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="red" text @click="close">
                                                    <v-icon>mdi-window-close</v-icon>
                                                </v-btn>
                                            </v-card-actions>

                                            <div class="text-center">
                                                <span class="headline list-color custom-style">{{ formTitle }}</span>
                                            </div>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row class="px-8">
                                                         <v-col cols="12" class="py-0 px-0">
                                                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="py-0 px-0">
                                                            <v-select v-model="editedItem.category" :items="categories" label="Category"
                                                                item-text="name"
                                                                item-value="id">
                                                            </v-select>
                                                        </v-col>
                                                        <!-- <v-col cols="12" class="py-0 px-0">
                                                            <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                                                        </v-col> -->
                                                        <v-select v-model="editedItem.tags" :items="tags" label="Tags" multiple chips
                                                            item-text="name"
                                                            item-value="id"
                                                        ></v-select>
                                                        <v-col cols="12" class="py-0 px-0">
                                                            <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="py-0 px-0">
                                                            <v-text-field type="number" v-model="editedItem.quantity" label="Quantity"></v-text-field>
                                                        </v-col>
                                                        
                                                        <v-btn block depressed large prepend-inner-icon="mdi-map-marker" clearable 
                                                            class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize" 
                                                            color="#009933" :loading="loading" :disabled="loading">Submit 
                                                            <v-icon right>mdi-send</v-icon>
                                                            <template v-slot:loader>
                                                                <span class="custom-loader">
                                                                    <v-icon light>mdi-cached</v-icon>
                                                                </span>
                                                            </template>
                                                        </v-btn>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>

                                            <!-- <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                            </v-card-actions> -->
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="initialize">Reset</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card max-width="450" class="mx-auto">
                        <v-toolbar flat color="#22A64E" dark>
                            <v-toolbar-title class="custom-style">Top Selling Product</v-toolbar-title>
                        </v-toolbar>

                        <v-list two-line>
                            <template v-for="(item, index) in items">
                                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                                <v-list-item v-else :key="item.title" @click="">
                                    <v-list-item-avatar>
                                        <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-card>

                    <v-card max-width="450" class="mx-auto mt-5">
                        <v-toolbar flat color="#ED0000" dark>
                            <v-toolbar-title class="custom-style">Top Branches</v-toolbar-title>
                        </v-toolbar>

                        <v-list>
                            <template v-for="(item, index) in branches">
                                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                                <v-list-item v-else :key="item.title" @click="">
                                    <!-- <v-list-item-avatar>
                                        <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar> -->

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.title"></v-list-item-title>
                                        <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-card>

                    <v-card max-width="450" class="mx-auto mt-5">
                        <v-toolbar flat color="#22A64E" dark>
                            <v-toolbar-title class="custom-style">Top sales of all time</v-toolbar-title>
                        </v-toolbar>

                        <v-list two-line>
                            <template v-for="(item, index) in items">
                                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                                <v-list-item v-else :key="item.title" @click="">
                                    <v-list-item-avatar>
                                        <v-img :src="item.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-card>
                </v-col>

                <!-- <v-col cols="12" md="4">
                    <v-card>
                        <div style="color: #22A64E" class="text-center py-4 text-h6 custom-style">Bar Chart</div>
                        <div class="px-4 pb-4">
                            <bar-chart :data="chartdata1" :options="options"></bar-chart>
                        </div>    
                    </v-card>
                </v-col> -->
            </v-row>
        </div>
    </v-app>      
</template>

<script>
export default {
    //middleware: 'auth',

    data: () => ({
        drawer: false,
        miniVariant: true,
        loading: false,
        userMenu: false,
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
        diseaseList: [
            { name: 'Diseases', icon: 'mdi-grain', url: '/admin/diseases' },
        ],
        prescriptionList: [
            { name: 'Prescriptions', icon: 'mdi-supervisor', url: '/admin/prescriptions' },
        ],
        loyaltyList: [
            { name: 'Loyalties', icon: 'mdi-shape', url: '/admin/loyalties' },
        ],
        userList: [
            { name: 'Users', icon: 'mdi-account', url: '/admin/categories' },
        ],
        settings: [
            { name: 'Roles', icon: 'mdi-post', url: '/admin/roles' }
        ],
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
        dialog: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Category', value: 'category.name' },
            { text: 'Tags', value: 'tags[0].name' },
            { text: 'Price', value: 'price' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            category: '',
            tags: [],
            price: '',
            quantity: ''
        },
        defaultItem: {
            name: '',
            category: '',
            tags: [],
            price: '',
            quantity: ''
        },
        items: [
            {
                avatar: 'https://www.fidson.com/wp-content/uploads/2019/11/Astyfer-300x300.jpg',
                title: 'Astyfer',
                subtitle: "<span class='text--primary'>Sold 10 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://c8.alamy.com/comp/H2CDXT/stock-photo-of-a-box-of-amoxicillin-penicillin-antibiotic-capsules-H2CDXT.jpg',
                title: 'Amoxil',
                subtitle: "<span class='text--primary'>Sold 9 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://i.pinimg.com/originals/30/27/ab/3027ab566834e36ccc25d247a28ba898.jpg',
                title: 'Paracetamol',
                subtitle: "<span class='text--primary'>Sold 8 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://www.dclabs.com/images/product-images/ctot-30-zoom.jpg',
                title: 'vitamin C',
                subtitle: "<span class='text--primary'>Sold 7 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://www.wahooas.org/web-ooas/sites/default/files/PHOTO%20ARTICLES/MALARIA%20NEWS/Softgel.png',
                title: 'Artesunate',
                subtitle: "<span class='text--primary'>Sold 6 times</span>",
            },
        ],
        branches: [
            {
                avatar: 'https://www.fidson.com/wp-content/uploads/2019/11/Astyfer-300x300.jpg',
                title: 'Victoria Island',
                subtitle: "<span class='text--primary'>Sold 10 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://c8.alamy.com/comp/H2CDXT/stock-photo-of-a-box-of-amoxicillin-penicillin-antibiotic-capsules-H2CDXT.jpg',
                title: 'Lekki',
                subtitle: "<span class='text--primary'>Sold 9 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://i.pinimg.com/originals/30/27/ab/3027ab566834e36ccc25d247a28ba898.jpg',
                title: 'Ikeja',
                subtitle: "<span class='text--primary'>Sold 8 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://www.dclabs.com/images/product-images/ctot-30-zoom.jpg',
                title: 'Magodo',
                subtitle: "<span class='text--primary'>Sold 7 times</span>",
            },
            { divider: true, inset: true },
            {
                avatar: 'https://www.wahooas.org/web-ooas/sites/default/files/PHOTO%20ARTICLES/MALARIA%20NEWS/Softgel.png',
                title: 'Surulere',
                subtitle: "<span class='text--primary'>Sold 6 times</span>",
            },
        ],
        drugs: [],
        categories: [
            {
                id: 1,
                name: 'Sedatives',
                color: 'red'
            },
            {
                id: 2,
                name: 'Inhalants',
                color: 'blue'
            },
            {
                id: 3,
                name: 'Cannabis',
                color: 'brown',
            },
            {
                id: 4,
                name: 'Narcotic Analgesics',
                color: 'pink',
            },
            {
                id: 5,
                name: 'Hallucinogens',
                color: 'yellow',
            }
        ],
        tags: [
            {
                id: 1,
                name: 'Sedatives',
                color: 'red'
            },
            {
                id: 2,
                name: 'Inhalants',
                color: 'blue'
            },
            {
                id: 3,
                name: 'Cannabis',
                color: 'brown',
            },
            {
                id: 4,
                name: 'Narcotic Analgesics',
                color: 'pink',
            },
            {
                id: 5,
                name: 'Hallucinogens',
                color: 'yellow',
            }
        ],
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        userImage(){
            let url = this.$store.state.productionUrl
            return this.$auth.user.image ? url+this.$auth.user.image.image : this.defaultImage;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Product' : 'Edit Product'
        }
    },

    methods: {
        getAll(){

        },
        navEvent(){
            console.log('You just hovered over ma')
        },
        logout(){
            //this.$auth.logout();
            this.$router.push({path: '/'})
        },
        initialize () {
            this.drugs = [
                {
                    name: 'Penicillin',
                    category: {
                        id: 2,
                        name: 'Inhalants',
                        color: 'blue'
                    },
                    tags: [
                        {id: 1, name: 'Sedatives'},
                        {id: 2, name: 'Inhalants'},
                    ],
                    price: '100.00',
                    quantity: 10
                },
                {
                    name: 'Insulin',
                    category: {
                        id: 2,
                        name: 'Inhalants',
                        color: 'blue'
                    },
                    tags: [
                        {id: 5, name: 'Hallucinogens'},
                        {id: 4, name: 'Narcotic Analgesics'},
                    ],
                    price: '20.00',
                    quantity: 8    
                },
                {
                    name: 'Polio Vaccine',
                    category: {
                        id: 1,
                        name: 'Sedatives',
                        color: 'red'
                    },
                    tags: [
                        {id: 3, name: 'Cannabis'},
                        {id: 2, name: 'Inhalants'},
                    ],
                    price: '30.00',
                    quantity: 15
                },
                {
                    name: 'Morphine',
                    category: {
                        id: 4,
                        name: 'Narcotic Analgesics',
                        color: 'pink',
                    },
                    tags: [
                        {id: 3, name: 'Cannabis'},
                        {id: 2, name: 'Inhalants'},
                    ],
                    price: '50.00',
                    quantity: 30
                },
                {
                    name: 'Aspirin',
                    category: {
                        id: 5,
                        name: 'Hallucinogens',
                        color: 'yellow',
                    },
                    tags: [
                        {id: 5, name: 'Hallucinogens'},
                        {id: 4, name: 'Narcotic Analgesics'},
                    ],
                    price: '100.00',
                    quantity: 10
                }
            ]
        },

        editItem (item) {
            this.editedIndex = this.drugs.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.drugs.indexOf(item)
            confirm('Are you sure you want to delete this product?') && this.drugs.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.drugs[this.editedIndex], this.editedItem)
            } else {
                this.drugs.push(this.editedItem)
            }
            this.close()
        },
        async logout(){
            await this.$store.dispatch('auths/logout');
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        }
    },
    mounted(){
        //this.getAll()
        this.initialize()
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
