import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ColumnsMapping.css'
import { PurchaseActions, ColumnsMappingForm, SectionHeader, UploadedContacts } from '../../components'
import KeyHandler, { KEYPRESS } from 'react-key-handler'
import messages from './messages'
import { injectIntl } from 'react-intl'
import { importContacts, openUploadedContactsModal } from '../../reducers/contacts'
import { nextFlowStep, GROUP_ID_KEY, CONTACT_IDS_KEY, gotoConfirm } from '../../reducers/purchase'

class ColumnsMapping extends React.Component {
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  handleSubmit = () => {
    //e.preventDefault()
    this.columnsMappingForm.validateFields((err, values) => {
      if (!err) {
        this.props.importContacts(values, (newrecipient) => {
          localStorage.removeItem(GROUP_ID_KEY)
          localStorage.setItem(CONTACT_IDS_KEY, JSON.stringify(newrecipient))
          if (newrecipient) {
            if (this.props.recipientMode)
              this.props.gotoConfirm();
            else this.props.nextFlowStep()
          }
          else this.props.refreshPage();
        })
        return true;
      }
      return false;
    })
    return false;
  }

  render() {
    const { flowIndex, intl, uploadedContactsModalOpened, openUploadedContactsModal } = this.props

    return (
      <React.Fragment>
        <div className={s.content}>
          <SectionHeader
            className={s.header}
            header={intl.formatMessage(messages.header)}
            number={flowIndex + 1}
            prefixClassName={s.headerPrefix}
          >
            <Button
              onClick={openUploadedContactsModal}
              type='primary'
              ghost
            >
              {intl.formatMessage(messages.selectContacts)}
            </Button>
          </SectionHeader>
          <ColumnsMappingForm
            className={s.columnsMappingForm}
            ref={ref => this.columnsMappingForm = ref}
            onSubmit={this.handleSubmit}
          />
        </div>
        <PurchaseActions>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyCode={13}
            onKeyHandle={this.handleSubmit}
          />
          <Button
            onClick={this.handleSubmit}
            type='primary'
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </PurchaseActions>
        {uploadedContactsModalOpened && <UploadedContacts />}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  recipientMode: state.purchase.recipientMode,
  flowIndex: state.purchase.flowIndex,
  mappingColumns: state.contacts.mappingColumns,
  uploadedContactsModalOpened: state.contacts.uploadedContactsModalOpened,
})

const mapDispatch = {
  openUploadedContactsModal,
  importContacts,
  nextFlowStep,
  gotoConfirm
}

export default injectIntl(connect(mapState, mapDispatch)(withStyles(s)(ColumnsMapping)))
