<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="products-modal" :min-width="700"
            :max-width="700" :adaptive="true"
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
                                <v-text-field v-model="editedItem.productName" label="Product Name"></v-text-field>
                                <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                <v-select
                                      v-model="editedItem.pharmacyBranchId"
                                      :items="branches"
                                      item-text="pharmacyBranchName"
                                      item-value="pharmacyBranchId"
                                      label="Pharmacy Branch"
                                      chips dense>
                                </v-select>
                            </v-col>


                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-text-field v-model="editedItem.quantity" label="Quantity"></v-text-field>
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

                            <v-col cols="12" class="py-0 pr-0">
                              <v-text-field v-model="editedItem.expiryDate" label="Expiry Date"></v-text-field>
                            </v-col>



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

                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>


        <v-data-table :headers="headers" :items="products" sort-by="calories" class="px-8 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Products</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('products-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Product
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
export default {
    layout: 'admin',

    data: () => ({
        dialog: true,
        loading: false,
        btnText: 'Submit',
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productName',
            },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Price', value: 'price' },
            { text: 'Expiry', value: 'expiryDate' },
            { text: 'Serial Number', value: 'serialNumber' },
            { text: 'Branch', value: 'productBranchId' },
            { text: 'Group', value: 'productGroupId' },
            { text: 'Created On', value: 'createdOn' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            serialNumber: '',
            expiryDate: '',
            productBranchId: '',
            productGroupId: '',
            createdOn: '',
        },
        defaultItem: {
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            serialNumber: '',
            expiryDate: '',
            productBranchId: '',
            productGroupId: '',
            createdOn: '',
        }
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        products(){
            return this.$store.getters["productss/allProducts"];s
        },
        branches(){
          return this.$store.getters["branches/allBranches"];
        },
        productGroups(){
          return this.$store.getters["groups/allProductGroups"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Product' : 'Edit Product';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.btnText = 'Update';
            this.$modal.show('products-modal')
        },
        addProduct(){
            this.loading = true
            let data = {
                productName: this.editedItem.productName,
                quantity: this.editedItem.quantity,
                price: this.editedItem.price,
                serialNumber: this.editedItem.serialNumber,
                expiryDate: this.editedItem.expiryDate,
                productBranchId: this.editedItem.productBranchId,
                productGroupId: this.editedItem.productGroupId,
                createdOn: new Date(),
            }
            this.$store.dispatch('productss/addProduct', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateProduct(){
            let data = {
                productId: this.products[this.editedIndex].productId,
                productName: this.editedItem.productName,
                quantity: this.editedItem.quantity,
                price: this.editedItem.price,
                serialNumber: this.editedItem.serialNumber,
                expiryDate: this.editedItem.expiryDate,
                productBranchId: this.editedItem.productBranchId,
                productGroupId: this.editedItem.productGroupId,
                modifiedOn: new Date(),
                isDeprecated: this.products[this.editedIndex].isDeprecated
            }

            this.$store.dispatch('productss/updateProducts', data).then(response => {
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this product?') && this.deleteProduct(item)
        },
        deleteProduct(item){
            let index = this.branches.indexOf(item)
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
        },
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
