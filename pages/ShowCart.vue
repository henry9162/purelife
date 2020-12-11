<template>
    <div>
        <!-- Breadcrumbs -->
        <div class="d-flex justify-center">
            <v-breadcrumbs class="pa-4" :items="items" small></v-breadcrumbs>
        </div>

        <!-- Product title parallax -->
        <titleParalax>Shopping Cart</titleParalax>
        
        <div class="mt-4">
            <v-container>
                
                    <div v-if="cartProducts" class="d-flex justify-center">
                        <div class="mx-15" style="width: 80%">
                            <div class="">
                            <v-simple-table fixed-header>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center green py-2 white--text post-caption">Image</th>
                                            <th class="text-left green py-2 white--text post-caption">Product Name</th>
                                            <th class="text-center green py-2 white--text post-caption">Qantity</th>
                                            <th class="text-center green py-2 white--text post-caption">Unit Price</th>
                                            <th class="text-center green py-2 white--text post-caption">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in cartProducts" :key="product.id">
                                            <td class="text-center py-4">
                                                <v-card tile flat>
                                                    <v-img :aspect-ratio="16/9" :src="product.image_front"></v-img>
                                                </v-card>
                                            </td>
                                            <td class="text-left py-4">{{ product.title }}</td>

                                            <td class="text-center pt-4 mb-0">
                                                <div style="width: 100%" class="d-flex justify-center">
                                                    <v-btn tile @click="updateQuantity({ product: product, type: 'decrease' })" color="success" class="my-0 mt-4" dark x-small depressed>
                                                        <v-icon x-small>mdi-minus</v-icon>
                                                    </v-btn>

                                                    <div style="width: 10%">
                                                        <v-text-field class="custom-input-height" dense flat solo v-model="quantity"></v-text-field>
                                                    </div>                                                    

                                                    <v-btn @click="updateQuantity({ product: product, type: 'increase' })" tile color="success" class="my-0 mt-4" dark x-small depressed>
                                                        <v-icon x-small>mdi-plus</v-icon>
                                                    </v-btn>

                                                    <v-btn @click="removeCartItem(product.id)" depressed tile class="ml-4 mt-4" color="red" x-small dark>
                                                        <v-icon x-small>mdi-close</v-icon>
                                                    </v-btn>
                                                </div>
                                            </td>
                                            
                                            <td class="text-center py-4">
                                                <v-icon class="font-weight-thin" small right>mdi-currency-ngn</v-icon>{{ product.price }}
                                            </td>
                                            <td class="text-center py-4">
                                                <v-icon class="font-weight-thin" small right>mdi-currency-ngn</v-icon>{{ product.price * quantity }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </div>
                        

                        <div class="mt-2">
                            <v-container fluid>
                                <v-row>
                                    <v-col class="pl-0" md="8">
                                        <div style="border: 20px solid #b6bbc6">
                                            <v-expansion-panels flat focusable>
                                                <!-- <v-expansion-panel>
                                                    <v-expansion-panel-header>Use Coupon Code</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <div class="d-flex justify-space-between pt-8">
                                                            <div>Enter your coupon code here</div>
                                                            <div class="ml-4 d-flex">
                                                                <v-text-field label="Enter Coupon" clearable outlined dense></v-text-field>
                                                                <v-btn class="ml-2" tile depressed color="primary" dark>Apply Coupon</v-btn>
                                                            </div>
                                                        </div> 
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel> -->

                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Use Loyalty Point</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <div class="d-flex justify-space-between pt-8">
                                                            <div>Enter your Loyalty point here</div>
                                                            <div class="ml-4 d-flex">
                                                                <v-text-field label="Enter Gift Code" clearable outlined dense></v-text-field>
                                                                <v-btn class="ml-2" tile depressed color="primary" dark>Apply Loyalty Point</v-btn>
                                                            </div>
                                                        </div> 
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </div>
                                    </v-col>

                                    <v-col md="4" class="pr-0">
                                        <div style="border: 20px solid #b6bbc6">
                                            <v-simple-table fixed-header>
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th class="title font-weight-bold">Total</th>
                                                            <th class="pa-0">
                                                                <v-icon class="font-weight-thin" small right>mdi-currency-ngn</v-icon> 
                                                                <span class="title font-weight-light" v-text="cartTotal"></span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </template>
                                            </v-simple-table>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>

                        <div class="white darken-2 pa-4 mb-4 d-flex justify-space-between">
                            <v-btn @click="$router.push({ path: '/', query: { name: '' } })" depressed tile large color="red" dark>
                                <v-icon left>mdi-arrow-left</v-icon> Continue Shopping
                            </v-btn>
                        
                            <v-btn @click="$router.push({ path: '/checkOut' })" depressed large tile color="success" dark>
                                Check Out <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    
                    <!-- Sidebar product display -->
                    <!-- <v-col md="3">
                        <div class="mx-2"> -->
                            <!-- Carousel -->
                            <!-- <div class="mb-8">
                                <div class="categories mb-4">
                                    <h4 class="font-weight-bold grey--text text--darken-3 mb-1 text-uppercase">You might Like</h4>
                                    <v-divider class="grey darken-3"></v-divider>
                                </div>
                                <v-carousel dark cycle height="200" hide-delimiters show-arrows-on-hover>
                                    <v-carousel-item v-for="item in 3" :key="item">
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card color="white" max-width="400" :elevation="hover ? 20 : 1">
                                                <v-img :aspect-ratio="16/12" src="https://raffles.edu.my/wp-content/uploads/2018/05/image-fashion-business-1200x628-1170x628.jpg">
                                                    <v-expand-transition>
                                                        <div v-if="hover"
                                                            class="d-flex blue transition-fast-in-fast-out darken-2 font-weight-bold v-card--reveal display-3 white--text"
                                                            style="height: 100%;"
                                                        >
                                                            <v-btn fab>
                                                                <v-icon large>mdi-magnify-plus-cursor</v-icon>
                                                            </v-btn>
                                                        
                                                    </div>
                                                    </v-expand-transition>

                                                    <div class="product-label-div">
                                                        <div class="product-labels-left">
                                                            <div class="product-labels-left-btn mt-10">
                                                                <v-btn class="ml-0" min-width="180" tile rounded small color="blue darken-3" dark>Custom Labels</v-btn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </v-img>

                                                <v-card-text class="pt-6" style="position: relative;">
                                                    <v-hover v-slot:default="{ hover }">
                                                        <v-btn :elevation="hover ? 12 : 2" absolute color="blue" class="white--text" fab small right top>
                                                            <v-icon>mdi-cart</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    <div class="font-weight-light grey--text subtitle-2 mb-1">For the perfect meal</div>
                                                    <div style="display: flex; justify-content: space-between; max-height: 20px">
                                                        <h3 class="subtitle-1 font-weight-bold grey--text text--darken-3" v-text="'Test Product'"></h3>
                                                        <h3 class="font-weight-black title" v-text="'$' + '760'"></h3>
                                                    </div>
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-btn x-small text>
                                                        <v-icon small color="green darken-1" class="mr-1">mdi-currency-ngn</v-icon> Buy Now
                                                    </v-btn>
                                                    <v-btn x-small text color="purple">
                                                        <v-icon left>mdi-email-outline</v-icon> Ask Question
                                                    </v-btn>

                                                    <div class="flex-grow-1"></div>

                                                    <v-btn icon>
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                    </v-btn>
                                                </v-card-actions>

                                                <v-expand-transition>
                                                    <div>
                                                        <v-card-text>
                                                            Description of product
                                                        </v-card-text>
                                                    </div>
                                                </v-expand-transition>
                                            </v-card>
                                        </v-hover>
                                    </v-carousel-item>
                                </v-carousel>
                            </div>end -->

                            <!-- People also bought category -->
                            <!-- <div class="">
                                <div class="categories mb-4">
                                    <h4 class="font-weight-bold grey--text text--darken-3 mb-1 text-uppercase">People also bought</h4>
                                    <v-divider class="grey darken-3"></v-divider>
                                </div>
                                <v-carousel dark cycle height="200" hide-delimiters show-arrows-on-hover>
                                    <v-carousel-item v-for="item in 3" :key="item">
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card color="white" max-width="400" :elevation="hover ? 20 : 1">
                                                <v-img :aspect-ratio="16/12" src="https://www.fashiontofigure.com/crsdocroot/images/FTF/Flyouts/TOPS/09112019_Tops.jpg">
                                                    <v-expand-transition>
                                                        <div v-if="hover"
                                                            class="d-flex blue transition-fast-in-fast-out darken-2 font-weight-bold v-card--reveal display-3 white--text"
                                                            style="height: 100%;"
                                                        >
                                                            <v-btn fab>
                                                                <v-icon large>mdi-magnify-plus-cursor</v-icon>
                                                            </v-btn>
                                                        
                                                    </div>
                                                    </v-expand-transition>

                                                    <div class="product-label-div">
                                                        <div class="product-labels-left">
                                                            <div class="product-labels-left-btn mt-10">
                                                                <v-btn class="ml-0" min-width="180" tile rounded small color="blue darken-3" dark>Custom Labels</v-btn>
                                                            </div>
                                                        </div>
                                                        <div class="product-labels-right">
                                                            <div class="my-1">
                                                                <v-btn rounded x-small color="orange" dark>
                                                                    Premium <v-icon small right>mdi-star</v-icon>
                                                                </v-btn>
                                                            </div>
                                                            <div class="text-right mr-1 my-1"><v-btn fab x-small color="primary" dark>New</v-btn></div>
                                                            <div class="text-right mr-1 my-1"><v-btn fab x-small class="black--text" color="yellow" dark>Hot</v-btn></div>
                                                            <div class="text-right mr-1 my-1"><v-btn fab x-small color="danger" dark>Hot</v-btn></div>
                                                        </div>
                                                    </div>
                                                </v-img>

                                                <v-card-text class="pt-6" style="position: relative;">
                                                    <v-hover v-slot:default="{ hover }">
                                                        <v-btn :elevation="hover ? 12 : 2" absolute color="blue" class="white--text" fab small right top>
                                                            <v-icon>mdi-cart</v-icon>
                                                        </v-btn>
                                                    </v-hover>
                                                    <div class="font-weight-light grey--text subtitle-2 mb-1">For the perfect meal</div>
                                                    <div style="display: flex; justify-content: space-between; max-height: 20px">
                                                        <h3 class="subtitle-1 font-weight-bold grey--text text--darken-3" v-text="'Test Product'"></h3>
                                                        <h3 class="font-weight-black title" v-text="'$' + '760'"></h3>
                                                    </div>
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-btn x-small text>
                                                        <v-icon small color="green darken-1" class="mr-1">mdi-currency-ngn</v-icon> Buy Now
                                                    </v-btn>
                                                    <v-btn x-small text color="purple">
                                                        <v-icon left>mdi-email-outline</v-icon> Ask Question
                                                    </v-btn>

                                                    <div class="flex-grow-1"></div>

                                                    <v-btn icon>
                                                        <v-icon>mdi-chevron-up</v-icon>
                                                    </v-btn>
                                                </v-card-actions>

                                                <v-expand-transition>
                                                    <div>
                                                        <v-card-text>
                                                            Description of product
                                                        </v-card-text>
                                                    </div>
                                                </v-expand-transition>
                                            </v-card>
                                        </v-hover>
                                    </v-carousel-item>
                                </v-carousel>
                            </div> end -->

                        <!-- </div>
                    </v-col> -->
                </div>

                <div class="d-flex justify-center post-caption red--text grey lighten-2 pa-5 mt-4" v-else>
                    <div class="text-center">
                        <div>You do not have any item in your cart</div>
                        <div class="mt-2">
                            <v-btn @click="$router.push({path: '/'})" color="green lighten-2" depressed small class="white--text">Continue shopping</v-btn>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import titleParalax from '../components/TitleParalax'

export default {
    layout: 'home',
    components: { titleParalax },

    data: () => ({
        imageSelected: '',
        items: [
            {
                text: 'Shop & Order',
                disabled: false,
                href: 'breadcrumbs_dashboard',
            },
            {
                text: 'Cart',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ]
    }),

    computed: {
        ...mapGetters({
            cartProducts: 'productss/cartProducts',
            quantity: 'productss/quantity',
            cartTotal: 'productss/cartTotal'
        })
        
    },

    methods: {
        ...mapActions({
            updateQuantity: 'productss/updateQuantity',
            addToCart: 'productss/addToCart',
            removeCartItem: 'productss/removeCartItem'
        }),
        selectImage(image){
            this.imageSelected = image;
        },
        productDetails(event) {
            this.product = event.params.product;
            this.imageSelected = event.params.product.productImage
        },
        async initialise(){
            //await this.$store.dispatch('productss/persistCart');
        }
    },

    mounted(){
        this.initialise()
    }
}
</script>

<style lang="scss" scoped>
.custom-input-height {
    padding: 5px 0px !important;
}
.custom-h5 {
    font-family: light-font(family);
    font-size: 18px !important;
}
.custom-h4 {
    font-family: light-font(family);
    font-size: 24px !important;
}
.post-caption {
    font-family: light-font(family);
    font-weight: 100 !important;
}
.custom-red-bg {
    background: #F8494B !important;
}
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
}

.product-label-div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .product-labels-left {
        .product-labels-left-div {
            transform: rotate(-42deg);
            width: 100%;
            margin-left: -30px
        }
    }
}
</style>