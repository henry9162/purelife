<template>
<div>
    <!-- <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading> -->

    

        <div class="mx-10 mt-10">
            <v-row>
                <v-col md="8">
                    <v-row>
                        <v-col cols="12" md="3" class="p-0" >
                            <v-select
                                v-model="transactionFilter"
                                :items="filters"
                                item-text="filter"
                                item-value="filterId"
                                label="Method"
                                chips dense>
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-menu
                                ref="toDateMenu"
                                v-model="toDateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="dates"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateRangeText"
                                        label="Date Range"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dates"
                                    no-title
                                    scrollable
                                    range
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn 
                                        text color="primary" @click="$refs.toDateMenu.save([])">Clear
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="toDateMenu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.toDateMenu.save(dates)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn block @click="filterTransactions" max-width="100" depressed small prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="filterLoading" :disabled="filterLoading" v-text="filterText" 
                                >
                                <v-icon right>mdi-send</v-icon>
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                        <v-icon light>mdi-cached</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
        </div>


    <v-card class="mx-10" color="#22A64E">
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

                    <v-text-field
                        v-model="total"
                        label="Total"
                        readonly
                        disabled
                        class="shrink"
                    ></v-text-field>
                    
                </v-toolbar>

            </template>

            <template v-slot:[`item.transSummary.methodOfPaymentId`]="{ item }">
                <span v-text="getMethodOfPayment(item.transSummary.methodOfPaymentId)"></span>
            </template>
            <template v-slot:[`item.transSummary.transactionStatusId`]="{ item }">
                <span>{{item.transSummary.transactionStatusId == 1 ? 'Pending' : item.transSummary.transactionStatusId == 2 ? 'Success' : 'Declined'}}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2 green--text" @click="viewItem(item)">mdi-eye</v-icon>
                <v-icon small class="mr-2 red--text" @click="cancelTransaction(item.transSummary.transactionSummaryId)">mdi-cancel</v-icon>
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
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        dates: [],
        fromDateMenu: false,
        toDateFilter: '',
        toDateMenu: false,
        transactionFilter: '',
        filterLoading: false,
        filterText: "Filter",
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        filters: [
            {
               filter: 'All',
               filterId: 0 
            },
            {
               filter: 'Cash',
               filterId: 1
            },
            {
               filter: 'Online',
               filterId: 2
            },
            {
               filter: 'POS',
               filterId: 3
            },
        ],
        headers: [
            {
                text: 'Customer',
                align: 'start',
                sortable: false,
                value: 'billingInfo.fullName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Address', value: 'billingInfo.address', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'ItemsCount', value: 'transSummary.itemsCount', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'TotalSUm', value: 'transSummary.totalSum', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Method of payment', value: 'transSummary.methodOfPaymentId', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Transaction Status', value: 'transSummary.transactionStatusId', class: ['text-button', 'grey--text text--darken-3'] },
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
        },
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
        total () {
            return this.$store.getters['transactions/getTotal'];
        },
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
            let data = {...item.transSummary};
            let customer = item.billingInfo.fullName;
            data.customer = customer;
            
            data.transactionStatusId = item.transSummary.transactionStatusId == 1 ? 'Pending' : item.transSummary.transactionStatusId == 2 ? 'Success' : 'Declined';
            
            this.transactionForm = Object.assign({}, data);
            this.$modal.show('transaction-modal');
        },
        getMethodOfPayment(id) {
            let methodOfPayment = this.methodOfPayments.find( item => item.methodOfPaymentId == id);
            return methodOfPayment != undefined ? methodOfPayment.methodOfPayment : "";
        },
        async filterTransactions() {
            let data = {
                methodOfPaymentId: this.transactionFilter,
                from: this.dates[0],
                to: this.dates[1],
            }

            await this.$store.dispatch('transactions/filterTransaction', data).then(response => {
                console.log(response)
            });
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
