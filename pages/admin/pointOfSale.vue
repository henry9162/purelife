<template>
<div>
    <loading 
        :active.sync="isPageLoading" 
        :can-cancel="true" 
        :is-full-page="true">
    </loading>

    <v-container class="grey lighten-5 mx-10 mt-14">
        <v-row justify="end">
             <v-col cols="12" xs="12" md="6">
                <div class="mt-4">
                    <span class="green--text text--darken-2 font-weight-bold">Admin Staff:</span> <span class="post-caption">Faithful</span>
                </div>
                <!-- <div>
                    Custom
                </div> -->
            </v-col>
            <v-col cols="12" xs="12" md="6" justify="end" style="text-align:right">
                 <v-btn tile @click="openScanModal()" color="secondary" class="my-0 mt-4" dark small elevation="3">
                    Open Scanning mode
                </v-btn>
            </v-col>
            <v-col cols="12" md="4">
                 <v-card color="blue">
                    <v-simple-table fixed-header color="blue" dark>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left green py-2 white--text post-caption">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-left py-4">{{totalPrice}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>

                <v-card class="mt-3" color="secondary" v-if="totalPriceBool">
                    <div class="text-center py-3 d-flex justify-space-around">
                        <v-btn @click="openPaymentModal(1)" depressed prepend-inner-icon="mdi-map-marker" clearable
                            class="white--text text-center rounded-0 text-capitalize"
                            color="primary" :loading="loading" :disabled="loading">
                            CASH
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                        <v-btn @click="openPaymentModal(2)" depressed prepend-inner-icon="mdi-map-marker" clearable
                            class="white--text text-center rounded-0 text-capitalize"
                            color="indigo" :loading="loading" :disabled="loading">
                            POS
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                        <v-btn @click="openPaymentModal(3)" depressed prepend-inner-icon="mdi-map-marker" clearable
                            class="white--text text-center rounded-0 text-capitalize"
                            color="cyan" :loading="loading" :disabled="loading">
                            TRANSFER
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>

                        <!-- <paystack
                            style="margin:auto;"
                            class="v-btn my-3 v-btn--contained theme--light v-size--large green white--text"
                            :amount="totalPrice * 100"
                            :email="email"
                            :paystackkey="PUBLIC_KEY"
                            :callback="processCardPayment"
                            :reference="genRef()"
                            :close="closePaystack"
                            :embed="false"
                        >
                        PAY (ONLINE N {{totalPrice}})</paystack> -->

                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="8">
                 <v-card color="#22A64E">
                    <v-simple-table fixed-header>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left green py-2 white--text post-caption">Product Name</th>
                                    <th class="text-center green py-2 white--text post-caption">Qantity</th>
                                    <th class="text-center green py-2 white--text post-caption">Unit Price</th>
                                    <th class="text-center green py-2 white--text post-caption">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in products" :key="product.serial">
                                    <td class="text-left py-4">{{product.productName}}</td>
                                    <td class="text-center pt-4 mb-0">
                                        <div style="width: 100%" class="d-flex justify-center">
                                            <v-btn tile @click="updateQuantity({ product: product, type: 'decrease' })" color="success" class="my-0 mt-4" dark x-small depressed>
                                                <v-icon x-small>mdi-minus</v-icon>
                                            </v-btn>

                                            <div style="width: 10%">
                                                <v-text-field class="custom-input-height" dense flat solo disabled v-model="product.quantity"></v-text-field>
                                            </div>                                                    

                                            <v-btn @click="updateQuantity({ product: product, type: 'increase' })" tile color="success" class="my-0 mt-4" dark x-small depressed>
                                                <v-icon x-small>mdi-plus</v-icon>
                                            </v-btn>

                                            <v-btn @click="removeItem(product.serial)" depressed tile class="ml-4 mt-4" color="red" x-small dark>
                                                <v-icon x-small>mdi-close</v-icon>
                                            </v-btn>
                                        </div>
                                    </td>
                                    <td class="text-center py-4">
                                        {{ product.unitPrice }}
                                    </td>
                                    <td class="text-center py-4">
                                        {{ product.total }}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
    <modal
        name="barcode-modal" :min-width="500"
        :max-width="100" :adaptive="true"
        :scrollable="true" height="auto"
        transition="fade-transition" :clickToClose="false" id="barcoeMdl">

        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close()">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-actions>

            <div class="text-center" id="mdlText" style="display:none">
                <span class="headline list-color custom-style">...Awaiting Scan</span>
            </div>
            <div class="text-center" id="focusOutText" style="display:none">
                <span class="list-color custom-style">Please select textbox to scan</span>
            </div>
            
            <div class="text-center" id="mdlSpinner" style="display:none">
                <span class="headline list-color custom-style">
                    <v-progress-circular
                        indeterminate
                        color="deep-orange lighten-2"
                    ></v-progress-circular>
                </span>
            </div>

            <v-card-text>
                <v-container>
                <div>
                    <v-text-field clearable 
                        ref="inputRef" type="text" 
                        @change="onBarcodeScanned($event)" 
                        id="scanInput" 
                        data-barcode
                        @blur="handleFocus(false)"
                        @focus="handleFocus(true)">
                    </v-text-field>
                    </div>
                </v-container>
            </v-card-text>
        </v-card>
    </modal>
    
    <modal
        name="payment-modal" :min-width="500"
        :max-width="100" :adaptive="true"
        :scrollable="true" height="auto"
        transition="fade-transition" :clickToClose="false" id="paymentMdl">

        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closePayment()">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card-actions>

            <div class="text-center" id="">
                <span class="headline list-color custom-style">{{paymentModalText}}</span>
            </div>

            <v-card-text>
                <v-container>
                    <div>
                        <v-btn @click="processPOSPaymentFromModal()" depressed prepend-inner-icon="mdi-map-marker" clearable
                            class="white--text text-center rounded-0 text-capitalize"
                            color="green" :loading="paymentLoading" :disabled="paymentLoading">
                            Yes
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                        
                        <v-btn @click="closePayment()" depressed prepend-inner-icon="mdi-map-marker" clearable
                            class="white--text text-center rounded-0 text-capitalize"
                            color="red" :loading="paymentLoading" :disabled="paymentLoading">
                            Cancel
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template>
                        </v-btn>
                    </div>
                </v-container>
            </v-card-text>
        </v-card>
    </modal>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uniqid from 'uniqid';

export default {
    layout: 'admin',
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        scanning: false,
        email:"test@gmail.com",
        scanNumber: 0,
        barcode: "",
        loading: false,
        PUBLIC_KEY: 'pk_test_f0e1384d623ed0499d138aefbc60c8063992fa2f',
        PUBLIC_KEYY: 'pk_live_3f9bd55ca82c67fa47f64d80490f14ac49c510e8',
        methodOfPayment: {
            cash: 1,
            pos: 2,
            transfer: 3
        },
        transactionStatus: {
            pending: 1,
            success: 2,
            declined: 3
        },
        isPageLoading: false,
        paymentModalText: "",
        paymentMode: 0,
        paymentLoading: false
    }),

    computed: {
        products(){
            return this.$store.getters["pointOfSale/allProducts"];
        },
        totalPrice() {
            return this.$store.getters["pointOfSale/totalPrice"];
        },
        authEmail(){
            return this.$store.state.auths.authUser.email
        },
        totalPriceBool() {
            return this.totalPrice > 0 ? true : false;
        },
        totalQuantity(){
            return this.$store.getters["pointOfSale/totalQuantity"];
        },
        authUser() {
            return this.$store.state.auths.authUser.firstName + " " + this.$store.state.auths.authUser.lastName
        }
    },

    methods: {
        ...mapActions({
            updateQuantity: 'pointOfSale/updateQuantity',
            removeItem: 'pointOfSale/removeItem',
            getProduct: 'pointOfSale/getProduct',
            clearProducts: 'pointOfSale/clearProducts',
            processPayment: 'pointOfSale/processPayment'
        }),
        openScanModal(){
            this.$modal.show('barcode-modal');

            setTimeout(function (){
                document.getElementById("mdlText").style.display = "block";
                document.getElementById("mdlSpinner").style.display = "none";
                document.getElementById("scanInput").focus();
                // this.$refs.barcodeInput.focus();
            }, 500)
            
            // this.addEventForBarcode()
            //document.getElementById("scanInput").focus();
        },
        openPaymentModal(mode){
            this.paymentMode = mode;

            switch (mode) {
                case 1:
                    this.paymentModalText = "Customer paid CASH?"
                    break;
                case 2:
                    this.paymentModalText = "Customer paid with POS?"
                    break;
                case 3:
                    this.paymentModalText = "Customer paid with TRANSFER?"
                    break;
                default:
                    break;
            }

            this.$modal.show('payment-modal');

        },
        onBarcodeScanned (barcode) {
            this.scanNumber = ++this.scanNumber;
            
            if (this.scanNumber < 2){
                this.barcode = barcode;
                this.scanning = true;
                document.getElementById("scanInput").style.display = "none";
                document.getElementById("mdlText").style.display = "none";
                document.getElementById("mdlSpinner").style.display = "block";
                document.querySelector("#barcoeMdl .v-input__append-inner button").click()
                this.processBarCode(this.barcode);
            }
        },
        async processBarCode(barcode){
            await this.getProduct(barcode).then(response => {
                if (response == null){
                    this.$toast.info("Product not in stock").goAway(5000);
                }

                this.scanning = false;
                document.getElementById("scanInput").style.display = "block";
                document.getElementById("mdlText").style.display = "block";
                document.getElementById("mdlSpinner").style.display = "none";
                document.querySelector("#barcoeMdl .v-input__append-inner button").click();
                document.getElementById("scanInput").focus();
                this.scanNumber = 0
            }).catch(err => {

                this.$toast.error("An error occurred, please contact admin").goAway(5000);
                
                this.scanning = false;
                document.getElementById("scanInput").style.display = "block";
                document.getElementById("mdlText").style.display = "block";
                document.getElementById("mdlSpinner").style.display = "none";
                document.querySelector("#barcoeMdl .v-input__append-inner button").click();
                document.getElementById("scanInput").focus();
                this.scanNumber = 0;
            });
        },
        close () {
            this.$modal.hide('barcode-modal');
        },
        closePayment () {
            this.$modal.hide('payment-modal');
        },
        addItem (){
            let data = {
                product : {
                    productName: "Product two",
                    serial: "608887013939",
                    quantity: 1,
                    unitPrice: 500,
                    total: 500
                },
                type: "add"
            }

            this.updateQuantity(data);
        },
        handleFocus(state) {
            let inputBox = document.getElementById("focusOutText");
            if (inputBox) {
                state ? inputBox.style.display= "none" : inputBox.style.display= "block";
            }
        },
        closePaystack() {
            this.$toast.error("User cancelled payment").goAway(3000);
        },
        genRef() {
            return uniqid("pstk-");
        },
        processPOSPaymentFromModal() {
            this.processCashPayment();
        },
        async processCashPayment(){

            let data = {
                "transactionStatusId": this.transactionStatus.success,
                "totalSum": this.totalPrice,
                "methodOfPaymentId": this.paymentMode,
                "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "itemsCount": this.totalQuantity,
                "isRemoved": false,
                transactionId: this.genRef()
            }

            this.processPOSPayment(data, this.paymentMode);

        },
        processCardPayment(data) {

            let payload = {
                "transactionStatusId": this.transactionStatus.success,
                "totalSum": this.totalPrice,
                "methodOfPaymentId": this.methodOfPayment.online,
                "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "itemsCount": this.totalQuantity,
                "isRemoved": false,
                transactionId: data.trxref
            }

            this.processPOSPayment(payload);
        },
        async processPOSPayment(data, mode = ""){
            this.isPageLoading = true;
            
            let message = mode == 1 ? 'Successfully made payment with CASH' :
                mode == 2 ? 'Successfully made payment with POS' : 'Successfully made payment with TRANSFER';

            await this.processPayment(data).then((data) => {
                this.isPageLoading = false;
                this.$toast.success(message).goAway(4000);
                let mode = this.paymentMode;
                let paymentModeText = "";
                

                switch (mode) {
                    case 1:
                        paymentModeText = "CASH"
                        break;
                    case 2:
                        paymentModeText = "POS"
                        break;
                    case 3:
                        paymentModeText = "TRANSFER"
                        break;
                
                    default:
                        break;
                }
                
                let {css} = require('../../middleware/receipt');
                let tableData = "";

                this.products.map(product => {
                    let data = `<tr>
                            <td class="description">${product.productName.toLowerCase().slice(0, 14)}</td>
                            <td class="quantity">${product.quantity}</td>
                            <td class="price">${product.unitPrice}</td>
                            <td class="price">${product.total}</td>
                        </tr>`;
                    
                    tableData += data;
                });
                let total = `<tr>
                                <td class="description">SUBTOTAL</td>
                                <td class="quantity"></td>
                                <td class="quantity"></td>
                                <td class="price">${this.totalPrice}</td>
                            </tr>
                            `
                tableData += total;
                
                let printWindow = window.open("", "PRINT", "width= 400, height= 600");
                this.$modal.hide('payment-modal');
                printWindow.document.write('<html><head><title> Print Receipt </title>');
                printWindow.document.write('<html><head><style>' + css + '</style>');
                printWindow.document.write('</head><body>');
                printWindow.document.write('<div style="display: flex;flex-direction: column;align-content: center;height: 100%;justify-content: space-between;">');
                printWindow.document.write('<div class="ticket"><img src="/_nuxt/assets/logos/newLogo.png" alt="Logo">');
                printWindow.document.write('<p class="centered">RECEIPT</p>');
                printWindow.document.write(`<p class="centered">Mode of payment: ${paymentModeText}</p>`);
                printWindow.document.write(`<p class="centered mt-1">Cust. Name: <span style="text-transform: uppercase"></span></p>`);
                printWindow.document.write(`<p class="centered mb-1">Attended by: <span style="text-transform: uppercase">${this.authUser}</span></p>`);
                printWindow.document.write('<table>');
                printWindow.document.write('<thead><tr>');
                printWindow.document.write('<th class="quantity">Product</th>');
                printWindow.document.write('<th class="quantity">Qty</th>');
                printWindow.document.write('<th class="quantity">Price</th>');
                printWindow.document.write('<th class="quantity">Total</th>');
                printWindow.document.write('</tr></thead>');
                printWindow.document.write('<tbody>');
                printWindow.document.write(tableData);
                printWindow.document.write('</tbody></table>');
                printWindow.document.write(`<p class="mt-1" style="text-align:right">Total: <span style="margin-left:93px;margin-right: 40px">${this.totalPrice}</span></p>`);
                printWindow.document.write(`<p class="mt-1">Invoice No: <span>${data.data.data}</span></p>`);
                printWindow.document.write('</div>');
                printWindow.document.write(`<p class="centered">Thanks for your purchase!
                    <br>Purelife Pharmacy</p>`);
                printWindow.document.write('</body></html>');
                printWindow.document.close(); // necessary for IE >= 10
                printWindow.focus(); // necessary for IE >= 10*/

                printWindow.onload = function(){
                    this.addEventListener('afterprint', (event) => {
                        printWindow.close();
                        this.clearProducts();
                    });
                };
                
                printWindow.print();

            });
        }
    },
    mounted(){
        this.openScanModal();
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
