<template>
    <v-card elevation="12" color="#fff" :width="width" height="570px" class="authDiv">
        <v-alert 
            v-if="showAlert" :color="alertColor" dark dense icon="mdi-checkbox-marked-circle" prominent >
            {{ alertMsg }}
        </v-alert>

        <div class="div-context">
            <div class="login-form py-4">
                <div class="login-header d-flex justify-center pb-8">
                    <div class="login-header-content">
                        <div class="login-header-logo text-center">
                            <img src="~assets/logos/logo1.png" alt="" width="60px" height="60px">
                        </div>
                        <div class="my-2 custom-light-h2">Reset Password</div>
                    </div> 
                </div>

                <div class="form-fields">
                    <v-form ref="form" class="text-center" v-model="valid" lazy-validation>
                        <v-text-field 
                            v-model="email"
                            prepend-inner-icon="mdi-email" type="email" color="green"
                            :rules="emailRules" filled dense rounded label="Email" required>
                        </v-text-field>

                        <v-text-field 
                            v-model="otp" prepend-inner-icon="mdi-lock" label="OTP" color="green" 
                            :rules="otpRules" filled dense rounded required>
                        </v-text-field>

                        <v-text-field 
                            v-model="password" prepend-inner-icon="mdi-lock" :rules="passwordRules" filled dense rounded 
                            label="Password" required hint="At least 8 characters" counter color="green"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                            :type="show1 ? 'text' : 'password'">
                        </v-text-field>

                        <v-text-field 
                            v-model="confirmPassword" prepend-inner-icon="mdi-lock" label="Confirm Password" color="green"
                            :rules="[(password === confirmPassword) || 'Password must match']" filled dense rounded 
                            required hint="At least 8 characters" counter 
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show2 = !show2"
                            :type="show2 ? 'text' : 'password'">
                        </v-text-field>

                        <!-- <div class="text-right">
                            <v-btn @click="getLoginView" class="text-capitalize mt-0" text color="#40BCB6">
                                <v-icon small left>mdi-arrow-left</v-icon> Back to Login
                            </v-btn>
                        </div> -->

                        <v-btn @click="resetMail" depressed large prepend-inner-icon="mdi-map-marker" clearable 
                            class="white--text mt-4 rounded-0 px-8 py-5 text-capitalize" 
                            color="#009933" :loading="loading" :disabled="loading">Reset
                            <v-icon right>mdi-send</v-icon>
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </v-form>
                </div>  
            </div>
        </div>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        otp: '',
        otpRules: [
            v => !!v || 'OTP is required',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must not be less than 6 characters',
        ],
        confirmPassword: '',
        show1: false,
        show2: false,
        valid: true,
        loading: false,
        width: '',
        showAlert: false,
        alertMsg: '',
        alertColor: ''
    }),

    methods: {
        getView(){
            this.$store.dispatch('auths/changeView', 'register')
        },
        getLoginView(){
            this.$store.dispatch('auths/changeView', 'login')
        },
        getForgotPasswordView(){
            this.$store.dispatch('auths/changeView', 'forgotPassword')
        },
        async resetMail(){
            this.loading = true
            if (this.$refs.form.validate()) {
                let data = {
                    newPassword: this.password,
                    confirmPassword: this.confirmPassword,
                    emailOrPhoneNumber: this.email,
                    otp: this.otp
                }
                await this.$axios.post('/Account/ChangePassword/', data).then(response => {
                if(response.data.state == -3 || response.data.state == -1){
                    this.$toast.error(response.data.message).goAway(4000)
                    this.loading = false
                    return
                } else {
                    this.loading = false 
                    this.$toast.success('Your password was successfully changed, you can now log in').goAway(4000)
                    setTimeout(() => {
                        this.getLoginView()
                    }, 3000);
                }  
            }).catch(error => {
                    this.loading = false
                    this.$toast.error(response.data.message).goAway(4000);
                })
            }
        },
        reset(){
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.otp = ''
        },
        showResponse(response, color){
            this.loading = false 
            this.alertMsg = response.data.message
            this.alertColor = color
            this.showAlert = true
            this.email = ''
        },
        myEventHandler(e) {
            let screenWidth = e.target.innerWidth
            if(screenWidth <= 425){
                this.width = '90%'
            } else if (screenWidth > 425 && screenWidth <= 768) {
                this.width = '80%'
            } else {
                this.width = '40%'
            }
        },
        setWidth(){
            let screenWidth = screen.width
            if(screenWidth <= 425){
                this.width = '90%'
            } else if (screenWidth > 425 && screenWidth <= 768) {
                this.width = '80%'
            } else {
                this.width = '40%'
            }
        }
    },

    mounted(){
        this.setWidth()
        this.$toast.success('An otp code has been sent to your email, kindly use it to complete the form').goAway(10000)
    },

    created() {
        if(process.client) {
            window.addEventListener("resize", this.myEventHandler);
        }  
    },
    destroyed() {
        if(process.client) {
            window.removeEventListener("resize", this.myEventHandler);
        } 
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables.scss";

.div-context {
    width: 100%;
    height: 100%;
    margin-top: 10px;

    .login-form {
        @include media("<=tablet"){
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
        }

        @include media(">=tablet"){
            padding-left: 3rem;
            padding-right: 3rem;
        }

        .login-header .login-header-content .custom-light-h2 {
            font-size: 24px;
            color: #009933;
        }
    } 
}   
</style>
