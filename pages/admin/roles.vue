<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <v-data-table :headers="headers" :items="roles" sort-by="calories" class="px-6">
            <template v-slot:top>
                <v-toolbar flat color="white" class="pt-6">
                    <v-toolbar-title class="list-color post-caption">Roles</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="#22A64E" dark class="rounded-0 post-caption" v-bind="attrs" v-on="on">
                                <v-icon left>mdi-plus-circle-outline</v-icon> Add Role
                            </v-btn>
                        </template>
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
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.typeId" label="Type Id"></v-text-field>
                                        </v-col>
                                        
                                        <v-btn block @click="save" depressed large prepend-inner-icon="mdi-map-marker" clearable 
                                            class="white--text rounded-0 mt-6 mb-10 px-8 py-5 text-capitalize" 
                                            color="#009933" :loading="loading" :disabled="loading">Submit 
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
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
export default {
    layout: 'admin',

    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Type Id', value: 'typeId' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            typeId: '',
        },
        defaultItem: {
            name: '',
            typeId: ''
        },
        roles: [],
        loading: false
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add Role' : 'Edit Role'
        }
    },

    methods: {
        initialize () {
            this.roles = [
                {
                    name: 'Customer',
                    typeId: 2
                },
                {
                    name: 'Doctor',
                    typeId: 3
                },
                {
                    name: 'Pharmacist',
                    typeId: 4,
                }
            ]
        },

        addCategory(){
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$toast.success('Successfully added role').goAway(3500)
                this.dialog = false
            }, 3000);
        },

        editItem (item) {
            this.editedIndex = this.roles.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.roles.indexOf(item)
            confirm('Are you sure you want to delete this role?') && this.roles.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$toast.success('Successfully added role').goAway(3500)
                if (this.editedIndex > -1) {
                    Object.assign(this.roles[this.editedIndex], this.editedItem)
                } else {
                    this.roles.push(this.editedItem)
                }
                this.dialog = false
            }, 3000);
        },
    },

    mounted(){
        this.initialize()
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