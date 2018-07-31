const pkg = require('./package');
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Prisma – Geef meer kleur aan zorgverlening',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Prisma – Geef meer kleur aan zorgverlening'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#FFFFFF'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.scss'
  ],

  script: [{
      src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'
    },
    {
      src: 'https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-helper.js'
    },
    {
      src: 'https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-gallery.js'
    },
    {
      src: 'https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-gallery-fullscreen.js'
    },
    {
      src: 'https://unpkg.com/vue-gallery'
    },
    {
      src: 'https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-gallery-youtube.js'
    },
    {
      src: 'https://unpkg.com/blueimp-gallery@2.27.0/js/blueimp-gallery-video.js'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'
    },
    {
      src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
    },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vee-validate.js', ssr: true },
    '~/api/init.js',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'nuxt-material-design-icons',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['vee-validate'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    },

  },

}
