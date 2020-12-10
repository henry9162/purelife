<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="categories-modal" :min-width="500"
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
                                <v-text-field v-model="editedItem.productCategyName" label="Category Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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


        <v-data-table :headers="headers" :items="categories" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Categories</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('categories-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Category
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

    data: () => ({
        dialog: true,
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productCategyName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Description', value: 'description', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            productCategyId: '',
            productCategyName: '',
            description: '',
            createdOn: '',
        },
        defaultItem: {
            productCategyId: '',
            productCategyName: '',
            description: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        categories(){
            return this.$store.getters["categories/allCategories"];
        },
        formTitle() {
            return this.editedIndex === -1 ? 'Add Category' : 'Edit Category';
        },
        btnText() {
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.categories.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$modal.show('categories-modal')
        },
        addCategory(){
            this.loading = true
            let data = {
                productCategyName: this.editedItem.productCategyName,
                description: this.editedItem.description,
                createdOn: new Date()
            }
            this.$store.dispatch('categories/addCategory', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateCategory(){
            this.loading = true
            let data = {
                productCategyId: this.categories[this.editedIndex].productCategyId,
                productCategyName: this.editedItem.productCategyName,
                description: this.editedItem.description,
                createdOn: this.editedItem.createdOn,
                modifiedOn: this.categories[this.editedIndex].modifiedOn,
                isDeprecated: this.categories[this.editedIndex].isDeprecated
            }
            this.$store.dispatch('categories/updateCategory', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this category?') && this.deleteCategory(item)
        },
        deleteCategory(item){
            let index = this.categories.indexOf(item)
            this.$store.dispatch('categories/deleteCategory', this.categories[index].productCategyId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('categories/getAllCategories');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('categories-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateCategory();
            } else {
                this.addCategory();
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
