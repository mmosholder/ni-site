import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _b2d38b64 = () => import('../pages/taproom/index.vue' /* webpackChunkName: "pages/taproom/index" */).then(m => m.default || m)
const _0c3e9ec2 = () => import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */).then(m => m.default || m)
const _21274c93 = () => import('../pages/beers/index.vue' /* webpackChunkName: "pages/beers/index" */).then(m => m.default || m)
const _ef32fbc8 = () => import('../pages/beerfinder/index.vue' /* webpackChunkName: "pages/beerfinder/index" */).then(m => m.default || m)
const _1eca695d = () => import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */).then(m => m.default || m)
const _5c1024f0 = () => import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */).then(m => m.default || m)
const _1f70ab4b = () => import('../pages/beers/_slug.vue' /* webpackChunkName: "pages/beers/_slug" */).then(m => m.default || m)
const _2c27691f = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/taproom",
			component: _b2d38b64,
			name: "taproom"
		},
		{
			path: "/events",
			component: _0c3e9ec2,
			name: "events"
		},
		{
			path: "/beers",
			component: _21274c93,
			name: "beers"
		},
		{
			path: "/beerfinder",
			component: _ef32fbc8,
			name: "beerfinder"
		},
		{
			path: "/about",
			component: _1eca695d,
			name: "about"
		},
		{
			path: "/contact",
			component: _5c1024f0,
			name: "contact"
		},
		{
			path: "/beers/:slug",
			component: _1f70ab4b,
			name: "beers-slug"
		},
		{
			path: "/",
			component: _2c27691f,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
