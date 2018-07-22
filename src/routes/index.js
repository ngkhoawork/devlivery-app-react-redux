import React from 'react'
import {generateUrl} from '../router'
import {getUser, logout} from '../reducers/user'

export const HOME_ROUTE = 'home'
export const GIFT_STORE_ROUTE = 'gift-store'
export const CARD_STORE_ROUTE = 'card-store'
export const NEW_ARRIVALS_ROUTE = 'new-arrivals'
export const LOGIN_ROUTE = 'login'
export const REGISTER1_ROUTE = 'register1'
export const REGISTER2_ROUTE = 'register2'
export const REGISTER3_ROUTE = 'register3'
export const REGISTER4_ROUTE = 'register4'
export const RESET_PASSWORD_ROUTE = 'reset-password'
export const SET_PASSWORD_ROUTE = 'set-password'

export const DASHBOARD_ROUTE = 'dashboard'
export const ORDERS_ROUTE = 'orders'
export const MANAGE_TEAM_ROUTE = 'manage-team'
export const REPORTS_ROUTE = 'reports'
export const CONTACTS_ROUTE = 'contacts'
export const IMPORT_CONTACTS_ROUTE = 'import-contacts'
export const ADD_CONTACT_ROUTE = 'add-contact'
export const EDIT_CONTACT_ROUTE = 'edit-contact'
export const EDIT_GROUP_ROUTE = 'edit-group'
export const CONTACT_GROUPS_ROUTE = 'contact-groups'
export const BUNDLES_ROUTE = 'bundles'
export const USER_ROUTE = 'user'

export const HOME_ROUTES = [
  HOME_ROUTE,
  GIFT_STORE_ROUTE,
  CARD_STORE_ROUTE,
  NEW_ARRIVALS_ROUTE,
]

export const DASHBOARD_ROUTES = [
  DASHBOARD_ROUTE,
  ORDERS_ROUTE,
  MANAGE_TEAM_ROUTE,
  REPORTS_ROUTE,
  CONTACTS_ROUTE,
  IMPORT_CONTACTS_ROUTE,
  ADD_CONTACT_ROUTE,
  EDIT_CONTACT_ROUTE,
  EDIT_GROUP_ROUTE,
  CONTACT_GROUPS_ROUTE,
  BUNDLES_ROUTE,
  USER_ROUTE,
]

export const LOGOUT_ROUTE = 'logout'

export const PURCHASE1_ROUTE = 'purchase1'
export const PURCHASE2_ROUTE = 'purchase2'
export const PURCHASE3_ROUTE = 'purchase3'
export const PURCHASE4_ROUTE = 'purchase4'
export const PURCHASE5_ROUTE = 'purchase5'
export const PURCHASE6_ROUTE = 'purchase6'
export const PURCHASE7_ROUTE = 'purchase7'
export const PURCHASE8_ROUTE = 'purchase8'
export const PURCHASE9_ROUTE = 'purchase9'
export const PURCHASE10_ROUTE = 'purchase10'
export const PURCHASE11_ROUTE = 'purchase11'
export const PURCHASE12_ROUTE = 'purchase12'
export const PURCHASE13_ROUTE = 'purchase13'
export const PURCHASE_COMPLETED_ROUTE = 'purchase-completed'
export const ADD_BUNDLE_ROUTE = 'add-bundle'

export const PURCHASE_ROUTES = [
  PURCHASE1_ROUTE,
  PURCHASE2_ROUTE,
  PURCHASE3_ROUTE,
  PURCHASE4_ROUTE,
  PURCHASE5_ROUTE,
  PURCHASE6_ROUTE,
  PURCHASE7_ROUTE,
  PURCHASE8_ROUTE,
  PURCHASE9_ROUTE,
  PURCHASE10_ROUTE,
  PURCHASE11_ROUTE,
  PURCHASE12_ROUTE,
  PURCHASE13_ROUTE,
  PURCHASE_COMPLETED_ROUTE,
]

export const AUTH_PURCHASE_ROUTES = [
  PURCHASE1_ROUTE,
  PURCHASE2_ROUTE,
  PURCHASE3_ROUTE,
  PURCHASE4_ROUTE,
  PURCHASE5_ROUTE,
  PURCHASE6_ROUTE,
  PURCHASE7_ROUTE,
  PURCHASE8_ROUTE,
  PURCHASE10_ROUTE,
  PURCHASE11_ROUTE,
  PURCHASE12_ROUTE,
  PURCHASE13_ROUTE,
  PURCHASE_COMPLETED_ROUTE,
]

export const EVENT_PURCHASE_ROUTES = [
  PURCHASE1_ROUTE,
  PURCHASE2_ROUTE,
  PURCHASE3_ROUTE,
  PURCHASE4_ROUTE,
  PURCHASE5_ROUTE,
  PURCHASE6_ROUTE,
  PURCHASE7_ROUTE,
  PURCHASE8_ROUTE,
  PURCHASE11_ROUTE,
  PURCHASE12_ROUTE,
  PURCHASE13_ROUTE,
  PURCHASE_COMPLETED_ROUTE,
]

export const ORDER_BUNDLE_ROUTES = [
  PURCHASE6_ROUTE,
  PURCHASE11_ROUTE,
  PURCHASE12_ROUTE,
  PURCHASE13_ROUTE,
  PURCHASE_COMPLETED_ROUTE,
]

export const EDIT_BUNDLE_ROUTES = [
  PURCHASE1_ROUTE,
  PURCHASE2_ROUTE,
  PURCHASE3_ROUTE,
  PURCHASE4_ROUTE,
  PURCHASE5_ROUTE,
  PURCHASE7_ROUTE,
  PURCHASE8_ROUTE,
  ADD_BUNDLE_ROUTE,
  BUNDLES_ROUTE,
]


