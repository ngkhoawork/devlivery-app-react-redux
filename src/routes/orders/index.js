import React from 'react'
import Orders from './Orders'
import {setCurrentRouteName} from '../../reducers/global'
import {getEvents, getOrders, getUpcomingEvents} from '../../reducers/orders'
import moment from 'moment'
import messages from './messages'
import {getUserDetails} from '../../reducers/user'

function action({store, route, intl}) {
  store.dispatch(setCurrentRouteName(route.name))
  store.dispatch(getUserDetails())
  store.dispatch(getOrders())
  store.dispatch(getEvents(moment()))
  store.dispatch(getUpcomingEvents())

  return {
    chunks: ['dashboard'],
    title: intl.formatMessage(messages.title),
    breadcrumbs: [
      {name: intl.formatMessage(messages.breadcrumb)},
    ],
    component: <Orders intl={intl}/>,
  }
}

export default action
