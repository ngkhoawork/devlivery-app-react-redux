import React from 'react'
import {connect} from 'react-redux'
import {setOccasion, submitOccasion} from '../../reducers/purchase'
import {Button, Col, Row} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Purchase1.css'
import {Actions, Card, SectionHeader} from '../../components'
import {ALPHABET} from '../../constants'
import KeyHandler, {KEYPRESS} from 'react-key-handler'

class Purchase1 extends React.Component {
  render() {
    const {occasions, occasion, setOccasion, submitOccasion} = this.props
    return (
      <React.Fragment>
        <div className={s.content}>
          <SectionHeader
            header={'Select Occasion'}
            number={1}
            prefixClassName={s.headerPrefix}
          />
          <Row className={s.items} gutter={20} type='flex' align='center'>
            {occasions.map((item, i) =>
              <Col key={item.id} className={s.itemWrapper}>
                <Card
                  className={s.item}
                  title={item.title}
                  image={item.image.url}
                  onClick={() => setOccasion(item.id)}
                  active={item.id === occasion}
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
            onKeyHandle={submitOccasion}
          />
          <Button
            type='primary'
            className={s.submitBtn}
            disabled={!occasion}
            onClick={submitOccasion}
          >
            Submit
          </Button>
        </Actions>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  occasions: state.purchase.occasions,
  occasion: state.purchase.occasion,
  loading: state.purchase.loading,
})

const mapDispatch = {
  setOccasion,
  submitOccasion,
}

export default connect(mapState, mapDispatch)(withStyles(s)(Purchase1))
