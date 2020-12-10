<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="diseases-modal" :min-width="500"
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
                                <v-text-field v-model="editedItem.diseaseName" label="Disease Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 px-0">
                                <v-select v-model="editedItem.severity" :items="severities" label="Severity"></v-select>
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

          <modal
            name="addDisease-modal" :min-width="500"
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
                    <span class="headline list-color custom-style">Add disease to patient</span>
                </div>

                <v-card-text>
                    <v-container>
                        <v-row class="px-8">
                            <v-col cols="12" class="py-0 px-0">
                                <v-select
                                    v-model="editedItem.userId"
                                    :items="users"
                                    item-text="firstName"
                                    item-value="userId"
                                    label="Patient"
                                    chips dense>
                                </v-select>

                                <v-select
                                    v-model="editedItem.addDiseaseId"
                                    :items="diseases"
                                    item-text="diseaseName"
                                    item-value="diseaseId"
                                    label="Disease"
                                    chips dense>
                                </v-select>

                                 <v-textarea v-model="editedItem.comments" class="post-caption" 
                                    filled auto-grow label="Comments" rows="4" row-height="40" shaped>
                                </v-textarea>
                            </v-col>

                            <v-btn block @click="AddDiseaseToPatient" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="loading" :disabled="loading"> Submit
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

        <modal
            name="disease-patients-modal" :min-width="800"
            :max-width="700" :adaptive="true"
            :scrollable="true" height="auto"
            transition="fade-transition" :clickToClose="false">

            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closes">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-card-text>
                    <v-container>
                        <v-row class="">
                            <v-col cols="12" class="py-0 px-0">
                                <v-data-table :headers="patientHeaders" :items="patients" sort-by="calories" class="px-8">
                                    <template v-slot:top>
                                        <v-toolbar flat color="white">
                                            <v-toolbar-title class="list-color custom-style">Patients</v-toolbar-title>
                                            <v-divider class="mx-4" inset vertical></v-divider>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>


        <v-data-table :headers="headers" :items="diseases" sort-by="calories" class="mx-4 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Diseases</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('diseases-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Disease
                    </v-btn>

                    <v-btn @click="$modal.show('addDisease-modal')" depressed large color="#22A64E" dark class="rounded-0 ml-4 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Disease To Patient
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2 green--text" @click="editItem(item)">mdi-pencil</v-icon>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon @click="viewPatients(item)" small v-bind="attrs" v-on="on" class="green--text custom-red pr-2">mdi-account</v-icon>
                    </template>
                    <span>View patients</span>
                </v-tooltip>

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
        btnText: 'Submit',
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'diseaseName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Severity', value: 'severity', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        patientHeaders: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Email', value: 'email', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Phone', value: 'phoneNumber', class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            userId: '',
            addDiseaseId: '',
            comments: '',
            diseaseName: '',
            severity: '',
            createdOn: '',
            craedtedby: ''
        },
        defaultItem: {
            userId: '',
            addDiseaseId: '',
            comments: '',
            diseaseName: '',
            severity: '',
            createdOn: '',
            createdby: ''
        },
        severities: ['Low', 'Moderate', 'High', 'Very High', 'Extremely High']
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        diseases(){
            return this.$store.getters["diseases/allDiseases"];
        },
        users(){
            return this.$store.getters["users/allUsers"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Disease' : 'Edit Disease';
        },
        patients(){
            return this.$store.getters["diseases/patients"];
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.diseases.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.btnText = 'Update';
            this.$modal.show('diseases-modal')
        },
        async viewPatients(item){
            await this.$store.dispatch("diseases/getPatients", item.diseaseId)
            this.$modal.show('disease-patients-modal')
        },
        addDisease(){
            this.loading = true
            let data = {
                diseaseName: this.editedItem.diseaseName,
                severity: this.editedItem.severity,
                createdOn: new Date()
            }
            this.$store.dispatch('diseases/addDisease', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        AddDiseaseToPatient(){
             this.loading = true
                let data = {
                    userId: this.editedItem.userId,
                    diseaseId: this.editedItem.addDiseaseId,
                    comments: this.editedItem.comments,
                    //createdOn: new Date()
                }
                this.$store.dispatch('diseases/addDiseaseToPatient', data).then(response => {
                    this.loading = false
                    this.refreshTable()
                    this.close();
                })
        },
        updateDisease(){
            this.loading = true
            let data = {
                diseaseId: this.diseases[this.editedIndex].diseaseId,
                diseaseName: this.editedItem.diseaseName,
                severity: this.editedItem.severity,
                createdby: this.diseases[this.editedIndex].createdby
            }
        
            this.$store.dispatch('diseases/updateDisease', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this disease?') && this.deleteDisease(item)
        },
        deleteDisease(item){
            let index = this.diseases.indexOf(item)
            this.$store.dispatch('diseases/deleteDisease', this.diseases[index].diseaseId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('diseases/getAllDiseases');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('diseases-modal');
            this.$modal.hide('addDisease-modal');
        },

        closes(){
            this.$modal.hide('disease-patients-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateDisease();
            } else {
                this.addDisease();
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
