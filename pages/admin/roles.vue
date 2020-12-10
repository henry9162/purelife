<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <modal
            name="roles-modal" :min-width="500"
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
                                <v-text-field v-model="editedItem.name" label="Role Name"></v-text-field>
                            </v-col>

                            <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable
                                class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize"
                                color="#009933" :loading="loading" :disabled="loading" v-text="formBtn">
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


        <v-data-table :headers="headers" :items="roles" sort-by="" class="px-8 py-4">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title class="list-color custom-style">All Role</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn @click="$modal.show('roles-modal')" depressed large color="#22A64E" dark class="rounded-0 post-caption">
                        <v-icon left>mdi-plus-circle-outline</v-icon> Add Role
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
                value: 'name',
                class: ['text-button', 'grey--text text--darken-3']
            },
            { text: 'Created On', value: 'createdOn', class: ['text-button', 'grey--text text--darken-3'] },
            { text: 'Actions', value: 'actions', sortable: false, class: ['text-button', 'grey--text text--darken-3'] },
        ],
        editedIndex: -1,
        editedItem: {
            roleId: '',
            name: '',
            createdBy: '',
            createdOn: '',
        },
        defaultItem: {
            roleId: '',
            name: '',
            createdBy: '',
            createdOn: '',
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        roles(){
            return this.$store.getters["roles/allRoles"];
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add Role' : 'Edit Role';
        },
        formBtn(){
            return this.editedIndex === -1 ? 'Submit' : 'Update'
        }
    },

    methods: {
        editItem (item) {
            this.editedIndex = this.roles.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.$modal.show('roles-modal')
        },
        addRole(){
            this.loading = true
            let data = {
                name: this.editedItem.name,
                createdBy: this.$auth.user.userId,
                createdOn: new Date()
            }
            
            this.$store.dispatch('roles/addRole', data).then(response => {
                this.loading = false
                this.refreshTable()
                this.close();
            })
        },
        updateRole(){
            this.loading = true
            let data = {
                roleId: this.roles[this.editedIndex].roleId,
                name: this.editedItem.name,
                createdBy: this.editedItem.createdBy,
                createdOn: this.editedItem.createdOn,
                modifiedOn: new Date(),
                isDeprecated: this.roles[this.editedIndex].isDeprecated
            }
            this.$store.dispatch('roles/updateRole', data).then(response => {
                this.loading = false
                this.refreshTable();
                this.close();
            })
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this role?') && this.deleteRole(item)
        },
        deleteRole(item){
            let index = this.roles.indexOf(item)
            this.$store.dispatch('roles/deleteRole', this.roles[index].roleId).then(response => {
                this.refreshTable()
            })
        },
        refreshTable(){
            this.$store.dispatch('roles/getAllRoles');
        },
        close () {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.loading = false
            })
            this.$modal.hide('roles-modal');
        },

        save () {
            if (this.editedIndex > -1) {
                this.updateRole();
            } else {
                this.addRole();
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
