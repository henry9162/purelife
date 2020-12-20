import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'static',

  transition: {
    mode: 'out-in',
    enterActiveClass: 'animated animate__flipInY',
    leaveActiveClass: 'animated animate__flipOutY'
  },
  
  // env: {
  //   TEST_SECRET_KEY: process.env.TEST_SECRET_KEY,
  //   TEST_PUBLIC_KEY: process.env.TEST_PUBLIC_KEY
  // },

  head: {
    titleTemplate: '%s - pure-life-pharmacy',
    title: 'pure-life-pharmacy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/22adea69cf.js'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/charts.client.js'},
    { src: '~/plugins/vue-js-modal.js'},
    { src: '~/node_modules/vue-flux', ssr: false},
    { src: '~/plugins/vue-carousel', ssr: false },
    { src: '~/plugins/paystack.client.js', ssr: false },
    { src: '~/plugins/loader.client.js', ssr: false },
    { src: '~/plugins/doc.client.js', ssr: false },
    { src: '~/plugins/vue-html-pdf.client.js', ssr: false }
    //{ src: '~/plugins/vue-scanner.client.js'},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv'
  ],

  toast: {
    position: 'top-right',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  auth: {
    redirect: {
      login: '/Account/Login',
      // logout: '​/Account​/LogOut',
      callback: '/Account/Login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/Account/Login',
            method: 'post',
            propertyName: 'loginToken'
          },
          user: false,
          logout: { 
            url: '​/Account​/LogOut', 
            method: 'post' 
          }
          // user: { 
          //   url: '/userDetail', 
          //   method: 'post', 
          //   propertyName: 'data' 
          // }
        }
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    //proxy: true,
    //baseURL: 'https://api.cbforum.org/api'
    //baseURL: 'https://localhost:5001/api/v1',
    baseURL: 'http://purelifeapi.nologysolutionsng.com/api/v1',
    headers: {
      'Access-Control-Allow-Origin': '*',
      common: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*'
      }
    }
    //baseURL: 'https://api.cbforum.org/api'
  },

  // proxy: {
  //   '/api/': {
  //     target: 'https://purelifeapi.nologysolutionsng.com',
  //     pathRewrite: {
  //       '^/api/' : ''
  //       },
  //       changeOrigin: true
  //     }
  // },

  styleResources: {
    scss: ['assets/styles/*.scss']
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor : ['vue-flux']
  }
}
