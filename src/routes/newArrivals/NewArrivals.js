import React from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './NewArrivals.css'
import messages from './messages'
import { Button, Carousel, Col, Input, Row, Modal } from 'antd'
import { Card, Link, CardDetails, GiftDetails } from '../../components'
import debounce from 'lodash/debounce'
import { CARD_IMAGES_PROP, DEFAULT_DEBOUNCE_TIME, FOOD_TYPE, GIFT_IMAGES_PROP, NON_FOOD_TYPE, GIFT_GALLERY_PROP } from '../../constants'
import { getCards, getGifts } from '../../reducers/newArrivals'
import ArrowIcon from '../../static/decor_arrow.svg'
import { PURCHASE1_ROUTE } from '../'
import PlusIcon from '../../static/plus.svg'
import { setFlowFromSelectGift, setFlowFromSelectCard } from '../../reducers/purchase';

const FOOD_GIFTS_INDEX = 0
const NON_FOOD_GIFTS_INDEX = 1
const CARDS_INDEX = 2

class NewArrivals extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initLoad: false,
      search: undefined,
      slideIndex: 0,
      slideMap: [
        { key: FOOD_GIFTS_INDEX, callback: this.renderFoodSliderView.bind(this) },
        { key: NON_FOOD_GIFTS_INDEX, callback: this.renderNonFoodSliderView.bind(this) },
        { key: CARDS_INDEX, callback: this.renderCardSliderView.bind(this) },
      ],
      showGiftDetails: false,
      giftDetails: null,
      showCardDetails: false,
      cardDetails: null
    }

    this.getCards = debounce(this.props.getCards, DEFAULT_DEBOUNCE_TIME)
    this.getGifts = debounce(this.props.getGifts, DEFAULT_DEBOUNCE_TIME)
  }
  componentWillReceiveProps(nextProps) {
    const { loading, foods, nonfoods, cards } = nextProps
    if (!loading.foods && !loading.nonfoods && !loading.cards && !this.state.initLoad) {
      let slideMap = [];
      if (foods.length > 0)
        slideMap.push({ key: FOOD_GIFTS_INDEX, callback: this.renderFoodSliderView.bind(this) });

      if (nonfoods.length > 0)
        slideMap.push({ key: NON_FOOD_GIFTS_INDEX, callback: this.renderNonFoodSliderView.bind(this) });

      if (cards.length > 0)
        slideMap.push({ key: CARDS_INDEX, callback: this.renderCardSliderView.bind(this) });

      this.setState({ initLoad: true, slideMap, slideIndex: 0 });
    }
  }
  changeSearch = (e) => {
    const { slideIndex } = this.state
    const search = e.target.value
    this.setState({ search })
    if (slideIndex === FOOD_GIFTS_INDEX) {
      this.getGifts({ search, giftType: FOOD_TYPE })
    } else if (slideIndex === NON_FOOD_GIFTS_INDEX) {
      this.getGifts({ search, giftType: NON_FOOD_TYPE })
    } else if (slideIndex === CARDS_INDEX) {
      this.getCards({ search })
    }
  }

  changeSlideIndex = (slideIndex) => {

    const { slideMap } = this.state;
    const keyIndex = slideMap[slideIndex].key;
    this.setState({ slideIndex })

    if (keyIndex === FOOD_GIFTS_INDEX) {
      this.getGifts({ giftType: FOOD_TYPE })
    } else if (keyIndex === NON_FOOD_GIFTS_INDEX) {
      this.getGifts({ giftType: NON_FOOD_TYPE })
    } else if (keyIndex === CARDS_INDEX) {
      this.getCards()
    }
  }
  renderFoodSliderView() {
    const { search, slideIndex } = this.state
    const { intl, cards, loading, gifts } = this.props
    return (
      <div key='food'>
        <div style={{ backgroundImage: `url(${require('../../static/slider_bg.jpg')})` }}
          className={s.carouselItem}>
          <h1 className={s.header}>{'Fresh Tulips Arrival'}</h1>
          <Link to={PURCHASE1_ROUTE}>
            <Button type='primary'>{intl.formatMessage(messages.shopnow)}</Button>
          </Link>
        </div>
      </div>
    );
  }
  renderNonFoodSliderView() {
    const { intl, cards, loading, gifts } = this.props
    return (
      <div key='nonfood'>
        <div style={{ backgroundImage: `url(${require('../../static/slider_bg.jpg')})` }}
          className={s.carouselItem}>
          <h1 className={s.header}>{'Fresh Tulips Arrival'}</h1>
          <Link to={PURCHASE1_ROUTE}>
            <Button type='primary'>{intl.formatMessage(messages.shopnow)}</Button>
          </Link>
        </div>
      </div>
    );
  }
  renderCardSliderView() {
    const { intl, cards, loading, gifts } = this.props
    return (
      <div key='card'>
        <div style={{ backgroundImage: `url(${require('../../static/slider_bg.jpg')})` }}
          className={s.carouselItem}>
          <h1 className={s.header}>{'Fresh Tulips Arrival'}</h1>
          <Link to={PURCHASE1_ROUTE}>
            <Button type='primary'>{intl.formatMessage(messages.shopnow)}</Button>
          </Link>
        </div>
      </div>
    );
  }
  render() {
    const { search, slideIndex, slideMap, giftDetails, cardDetails } = this.state
    const { intl, foods, nonfoods, cards, loading, setFlowFromSelectGift, setFlowFromSelectCard, occasions } = this.props

    const slideKey = slideMap[slideIndex] && slideMap[slideIndex].key ? slideMap[slideIndex].key : 0;
    const gifts = slideKey === FOOD_GIFTS_INDEX ? foods : nonfoods;
    var occasionByCardId = null;
    if (cardDetails && occasions)
      occasionByCardId = occasions.filter(item => item.id === cardDetails.occasion_id);

    // TODO add setFlow on PURCHASE1_ROUTE link
    return (
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.carousel}>
            <a className={s.leftBtn} onClick={() => this.carousel.prev()}>
              <ArrowIcon className={s.leftArrow} />
            </a>
            <a className={s.rightBtn} onClick={() => this.carousel.next()}>
              <ArrowIcon className={s.rightArrow} />
            </a>
            <Carousel
              ref={ref => this.carousel = ref}
              loop
              customPaging={() => <div />}
              afterChange={(index) => this.changeSlideIndex(index)}
            >
              {slideMap.map(item => item.callback())}
            </Carousel>
          </div>
          <Input.Search
            className={s.search}
            placeholder={intl.formatMessage(messages.search)}
            value={search}
            onChange={this.changeSearch}
          />
          {slideKey === CARDS_INDEX ? (
            !!cards.length ? (
              <Row gutter={20} type='flex'>
                {cards.map((item) =>
                  <Col key={item.id} xs={24} sm={12} md={8} lg={6} className={s.itemWrapper}>
                    <Card
                      item={item}
                      imagesProp={CARD_IMAGES_PROP}
                      title={
                        <React.Fragment>
                          {item.title}
                          <br />
                          <span className={s.price}>
                            {item.price_with_tax}
                            <span className={s.currency}>{item.currency}</span>
                          </span>
                        </React.Fragment>
                      }
                      bordered={false}
                      description={item.description}
                      onClick={() => {
                        this.setState({ showCardDetails: true, cardDetails: item });
                      }}
                    />
                  </Col>
                )}
              </Row>
            ) : !loading.cards ? (
              <div className={s.noData}>{intl.formatMessage(messages.noData)}</div>
            ) : null
          ) : (
              !!gifts.length ? (
                <Row gutter={20} type='flex'>
                  {gifts.map((item) =>
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6} className={s.itemWrapper}>
                      <Card
                        item={item}
                        imagesProp={GIFT_IMAGES_PROP}
                        title={
                          <React.Fragment>
                            {item.title}
                            <br />
                            <span className={s.price}>
                              {item.price_with_tax}
                              <span className={s.currency}>{item.currency}</span>
                            </span>
                          </React.Fragment>
                        }
                        bordered={false}
                        description={intl.locale === 'de-DE' ? item.short_description_german : item.short_description}
                        onClick={() => {
                          this.setState({ showGiftDetails: true, giftDetails: item });
                        }}
                      />
                    </Col>
                  )}
                </Row>
              ) : !loading.gifts ? (
                <div className={s.noData}>{intl.formatMessage(messages.noData)}</div>
              ) : null
            )
          }
        </div>
        {
          this.state.showGiftDetails && giftDetails &&
          <GiftDetails
            intl={intl}
            giftDetails={giftDetails}
            visible={this.state.showGiftDetails}
            setVisible={(visible) => this.setState({ showGiftDetails: visible })}
            makeorder={(giftDetails) => setFlowFromSelectGift(giftDetails)}
          />
        }
        {
          this.state.showCardDetails && cardDetails &&
          <CardDetails
            intl={intl}
            cardDetails={cardDetails}
            occasionTitle={occasionByCardId && occasionByCardId.length > 0 && occasionByCardId[0].title}
            visible={this.state.showCardDetails}
            setVisible={(visible) => this.setState({ showCardDetails: visible })}
            makeorder={(cardDetails) => setFlowFromSelectCard(cardDetails)}
          />
        }
      </div>
    )
  }
}

const mapState = state => ({
  ...state.newArrivals,
  occasions: state.cards.occasions
})

const mapDispatch = {
  getCards,
  getGifts,
  setFlowFromSelectGift,
  setFlowFromSelectCard
}

export default connect(mapState, mapDispatch)(withStyles(s)(NewArrivals))
