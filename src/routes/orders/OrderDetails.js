import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './OrderDetails.css'
import {Col, Modal, Row, Table} from 'antd'
import {connect} from 'react-redux'
import {closeOrderDetailsModal} from '../../reducers/orders'
import messages from './messages'

const CARD_TYPE = 'card'
const GIFT_TYPE = 'gift'
// TODO add info in table for voucher and donation
const VOUCHER_TYPE = 'voucher'
const DONATION_TYPE = 'donation'

class OrderDetails extends React.Component {
  render() {
    const {closeOrderDetailsModal, orderDetails, intl} = this.props

    const columns = [
      {
        title: intl.formatMessage(messages.productColumn),
        dataIndex: '',
        key: 'title',
        className: s.productColumn,
        render: (item) => {
          switch (item.productType) {
            case CARD_TYPE:
              return (
                <div className={s.product}>
                  <div>
                    <img src={item.images[0] && item.images[0].url} className={s.productImage}/>
                  </div>
                  <div className={s.title}>{item.title}</div>
                </div>
              )
            case GIFT_TYPE:
              return (
                <div className={s.product}>
                  <div>
                    <img src={item.image[0] && item.image[0].url} className={s.productImage}/>
                  </div>
                  <div className={s.title}>{item.title}</div>
                </div>
              )
            default:
              return null
          }
        }
      },
      {
        title: intl.formatMessage(messages.quantityColumn),
        dataIndex: '',
        key: 'quantity',
        className: s.quantityColumn,
        render: (item) => {
          let quantity = null

          if (item.productType === CARD_TYPE) {
            quantity = 1
          } else if (item.productType === GIFT_TYPE) {
            quantity = item.quantity
          }

          return (
           <div>{quantity}</div>
          )
        }
      },
      {
        title: intl.formatMessage(messages.priceColumn),
        dataIndex: '',
        key: 'price',
        className: s.priceColumn,
        render: (item) => {
          return (
            <React.Fragment>
              {item.price}
              <span className={s.currency}>{item.currency}</span>
            </React.Fragment>
          )
        }
      },
    ]

    // TODO add shipping price/info
    return (
      <Modal
        visible
        title={intl.formatMessage(messages.orderDetailsHeader)}
        onOk={closeOrderDetailsModal}
        onCancel={closeOrderDetailsModal}
        width={900}
        footer={null}
      >
        {orderDetails ? (
          <React.Fragment>
            <div className={s.headerWrapper}>
              <h1 className={s.header}>{`#${orderDetails.order_number}`}</h1>
              <div className={s.date}>{orderDetails.created_at}</div>
            </div>
            <Row type='flex' gutter={20}>
              <Col xs={24} sm={16}>
                <Table
                  columns={columns}
                  dataSource={[
                    {
                      ...orderDetails.items.card,
                      productType: CARD_TYPE
                    },
                    ...orderDetails.items.gifts.map(item => ({
                      ...item.gift,
                      quantity: item.quantity,
                      productType: GIFT_TYPE
                    })),
                  ]}
                  rowKey={record => record.id}
                  pagination={false}
                />
              </Col>
              <Col xs={24} sm={8}>
                <section className={s.summary}>
                  <header className={s.summaryHeader}>
                    {intl.formatMessage(messages.summary)}
                  </header>
                  <div className={s.summaryContent}>
                    <Row type='flex' justify='space-between' className={s.summaryRow}>
                      <Col>{intl.formatMessage(messages.summarySubtotal)}</Col>
                      <Col>
                        {orderDetails.subtotal}
                        <span className={s.currency}>{'CHF'}</span>
                      </Col>
                    </Row>
                    <Row type='flex' justify='space-between' className={s.summaryRow}>
                      <Col>{intl.formatMessage(messages.summaryTaxes)}</Col>
                      <Col>
                        {(orderDetails.total - orderDetails.subtotal).toFixed(2)}
                        <span className={s.currency}>{'CHF'}</span>
                      </Col>
                    </Row>
                    <Row type='flex' justify='space-between' className={s.summaryRow}>
                      <Col>{intl.formatMessage(messages.summaryShipping)}</Col>
                      <Col>
                        {'0.00'}
                        <span className={s.currency}>{'CHF'}</span>
                      </Col>
                    </Row>
                  </div>
                  <footer className={s.summaryFooter}>
                    <div>{intl.formatMessage(messages.summaryTotal)}</div>
                    <div>
                      {orderDetails.total}
                      <span className={s.currency}>{'CHF'}</span>
                    </div>
                  </footer>
                </section>
                <section>
                  <h3>Shipping details</h3>
                  {orderDetails.recipients && orderDetails.recipients.map((recipient) => (
                    <div className={s.shippingDetails}>
                      <span>{recipient.contact.title}</span><br/>
                      <span>{recipient.contact.first_name + ' ' + recipient.contact.last_name}</span><br/>
                      <span>{recipient.receiving_address.address}</span><br/>
                      <span>{recipient.receiving_address.postal_code + ' ' + recipient.receiving_address.city}</span><br/>
                      <span>{recipient.receiving_address.country}</span><br/>
                    </div>
                  ))}
                </section>
              </Col>
            </Row>
          </React.Fragment>
        ) : null}
      </Modal>
    )
  }
}

const mapState = state => ({
  orderDetails: state.orders.orderDetails,
})

const mapDispatch = {
  closeOrderDetailsModal,
}

export default connect(mapState, mapDispatch)(withStyles(s)(OrderDetails))
