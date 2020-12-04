<template>
    <v-card elevation="12" color="#fff" width="60%" height="565px" class="auth">
        <div class="div-context">
            <div class="login-form px-12 py-4">
                <div class="login-header d-flex justify-center mb-4">
                    <div class="login-header-content">
                        <div class="login-header-logo">
                            <img src="~assets/logos/logo1.png" alt="" width="60px" height="60px">
                        </div>
                        <div class="my-2 custom-light-h2">Register</div>
                    </div> 
                </div>

                <div class="form-fields">
                    <v-form ref="form" class="text-center" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field 
                                    v-model="firstName" prepend-inner-icon="mdi-account" :rules="firstNameRules" filled
                                    dense rounded label="First Name" color="green" required>
                                </v-text-field>

                                <v-text-field 
                                    v-model="lastName" prepend-inner-icon="mdi-account" :rules="lastNameRules" filled
                                    dense rounded label="Last Name" color="green" required>
                                </v-text-field>

                                <v-menu
                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                    transition="scale-transition" offset-y min-width="290px">

                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="date"
                                            label="Date Of Birth"
                                            prepend-inner-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            filled dense rounded 
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker v-model="date" no-title scrollable>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" md="6">
                               <v-text-field 
                                    v-model="email" 
                                    prepend-inner-icon="mdi-email" type="email" color="green"
                                    :rules="emailRules" filled dense rounded label="Email" required>
                                </v-text-field>

                                <v-text-field 
                                    v-model="phone" 
                                    prepend-inner-icon="mdi-cellphone-andriod" color="green"
                                    :rules="phoneRules" filled dense rounded label="Phone" required>
                                </v-text-field>

                                <v-text-field 
                                    v-model="password" prepend-inner-icon="mdi-lock" :rules="passwordRules" filled dense rounded 
                                    label="Password" required hint="At least 8 characters" counter color="green"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                                    :type="show1 ? 'text' : 'password'">
                                </v-text-field>
                            </v-col>
                        </v-row>
                         
                        
                        <v-btn @click="register" depressed large prepend-inner-icon="mdi-map-marker" clearable 
                            class="white--text mt-4 rounded-0 px-8 py-5 text-capitalize" 
                            color="#009933" :loading="loading" :disabled="loading">Register 
                            <v-icon right>mdi-send</v-icon>
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </v-form>
                    <div class="subtitle-2 text-center grey--text pt-2">
                        <span class="pt-1">Already registered?</span>
                        
                        <span>
                            <v-btn @click="getView" text color="#40BCB6">Sign In</v-btn>
                        </span>
                    </div>
                </div>  
            </div>
        </div>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        firstName: '',
        firstNameRules: [
            v => !!v || 'First name is required',
            v => (v && v.length <= 30) || 'First name must not be more than 30 characters',
        ],
        lastName: '',
        lastNameRules: [
            v => !!v || 'Last name is required',
            v => (v && v.length <= 30) || 'Last name must not be more than 30 characters',
        ],
        username: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length <= 10) || 'Username must not be more than 10 characters',
        ],
        phone: '',
        phoneRules: [
            v => !!v || 'Phone is required',
            v => (v && v.length <= 11 || v.length > 11) || 'Phone must be 11 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'Email must be valid'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must not be less than 6 characters',
        ],
        show1: false,
        valid: true,
        loading: false
    }),

    methods: {
        getView(){
            this.$store.dispatch('auths/changeView', 'login')
        },
        register(){
            this.loading = true
            if (this.$refs.form.validate()) {
                let user = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phoneNumber: this.phone,
                    password: this.password,
                    dob: this.date
                }

                this.$store.dispatch("auths/register", user).then(response => {
                    if(response) {
                        this.loading = false
                        //this.$refs.form.resetValidation()
                        this.getView()
                    }
                })
            } else {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    
.div-context {
    width: 100%;
    height: 100%;

    .login-form .login-header .login-header-content .custom-light-h2 {
        font-size: 24px;
        color: #009933;
    }
}   
</style>
