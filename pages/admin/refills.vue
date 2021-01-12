<template>
<div>
    <!-- <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading> -->

    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="refill-modal" :min-width="800"
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
                            <v-col cols="12" md="6">
                                <v-select
                                      v-model="refillForm.customerId"
                                      :items="customers"
                                      item-text="firstName"
                                      item-value="userId"
                                      label="Customer"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                      v-model="refillForm.productId"
                                      :items="products"
                                      item-text="productBrandName"
                                      item-value="productId"
                                      label="Product"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select
                                      v-model="refillForm.prescriptionId"
                                      :items="prescriptions"
                                      item-text="complaint"
                                      item-value="prescriptionId"
                                      label="Prescription"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-text-field v-model="refillForm.refillDuration" type="number" min="0" label="Quantity">
                              </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                 transition="scale-transition"  :return-value.sync="refillForm.nextRefillDate">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="refillForm.nextRefillDate" label="Next Date For Refill"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="refillForm.nextRefillDate" no-title scrollable :min="nowDate">
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                  </v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(refillForm.nextRefillDate)">
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>

                            <v-btn color="primary" elevation="2" :loading="loading" :disabled="loading" 
                                raised v-text="btnText" @click="saveRefill">
                                <v-icon right>mdi-send</v-icon>
                            </v-btn>
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

                    <v-btn @click="openRefillForm()" depressed large color="#22A64E" dark class="rounded-0 post-caption">
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
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType != 2) {
            return redirect('/')
        }
    },

    data: () => ({
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
            "serialNumber": "",
            "productName": "",
            "refillId": "",
            "customerId": "",
            "createdBy": "",
            "productId": "",
            "prescriptionId": "",
            "refillDuration": "",
            "nextRefillDate": "",
            "createdOn": "",
            "modifiedOn": "",
            "isDeprecated": "",
            "firstName": "",
            "lastName": "",
            "refillDurationName": ""
        },
        menu: false,
        date: '',
        nowDate: new Date().toISOString().slice(0,10),
        editedIndex: -1,
        loading: false
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
        },
        btnText() {
            return this.editedIndex == -1 ? "Update Refill" : "Add Refill";
        },
        formTitle() {
            return this.editedIndex == -1 ? "Update Refill" : "Add Refill";
        }
    },

    methods: {
        ...mapActions({
            getAllRefills: 'refills/getAllRefills',
            getAllCustomers: 'refills/getAllCustomers',
            getAllProducts: 'refills/getAllProducts',
            getAllPrescriptions: 'refills/getAllPrescriptions',
        }),
        openRefillForm() {
            this.$modal.show('refill-modal');
            this.editedIndex = 1;
        },
        close () {
            this.editedIndex = -1;
            this.$modal.hide('refill-modal');
        },
        saveRefill(){
            if (this.editedIndex == -1) {
                this.updateRefill();
            } else {
                this.addRefill();
            }
        },
        async addRefill() {
            this.loading = true;
            this.btnText = "loading...";
            let data = {
                customerId: this.refillForm.customer,
                productId: this.refillForm.product,
                prescriptionId: this.refillForm.prescription,
                refillDuration: this.refillForm.refillDuration,
                nextRefillDate: this.refillForm.nextDateForRefill,
            }

            await this.$store.dispatch('refills/addRefill', data).then(response => {
                this.loading  = false;
                this.close();
            });

        },
        async updateRefill() {
            this.loading = true;
            this.btnText = "loading...";
            let data = {
                customerId: this.refillForm.customerId,
                productId: this.refillForm.productId,
                prescriptionId: this.refillForm.prescriptionId,
                refillDuration: this.refillForm.refillDuration,
                nextRefillDate: this.refillForm.nextRefillDate,
                refillId : this.refillForm.refillId
            }

            await this.$store.dispatch('refills/updateRefill', data).then(response => {
                this.loading  = false;
                this.close();
            });
        },
        deleteItem() {
            confirm('Are you sure you want to delete this refill?') && this.deleteRefill(item);
        },
        deleteRefill(item){
            this.loading = true;
            this.$store.dispatch('refills/deleteRefill', item.refillId);
        },
        editItem(item) {
            this.refillForm = Object.assign({}, item);
            this.editedIndex = -1;
            this.$modal.show('refill-modal');
        }
    },
    mounted(){
        this.getAllRefills();
        this.getAllCustomers();
        this.getAllProducts();
        this.getAllPrescriptions();
    }
}
</script>

<style lang="scss" scoped>
    .viewImage {
        position: relative
    }
    .viewImageBtn {
        position: absolute;
        bottom: -15px;
        right: -12px
    }
    .list-color { color: #22A64E !important}

    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
    }

    .custom-style {
        font-family: font(family) !important;
    }
</style>
