import React from 'react'
import {AppLayout} from '../../components'

async function action() {
  return {
    title: 'Not Found',
    status: 404,
    component: <AppLayout>Not Found</AppLayout>,
  }
}

export default action
