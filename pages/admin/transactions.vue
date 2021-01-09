<template>
<div>
    <!-- <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading> -->

    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="transaction-modal" :min-width="800"
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
                    <span class="headline list-color custom-style">Transaction Summary</span>
                </div>

                <v-card-text>
                    <v-container>
                        <v-row class="px-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="transactionForm.customer" readonly type="text" label="Customer">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="transactionForm.itemsCount" readonly type="text" label="Total Items">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="transactionForm.totalSum" readonly type="text" label="Total Sum">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select
                                    v-model="transactionForm.methodOfPaymentId"
                                    :items="methodOfPayments"
                                    item-text="methodOfPayment"
                                    item-value="methodOfPaymentId"
                                    label="Method Of Payment"
                                    chips dense readonly disabled>
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field readonly v-model="transactionForm.transactionId" type="text" label="Transaction Id">
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field readonly v-model="transactionForm.transactionStatusId" type="text" label="Transaction Status">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>


        <v-data-table :headers="headers" :items="transactions" class="mx-4 py-4" :loading="isLoading" loading-text="loading... please wait">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Transactions</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>

            <template v-slot:[`item.methodOfPaymentId`]="{ item }">
                <span v-text="getMethodOfPayment(item.methodOfPaymentId)"></span>
            </template>
            <template v-slot:[`item.transactionStatusId`]="{ item }">
                <span>{{item.transactionStatusId == 1 ? 'Pending' : item.transactionStatusId == 2 ? 'Success' : 'Declined'}}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2 green--text" @click="viewItem(item)">mdi-eye</v-icon>
                <v-icon small class="mr-2 red--text" @click="cancelTransaction(item.transactionSummaryId)">mdi-cancel</v-icon>
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
        headers: [
            {
                text: 'Customer Name',
                align: 'start',
                sortable: false,
                value: 'customer',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'ItemsCount', value: 'itemsCount', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'TotalSUm', value: 'totalSum', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Method of payment', value: 'methodOfPaymentId', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Transaction Status', value: 'transactionStatusId', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', class: ['text-button', 'grey--text text--darken-3'] }
        ],
        fullPage: true,
        transactionForm: {
            "customer": "Henry Ekwonwa",
            "itemsCount": "",
            "totalSum": "",
            "methodOfPaymentId": "",
            "transactionId": "",
            "transactionStatusId": ""
        },
        menu: false,
        date: '',
        nowDate: new Date().toISOString().slice(0,10),
        editedIndex: -1,
        loading: false,
        methodOfPayments: [
            {
                "methodOfPayment": 'cash',
                "methodOfPaymentId": 1
            },
            {
                "methodOfPayment": 'online',
                "methodOfPaymentId": 2
            }
        ]
    }),

    computed: {
        isLoading(){
            return this.$store.getters['transactions/getLoader'];
        },
        transactions(){
            return this.$store.getters['transactions/allTransactions'];
        }
    },

    methods: {
        ...mapActions({
            getAllTransactions: 'transactions/getAllTransactions'
        }),
        openTransactionForm() {
            this.$modal.show('transaction-modal');
        },
        close () {
            this.$modal.hide('transaction-modal');
        },
        async cancelTransaction(id) {
            this.isLoading = true;

            await this.$store.dispatch('transactions/cancelTransaction', id).then(response => {
                this.isLoading  = false;
            });
        },
        viewItem(item) {
            let data = {...item}
            data.transactionStatusId = item.transactionStatusId == 1 ? 'Pending' : item.transactionStatusId == 2 ? 'Success' : 'Declined';
            
            this.transactionForm = Object.assign({}, data);
            this.$modal.show('transaction-modal');
        },
        getMethodOfPayment(id) {
            let methodOfPayment = this.methodOfPayments.find( item => item.methodOfPaymentId == id);
            return methodOfPayment != undefined ? methodOfPayment.methodOfPayment : "";
        }
    },
    mounted(){
        this.getAllTransactions();
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
