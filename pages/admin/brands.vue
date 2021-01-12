<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="brands-modal" :min-width="500" 
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
                        <v-row class="px-8">
                            <v-col cols="12" class="py-0 px-0">
                                <v-text-field v-model="editedItem.productBrandName" label="Brand Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-text-field v-model="editedItem.productBrandCode" label="Brand Code"></v-text-field>
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


        <v-data-table :headers="headers" :items="brands" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Brands</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('brands-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Brand
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
        if (store.state.auths.authUser.accountType != 2) {
            return redirect('/')
        }
    },

    data: () => ({
        dialog: true,
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productBrandName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Code', value: 'productBrandCode', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            productBrandId: '',
            productBrandName: '',
            productBrandCode: '',
            createdOn: '',
        },
        defaultItem: {
            productBrandId: '',
            productBrandName: '',
            productBrandCode: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        brands(){
            return this.$store.getters["brands/allBrands"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Brand' : 'Edit Brand';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.brands.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.btnText = 'Update';
            this.$modal.show('brands-modal')
        },
        addBrand(){
            this.loading = true
            let data = {
                productBrandName: this.editedItem.productBrandName,
                productBrandCode: this.editedItem.productBrandCode,
                createdOn: new Date()
            }
            this.$store.dispatch('brands/addBrand', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateBrand(){
            this.loading = true
            let data = { 
                productBrandId: this.brands[this.editedIndex].productBrandId,
                productBrandName: this.editedItem.productBrandName,
                productBrandCode: this.editedItem.productBrandCode,
                createdOn: this.editedItem.createdOn,
                modifiedOn: this.brands[this.editedIndex].modifiedOn,
                isDeprecated: this.brands[this.editedIndex].isDeprecated
            }
            this.$store.dispatch('brands/updateBrand', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this brand?') && this.deleteBrand(item)
        },
        deleteBrand(item){
            let index = this.brands.indexOf(item)
            this.$store.dispatch('brands/deleteBrand', this.brands[index].productBrandId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('brands/getAllBrands');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
                this.btnText = 'Submit'
            })
            this.$modal.hide('brands-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateBrand();
            } else {
                this.addBrand();
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