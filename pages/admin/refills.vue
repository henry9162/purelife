<template>
<div>
    <!-- <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading> -->

    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="refill-modal" :min-width="600"
            :max-width="1000" :adaptive="true"
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
                        <v-row class="px-4">
                            <v-col cols="12" md="6" class="py-0 pr-8">
                                <v-select
                                      v-model="refillForm.customer"
                                      :items="customers"
                                      item-text="firstName"
                                      item-value="phoneNumber"
                                      label="Customer"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-select
                                      v-model="refillForm.product"
                                      :items="products"
                                      item-text="productBrandName"
                                      item-value="productId"
                                      label="Product"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select
                                      v-model="refillForm.prescription"
                                      :items="prescriptions"
                                      item-text="complaint"
                                      item-value="prescriptionId"
                                      label="Prescription"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-text-field v-model="refillForm.refilDuration" type="number" label="Quantity">
                              </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                 transition="scale-transition">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="date" label="Date"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>


        <v-data-table :headers="headers" :items="refills" class="mx-4 py-4" :loading="isLoading" loading-text="loading... please wait">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Refills</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('refill-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Refill
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:[`item.nextRefillDate`]="{ item }">
                <span v-text="$moment(item.nextRefillDate).format('DD/MM/YYYY')"></span>
            </template>
            <template v-slot:[`item.name`]="{ item }">
                <span>{{item.firstName + " " + item.lastName}}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            
        </v-data-table>
    </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'admin',

    data: () => ({
        formTitle: "Add Refill",
        headers: [
            {
                text: 'Customer Name',
                align: 'start',
                sortable: false,
                value: 'name',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Name', value: 'productName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Refill Date', value: 'nextRefillDate', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Duration', value: 'refillDurationName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', class: ['text-button', 'grey--text text--darken-3'] }
        ],
        fullPage: true,
        refillForm: {
            customer: "",
            product: "",
            prescription: ""
        },
        menu: false
    }),

    computed: {
        isLoading(){
            return this.$store.getters['refills/getLoader'];
        },
        refills(){
            return this.$store.getters['refills/allRefills'];
        },
        customers(){
            return this.$store.getters['refills/getCustomers'];
        },
        products(){
            return this.$store.getters['refills/getProducts'];
        },
        prescriptions() {
            return this.$store.getters['refills/getPrescription'];
        }
    },

    methods: {
        ...mapActions({
            getAllRefills: 'refills/getAllRefills',
            getAllCustomers: 'refills/getAllCustomers',
            getAllProducts: 'refills/getAllProducts',
            getAllPrescriptions: 'refills/getAllPrescriptions',
        }),
        close () {
            this.$modal.hide('refill-modal');
        }
    },
    mounted(){
        this.getAllRefills();
        this.getAllCustomers();
        this.getAllProducts();
    }
}
</script>

<style lang="scss" scoped>
    
</style>
