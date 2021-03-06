const axios = require('axios');
const path = require('path');
require('dotenv').config();

module.exports = {
  modules: [
    [
      "storyblok-nuxt",
      {
        accessToken:
          process.env.NODE_ENV == "production"
            ? "LnX8nlr2iiejA5zBOCt8Zgtt"
            : "YhyWNXIZZrl7cMygbmgJYgtt",
        cacheProvider: "memory"
      }
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-130585646-1",
        debug: {
          sendHitTask: process.env.NODE_ENV === "production"
        }
      }
    ]
  ],

  env: {
    maps: process.env.MAP_KEY || "AIzaSyBnZmc-ydhJ9Wi9LY5EmaNLS6HA679EQ4Y",
    baseUrl: process.env.BASE_URL || "://localhost:3333",
    untappd: process.env.UNTAPPD || ""
  },

  plugins: ["~/plugins/components", "~/plugins/map", "~/plugins/vuelidate", {src: "~/plugins/datepicker", mode: 'client'}],

  router: {
    middleware: ["headerDetection", "salesFormDetection"],
    linkActiveClass: "active"
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
      },
      { property: "og:title", content: "New Image Brewing" },
      { property: "og:url", content: "https://www.nibrewing.com/" },

      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "New Image Brewing" },
      {
        property: "og:description",
        content:
          "Juicy, citrusy IPAs, unique takes on sours, and everything in between. Come to our taproom in Olde Town Arvada to enjoy our craft beers, craft cocktails, tapas-style food, and social dining."
      },
      {
        property: "og:image",
        content: "http://www.nibrewing.com/ni-social-share.jpg"
      },
      { property: "og:image:secure_url", content: "https://www.nibrewing.com/ni-social-share.jpg"},
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "twitter:title", content: "New Image Brewing" },
      { property: "og:type", content: "website" },
      { property: "twitter:card", content: "summary_large_image" },
      {
        property: "twitter:description",
        content:
          "Juicy, citrusy IPAs, unique takes on sours, and everything in between. Come to our taproom in Olde Town Arvada to enjoy our craft beers, craft cocktails, tapas-style food, and social dining."
      },
      { property: "twitter:image", content: "https://www.nibrewing.com/ni-social-share.jpg" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,500,500i,600,600i,700"
      },
      {
        rel: "stylesheet",
        href: "//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
      }
    ],
    script: [
      {
        defer: true,
        src: "https://use.fontawesome.com/releases/v5.5.0/js/all.js",
        integrity:
          "sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0",
        crossorigin: "anonymous"
      }
    ]
  },

  serverMiddleware: ["~/api/contact", "~/api/sales", "~/api/events", "~/serverMiddleware/redirect"],

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
            "/",
            "/taproom",
            "/beers",
            "/beerfinder",
            "/contact",
            "/events",
            "/privacy-policy",
            "/swag",
            ...beerPages
          ];
        });
    }
  },
  /*
   ** Build configuration
   */
  build: {

    postcss: [require("autoprefixer")],

    transpile: [/^vue2-google-maps($|\/)/]
  }
};
