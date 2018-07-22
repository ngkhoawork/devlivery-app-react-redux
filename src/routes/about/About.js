import React from 'react'
import {connect} from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './About.css'
import DecorTopElement from '../../static/decor_element_top.svg'
import PlusCircleIcon from '../../static/plus-circle.svg'
import {Button, Carousel, Col, Input, Row} from 'antd'
import DownArrow from '../../static/down_arrow.svg'
import ChooseItImage from '../../static/choose_it.svg'
import personalizeItImage from '../../static/personalize_it.png'
import sendItImage from '../../static/send_it.png'
import AboutUsIcon from '../../static/decor_about.svg'
import {animateScroll} from 'react-scroll'
import {AUTH_PURCHASE_ROUTES, PURCHASE1_ROUTE} from '../'
import {Link} from '../../components'
import messages from './messages'
import {setFlow} from '../../reducers/purchase'

class About extends React.Component {
  render() {
    const {intl} = this.props
    return (
      <React.Fragment>
        <div className={s.bannerSectionWrapper}>
          <div className={s.bannerSection}>
            <img src={require('../../static/banner_img.jpg')} className={s.sectionImage}/>
          </div>
        </div>
        <section className={s.aboutUsSectionWrapper}>
          <div className={s.aboutUsSection}>
            <Row gutter={40} type='flex'>
              <Col xs={24} sm={12}>
                <div className={s.aboutUsContent}>
                  <h3 className={s.aboutUsHeader}>{intl.formatMessage(messages.about)}</h3>
                  <p>
                    {intl.formatMessage(messages.aboutDescription)}
                  </p>
                </div>
                <div>
                  <img src={require('../../static/hands_wrapping_gift.jpg')} className={s.sectionImage}/>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div>
                  <img src={require('../../static/girl_wrapping_gift.jpg')} className={s.sectionImage}/>
                </div>
              </Col>
            </Row>
            <Row gutter={40} type='flex'>
              <Col xs={24} sm={12}>
                <div>
                  <p className={s.feedback}>
                    “ Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown y of type and scrambled it to make a type specimen book. ”
                    <br/>
                    <b>- Adam Smith</b>
                  </p>
                  <p className={s.info}>
                    {intl.formatMessage(messages.aboutDescription)}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div>
                  <img src={require('../../static/paper.jpg')} className={s.sectionImage}/>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <div>
          <img src={require('../../static/bottom_bg.jpg')} className={s.sectionImage}/>
        </div>
        <section className={s.signUpSection}>
          <h3 className={s.signUpHeader}>
            {intl.formatMessage(messages.signUp)}
          </h3>
          <div className={s.signUpInputWrapper}>
            <Input type='text' placeholder={intl.formatMessage(messages.email)} className={s.signUpInput}/>
            <Button type='primary' className={s.signUpBtn}>{intl.formatMessage(messages.submit)}</Button>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapState = state => ({})

const mapDispatch = {
}

export default connect(mapState, mapDispatch)(withStyles(s)(About))