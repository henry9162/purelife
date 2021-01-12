<template>
<div class="d-flex justify-center">
    <v-card class="mt-14" width="70%" color="#22A64E">
        <v-card class="mx-4 py-6" flat>
            <div>
                <v-form ref="form" class="px-6" v-model="valid" lazy-validation>
                    <div class="text-h5 custom-style list-color text-center pt-2 pb-6">Loyalty Set Up</div>
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="post-caption pb-4">To Acquire</div>
                            <v-text-field 
                                v-model="loyaltyPoint" prepend-inner-icon="" type="number" color="green"
                                filled dense rounded :disabled="disabled" label="loyal Point">
                            </v-text-field>

                            <v-text-field 
                                v-model="value" prepend-inner-icon="mdi-currency-ngn" type="number" color="green"
                                filled dense rounded :disabled="disabled" label="Value">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <div class="post-caption pb-4">To Buy</div>
                            <v-text-field 
                                v-model="loyaltyPointToBuy" prepend-inner-icon="" type="number" color="green"
                                filled dense rounded :disabled="disabled" label="loyal Point">
                            </v-text-field>

                            <v-text-field 
                                v-model="valueToBuy" prepend-inner-icon="mdi-currency-ngn" type="number" color="green"
                                filled dense rounded :disabled="disabled" label="Value">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <div class="d-flex justify-center pb-3">
                        <v-btn @click="edit" depressed large prepend-inner-icon="" 
                            class="white--text mt-4 rounded-0 px-8 py-5 text-capitalize" 
                            color="#009933" :disabled="disableEdit">Edit
                        </v-btn>

                        <v-btn 
                            @click="update" depressed large prepend-inner-icon=""  
                            class="white--text mt-4 ml-3 rounded-0 px-8 py-5 text-capitalize" 
                            color="#009933" :loading="loading" :disabled="disabled">
                                Update
                            <v-icon right>mdi-send</v-icon>
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </v-card>
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
        disabled: true,
        disableEdit: false,
        disableUpdate: true,
        loading: false,
        valid: true
    }),

    computed: {
        loyaltyPoint: {
            get(){
                return this.$store.state.loyalties.loyaltyPoint
            },
            set(value){
                this.$store.dispatch('loyalties/setLoyalty', value)
            }
        },
        value: {
            get(){
                return this.$store.state.loyalties.value
            },
            set(value){
                this.$store.dispatch('loyalties/setValue', value)
            }
        },
        loyaltyPointToBuy: {
            get(){
                return this.$store.state.loyalties.loyaltyPointToBuy
            },
            set(value){
                this.$store.dispatch('loyalties/setLoyaltyToBuy', value)
            }
        },
        valueToBuy: {
            get(){
                return this.$store.state.loyalties.valueToBuy
            },
            set(value){
                this.$store.dispatch('loyalties/setValueToBuy', value)
            }
        }
    },

    methods: {
        edit(){
            this.editView()
        },
        update(){
            this.loading = true
            this.$store.dispatch('loyalties/updateLoyalty').then(response => {
                this.loading = false
                this.reset()
            })
        },
        editView(){
            this.disabled = false
            this.disableUpdate = false
            this.disableEdit = true
        },
        reset(){
            this.disabled = true
            this.disableUpdate = true
            this.disableEdit = false
        },
        async getLoyaltySetUp(){
            await this.$store.dispatch('loyalties/getLoyaltySetUp')
        }
    },

    mounted(){
        this.getLoyaltySetUp()
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
