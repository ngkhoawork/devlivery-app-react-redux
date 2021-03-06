import React from 'react'
import { connect } from 'react-redux'
import { ADDCONTACTMODE, ADD_CONTACT_MANUALLY, IMPORT_CONTACTS, SELECT_CONTACTS, SELECT_GROUPS, nextFlowStep, getRecipientMode } from '../../reducers/purchase'
import { Button, Col, Row, Spin, Icon } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Purchase10.css'
import { Card, PurchaseActions, SectionHeader } from '../../components'
import AddContactManuallyIcon from '../../static/add_contacts_manually.svg'
import ImportContactsIcon from '../../static/import_contacts.svg'
import SelectContactsIcon from '../../static/select_contact.svg'
import SelectGroupsIcon from '../../static/select_group.svg'
import ImportContacts from './ImportContacts'
import AddContact from './AddContact'
import messages from './messages'
import Contacts from '../../routes/contacts_mulitple/Contacts';
import ContactGroups from '../../routes/contactGroups/ContactGroups';
import { getContactsByName } from '../../reducers/contacts'
import { getContactGroups } from '../../reducers/contactGroups'
import KeyHandler, { KEYPRESS } from 'react-key-handler'
import { message } from 'antd'
import { getContacts,clearMapColums } from '../../reducers/contacts'
import localStorage from 'localStorage';


class Purchase10 extends React.Component {
  state = {
    addingContactMode: null,
    selectMode: false,
    disableButton: false,
    init_localStore: false
  }
  constructor(props) {
    super(props);
    this.setDisableButton = this.setDisableButton.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.ref_addcontact = React.createRef();
    this.ref_contacts = React.createRef();
    this.ref_importcontact = React.createRef();
  }
  componentWillMount() {
    this.props.getRecipientMode();
    this.loadLocalStorage();
  }
  async loadLocalStorage() {
    var addingContactMode = await localStorage.getItem(ADDCONTACTMODE);
    this.setState({ addingContactMode,selectMode: addingContactMode ? true:false, init_localStore:true });
  }
  setAddingContactsMode = (addingContactMode) => {
    localStorage.setItem(ADDCONTACTMODE, addingContactMode)
    this.setState({ addingContactMode, selectMode:true })
    this.props.clearMapColums();
  }

  setDisableButton(disableButton) {
    this.setState({ disableButton });
  }
  refreshPage() {
    this.setState({
      disableButton: false,
      addingContactMode: null,
      selectMode: false
    })
    this.props.getContactGroups();
    this.props.getContacts();
  }
  onSubmit() {
    if(!this.state.selectMode)
      return;
    const { addingContactMode } = this.state;
    
    if (addingContactMode === ADD_CONTACT_MANUALLY) {
      if (this.ref_addcontact) {
        this.setState({ disableButton: true });
        if (!this.ref_addcontact.handleSubmit()) {
          this.setState({ disableButton: false });
        }
        else localStorage.removeItem(ADDCONTACTMODE);
    
      }
      return;
    }
    if (addingContactMode === IMPORT_CONTACTS && this.ref_importcontact) {
      if (this.ref_importcontact.props.mappingColumns) {
        if (this.ref_importcontact) {
          this.setState({ disableButton: true });
          if (!this.ref_importcontact.handleSubmit()) {
            this.setState({ disableButton: false });
          }
          else localStorage.removeItem(ADDCONTACTMODE);
    
        }
      }
      else {
        message.error(this.props.intl.formatMessage(messages.msg_uploadcontact));
      }
      return;
    }
    if (this.ref_contacts) {
      this.setState({ disableButton: true });
      if (!this.ref_contacts.handleSubmit()) {
        this.setState({ disableButton: false });
      }
      else localStorage.removeItem(ADDCONTACTMODE);
    }
  }

