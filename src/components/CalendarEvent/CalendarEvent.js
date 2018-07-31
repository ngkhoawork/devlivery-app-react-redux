import React from 'react'
import {connect} from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './CalendarEvent.css'
import {EVENT_PURCHASE_FLOW} from '../../routes'
import moment from 'moment'
import LongArrowIcon from '../../static/long-right-arrow.svg'
import {DATE_FORMAT} from '../../constants'
import {setFlow} from '../../reducers/purchase'

const CalendarEvent = ({first_name, last_name, occasion, contact_specific_date, occasion_date, occasion_type, setFlow}) =>
  <a className={s.event} onClick={() => setFlow(EVENT_PURCHASE_FLOW)}>
    <div className={s.eventDate}>
      <div className={s.eventDay}>{moment(contact_specific_date || occasion_date, DATE_FORMAT).format('D')}</div>
      <div className={s.eventMonth}>{moment(contact_specific_date || occasion_date, DATE_FORMAT).format('MMMM')}</div>
    </div>
    <div className={s.eventDetails}>
      <div className={s.eventType}>{occasion} ({occasion_type})</div>
      <div className={s.eventName}>{first_name} {last_name}</div>
      <LongArrowIcon className={s.eventArrowIcon}/>
    </div>
  </a>

const mapState = state => ({
})

const mapDispatch = {
  setFlow,
}

export default connect(mapState, mapDispatch)(withStyles(s)(CalendarEvent))
