<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <v-data-table :headers="headers" :items="users" sort-by="name" class="px-6">
            <template v-slot:top>
                <v-toolbar flat color="white" class="pt-6">
                    <v-toolbar-title class="list-color post-caption">All Users</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="#22A64E" dark class="rounded-0 post-caption" v-bind="attrs" v-on="on">
                                <v-icon left>mdi-plus-circle-outline</v-icon> Add User
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
                                            <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                                        </v-col>
                                        
                                        <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable 
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
</div>
</template>

<script>
export default {
    layout: 'admin',

    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'First Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
            },
            { text: 'Last Name', value: 'lastName' },
            { text: 'Username', value: 'username' },
            { text: 'Email', value: 'email' },
            { text: 'Phone', value: 'phone' },
            { text: 'Password', value: 'password' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            password: ''
        },
        defaultItem: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            password: ''
        },
        users: [],
        loading: false
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add User' : 'Edit User'
        }
    },

    methods: {
        initialize () {
            this.users = [
                {
                    firstName: 'Henry',
                    lastName: 'Ekwonwa',
                    username: 'CreativeH',
                    email: 'henimastic@gmail.com',
                    phone: '08125234436',
                    password: 'password'
                },
                {
                    firstName: 'Deborah',
                    lastName: 'Okubadejo',
                    username: 'Angel',
                    email: 'deborah@gmail.com',
                    phone: '08125234431',
                    password: 'password'   
                },
                {
                    firstName: 'Chris',
                    lastName: 'Ekwonwa',
                    username: 'Chris',
                    email: 'chris@gmail.com',
                    phone: '08125234432',
                    password: 'password'
                },
                {
                    firstName: 'Felix',
                    lastName: 'Ekwonwa',
                    username: 'felix',
                    email: 'felix@gmail.com',
                    phone: '08125234434',
                    password: 'password'
                },
                {
                    firstName: 'Beatrice',
                    lastName: 'Ekwonwa',
                    username: 'Beatrice',
                    email: 'beatrice@gmail.com',
                    phone: '08125234435',
                    password: 'password'
                }
            ]
        },

        addUser(){
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$toast.success('Successfully added user').goAway(3500)
                this.dialog = false
            }, 3000);
        },

        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.users.indexOf(item)
            confirm('Are you sure you want to delete this user?') && this.users.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$toast.success('Successfully added user').goAway(3500)
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)
                } else {
                    this.users.push(this.editedItem)
                }
                this.dialog = false
            }, 3000);
        },
    },

    mounted(){
        this.initialize()
    }

}
</script>

<style lang="scss" scoped>
    .list-color { color: #22A64E !important}

    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
    }

    .custom-style {
        font-family: font(family) !important;
    }
</style>