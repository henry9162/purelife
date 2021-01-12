<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="users-modal" :min-width="700"
            :max-width="700" :adaptive="true"
            :scrollable="true" height="auto"
            transition="fade-transition" :clickToClose="false">

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
                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                <v-select
                                    v-model="editedItem.stateId"
                                    :items="states"
                                    item-text="stateName"
                                    item-value="stateId"
                                    label="State"
                                    chips dense>
                                </v-select>
                                <v-menu
                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="editedItem.dob"
                                    transition="scale-transition" offset-y min-width="290px">

                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="editedItem.dob"
                                        label="Date Of Birth"
                                       
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>

                                    <v-date-picker v-model="editedItem.dob" no-title scrollable>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(editedItem.dob)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>

                                <v-select
                                    v-model="editedItem.lgaid"
                                    :items="lgas"
                                    item-text="lganame"
                                    item-value="lgaid"
                                    label="LGA"
                                    chips dense>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" class="py-0 pl-5">
                                <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                                <v-text-field v-model="editedItem.phoneNumber" label="Phone"></v-text-field>
                                <!-- <v-text-field v-model="editedItem.dob" label="Date Of Birth"></v-text-field> -->
                                

                                <v-select
                                    v-model="editedItem.accountType"
                                    :items="accountTypes"
                                    item-text="accountypeName"
                                    item-value="acountTypeId"
                                    label="Account Type"
                                    chips dense>
                                </v-select>
                                <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                                <v-select
                                    v-model="editedItem.roleId"
                                    :items="roles"
                                    item-text="name"
                                    item-value="roleId"
                                    label="Role"
                                    chips dense>
                                </v-select>
                            </v-col>

                            <!-- <v-col cols="12" class="pl-0">
                                <v-text-field 
                                    v-model="password" :rules="passwordRules"  dense 
                                    label="Password" required hint="At least 8 characters" counter
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                                    :type="show1 ? 'text' : 'password'">
                                </v-text-field>
                            </v-col> -->
                           
                            <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="loading" :disabled="loading" v-text="btnText">
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
        </modal>


        <v-data-table :headers="headers" :items="users" sort-by="" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Users</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('users-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add User
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.createdOn="{ item }">
                <span v-text="$moment(item.createdOn).format('DD/MM/YYYY')"></span>
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
export default {
    layout: 'admin',
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType != 2) {
            return redirect('/')
        }
    },

    data: () => ({
        dialog: true,
        loading: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        headers: [
            {
                text: 'First Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Last Name', value: 'lastName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Email', value: 'email', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Phone', value: 'phoneNumber', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'D.O.B', value: 'dob', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Role', value: 'roleName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'State', value: 'statedId', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'LGA', value: 'lgaid', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'City', value: 'city', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Account Type', value: 'accountType', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must not be less than 6 characters',
        ],
        show1: false,
        valid: true,
        editedIndex: -1,
        editedItem: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: new Date().toISOString().substr(0, 10),
            roleId: '',
            stateId: '',
            lgaid: '',
            city: '',
            password: '',
            accountType: ''
        },
        defaultItem: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: new Date().toISOString().substr(0, 10),
            roleId: '',
            stateId: '',
            lgaid: '',
            city: '',
            password: '',
            accountType: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        },
        'editedItem.stateId': function (val, oldVal) {
            this.getLga(val)
        }
    },

    computed: {
        users(){
            return this.$store.getters["users/allUsers"];
        },
        states(){
          return this.$store.getters["allStates"];
        },
        lgas(){
          return this.$store.getters["allLgas"];
        },
        accountTypes(){
            return this.$store.getters["allAccountTypes"];
        },
        roles(){
            return this.$store.getters["roles/allRoles"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add User' : 'Edit User';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$modal.show('users-modal')
        },
        addUser(){
            this.loading = true
            let data = {
                firstName: this.editedItem.firstName,
                lastName: this.editedItem.lastName,
                email: this.editedItem.lastName,
                phoneNumber: this.editedItem.phoneNumber,
                dob: this.editedItem.dob,
                roleId: this.editedItem.roleId,
                statedId: this.editedItem.stateId,
                lgaid: this.editedItem.lgaid,
                city: this.editedItem.city,
                accountType: this.editedItem.accountType,
                password: this.editedItem.password,
                createdOn: new Date(),
                createdBy: this.$auth.user.userId
            }
            //console.log(this.$auth.user);
            this.$store.dispatch('users/addUser', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateUser(){
            this.loading = true
            let data = {
                userId: this.users[this.editedIndex].userId,
                firstName: this.editedItem.firstName,
                lastName: this.editedItem.lastName,
                email: this.editedItem.lastName,
                phoneNumber: this.editedItem.phoneNumber,
                dob: this.editedItem.dob,
                roleId: this.editedItem.roleId,
                statedId: this.editedItem.stateId,
                lgaid: this.editedItem.lgaid,
                password: this.users[this.editedIndex].password,
                city: this.editedItem.city,
                accountType: this.editedItem.accountType,
                modifiedOn: this.users[this.editedIndex].modifiedOn,
                isDeprecated: this.users[this.editedIndex].isDeprecated
            }
            
            this.$store.dispatch('users/updateUser', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this user?') && this.deleteUser(item)
        },
        deleteUser(item){
            let index = this.users.indexOf(item)
            this.$store.dispatch('users/deleteUser', this.users[index].userId).then(response => {
                this.refreshTable()
            })
        },
        getLga(val){
            val === "" || val === undefined  ? '' : this.$store.dispatch('getLga', val)
        },
        refreshTable(){
            this.$store.dispatch('users/getAllUsers');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('users-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateUser();
            } else {
                this.addUser();
            }
        },
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
