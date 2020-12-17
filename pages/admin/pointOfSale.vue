<template>
<div>
    <v-container class="grey lighten-5 mx-10 mt-14">
        <v-row justify="end">
            <v-col cols="12" xs="12" justify="end" style="text-align:right">
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
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'admin',

    data: () => ({
        scanning: false,
        scanNumber: 0,
        barcode: ""
    }),

    computed: {
        products(){
            return this.$store.getters["pointOfSale/allProducts"];
        },
        totalPrice() {
            return this.$store.getters["pointOfSale/totalPrice"];
        }
    },

    methods: {
        ...mapActions({
            updateQuantity: 'pointOfSale/updateQuantity',
            removeItem: 'pointOfSale/removeItem',
            getProduct: 'pointOfSale/getProduct'
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
        processBarCode(barcode){
            this.getProduct(barcode);
            // setTimeout(() => {
            //     this.scanning = false;
            //     document.getElementById("scanInput").style.display = "block";
            //     document.getElementById("mdlText").style.display = "block";
            //     document.getElementById("mdlSpinner").style.display = "none";
            //     document.querySelector("#barcoeMdl .v-input__append-inner button").click()
            //     document.getElementById("scanInput").focus();
            //     this.scanNumber = 0;
            //     alert(barcode);
            // }, 1000);
        },
        close () {
            this.$modal.hide('barcode-modal');
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
