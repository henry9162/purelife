<template>
    <div class="index">
        <!-- <div class="clip">
            <v-carousel dark cycle height="500" hide-delimiters show-arrows-on-hover>
                <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="require(`~/assets/images/${slide.src}`)">
                </v-carousel-item>
            </v-carousel>
        </div> -->

        <div class="slide">
            <!-- <div class="in-carousel">
                <div class="text-center">
                    <p class="mg-h1 mg-gradient">Introducing</p>
                </div>
            </div> -->
            <client-only>
                <vue-flux
                    :options="fluxOptions"
                    :images="fluxImages"
                    :transitions="fluxTransitions"
                    :captions="vfCaptions"
                    style="width:100%;height: 100%"
                    ref="slider">

                    <template v-slot:preloader>
                        <flux-preloader />
                    </template>

                    <template v-slot:pagination>
                        <flux-pagination />
                    </template>

                    <template v-slot:index>
                        <flux-index />
                    </template>

                    <template v-slot:caption>
                        <!-- <flux-caption> -->
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6"></v-col>
                                    <v-col cols="12" md="6">
                                        <div class="custom-caption ml-6">
                                            <span class="white--text custom-h4"></span>
                                            <div class="custom-text white--text">DRUGS AND PHARMACEUTICALS</div>
                                            <div class="pt-1 pb-4 custom-h3 custom-red">SPECIAL 20% OFF</div>
                                            <div class="post-caption white--text">FOR ALL AGE CATEGORY</div>
                                            <v-btn style="padding-left: 40px !important; padding-right: 40px !important" class="text-capitalize white--text mt-6" x-large rounded color="rgb(237,0,0)">
                                                Get Started
                                            </v-btn>
                                        </div>      
                                    </v-col>
                                </v-row>
                            </v-container>
                        <!-- </flux-caption> -->
                    </template>
                </vue-flux>

                <!-- <flux-caption :slider="$refs.slider" /> -->
            </client-only>
        </div>

        <div class="d-flex justify-center quick-info">
            <div class="d-flex">
                <div class="quickInfo-1 pl-6">
                    <div class="d-flex mt-5 pb-5">
                        <div class="d-flex justify-center align-center pr-4">
                            <div>
                                <i class="fas fa-2x fa-truck custom-red"></i>
                            </div>
                        </div>
                        <div>
                            <div class="custom-red custom-h5">Quick Delivery</div>
                            <div class="custom-text pt-1 custom-red">Our delivery service is not just fast, but consistent and reliable to meet your needs.</div>
                        </div>
                    </div>
                </div>
                <div class="quickInfo-2 mx-3 pl-6">
                    <div class="d-flex mt-5 pb-5">
                         <div class="d-flex justify-center align-center pr-4">
                            <div >
                                <i class="fas fa-2x fa-credit-card custom-red"></i>
                            </div>
                        </div>
                        <div>
                            <div class="custom-red custom-h5">Pay With Ease</div>
                            <div class="custom-text pt-1 custom-red">Make payment easily without stress via our various payment platform.</div>
                        </div>
                    </div>
                </div>
                <div class="quickInfo-3 pl-6 pr-6">
                    <div class="d-flex mt-5 pb-5">
                        <div class="d-flex justify-center align-center pr-4">
                            <div>
                                <i class="fa fa-2x fa-shield custom-red"></i>
                            </div>
                        </div>
                        <div>
                            <div class="custom-red custom-h5">Secured Payment</div>
                            <div class="custom-text pt-1 custom-red">We make your security our priority, so shop with peace of mind.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="shop-categories">
            <div class="custom-h4 text-center white--text categories-title">Shop thousands of items storewide</div>
            <v-container class="categories-container">
                <div class="d-flex justify-center">
                    <div>
                        <div class="d-flex">
                            <v-card  @click="$router.push({ path: 'allProduct', query: { name: 'Pharmacy' } })" flat color="rgb(237,0,0)" class="custom-card">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div>
                                            <v-img  
                                                class="rounded-circle"
                                                height="200"
                                                max-width="200"
                                                src="https://previews.123rf.com/images/suthisakaewkajng/suthisakaewkajng1803/suthisakaewkajng180300041/97667127-colorful-medicines-and-drugs-in-a-bottle-on-a-white-background-.jpg">
                                            </v-img>
                                        </div>
                                        
                                        <div class="text-center py-6 white--text post-caption">Pharmacy</div>
                                    </div>   
                                </div>
                            </v-card>

                            <v-card @click="$router.push({ path: 'allProduct', query: { name: 'Child Care' } })" flat color="rgb(237,0,0)" class="mx-10 custom-card">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div >
                                            <v-img  
                                                class="rounded-circle"
                                                height="200"
                                                max-width="200"
                                                src="https://www.pipandsox.com.au/wp-content/uploads/2020/06/australian-gifts-souvenirs-wood-toys-doll-accessories-kit_03.jpg">
                                            </v-img>
                                        </div>
                                        <div class="text-center py-6 white--text post-caption">Baby/Child Care</div>
                                    </div>   
                                </div>
                            </v-card>

                             <v-card @click="$router.push({ path: 'allProduct', query: { name: 'Personal Care' } })" flat color="rgb(237,0,0)" class="custom-card">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div>
                                            <v-img  
                                                class="rounded-circle"
                                                height="200"
                                                max-width="200"
                                                src="https://img.lovepik.com/photo/50139/6552.jpg_wh860.jpg">
                                            </v-img>
                                        </div>
                                        <div class="text-center py-6 white--text post-caption">Personal Care</div>
                                    </div>   
                                </div>
                            </v-card>

                            <v-card @click="$router.push({ path: 'allProduct', query: { name: 'Beauty' } })" flat color="rgb(237,0,0)" class="mx-10 custom-card">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div>
                                            <v-img  
                                                class="rounded-circle"
                                                height="200"
                                                max-width="200"
                                                src="https://preview.pixlr.com/images/800wm/1162/2/1162212830.jpg">
                                            </v-img>
                                        </div>
                                        <div class="text-center py-6 white--text post-caption">Beauty</div>
                                    </div>   
                                </div>
                            </v-card>

                            <v-card @click="$router.push({ path: 'allProduct', query: { name: 'Perfumes & Aromatherapy' } })" flat color="rgb(237,0,0)" class="custom-card">
                                <div class="d-flex justify-center">
                                    <div>
                                        <div>
                                            <v-img  
                                                class="rounded-circle"
                                                height="200"
                                                max-width="200"
                                                src="https://patriciarnhealthandbeautyproducts.com/wp-content/uploads/2019/10/FX502413.jpg">
                                            </v-img>
                                        </div>
                                        <div class="text-center py-6 white--text post-caption">Perfume & Aromatherapy</div>
                                    </div>   
                                </div>
                            </v-card>
                        </div>
                    </div>
                </div>
            </v-container>
        </div>

        <!-- <categories /> -->
        <!-- <div>
            <product-filters />
        </div> -->

        <div class="">
            <!-- <vueper-slides>
                <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :content="slide.content" />
            </vueper-slides> -->
            
            <!-- <vueper-slides
                ref="myVueperSlides"
                autoplay
                :pause-on-hover="pauseOnHover"
                @autoplay-pause="internalAutoPlaying = false"
                @autoplay-resume="internalAutoPlaying = true">
                <vueper-slide
                    v-for="(slide, i) in slides"
                    :key="slide.id"
                    :title="slide.title"
                    :content="slide.content"
                    :style="'background-color: ' + colors[i % 4]" />
                <template v-slot:pause>
                    <i class="icon pause_circle_outline"></i>
                </template>
            </vueper-slides> -->

            <!-- <v-container>
                <div>
                    <vueper-slides
                        class="no-shadow"
                        :visible-slides="3"
                        :slide-ratio="1 / 6"
                        :dragging-distance="70">

                        <vueper-slide 
                            v-for="(slide, i) in slides"
                            :key="i" :title="slide.title" 
                            :image="slide.image">
                        </vueper-slide>
                    </vueper-slides>
                </div>
            </v-container> -->
        </div>

        <!-- Banna Info -->
        <v-container class="px-0 py-0" fluid>
            <v-row>
                <v-col class="py-0">
                    <div style="background: #fff; height: 200px" class="d-flex justify-center align-center px-8 text-uppercase">
                        <div class="">
                            <div class="white--text custom-h4 custom-green">Use our free app</div>
                            <div class="white--text post-caption custom-green">To place your order!</div>
                        </div>
                        <div class="ml-12 d-flex">
                            <v-btn depressed x-large color="black" class="white--text text-capitalize post-caption">
                                <v-icon large left class="pr-4 pl-2">mdi-apple</v-icon>
                                App Store
                            </v-btn>

                            <v-btn depressed x-large color="black" class="white--text text-capitalize ml-4 post-caption">
                                <v-icon large left class="pr-4 pl-2">mdi-google-play</v-icon>
                                Google Play
                            </v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <!-- <v-container class="px-0 about-section mt-5 py-0" fluid>
            <div>
                <v-row class="py-0">
                    <v-col cols="12" md="5">
                        <div class="about-content pt-12 pb-8">
                            <div class="subtitle-2 custom-green">WELCOME TO PURELIFE PHARMACY</div>
                            <div class="pt-3 pb-6 text-h5 white--text">Focus On Purity and Quality</div>
                            <div class="about-body white--text">
                                Your wellness is our priority, we don’t just provide the medicines prescribed to you by your physician, 
                                we make your needs our priority.
                            </div>
                            <div class="pt-12 pb-6">
                                <v-btn outlined rounded x-large style="padding-left: 35px; padding-right: 35px" class="white--text">More About Us</v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col class="aboutImage px-0 py-0 my-0" cols="12" md="7">
                        <div class="aboutImage"></div>
                    </v-col>
                </v-row>
            </div>
        </v-container> -->

    </div>
