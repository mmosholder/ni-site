const axios = require('axios');

module.exports = {
  modules: [
    [
      "storyblok-nuxt",
      { accessToken: process.env.NODE_ENV == 'production' ? "LnX8nlr2iiejA5zBOCt8Zgtt" : "YhyWNXIZZrl7cMygbmgJYgtt", cacheProvider: "memory" }
    ]
  ],

  build: {
    vendor: ["lodash"]
  },

  plugins: ["~/plugins/components"],

  router: {
    middleware: "headerDetection"
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "New Image Brewing",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "{{escape description }}"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  generate: {
    routes: function() {
      return axios
        .get(
          "https://api.storyblok.com/v1/cdn/stories?version=published&token=LnX8nlr2iiejA5zBOCt8Zgtt&starts_with=beers&cv=" +
            Math.floor(Date.now() / 1e3)
        )
        .then(r => {
          const beerPages = r.data.stories.map(page => page.full_slug);
          return [
            '/',
            '/about',
            '/brewpub',
            '/beers',
            ...beerPages
          ];
        });
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" }
  /*
  ** Build configuration
  */
  // build: {
  //   /*
  //   ** Run ESLint on save
  //   */
  //   extend(config, { isDev, isClient }) {
  //     if (isDev && isClient) {
  //       config.module.rules.push({
  //         enforce: "pre",
  //         test: /\.(js|vue)$/,
  //         loader: "eslint-loader",
  //         exclude: /(node_modules)/
  //       });
  //     }
  //   }
  // }
};
