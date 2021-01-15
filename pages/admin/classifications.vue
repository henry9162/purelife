<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="classifications-modal" :min-width="500"
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
                                <v-text-field v-model="editedItem.productClassificationName" label="Classification Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-text-field v-model="editedItem.productClassificationDescription" label="Description"></v-text-field>
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


        <v-data-table :headers="headers" :items="classifications" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Classifications</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('classifications-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Classification
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
        dialog: true,
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'productClassificationName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Description', value: 'productClassificationDescription', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            productGroupClassificationId: '',
            productClassificationName: '',
            productClassificationDescription: '',
            createdOn: '',
        },
        defaultItem: {
            productGroupClassificationId: '',
            productClassificationName: '',
            productClassificationDescription: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        classifications(){
            return this.$store.getters["classifications/allClassifications"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Classification' : 'Edit Classification';
        },
        btnText(){
            return this.editedIndex === -1 ? 'Submit' : 'Update';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.classifications.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$modal.show('classifications-modal')
        },
        addClassification(){
            this.loading = true
            let data = {
                productClassificationName: this.editedItem.productClassificationName,
                productClassificationDescription: this.editedItem.productClassificationDescription,
                createdOn: new Date()
            }
            this.$store.dispatch('classifications/addClassification', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateClassification(){
            this.loading = true
            let data = {
                productGroupClassificationId: this.classifications[this.editedIndex].productGroupClassificationId,
                productClassificationName: this.editedItem.productClassificationName,
                productClassificationDescription: this.editedItem.productClassificationDescription,
                createdOn: this.editedItem.createdOn,
                modifiedOn: this.classifications[this.editedIndex].modifiedOn,
                isDeprecated: this.classifications[this.editedIndex].isDeprecated,
                createdBy: this.classifications[this.editedIndex].createdBy
            }
            this.$store.dispatch('classifications/updateClassification', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this classification?') && this.deleteClassification(item)
        },
        deleteClassification(item){
            let index = this.classifications.indexOf(item)
            this.$store.dispatch('classifications/deleteClassification', this.classifications[index].productGroupClassificationId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('classifications/getAllClassifications');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
                this.btnText = 'Submit'
            })
            this.$modal.hide('classifications-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateClassification();
            } else {
                this.addClassification();
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