const authRoutes = {
  path: '',
  children: [
    {
      path: '/dashboard',
      name: DASHBOARD_ROUTE,
      load: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
      children: [
        {
          path: '/orders',
          name: ORDERS_ROUTE,
          load: () => import(/* webpackChunkName: 'dashboard' */ './orders'),
        },
        {
          path: '/manage-team',
          name: MANAGE_TEAM_ROUTE,
          load: () => import(/* webpackChunkName: 'dashboard' */ './manageTeam'),
        },
        {
          path: '/reports',
          name: REPORTS_ROUTE,
          load: () => import(/* webpackChunkName: 'dashboard' */ './reports'),
        },
        {
          path: '/contacts',
          name: CONTACTS_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './contacts'),
        },
        {
          path: '/contacts/import',
          name: IMPORT_CONTACTS_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './importContacts'),
        },
        {
          path: '/contacts/new',
          name: ADD_CONTACT_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './addContact'),
        },
        {
          path: '/contacts/groups',
          name: CONTACT_GROUPS_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './contactGroups'),
        },
        {
          path: '/contacts/groups/:groupId',
          name: EDIT_GROUP_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './editGroup'),
        },
        {
          path: '/contacts/:contactId',
          name: EDIT_CONTACT_ROUTE,
          load: () => import(/* webpackChunkName: 'contacts' */ './editContact'),
        },
        {
          path: '/bundles',
          name: BUNDLES_ROUTE,
          load: () => import(/* webpackChunkName: 'dashboard' */ './bundles'),
        },
        {
          path: '/settings',
          name: USER_ROUTE,
          load: () => import(/* webpackChunkName: 'dashboard' */ './user'),
        },
      ],
    },
    {
      path: '/logout',
      name: LOGOUT_ROUTE,
      async action({store, query}) {
        await store.dispatch(logout())
        return {redirect: query.next || generateUrl(HOME_ROUTE)}
      },
    },
  ],
  async action({store, next, pathname}) {
    const {loggedIn} = store.getState().user
    if (!loggedIn) {
      return {redirect: `/login?next=${pathname}`}
    }
    return await next()
  },
}

// The top-level (parent) route
const routes = {

  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      name: HOME_ROUTE,
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/gift-store',
      name: GIFT_STORE_ROUTE,
      load: () => import(/* webpackChunkName: 'giftStore' */ './giftStore'),
    },
    {
      path: '/card-store',
      name: CARD_STORE_ROUTE,
      load: () => import(/* webpackChunkName: 'cardStore' */ './cardStore'),
    },
    {
      path: '/new-arrivals',
      name: NEW_ARRIVALS_ROUTE,
      load: () => import(/* webpackChunkName: 'newArrivals' */ './newArrivals'),
    },
    {
      path: '/login',
      name: LOGIN_ROUTE,
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      name: REGISTER1_ROUTE,
      load: () => import(/* webpackChunkName: 'register' */ './register1'),
    },
    {
      path: '/register/individual-details',
      name: REGISTER2_ROUTE,
      load: () => import(/* webpackChunkName: 'register' */ './register2'),
    },
    {
      path: '/register/team-details',
      name: REGISTER3_ROUTE,
      load: () => import(/* webpackChunkName: 'register' */ './register3'),
    },
    {
      path: '/register/invite-people',
      name: REGISTER4_ROUTE,
      load: () => import(/* webpackChunkName: 'register' */ './register4'),
    },
    {
      path: '/reset-password',
      name: RESET_PASSWORD_ROUTE,
      load: () => import(/* webpackChunkName: 'resetPassword' */ './resetPassword'),
    },
    {
      path: '/set-password',
      name: SET_PASSWORD_ROUTE,
      load: () => import(/* webpackChunkName: 'setPassword' */ './setPassword'),
    },
    {
      path: '/purchase/completed',
      name: PURCHASE_COMPLETED_ROUTE,
      load: () => import(/* webpackChunkName: 'purchase' */ './purchaseCompleted'),
    },
    {
      path: '/purchase',
      load: () => import(/* webpackChunkName: 'purchase' */ './purchase'),
      children: [
        {
          path: '',
          name: PURCHASE1_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase1'),
        },
        {
          path: '/lettering-technique',
          name: PURCHASE2_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase2'),
        },
        {
          path: '/card-style',
          name: PURCHASE3_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase3'),
        },
        {
          path: '/card-size',
          name: PURCHASE4_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase4'),
        },
        {
          path: '/card',
          name: PURCHASE5_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase5'),
        },
        {
          path: '/personalize-card',
          name: PURCHASE6_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase6'),
        },
        {
          path: '/gift-type',
          name: PURCHASE7_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase7'),
        },
        {
          path: '/gift',
          name: PURCHASE8_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase8'),
        },
        {
          path: '/create-account',
          name: PURCHASE9_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase9'),
        },
        {
          path: '/add-contacts',
          name: PURCHASE10_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase10'),
        },
        {
          path: '/confirmation',
          name: PURCHASE11_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase11'),
        },
        {
          path: '/payment-method',
          name: PURCHASE12_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase12'),
        },
        {
          path: '/payment',
          name: PURCHASE13_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './purchase13'),
        },
        {
          path: '/create-bundle',
          name: ADD_BUNDLE_ROUTE,
          load: () => import(/* webpackChunkName: 'purchase' */ './addBundle'),
        },
      ],
    },

    authRoutes,
    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'notFound' */ './notFound'),
    },
  ],

  async action({next, store}) {
    await store.dispatch(getUser())
    // Execute each child route until one of them return the result
    const route = await next()

    // Provide default values for title, description etc.
    route.title = `${route.title || ''}`
    route.description = route.description || ''

    return route
  },

}

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  })
}

export default routes
