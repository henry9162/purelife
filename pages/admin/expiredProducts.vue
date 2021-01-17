<template>
<div>
    <loading 
        :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage">
    </loading>

    <v-card class="mx-10 mb-10 mt-14" color="#22A64E">
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
                            </v-col>


                            <v-col cols="12" md="4" class="py-0 px-0">
                                <v-text-field v-model="editedItem.quantity" type="number" label="Quantity"></v-text-field>
                                <v-text-field v-model="editedItem.serialNumber" label="Serial Number"></v-text-field>
                                <v-select
                                      v-model="editedItem.productGroupId"
                                      :items="productGroups"
                                      item-text="productGroupName"
                                      item-value="productGroupId"
                                      label="Group"
                                      chips dense>
                                </v-select>
                            </v-col>

                            <v-col cols="12" offset-md="4" md="8" class="py-0 pr-0">
                              <!-- <v-text-field v-model="editedItem.expiryDate" label="Expiry Date"></v-text-field> -->
                                <v-menu
                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="editedItem.expiryDate"
                                    transition="scale-transition" offset-y min-width="290px">

                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="editedItem.expiryDate"
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

        <v-data-table :headers="headers" :items="expiredProducts" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">Expired Products</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
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
        </v-data-table>
    </v-card>

     
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
            { text: 'Price', value: 'price', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Packaging', value: 'productPackageName', class: ['text-button', 'grey--text text--darken-3']},
            { text: 'Expiry', value: 'expiryDate', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Serial Number', value: 'serialNumber', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Branch', value: 'pharmacyBranchName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Group', value: 'productGroupName', class: ['text-button', 'grey--text text--darken-3'] },
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
            productGroupId: '',
            productImage: '',
            createdOn: '',
            imageSrc: ''
        },
        defaultItem: {
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            serialNumber: '',
            expiryDate: new Date().toISOString().substr(0, 10),
            productBranchId: '',
            productGroupId: '',
            productImage: '',
            createdOn: '',
            imageSrc: ''
        },
        file: '',
        threadImage: '',
        tempImage: '',
        defaultImage: 'https://via.placeholder.com/150',
    }),

    watch: {
        dialog (val) {
            val || this.close()
        },
        file(val){
            val ? this.processImage(val) : ''
        }
    },

    computed: {
        expiredProducts(){
            return this.$store.getters["productss/expiredProducts"];
        },
        isLoading(){
            return this.$store.getters['productss/getLoader']
        },
        branches(){
          return this.$store.getters["branches/allBranches"];
        },
        productGroups(){
          return this.$store.getters["groups/allProductGroups"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Product' : 'Edit Product';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        processImage(imageFile){
            let imageSize = Number((imageFile.size / 1024 / 1024).toFixed(3));
            if(imageSize > 0.322){
                this.$toast.error('Image should be of size 320kb or less, Please resize!').goAway(3500)
                return
            }
            this.setImage(imageFile)
        },
        async processBarCode(barcode){
            await this.getProductByCode(barcode).then(()=> {
                this.scanNumber = 0
            });
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
            this.editedIndex = this.expiredProducts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.threadImage = item.imageSrc;
            this.$modal.show('products-modal')
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
            formData.append('productGroupId', this.editedItem.productGroupId)
            formData.append('image', this.editedItem.productImage)
            formData.append('modifiedOn', new Date())
            formData.append('isDeprecated', this.expiredProducts[this.editedIndex].isDeprecated)
            let data1 = {
                id: this.expiredProducts[this.editedIndex].productId,
                data: formData
            }

            await this.$store.dispatch('productss/updateProduct', data1).then(response => {
                this.loading  = false
                this.refreshTable();
                this.close();
            })
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
        refreshTable(){
            this.$store.dispatch('productss/getAllProducts');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('products-modal');
        },
        save () {
            if (this.editedIndex > -1) {
                this.updateProduct();
            } else {
                this.addProduct();
            }
        }
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
