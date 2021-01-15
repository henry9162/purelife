<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="productGroups-modal" :min-width="800"
            :max-width="900" :adaptive="true"
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
                        <v-row class="px-8">
                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-text-field v-model="editedItem.productGroupName" label="Name"></v-text-field>

                                <v-text-field v-model="editedItem.description" label="Description"></v-text-field>

                                <v-select
                                    v-model="editedItem.productCategyId"
                                    :items="categories"
                                    item-text="productCategyName"
                                    item-value="productCategyId"
                                    label="Product Category"
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
                            </v-col>

                            <v-col cols="12" md="6" class="py-0 pl-6">
                                <v-text-field v-model="editedItem.size" label="Size"></v-text-field>

                                <v-text-field v-model="editedItem.lowerMeasurement"  label="Lower Measurement"></v-text-field>

                                <v-select
                                    v-model="editedItem.getClassificationList"
                                    :items="classifications"
                                    item-text="productClassificationName"
                                    item-value="productGroupClassificationId"
                                    label="Product Classifications"
                                    multiple chips dense
                                    hint="You can select multiple options"
                                ></v-select>

                                <v-select
                                    v-model="editedItem.productPackagingId"
                                    :items="packages"
                                    item-text="productPackageName"
                                    item-value="productPackageId"
                                    label="Product Packaging"
                                    chips dense>
                                </v-select>
                            </v-col>

                            <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-10 mb-10 px-8 py-5 text-capitalize"
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


        <v-data-table :headers="headers" :items="productGroups" sort-by="calories" class="py-4 mx-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Groups</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('productGroups-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Group
                    </v-btn>
                </v-toolbar>
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
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productGroupName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Category', value: 'productCategyName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Brand', value: 'productBrandName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Package', value: 'productPackageName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Description', value: 'description', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Size', value: 'size', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Lower Measurement', value: 'lowerMeasurement', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            productGroupId: '',
            productGroupName: '',
            productCategyId: '',
            productBrandId: '',
            productPackagingId: '',
            getClassificationList: [],
            description: '',
            size: '',
            lowerMeasurement: '',
            createdOn: '',
        },
        defaultItem: {
            productGroupId: '',
            productGroupName: '',
            productCategyId: '',
            productBrandId: '',
            productPackagingId: '',
            getClassificationList: [],
            description: '',
            size: '',
            lowerMeasurement: '',
            createdOn: '',
        },
    }),

    computed: {
        productGroups(){
            return this.$store.getters["groups/allProductGroups"];
        },
        categories(){
            return this.$store.getters["categories/allCategories"];
        },
        brands(){
            return this.$store.getters["brands/allBrands"];
        },
        classifications(){
            return this.$store.getters["classifications/allClassifications"];
        },
        packages(){
            return this.$store.getters["packages/allPackages"]
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add group' : 'Edit Group';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.productGroups.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$modal.show('productGroups-modal')
        },
        addProductGroup(){
            this.loading = true
            let data = {
                productGroupName: this.editedItem.productGroupName,
                productCategyId: this.editedItem.productCategyId,
                productBrandId: this.editedItem.productBrandId,
                productPackagingId: this.editedItem.productPackagingId,
                productGroupClassificationIds: this.editedItem.productGroupClassificationIds,
                description: this.editedItem.description,
                size: this.editedItem.size,
                lowerMeasurement: this.editedItem.lowerMeasurement,
                createdOn: new Date()
            }
            this.$store.dispatch('groups/addProductGroup', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateProductGroup(){
            this.loading = true
            let data = {
                productGroupId: this.productGroups[this.editedIndex].productGroupId,
                productGroupName: this.editedItem.productGroupName,
                productCategyId: this.editedItem.productCategyId,
                productBrandId: this.editedItem.productBrandId,
                productPackagingId: this.editedItem.productPackagingId,
                productGroupClassificationIds: this.editedItem.productGroupClassificationIds,
                description: this.editedItem.description,
                size: this.editedItem.size,
                lowerMeasurement: this.editedItem.lowerMeasurement,
                createdOn: this.editedItem.createdOn,
                modifiedOn: new Date(),
                isDeprecated: this.productGroups[this.editedIndex].isDeprecated
            }
            //console.log(data);
            this.$store.dispatch('groups/updateProductGroup', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this group?') && this.deleteProductGroup(item)
        },
        deleteProductGroup(item){
            let index = this.brands.indexOf(item)
            this.$store.dispatch('groups/deleteProductGroup', this.productGroups[index].productGroupId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('groups/getAllProductGroups');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
                this.btnText = 'Submit'
            })
            this.$modal.hide('productGroups-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateProductGroup();
            } else {
                this.addProductGroup();
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

    .v-data-table { 
        overflow-x: auto !important;
    }
</style>