  render() {
    const { addingContactMode, disableButton, selectMode } = this.state
    const { flowIndex, intl, contactGroups, contacts } = this.props
    if(!this.state.init_localStore)
      return (
      <div className={s.loadingScreen}>
        <Spin
          wrapperClassName='action-spin'
          indicator={<Icon style={{ fontSize: '16px' }} spin type='loading' />}
          spinning={!this.state.init_localStore}
        />
      </div>);
    return (
      <React.Fragment>
        {selectMode && addingContactMode === ADD_CONTACT_MANUALLY ? (
          <AddContact intl={intl} onRef={ref => (this.ref_addcontact = ref)} />
        ) : selectMode && addingContactMode === IMPORT_CONTACTS ? (
          <ImportContacts intl={intl} onRef={ref => (this.ref_importcontact = ref)} refreshPage={this.refreshPage} />
        ) : selectMode && (addingContactMode === SELECT_CONTACTS || addingContactMode === SELECT_GROUPS) ? (
          <Contacts
            mode={addingContactMode}
            headerTitle={intl.formatMessage(addingContactMode === SELECT_CONTACTS ? messages.selectContacts : messages.selectGroups)}
            {...this.props}
            onRef={ref => (this.ref_contacts = ref)}
            setDisableButton={this.setDisableButton}
          />
        ) : (
                <React.Fragment>
                  <div className={s.content}>
                    <SectionHeader
                      header={intl.formatMessage(messages.header)}
                      number={flowIndex + 1}
                      prefixClassName={s.headerPrefix}
                    />
                    <Row className={s.items} gutter={20} type='flex' align='center'>
                      <Col className={s.itemWrapper} md={6}>
                        <Card
                          className={s.item}
                          title={intl.formatMessage(messages.addContactManually)}
                          onClick={() => this.setAddingContactsMode(ADD_CONTACT_MANUALLY)}
                          active={addingContactMode === ADD_CONTACT_MANUALLY}
                          keyValue='a'
                          svg={AddContactManuallyIcon}
                        />
                      </Col>
                      <Col className={s.itemWrapper} md={6}>
                        <Card
                          className={s.item}
                          title={intl.formatMessage(messages.importContacts)}
                          onClick={() => this.setAddingContactsMode(IMPORT_CONTACTS)}
                          active={addingContactMode === IMPORT_CONTACTS}
                          keyValue='b'
                          svg={ImportContactsIcon}
                        />
                      </Col>
                      <Col className={s.itemWrapper} md={6}>
                        <Card
                          className={s.item}
                          title={intl.formatMessage(messages.selectContacts)}
                          onClick={() => this.setAddingContactsMode(SELECT_CONTACTS)}
                          active={addingContactMode === SELECT_CONTACTS}
                          keyValue='c'
                          svg={SelectContactsIcon}
                          disabled={contacts && contacts.length > 0 ? false : true}
                        />
                      </Col>
                      <Col className={s.itemWrapper} md={6}>
                        <Card
                          className={s.item}
                          title={intl.formatMessage(messages.selectGroups)}
                          onClick={() => this.setAddingContactsMode(SELECT_GROUPS)}
                          active={addingContactMode === SELECT_GROUPS}
                          keyValue='d'
                          svg={SelectGroupsIcon}
                          disabled={contactGroups && contactGroups.length > 0 ? false : true}
                        />
                      </Col>
                    </Row>
                  </div>
                </React.Fragment>
              )}
          <PurchaseActions>
            {
              this.state.selectMode &&
              <div>
                <KeyHandler
                  keyEventName={KEYPRESS}
                  keyCode={13}
                  onKeyHandle={() => this.onSubmit()}
                />
                <Button
                  type='primary'
                  disabled={disableButton}
                  onClick={() => this.onSubmit()}
                >
                  {intl.formatMessage(messages.submit)}
                </Button>
              </div>
            }
          </PurchaseActions>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  flowIndex: state.purchase.flowIndex,
  contactGroups: state.contactGroups.contactGroups,
  contacts: state.contacts.contacts
})

const mapDispatch = { getContactsByName, getContactGroups, nextFlowStep, getContacts, getRecipientMode,clearMapColums }

export default connect(mapState, mapDispatch)(withStyles(s)(Purchase10))
