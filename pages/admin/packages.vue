<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="packages-modal" :min-width="500" 
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
                                <v-text-field v-model="editedItem.productPackageName" label="Brand Name"></v-text-field>
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


        <v-data-table :headers="headers" :items="packages" sort-by="calories" class="px-8 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Packages</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('packages-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Package
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
                value: 'productPackageName',
            },
            { text: 'Created On', value: 'createdOn' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            productPackageId: '',
            productPackageName: '',
            createdOn: '',
        },
        defaultItem: {
            productPackageId: '',
            productPackageName: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        packages(){
            return this.$store.getters["packages/allPackages"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Package' : 'Edit Package';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.packages.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.btnText = 'Update';
            this.$modal.show('packages-modal')
        },
        addPackage(){
            this.loading = true
            let data = {
                productPackageName: this.editedItem.productPackageName
            }
            this.$store.dispatch('packages/addPackage', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            }).catch(error => this.loading = false)
        },
        updatePackage(){
            this.loading = true
            let data = { 
                productPackageId: this.packages[this.editedIndex].productPackageId,
                productPackageName: this.editedItem.productPackageName,
                createdOn: this.editedItem.createdOn,
                modifiedOn: this.packages[this.editedIndex].modifiedOn,
                isDeprecated: this.packages[this.editedIndex].isDeprecated,
                createdBy: this.packages[this.editedIndex].createdBy
            }
            this.$store.dispatch('packages/updatePackage', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            }).catch(error => this.loading = false)
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this package?') && this.deletePackage(item)
        },
        deletePackage(item){
            let index = this.packages.indexOf(item)
            this.$store.dispatch('packages/deletePackage', this.packages[index].productPackageId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('packages/getAllPackages');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
                this.btnText = 'Submit'
            })
            this.$modal.hide('packages-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updatePackage();
            } else {
                this.addPackage();
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