</template>

<script>
import categories from '../components/home/categories'
import productFilters from '../components/home/productFilters'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

let VueFlux;
let Transitions;
let FluxCaption;
let FluxControls;
let FluxPagination;
let FluxPreloader;
let FluxIndex 

if (process.client) {
   const VF = require('vue-flux');
   VueFlux = VF.VueFlux;
   Transitions = VF.Transitions;
   FluxCaption = VF.FluxCaption;
   FluxControls = VF.FluxControls;
   FluxPagination = VF.FluxPagination;
   FluxPreloader = VF.FluxPreloader;
   FluxIndex = VF.FluxIndex;
}

export default {
    layout: 'home',
    components: { 
        categories, productFilters, VueFlux, FluxCaption, 
        FluxControls, FluxPagination, FluxPreloader, FluxIndex, VueperSlides, VueperSlide
    },

    data: () => ({
        slides: [
            {
                id: 'slide-1',
                title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
                image:  require("@/assets/images/large/pharmacy/pharmacyNew6.jpg")
            },
            {
                id: 'slide-2',
                title: 'Slide <b style="font-size: 1.3em;color: blue">#2</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: blue">why not?</span>',
                image: require("@/assets/images/large/pharmacy/pharmacyNew16.jpg")
            },
            {
                id: 'slide-3',
                title: 'Slide <b style="font-size: 1.3em;color: brown">#3</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: brown">why not?</span>',
                image: require("@/assets/images/large/pharmacy/pharmacyNew29.jpg")
            },
            {
                id: 'slide-4',
                title: 'Slide <b style="font-size: 1.3em;color: pink">#4</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: pink">why not?</span>',
                image: require("@/assets/images/large/pharmacy/pharmacyNew3.jpg")
            },
            {
                id: 'slide-5',
                title: 'Slide <b style="font-size: 1.3em;color: yellow">#5</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
                image:  require("@/assets/images/large/pharmacy/pharmacyNew6.jpg")
            },
            {
                id: 'slide-6',
                title: 'Slide <b style="font-size: 1.3em;color: blue">#6</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: blue">why not?</span>',
                image: require("@/assets/images/large/pharmacy/pharmacyNew16.jpg")
            },
            {
                id: 'slide-7',
                title: 'Slide <b style="font-size: 1.3em;color: brown">#7</b>',
                content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: brown">why not?</span>',
                image: require("@/assets/images/large/pharmacy/pharmacyNew29.jpg")
            },
        ],
        data: [
            '<div class="example-slide">Slide 1</div>',
            '<div class="example-slide">Slide 2</div>',
            '<div class="example-slide">Slide 3</div>',
        ],
        carouseldata: 
        [
            {
                id: 1,
                message: 'First message',
                content(createElement, content) {
                    return createElement('img', {
                    attrs: {
                        src: require('@/assets/images/large/pharmacy/pharmacyNew2.jpg'),
                    }
                    })
                }
            },
            {
                id: 2,
                message: 'Any message',
                content(createElement, content) {
                    return createElement('img', {
                    attrs: {
                        src: require('@/assets/images/large/pharmacy/pharmacyNew3.jpg'),
                    }
                    })
                }
            }
        ],
        fluxOptions: {
            autoplay: true
        },
        fluxImages: [
            require("@/assets/images/large/pharmacy/pharmacyNew6.jpg"),
            require("@/assets/images/large/pharmacy/pharmacyNew16.jpg"),
            require("@/assets/images/large/pharmacy/pharmacyNew29.jpg")
        ],
        fluxTransitions: [ 'fade', 'cube', 'book', 'wave' ],
        vfCaptions: [
            'Image URL1 caption',
            'Image URL2 caption',
            'Image URL3 caption',
        ],
    }),

    computed: {
        index(){
            return this.$refs.slider
        }
    },

    methods: {
        getImage(name) {
            return require(`@/assets/images/large/pharmacy/${name}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .custom-caption {
        margin-top: 80px !important;
    }
    .shop-categories {
        background: rgb(237,0,0);

        .categories-title {
            padding-top: 70px
        }

        .categories-container {
            padding: 80px 0px 100px 0px;

            .custom-card {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .quick-info {
        width: 100%;

        .quickInfo-1, .quickInfo-2, .quickInfo-3 {
            width: 300px;
            border-left: 1px solid  rgb(237,0,0);
        }

        .quickInfo-3 {
            border-right: 1px solid  rgb(237,0,0);
        }
    }
    .custom-h5 {
        font-family: light-font(family);
        font-size: 18px;
    }
    .custom-h4 {
        font-family: light-font(family);
        font-size: 24px;
    }
    .custom-h3 {
        font-family: light-font(family);
        font-size: 32px;
    }
    .custom-text {
        font-family: light-font(family);
        font-weight: 100;
        font-size: 14px;
    }
    .post-caption {
        font-family: light-font(family);
        font-weight: 100;
    }
    .example-slide {
        align-items: center;
        background-color: black;
        color: #999;
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
        min-height: 10rem;
    }
    .in-carousel {
        position: absolute;
        width: 100%;
        top: 4vw;
        z-index: 5;
    }
    .mg-h1 {
        font-size: 2.5vw;
        font-weight: 300;
        font-family: Ubuntu;
        color: white;
    }
    .mg-gradient {
        display: inline;
        padding: 0px 0em;
        margin: 0;
        text-shadow: 0 0 0.5vw hsla(0, 0, 0%, 1);
    }
    .clip {
        clip-path: polygon(50% 0%, 100% 0, 100% 35%, 100% 100%, 76% 93%, 53% 100%, 29% 92%, 0 100%, 0% 35%, 0 0);
    }
    .slide {
        height: 60vh;
    }
    .custom-green {
        color: #009933 !important;
    }
    .custom-red {
        color:  rgb(237,0,0) !important;
    }
    .about-section {
        background: rgb(237,0,0);
        //height: 70vh;

        .about-content {
            padding-left: 80px !important;

            .about-body {
                font-size: 16px;
                font-family: "Roboto", sans-serif !important;
            }
        }
        .aboutImage {
            width: 100%;
            //height: 100%;
            background: url("~assets/images/pharmacy/pharmacyAbout1.jpg");
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
</style>
