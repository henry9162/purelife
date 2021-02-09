<template>
<div>
    <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading>
    <div id="pdfDom" class="mt-2">
        <v-container class="pt-0">
            <div class="d-flex justify-center">
            <v-card class="mt-8 mb-6 px-4" color="green darken-2" flat>
                <v-card class="mx-4 my-0">
                    <div class="amount-caption pt-10 pb-8 text-center green--text text--darken-2">
                        My Profile
                    </div>
                    <div>
                        <v-container>
                            <v-row class="px-8">
                                <v-col cols="12" md="6" class="py-0 px-0">
                                    <v-text-field filled :disabled="disabled" v-model="editedItem.firstName" label="First Name"></v-text-field>
                                    <v-text-field filled :disabled="disabled" v-model="editedItem.email" label="Email"></v-text-field>
                                    <v-select
                                        filled
                                        :disabled="disabled"
                                        v-model="editedItem.statedId"
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
                                            filled
                                            :disabled="disabled"
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
                                </v-col>
                                <v-col cols="12" md="6" class="py-0 pl-5">
                                    <v-text-field filled :disabled="disabled" v-model="editedItem.lastName" label="Last Name"></v-text-field>
                                    <v-text-field filled :disabled="disabled" v-model="editedItem.phoneNumber" label="Phone"></v-text-field>
                                        <v-select
                                        filled
                                        :disabled="disabled"
                                        v-model="editedItem.lgaid"
                                        :items="lgas"
                                        item-text="lganame"
                                        item-value="lgaid"
                                        label="LGA"
                                        chips dense>
                                    </v-select>
                                    <v-text-field filled :disabled="disabled" v-model="editedItem.city" label="City"></v-text-field> 
                                </v-col>

                                <!-- <v-col cols="12" class="pl-0">
                                    <v-text-field 
                                        v-model="password" :rules="passwordRules"  dense 
                                        label="Password" required hint="At least 8 characters" counter
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                                        :type="show1 ? 'text' : 'password'">
                                    </v-text-field>
                                </v-col> -->

                                <v-col cols="12">
                                    <div class="d-flex justify-center">
                                        <v-btn rounded @click="changeState" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                            class="white--text mt-6 mb-10 px-14 py-5 text-capitalize"
                                            color="#009933" :loading="loading" :disabled="loading" v-text="btnName">
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>mdi-cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>

                                        <v-btn rounded @click="updateUser" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                            class="white--text mt-6 mb-10 ml-4 px-14 py-5 text-capitalize"
                                            color="red darken-2" :loading="loading" :disabled="loading"> Update
                                            <v-icon right>mdi-send</v-icon>
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>mdi-cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>
                                    </div>
                                </v-col>
                    
                            </v-row>
                        </v-container>
                    </div>
                </v-card>
            </v-card>
            </div>
        </v-container>                           
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'admin',
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        menu: false,
        editedItem: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: new Date().toISOString().substr(0, 10),
            roleId: '',
            statedId: '',
            lgaid: '',
            city: '',
            password: '',
            accountType: ''
        },
        defaultImage: 'https://via.placeholder.com/150',
        loading: false,
        isLoading: false,
        fullPage: false,
        disabled: true
    }),

    watch: {
        dialog (val) {
            val || this.close()
        },
        'editedItem.statedId': function (val, oldVal) {
            this.getLga(val)
        }
    },

    computed: {
        ...mapGetters({
            transactions: 'productss/transProductsByUser',
        }),
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
        btnName(){
            return this.disabled == true ? 'Edit' : 'View'
        }
    },

    methods: {
       ...mapActions({
            addToCart: 'productss/addToCart'
        }),
        init(){
            let userId = this.$auth.user.userId
            this.$store.dispatch('productss/getTransactionByUserId', userId)
        },
        async setUser(){
            await this.$store.dispatch('auths/setUser');
        },
        changeState(){
            if( this.disabled == true){
                this.disabled = false
            } else {
                this.disabled = true
            }
        },
        porpulateUser(){
            this.isLoading = true
            this.$store.dispatch('users/getUserById', this.$auth.user.userId).then(response => {
                let user = response.data.data
                this.editedItem.userId = user.userId
                this.editedItem.firstName = user.firstName
                this.editedItem.lastName = user.lastName
                this.editedItem.email = user.email
                this.editedItem.phoneNumber = user.phoneNumber
                this.editedItem.dob = user.dob
                this.editedItem.roleId = user.roleId
                this.editedItem.statedId = user.statedId
                this.editedItem.lgaid = user.lgaid
                this.editedItem.city = user.city
                this.editedItem.accountType = user.accountType
                this.isLoading = false
            })
        },
        getLga(val){
            val === "" || val === undefined  ? '' : this.$store.dispatch('getLga', val)
        },
        updateUser(){
            this.loading = true
            
            this.$store.dispatch('users/updateUser', this.editedItem).then(response => {
                this.loading = false
                this.porpulateUser()
            })
        },
    },

    mounted(){
        this.setUser()
        this.init()
        this.porpulateUser()
    }
}
</script>

<style lang="scss" scoped>
    .list-color { color: #22A64E !important}

    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
    }
    .amount-caption {
        font-family: font(family) !important;
        font-size: 24px;
    }
    .custom-style {
        font-family: font(family) !important;
    }
</style>
