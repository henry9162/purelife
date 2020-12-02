<template>
<div>
    <v-card class="mx-10 mt-14" color="#22A64E">
        <v-data-table :headers="headers" :items="drugs" sort-by="name" class="px-6">
            <template v-slot:top>
                <v-toolbar flat color="white" class="pt-6">
                    <v-toolbar-title class="list-color post-caption">Product Groups</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="#22A64E" dark class="rounded-0 post-caption" v-bind="attrs" v-on="on">
                                <v-icon left>mdi-plus-circle-outline</v-icon> Add Group
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
                                            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-select v-model="editedItem.category" :items="categories" label="Category"
                                                item-text="name"
                                                item-value="id">
                                            </v-select>
                                        </v-col>
                                        <!-- <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.category" label="Category"></v-text-field>
                                        </v-col> -->
                                        <v-select v-model="editedItem.tags" :items="tags" label="Tags" multiple chips
                                            item-text="name"
                                            item-value="id"
                                        ></v-select>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="py-0 px-0">
                                            <v-text-field type="number" v-model="editedItem.quantity" label="Quantity"></v-text-field>
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
            { text: 'Category', value: 'category.name' },
            { text: 'Brand', value: 'tags[0].name' },
            { text: 'Price', value: 'price' },
            { text: 'Quantity', value: 'quantity' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            category: '',
            tags: [],
            price: '',
            quantity: ''
        },
        defaultItem: {
            name: '',
            category: '',
            tags: [],
            price: '',
            quantity: ''
        },
        drugs: [],
        loading: false,
        tags: [
            {
                name: 'Emzor',
                color: 'blue'
            },
            {
                name: 'Glascow Smith',
                color: 'red'
            },
            {
                name: 'Dettol',
                color: 'brown',
            },
            {
                name: 'Becham',
                color: 'pink',
            },
            {
                name: 'Ciprodex',
                color: 'yellow',
            }
        ],
        categories: [
            {
                name: 'Drugs',
                color: 'red'
            },
            {
                name: 'Breverages',
                color: 'blue'
            },
            {
                name: 'Drinks',
                color: 'brown',
            },
            {
                name: 'Perfume',
                color: 'pink',
            },
            {
                name: 'Soaps',
                color: 'yellow',
            }
        ]
    }),

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add Group' : 'Edit Group'
        }
    },

    methods: {
        initialize () {
            this.drugs = [
                {
                    name: 'Penicillin',
                    category: {
                        id: 2,
                        name: 'Drugs',
                        color: 'blue'
                    },
                    tags: [
                        {name: 'Emzor', id: '1'}, 
                    ],
                    price: '100.00',
                    quantity: 10
                },
                {
                    name: 'Milo',
                    category: {
                        id: 2,
                        name: 'Breverages',
                        color: 'blue'
                    },
                    tags: [
                        {name: 'Glasco Smith', id: '2'}, 
                    ],
                    price: '20.00',
                    quantity: 8    
                },
                {
                    name: 'Arthemetha',
                    category: {
                        id: 2,
                        name: 'Drugs',
                        color: 'red'
                    },
                    tags: [
                        {name: 'Dettol', id: '3'}, 
                    ],
                    price: '30.00',
                    quantity: 15
                },
                {
                    name: 'Morphine',
                    category: {
                        id: 2,
                        name: 'Drug',
                        color: 'pink',
                    },
                    tags: [
                        {name: 'Ciprodex', id: '5'}, 
                    ],
                    price: '50.00',
                    quantity: 30
                },
                {
                    name: 'Aspirin',
                    category: {
                        id: 2,
                        name: 'Drug',
                        color: 'yellow',
                    },
                    tags: [
                        {name: 'Becham', id: '4'}, 
                    ],
                    price: '100.00',
                    quantity: 10
                }
            ]
        },

        addDrug(){
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.$toast.success('Successfully added product').goAway(3500)
                this.dialog = false
            }, 3000);
        },

        editItem (item) {
            this.editedIndex = this.drugs.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.drugs.indexOf(item)
            confirm('Are you sure you want to delete this product?') && this.drugs.splice(index, 1)
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
                this.$toast.success('Successfully added product').goAway(3500)
                if (this.editedIndex > -1) {
                    Object.assign(this.drugs[this.editedIndex], this.editedItem)
                } else {
                    this.drugs.push(this.editedItem)
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