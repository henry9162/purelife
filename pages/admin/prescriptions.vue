<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="prescriptions-modal" :min-width="500"
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
                                <v-select
                                    v-model="editedItem.patientId"
                                    :items="users"
                                    item-text="firstName"
                                    item-value="userId"
                                    label="Patient"
                                    chips dense>
                                </v-select>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-textarea v-model="editedItem.prescriptionDescription" class="post-caption" 
                                    filled auto-grow label="Description" rows="2" row-height="30">
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-textarea v-model="editedItem.complaint" class="post-caption" 
                                    filled auto-grow label="Complaints" rows="4" row-height="40" shaped>
                                </v-textarea>
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


        <v-data-table :headers="headers" :items="prescriptions" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Prescriptions</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('prescriptions-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Prescriptions
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.firstName="{ item }">
                <span v-text="item.firstName"></span>
                <span v-text="item.lastName"></span>
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
        btnText: 'Submit',
        headers: [
            {
                text: 'Description',
                align: 'start',
                sortable: false,
                value: 'prescriptionDescription',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Complaints', value: 'complaint', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Patient', value: 'firstName', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Email', value: 'email', class: ['text-button', 'grey--text text--darken-3']},
            { text: 'Phone', value: 'phoneNumber', class: ['text-button', 'grey--text text--darken-3']},
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            prescriptionId: '',
            prescriptionDescription: '',
            complaint: '',
            patientId: '',
            createdOn: '',
        },
        defaultItem: {
            prescriptionId: '',
            prescriptionDescription: '',
            complaint: '',
            patientId: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        prescriptions(){
            return this.$store.getters["prescriptions/allPrescriptions"];
        },
        users(){
            return this.$store.getters["users/allUsers"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Prescription' : 'Edit Prescription';
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.prescriptions.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.btnText = 'Update';
            this.$modal.show('prescriptions-modal')
        },
        addPrescription(){
            this.loading = true
            let data = {
                prescriptionDescription: this.editedItem.prescriptionDescription,
                complaint: this.editedItem.complaint,
                patientId: this.editedItem.patientId,
                createdOn: new Date()
            }
            this.$store.dispatch('prescriptions/addPrescription', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updatePrescription(){
            this.loading = true
            let data = {
                prescriptionId: this.prescriptions[this.editedIndex].prescriptionId,
                prescriptionDescription: this.editedItem.prescriptionDescription,
                complaint: this.editedItem.complaint,
                patientId: this.editedItem.patientId,
                createdOn: this.prescriptions[this.editedIndex].createdOn,
                modifiedOn: new Date(),
                isDeprecated: this.prescriptions[this.editedIndex].isDeprecated
            }
            this.$store.dispatch('prescriptions/updatePrescription', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this prescription?') && this.deletePrescription(item)
        },
        deletePrescription(item){
            let index = this.prescriptions.indexOf(item)
            this.$store.dispatch('prescriptions/deletePrescription', this.prescriptions[index].prescriptionId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('prescriptions/getAllPrescriptions');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('prescriptions-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updatePrescription();
            } else {
                this.addPrescription();
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
