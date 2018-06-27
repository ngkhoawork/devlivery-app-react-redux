import React from 'react'
import {connect} from 'react-redux'
import {setCardStyle, submitCardStyle} from '../../reducers/purchase'
import {Button, Col, Row} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Purchase3.css'
import {Actions, Card, SectionHeader} from '../../components'
import {ALPHABET} from '../../constants'
import KeyHandler, {KEYPRESS} from 'react-key-handler'
import messages from './messages'

class Purchase3 extends React.Component {
  render() {
    const {cardStyle, setCardStyle, submitCardStyle, cardStyles, intl, flowIndex} = this.props
    return (
      <React.Fragment>
        <div className={s.content}>
          <SectionHeader
            header={intl.formatMessage(messages.header)}
            number={flowIndex}
            prefixClassName={s.headerPrefix}
          />
          <Row className={s.items} gutter={20} type='flex' align='center'>
            {cardStyles.map((item, i) =>
              <Col key={item.title} className={s.itemWrapper}>
                <Card
                  className={s.item}
                  title={item.title}
                  image={item.image.url}
                  onClick={() => setCardStyle(item.title)}
                  active={item.title === cardStyle}
                  keyValue={ALPHABET[i]}
                />
              </Col>
            )}
          </Row>
        </div>
        <Actions>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyCode={13}
            onKeyHandle={submitCardStyle}
          />
          <Button
            type='primary'
            disabled={!cardStyle}
            onClick={submitCardStyle}
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </Actions>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cardStyles: state.purchase.cardStyles,
  cardStyle: state.purchase.cardStyle,
  loading: state.purchase.loading,
})

const mapDispatch = {
  setCardStyle,
  submitCardStyle,
}

export default connect(mapState, mapDispatch)(withStyles(s)(Purchase3))
