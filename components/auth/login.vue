<template>
    <v-card elevation="12" color="#fff" width="40%" height="570px" class="auth">
        <div class="div-context">
            <div class="login-form px-12 py-4">
                <div class="login-header d-flex justify-center mb-4">
                    <div class="login-header-content">
                        <div class="login-header-logo">
                            <img src="~assets/logos/logo1.png" alt="" width="60px" height="60px">
                        </div>
                        <div class="my-2 custom-light-h2">Sign In</div>
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
                            v-model="password" prepend-inner-icon="mdi-lock" :rules="passwordRules" filled dense rounded 
                            label="Password" required hint="At least 8 characters" counter color="green"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                            :type="show1 ? 'text' : 'password'">
                        </v-text-field>

                        <v-btn @click="login" depressed large prepend-inner-icon="mdi-map-marker" clearable 
                            class="white--text mt-4 rounded-0 px-8 py-5 text-capitalize" 
                            color="#009933" :loading="loading" :disabled="loading">Sign In 
                            <v-icon right>mdi-send</v-icon>
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </v-form>
                    <div class="subtitle-2 text-center grey--text pt-2">
                        <span class="pt-1">Not registered?</span>
                        
                        <span>
                            <v-btn @click="getView" text color="#40BCB6">Register</v-btn>
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
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 30) || 'Name must not be more than 30 characters',
        ],
        username: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length <= 10) || 'Username must not be more than 10 characters',
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
        show1: false,
        valid: true,
        loading: false
    }),

    methods: {
        getView(){
            this.$store.dispatch('auths/changeView', 'register')
        },
        async login(){
            this.loading = true
            if (this.$refs.form.validate()) {
                let data = {
                    emailOrPhone: this.email,
                    password: this.password
                }

                await this.$store.dispatch("auths/login", data).then(response => {
                    if(response) {
                        this.$auth.setUser(response.data.data)
                        this.loading = false
                        this.$toast.success(response.data.message).goAway(3000)
                        //this.$refs.form.resetValidation()
                        //this.$refs.form.reset()
                        this.$router.push({path: '/'})
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
    margin-top: 130px;

    .login-form .login-header .login-header-content .custom-light-h2 {
        font-size: 24px;
        color: #009933;
    }
}   
</style>
