<template>
    <div>
        <client-only>
            <loading 
                :active.sync="isLoading" 
                :can-cancel="true" 
                :is-full-page="fullPage">
            </loading>
        </client-only>
        
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
                                    <v-col cols="12" md="4" class="py-0 pr-0">
                                         <div class="viewImage mr-4">
                                            <v-img :src="tempImage ? tempImage : threadImage ? threadImage : defaultImage" aspect-ratio="1.7"></v-img>
                                            
                                            <v-btn class="mx-2 viewImageBtn" fab dark small color="#40BCB6">
                                                <v-file-input
                                                    class="pt-0 pl-2"
                                                    hide-input :disabled="disabled"
                                                    v-model="file"
                                                    placeholder="Upload image"
                                                    label="Image"
                                                    accept="image/*"
                                                    show-size
                                                >
                                                    <!-- <template v-slot:selection="{ text }">
                                                        <v-chip small label color="#40BCB6">{{ text }}</v-chip>
                                                    </template> -->
                                                </v-file-input>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="py-0 px-5">
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
                                    <v-col cols="12" md="4" class="py-0 pl-0">
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

                                    <v-col cols="12" offset-md="2">
                                        <div class="d-flex justify-center">
                                            <v-btn  
                                                @click="changeState" rounded
                                                depressed large prepend-inner-icon="mdi-map-marker" clearable
                                                class="white--text mt-6 mb-10 px-14 py-5 text-capitalize"
                                                color="#009933" v-text="btnName">
                                            </v-btn>

                                            <v-btn rounded @click="updateUser" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                                class="white--text mt-6 mb-10 ml-4 px-14 py-5 text-capitalize"
                                                color="red darken-2" :loading="loading" :disabled="disabled"> Update
                                                <v-icon right>mdi-send</v-icon>
                                                <template v-slot:loader>
                                                    <span class="custom-loader">
                                                        <v-icon dark>mdi-cached</v-icon>
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
import titleParalax from '../components/TitleParalax'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'home',
    components: {titleParalax},

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
            accountType: '',
            imageSrc: '',
            userImage: ''
        },
        defaultImage: 'https://via.placeholder.com/150',
        tempImage: '',
        threadImage: '',
        file: [],
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
        },
        file(val){
            val ? this.processImage(val) : ''
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
        processImage(imageFile){
            let imageSize = Number((imageFile.size / 1024 / 1024).toFixed(3));
            if(imageSize > 0.322){
                this.$toast.error('Image should be of size 320kb or less, Please resize!').goAway(3500)
                return
            }
            this.setImage(imageFile)
        },
        setImage(imageFile){
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = e => {
                this.tempImage = e.target.result;
                this.editedItem.userImage = imageFile
                this.editedItem.imageSrc = imageFile
            };
        },
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
                this.editedItem.userImage = user.userImage
                this.threadImage = user.userImage
                this.isLoading = false
            })
        },
        getLga(val){
            val === "" || val === undefined  ? '' : this.$store.dispatch('getLga', val)
        },
        async updateUser(){
            this.loading = true
            const formData = new FormData();
            formData.append('firstName', this.editedItem.firstName)
            formData.append('lastName', this.editedItem.lastName)
            formData.append('email', this.editedItem.email)
            formData.append('phoneNumber', this.editedItem.phoneNumber)
            formData.append('dob', this.editedItem.dob)
            formData.append('roleId', this.editedItem.roleId)
            formData.append('statedId', this.editedItem.statedId)
            formData.append('lgaid', this.editedItem.lgaid)
            formData.append('city', this.editedItem.city)
            formData.append('password', this.editedItem.password)
            formData.append('accountType', this.editedItem.accountType)
            formData.append('image', this.editedItem.userImage)

            let data  = {
                userId: this.editedItem.userId,
                data: formData
            }

            await this.$store.dispatch('users/updateUser', data).then(response => {
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

<style lang="scss">
    .viewImage {
        position: relative
    }
    .viewImageBtn {
        position: absolute;
        bottom: -15px;
        right: -12px
    }
    .customm-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
        font-size: 24px;
    }
    .amount-caption {
        font-family: font(family) !important;
        font-size: 24px;
    }
    .post-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
    }
    .no-shadow {
        box-shadow: none !important;
    }
</style>