<template>
    <div>
        <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 15 : ''" flat>  
                <v-card-title class="font-weight-bold text--grey text--darken-2 title blue--text pt-6 pb-0">SHIPPING ADDRESS</v-card-title>
                <v-row class="px-6 pb-4">
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.firstName" dense color="orange" label="First Name">
                        </v-text-field>
                    </v-col>
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.lastName" dense color="orange" label="Last Name">
                        </v-text-field>
                    </v-col>
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.email" dense color="orange" label="Email">
                        </v-text-field>
                    </v-col>
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.phoneNumber" dense color="orange" label="Phone Number">
                        </v-text-field>
                    </v-col>
                    <v-col md="12">
                        <v-text-field 
                            v-model="shippingForm.address" dense color="orange" label="Address">
                        </v-text-field>
                    </v-col>
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.state" hint="Default state is preselected" readonly dense color="orange" label="State">
                        </v-text-field>
                    </v-col>
                    <v-col md="6">
                        <v-text-field 
                            v-model="shippingForm.town" dense color="orange" label="Suburb/Town">
                        </v-text-field>
                    </v-col>
                    <v-col md="12">
                        <v-text-field 
                            v-model="shippingForm.country" readonly hint="Default country is preselected" dense color="orange" label="Country">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-hover>
    </div>
</template>

<script>
export default {
    data: () => ({
        shippingForm: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            state: 'Lagos',
            town: '',
            country: 'Nigeria'
        }
    })
}
</script>