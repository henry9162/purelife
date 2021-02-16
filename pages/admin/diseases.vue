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
                            <!-- <v-col cols="12" class="py-0 px-0">
                                <v-select v-model="editedItem.severity" :items="severities" label="Severity"></v-select>
                            </v-col> -->

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
                    <span class="headline list-color custom-style">Add Patient to Disease</span>
                </div>

                <v-card-text>
                    <v-container>
                        <v-row class="px-8">
                            <v-col cols="12" class="py-0 px-0">
                                <v-select
                                    v-model="editedItem.addDiseaseId"
                                    :items="diseases"
                                    item-text="diseaseName"
                                    item-value="diseaseId"
                                    label="Disease"
                                    chips dense>
                                </v-select>

                                <v-autocomplete
                                    v-model="editedItem.userId"
                                    :items="users"
                                    label="Patient"
                                    :item-text="(val) => val.firstName + ' ' + val.lastName"
                                    item-value="userId"
                                    chips dense>
                                </v-autocomplete>

                                <v-btn max-width="200" class="mb-3 white--text" color="#009933" @click="openUserModal" depressed small>Add New patient</v-btn>

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
                                    
                                    <template  v-slot:item.actions="{ item }">
                                        <v-icon small class="mr-2 green--text" @click="editDiseasePatient(item, true)">mdi-pencil</v-icon>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon @click="editDiseasePatient(item, false)" small v-bind="attrs" v-on="on" class="green--text custom-red pr-2">mdi-account</v-icon>
                                            </template>
                                            <span>View patient</span>
                                        </v-tooltip>

                                        <v-icon small class="red--text" @click="deleteDiseasePatient(item)">mdi-delete</v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-card>
        </modal>

        <modal
            name="disease-patient-modal" :min-width="800"
            :max-width="700" :adaptive="true"
            :scrollable="true" height="auto"
            transition="fade-transition" :clickToClose="false">

            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closeDiseasePatientModal">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-actions>

                <div class="text-center">
                    <span class="headline list-color custom-style">Patient Details</span>
                </div>

                <v-card-text>
                    <v-container>
                        <v-row class="px-8">
                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-text-field v-model="patient.firstName" disabled label="First Name"></v-text-field>
                                <v-text-field v-model="patient.email" disabled label="Email"></v-text-field>
                                <v-text-field v-model="patient.age" disabled label="Age"></v-text-field>

                            </v-col>
                            <v-col cols="12" md="6" class="py-0 pl-5">
                                <v-text-field v-model="patient.lastName" disabled label="Last Name"></v-text-field>
                                <v-text-field v-model="patient.phoneNumber" disabled label="Phone"></v-text-field>
                                <v-text-field v-model="patient.gender" disabled label="Gender"></v-text-field>
                            </v-col>
                            <v-col>
                                 <v-textarea v-model="patient.comments" class="post-caption" 
                                    filled auto-grow label="Comments" rows="4" row-height="40" shaped>
                                </v-textarea>
                            </v-col>
                            <v-btn block @click="savePatient" v-if="isPatientEdit" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="userLoading" :disabled="userLoading" v-text="btnText">
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
            name="users-modal" :min-width="700"
            :max-width="700" :adaptive="true"
            :scrollable="true" height="auto"
            transition="fade-transition" :clickToClose="false">

            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closeUserModal">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-actions>

                <div class="text-center">
                    <span class="headline list-color custom-style">Add Patient</span>
                </div>

                <v-card-text>
                    <v-container>
                        <v-row class="px-8">
                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-text-field v-model="userEditedItem.firstName" label="First Name"></v-text-field>
                                <v-text-field v-model="userEditedItem.email" label="Email"></v-text-field>
                                <v-select
                                    v-model="userEditedItem.stateId"
                                    :items="states"
                                    item-text="stateName"
                                    item-value="stateId"
                                    label="State"
                                    chips dense>
                                </v-select>
                                <v-menu
                                    ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="userEditedItem.dob"
                                    transition="scale-transition" offset-y min-width="290px">

                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="userEditedItem.dob"
                                        label="Date Of Birth"
                                       
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>

                                    <v-date-picker v-model="userEditedItem.dob" no-title scrollable>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(userEditedItem.dob)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>

                                <v-select
                                    v-model="userEditedItem.lgaid"
                                    :items="lgas"
                                    item-text="lganame"
                                    item-value="lgaid"
                                    label="LGA"
                                    chips dense>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" class="py-0 pl-5">
                                <v-text-field v-model="userEditedItem.lastName" label="Last Name"></v-text-field>
                                <v-text-field v-model="userEditedItem.phoneNumber" label="Phone"></v-text-field>
                                <!-- <v-text-field v-model="editedItem.dob" label="Date Of Birth"></v-text-field> -->
                                

                                <v-select
                                    v-model="userEditedItem.accountType"
                                    :items="accountTypes"
                                    item-text="accountypeName"
                                    item-value="acountTypeId"
                                    label="Account Type"
                                    v-on:change="getRolesByAccountType"
                                    chips dense disabled>
                                </v-select>
                                <v-text-field v-model="userEditedItem.city" label="City"></v-text-field>
                                <v-select
                                    v-model="userEditedItem.roleId"
                                    :items="roles"
                                    item-text="name"
                                    item-value="roleId"
                                    label="Role"
                                    chips dense>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="6" class="py-0 px-0">
                                <v-select
                                    v-model="userEditedItem.genderId"
                                    :items="genders"
                                    item-text="gender"
                                    item-value="genderId"
                                    label="Gender"
                                    chips dense>
                                </v-select>
                            </v-col>

                            <!-- <v-col cols="12" class="pl-0">
                                <v-text-field 
                                    v-model="password" :rules="passwordRules"  dense 
                                    label="Password" required hint="At least 8 characters" counter
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
                                    :type="show1 ? 'text' : 'password'">
                                </v-text-field>
                            </v-col> -->
                           
                            <v-btn block @click="savePatient" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="userLoading" :disabled="userLoading" v-text="btnText">
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
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Patient To Disease
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
    middleware({ store, redirect }) {
        if (store.state.auths.authUser.accountType == 2) {
            return redirect('/')
        }
    },

    data: () => ({
        dialog: true,
        loading: false,
        userLoading: false,
        btnText: 'Submit',
        menu: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'diseaseName',
                class: ['text-button', 'grey--text text--darken-3']
            },
            // { text: 'Severity', value: 'severity', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        patient: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            age: '',
            gender: '',
            comments: ''
        },
        isPatientEdit: true,
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
            { text: 'Actions', value: 'actions', class: ['text-button', 'grey--text text--darken-3'] },
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
        severities: ['Low', 'Moderate', 'High', 'Very High', 'Extremely High'],
        userEditedItem: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: new Date().toISOString().substr(0, 10),
            roleId: '',
            stateId: '',
            lgaid: '',
            city: '',
            password: '',
            accountType: 2,
            genderId: ''
        },
        userDefaultItem: {
            userId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: new Date().toISOString().substr(0, 10),
            roleId: '',
            stateId: '',
            lgaid: '',
            city: '',
            password: '',
            accountType: '',
            genderId: ''
        },
        genders: [
            {
                gender: 'Male',
                genderId: 1
            },
            {
                gender: 'Female',
                genderId: 2
            },
        ]
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
        },
        states(){
          return this.$store.getters["allStates"];
        },
        lgas(){
          return this.$store.getters["allLgas"];
        },
        accountTypes(){
            return this.$store.getters["allAccountTypes"];
        },
        roles(){
            return this.$store.getters["roles/allRoles"];
        },
    },

    methods: {
        getRolesByAccountType(val) {
            this.$store.dispatch('roles/getRolesByAccountType', val)
        },
        getLga(val){
            val === "" || val === undefined  ? '' : this.$store.dispatch('getLga', val)
        },
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
        openUserModal() {
            close();
            this.$modal.show('users-modal');
        },
        closeUserModal() {
            this.$modal.hide('users-modal');
            this.$modal.show('addDisease-modal');
        },
        savePatient() {
            if (this.userEditedItem.firstName.length < 1) return this.$toast.error("Please fill in firstName").goAway(2000);
            if (this.userEditedItem.lastName.length < 1) return this.$toast.error("Please fill in lastName").goAway(2000);
            if (this.userEditedItem.email.length < 1) return this.$toast.error("Please fill in email").goAway(2000);
            if (!/.+@.+\..+/.test(this.userEditedItem.email)) return this.$toast.error("please supply a valid email").goAway(2000);
            if (this.userEditedItem.genderId < 1) return this.$toast.error("please select gender").goAway(2000);

            this.userLoading = true
            let data = {
                firstName: this.userEditedItem.firstName,
                lastName: this.userEditedItem.lastName,
                email: this.userEditedItem.lastName,
                phoneNumber: this.userEditedItem.phoneNumber,
                dob: this.userEditedItem.dob,
                roleId: this.userEditedItem.roleId,
                statedId: this.userEditedItem.stateId,
                lgaid: this.userEditedItem.lgaid,
                city: this.userEditedItem.city,
                accountType: this.userEditedItem.accountType,
                password: this.userEditedItem.password,
                createdOn: new Date(),
                createdBy: this.$auth.user.userId,
                gender: this.userEditedItem.genderId
            }
            
            this.$store.dispatch('users/addUser', data).then(async () => {
                await this.$store.dispatch('users/getAllUsers');
                this.userLoading = false;
                this.userEditedItem = this.userDefaultItem;

                this.$modal.hide('users-modal');
                this.$modal.show('addDisease-modal');

                this.$toast.success('successfully added user').goAway(2000);
            });
        },
        closeDiseasePatientModal() {
            this.$modal.show("disease-patients-modal");
            this.$modal.hide("disease-patient-modal");
        },
        editDiseasePatient(item, isEdit) {
            this.$modal.hide("disease-patients-modal");
            this.$modal.show("disease-patient-modal");

            this.patient = Object.assign({}, item);
            isEdit ? this.isPatientEdit = true : this.isPatientEdit = false;
        }
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
