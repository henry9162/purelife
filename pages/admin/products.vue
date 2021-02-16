<template>
<div>
    <!-- <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading> -->

    <div class="d-flex justify-end mr-10 mt-12">
        <div class="mr-4">
            <v-btn @click="$modal.show('products-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                <v-icon left>mdi-plus-circle-outline</v-icon> Add Product
            </v-btn>
        </div>
        <div>
            <v-btn @click="openScanModal()" depressed large color="#22A64E" dark class="rounded-0 ml-2 post-caption">
                <v-icon left>mdi-plus-circle-outline</v-icon> Open Scanner
            </v-btn>
        </div>
    </div>

    <v-card class="mx-10 mb-10 mt-6" color="#22A64E">
        <modal
            name="products-modal" :min-width="1000"
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
                            <v-col cols="12" md="4">
                                <div class="viewImage mr-4">
                                    <v-img :src="tempImage ? tempImage : threadImage ? threadImage : defaultImage" aspect-ratio="1.7"></v-img>

                                    <v-btn class="mx-2 viewImageBtn" fab dark small color="#40BCB6">
                                            <v-file-input
                                                class="pt-0 pl-2"
                                                hide-input
                                                v-model="file"
                                                placeholder="Upload image"
                                                label="Image"
                                                accept="image/*"
                                                show-size
                                            >
                                                <template v-slot:selection="{ text }">
                                                    <v-chip small label color="#40BCB6">{{ text }}</v-chip>
                                                </template>
                                            </v-file-input>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" class="py-0 pr-8">
                                <v-text-field v-model="editedItem.productName" label="Product Name"></v-text-field>
                                <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                <v-select
                                      v-model="editedItem.productBranchId"
                                      :items="branches"
                                      item-text="pharmacyBranchName"
                                      item-value="pharmacyBranchId"
                                      label="Pharmacy Branch"
                                      chips dense>
                                </v-select>
                                <v-select
                                      v-model="editedItem.productBrandId"
                                      :items="brands"
                                      item-text="productBrandName"
                                      item-value="productBrandId"
                                      label="Product Brand"
                                      chips dense>
                                </v-select>
                                <v-select
                                      v-model="editedItem.productPackagingId"
                                      :items="packages"
                                      item-text="productPackageName"
                                      item-value="productPackageId"
                                      label="Product Package"
                                      chips dense>
                                </v-select>
                            </v-col>


                            <v-col cols="12" md="4" class="py-0 px-0">
                                <v-text-field v-model="editedItem.quantity" type="number" label="Quantity"></v-text-field>
                                <v-text-field v-model="editedItem.serialNumber" label="Serial Number"></v-text-field>
                                <v-select
                                      v-model="editedItem.productCategoryId"
                                      :items="categories"
                                      item-text="productCategyName"
                                      item-value="productCategyId"
                                      label="Product Category"
                                      chips dense>
                                </v-select>
                                <v-select
                                      v-model="editedItem.productClassificationId"
                                      :items="classifications"
                                      item-text="productClassificationName"
                                      item-value="productGroupClassificationId"
                                      label="Prodct Classification"
                                      chips dense>
                                </v-select>
                                <v-menu
                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="editedItem.expiryDate"
                                    transition="scale-transition" offset-y min-width="290px">

                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="expiryDate"
                                            label="Expiry Date"
                                            
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker v-model="editedItem.expiryDate" no-title scrollable>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(editedItem.expiryDate)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" offset-md="4" md="8" class="py-0 pr-0">
                              <!-- <v-text-field v-model="editedItem.expiryDate" label="Expiry Date"></v-text-field> -->
                                
                            </v-col>


                            <v-col cols="12" offset-md="4" md="8" class="py-0 pr-0">
                                <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                    class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                    color="#009933" :loading="loading" :disabled="loading" v-text="btnText">
                                    <v-icon right>mdi-send</v-icon>
                                    <template v-slot:loader>
                                        <span class="custom-loader">
                                            <v-icon light>mdi-cached</v-icon>
                                        </span>
                                    </template>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>


        <v-data-table :headers="headers" :items="products" sort-by="calories" 
            class="mx-4 py-4" :search="search" :custom-filter="filterOnlyCapsText">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Products</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-row align="center">
                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
                        >
                            <v-select
                                :items="dropdownCategories"
                                label="Categories Filter"
                                class="mt-5"
                                v-on:change="selectOnChange"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-toolbar>
                <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
            </template>

            <template v-slot:item.imageSrc="{ item }">
                <img :src="item.imageSrc" :alt="item.productName" height="80px" width="90px">
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.createdOn="{ item }">
                <span v-text="$moment(item.createdOn).format('DD/MM/YYYY')"></span>
            </template>
            <template v-slot:item.expiryDate="{ item }">
                <span v-text="$moment(item.expiryDate).format('DD/MM/YYYY')"></span>
            </template>
        </v-data-table>
    </v-card>

     <modal
        name="barcode-modal" :min-width="500"
        :max-width="100" :adaptive="true"
        :scrollable="true" height="auto"
        transition="fade-transition" :clickToClose="false" id="barcoeMdl">

        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeBarcode()">
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
export default {
    layout: 'admin',
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        dialog: true,
        loading: false,
        fullPage: false,
        search: '',
        headers: [
            {
                text: 'Image',
                align: 'start',
                sortable: false,
                value: 'imageSrc',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Name', value: 'productName', class: ['text-button', 'grey--text text--darken-3']},
            { text: 'Quantity', value: 'quantity', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Packaging', value: 'productPackageName', class: ['text-button', 'grey--text text--darken-3']},
            { text: 'Price', value: 'price', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Expiry', value: 'expiryDate', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Serial Number', value: 'serialNumber', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Branch', value: 'pharmacyBranchName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Brand', value: 'productBrandName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Category', value: 'productCategyName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Classification', value: 'productClassificationName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        menu: false,
        editedIndex: -1,
        editedItem: {
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            serialNumber: '',
            expiryDate: new Date().toISOString().substr(0, 10),
            productBranchId: '',
            // productGroupId: '',
            productImage: '',
            createdOn: '',
            imageSrc: '',
            productBrandId: '',
            productClassificationId: '',
            productCategoryId: '',
            productPackagingId: ''
        },
        defaultItem: {
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            serialNumber: '',
            expiryDate: new Date().toISOString().substr(0, 10),
            productBranchId: '',
            // productGroupId: '',
            productImage: '',
            createdOn: '',
            imageSrc: '',
            productBrandId: '',
            productClassificationId: '',
            productCategoryId: '',
            productPackagingId: ''
        },
        file: '',
        threadImage: '',
        tempImage: '',
        defaultImage: 'https://via.placeholder.com/150',
        scanNumber: 0,
        scanning: false,
        barcode: ''
    }),

    watch: {
        dialog (val) {
            val || this.close()
        },
        file(val){
            val ? this.processImage(val) : ''
        },
    },

    computed: {
        products(){
            return this.$store.getters["productss/allProducts"];
        },
        isLoading(){
            return this.$store.getters['productss/getLoader']
        },
        branches(){
          return this.$store.getters["branches/allBranches"];
        },
        brands(){
          return this.$store.getters["brands/allBrands"];
        },
        classifications(){
          return this.$store.getters["classifications/allClassifications"];
        },
        categories(){
          return this.$store.getters["categories/allCategories"];
        },
        productGroups(){
          return this.$store.getters["groups/allProductGroups"];
        },
        packages(){
          return this.$store.getters["packages/allPackages"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Product' : 'Edit Product';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        },
        expiryDate(){
            return this.$moment(this.editedItem.expiryDate).format('DD/MM/YYYY')
        },
        dropdownCategories() {
            return this.categories.map(val => val.productCategyName);
        }
    },

    methods: {
        selectOnChange(val) {
            this.search = val;
        },
        filterOnlyCapsText (value, search, item) {
            console.log(value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1)
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
        },
        processImage(imageFile){
            let imageSize = Number((imageFile.size / 1024 / 1024).toFixed(3));
            if(imageSize > 0.322){
                this.$toast.error('Image should be of size 320kb or less, Please resize!').goAway(3500)
                return
            }
            this.setImage(imageFile)
        },
        openScanModal(){
            this.$modal.show('barcode-modal');

            setTimeout(function (){
                document.getElementById("mdlText").style.display = "block";
                document.getElementById("mdlSpinner").style.display = "none";
                document.getElementById("scanInput").focus();
            }, 500)
        },
        onBarcodeScanned(barcode){
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
            await this.getProductByCode(barcode).then(()=> {
                this.scanNumber = 0
            });
        },
        getProductByCode(barcode){
            this.$store.dispatch('pointOfSale/getProductByCode', barcode).then(response => {
                let data = response.data.data;
                if(data) {
                    this.editedItem.productId = data.productId
                    this.editedItem.productName = data.productName
                    this.editedItem.quantity = data.quantity
                    this.editedItem.price = data.price
                    this.editedItem.serialNumber = data.serialNumber
                    this.editedItem.expiryDate = data.expiryDate
                    this.editedItem.productBranchId = data.productBranchId
                    this.editedItem.productGroupId = data.productGroupId
                    this.editedItem.imageSrc = data.imageSrc
                    this.threadImage = data.imageSrc;
                    this.editedIndex = 1
                    this.$modal.hide('barcode-modal');
                    this.$modal.show('products-modal');
                } else {
                    this.editedItem.productId = ''
                    this.editedItem.productName = ''
                    this.editedItem.quantity = ''
                    this.editedItem.price = ''
                    this.editedItem.serialNumber = barcode
                    this.editedItem.expiryDate = ''
                    this.editedItem.productBranchId = ''
                    this.editedItem.productGroupId = ''
                    this.editedItem.imageSrc = ''
                    this.threadImage = '';
                    this.editedIndex = -1
                    this.$modal.hide('barcode-modal');
                    this.$modal.show('products-modal');
                }
                
            })
        },
        setImage(imageFile){
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = e => {
                this.tempImage = e.target.result;
                this.editedItem.productImage = imageFile
                this.editedItem.imageSrc = imageFile
            };
        },
        editItem (item) {
            this.editedIndex = this.products.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.threadImage = item.imageSrc;
            this.$modal.show('products-modal')
        },
        async addProduct(){
            this.loading = true
            const formData = new FormData();
            formData.append('productName', this.editedItem.productName)
            formData.append('quantity', this.editedItem.quantity)
            formData.append('price', this.editedItem.price)
            formData.append('serialNumber', this.editedItem.serialNumber)
            formData.append('expiryDate', this.editedItem.expiryDate)
            formData.append('productBranchId', this.editedItem.productBranchId)
            formData.append('productGroupId', "00000000-0000-0000-0000-000000000000")
            formData.append('productBrandId', this.editedItem.productBrandId)
            formData.append('productClassificationId', this.editedItem.productClassificationId)
            formData.append('productCategoryId', this.editedItem.productCategoryId)
            formData.append('productPackagingId', this.editedItem.productPackagingId)
            formData.append('image', this.editedItem.productImage)
            formData.append('createdOn', new Date())

            await this.$store.dispatch('productss/addProduct', formData).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        async updateProduct(){
            this.loading = true

            const formData = new FormData();
            formData.append('productName', this.editedItem.productName)
            formData.append('quantity', this.editedItem.quantity)
            formData.append('price', this.editedItem.price)
            formData.append('serialNumber', this.editedItem.serialNumber)
            formData.append('expiryDate', this.editedItem.expiryDate)
            formData.append('productBranchId', this.editedItem.productBranchId)
            formData.append('productGroupId', "00000000-0000-0000-0000-000000000000")
            formData.append('productBrandId', this.editedItem.productBrandId)
            formData.append('productClassificationId', this.editedItem.productClassificationId)
            formData.append('productCategoryId', this.editedItem.productCategoryId)
            formData.append('productPackagingId', this.editedItem.productPackagingId)
            formData.append('image', this.editedItem.productImage)
            formData.append('productImage', this.editedItem.productImage)
            formData.append('modifiedOn', new Date())
            formData.append('isDeprecated', this.products[this.editedIndex].isDeprecated)

            let data1 = {
                id: this.products[this.editedIndex].productId,
                data: formData
            }

            await this.$store.dispatch('productss/updateProduct', data1).then(response => {
                this.loading  = false
                this.refreshTable();
                this.close();
            }).catch(error => this.loading = false)
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this product?') && this.deleteProduct(item)
        },
        deleteProduct(item){
            let index = this.products.indexOf(item)
            this.$store.dispatch('productss/deleteProduct', this.products[index].productId).then(response => {
                this.refreshTable()
            })
        },
        handleFocus(state) {
            let inputBox = document.getElementById("focusOutText");
            if (inputBox) {
                state ? inputBox.style.display= "none" : inputBox.style.display= "block";
            }
        },
        refreshTable(){
            this.$store.dispatch('productss/getAllProducts');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
                this.threadImage = ''
            })
            this.$modal.hide('products-modal');
        },
        closeBarcode(){
            this.$modal.hide('barcode-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateProduct();
            } else {
                this.addProduct();
            }
        },
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
