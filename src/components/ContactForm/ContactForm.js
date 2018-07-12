import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ContactForm.css'
import {Col, DatePicker, Input, Row, Select, Form} from 'antd'
import formMessages from '../../formMessages'
import {DATE_FORMAT} from '../../constants'
import messages from './messages'
import {injectIntl} from 'react-intl'
import Reminders from './Reminders'
import Groups from './Groups'
import moment from 'moment'

// TODO add accordion for sections
const AddressSection = ({getFieldDecorator, index, header, intl, initialValues}) =>
  <section className={s.section}>
    <h1 className={s.header}>{header}</h1>
    {initialValues && initialValues.addresses[index].id && getFieldDecorator(`addresses[${index}].id`, {
      initialValue: initialValues.addresses[index].id,
    })(
      <Input type='hidden'/>
    )}
    {getFieldDecorator(`addresses[${index}].title`, {
      initialValue: header,
    })(
      <Input type='hidden'/>
    )}
    <Form.Item>
      {getFieldDecorator(`addresses[${index}].address`, {
        initialValue: initialValues && initialValues.addresses[index].address,
      })(
        <Input placeholder={intl.formatMessage(messages.address)}/>
      )}
    </Form.Item>
    <Row gutter={20}>
      <Col xs={24} sm={12}>
        <Form.Item>
          {getFieldDecorator(`addresses[${index}].city`, {
            initialValue: initialValues && initialValues.addresses[index].city,
          })(
            <Input placeholder={intl.formatMessage(messages.city)}/>
          )}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item>
          {getFieldDecorator(`addresses[${index}].state`, {
            initialValue: initialValues && initialValues.addresses[index].state,
          })(
            <Input placeholder={intl.formatMessage(messages.state)}/>
          )}
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={20}>
      <Col xs={24} sm={12}>
        <Form.Item>
          {getFieldDecorator(`addresses[${index}].postal_code`, {
            initialValue: initialValues && initialValues.addresses[index].postal_code,
          })(
            <Input placeholder={intl.formatMessage(messages.postalCode)}/>
          )}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item>
          {getFieldDecorator(`addresses[${index}].country`, {
            initialValue: initialValues && initialValues.addresses[index].country,
          })(
            <Input placeholder={intl.formatMessage(messages.country)}/>
          )}
        </Form.Item>
      </Col>
    </Row>
  </section>

const SALUTATIONS = ['Mr.', 'Ms.', 'Mrs.', 'Dr.']

class ContactForm extends React.Component {
  render() {
    const {intl, children, header, initialValues} = this.props
    const {getFieldDecorator} = this.props.form

    const contactSection = (
      <section className={s.section}>
        {header && <h1 className={s.header}>{header}</h1>}
        <Form.Item>
          {getFieldDecorator('contact.title', {
            initialValue: initialValues && initialValues.title,
            rules: [
              {required: true, message: intl.formatMessage(formMessages.required)},
            ],
          })(
            <Select placeholder={intl.formatMessage(messages.salutation)}>
              {SALUTATIONS.map((item) =>
                <Select.Option key={item} value={item}>{item}</Select.Option>
              )}
            </Select>
          )}
        </Form.Item>
        <Row gutter={20}>
          <Col xs={24} sm={12}>
            <Form.Item>
              {getFieldDecorator('contact.first_name', {
                initialValue: initialValues && initialValues.first_name,
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required), whitespace: true},
                ],
              })(
                <Input placeholder={intl.formatMessage(messages.firstName)}/>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item>
              {getFieldDecorator('contact.last_name', {
                initialValue: initialValues && initialValues.last_name,
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required), whitespace: true},
                ],
              })(
                <Input placeholder={intl.formatMessage(messages.lastName)}/>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          {getFieldDecorator('contact.nickname', {
            initialValue: initialValues && initialValues.nickname,
            rules: [
              {required: true, message: intl.formatMessage(formMessages.required)},
            ],
          })(
            <Input placeholder={intl.formatMessage(messages.nickname)}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('contact.relationship', {
            initialValue: initialValues && initialValues.relationship,
            rules: [
              {required: true, message: intl.formatMessage(formMessages.required)},
            ],
          })(
            <Input placeholder={intl.formatMessage(messages.relationship)}/>
          )}
        </Form.Item>
      </section>
    )

    const birthdaySection = (
      <section className={s.section}>
        <h1 className={s.header}>{intl.formatMessage(messages.birthday)}</h1>
        <Form.Item>
          {getFieldDecorator('birthday', {
            initialValue: initialValues ? moment(initialValues.dob, DATE_FORMAT) : undefined,
            rules: [
              {required: true, message: intl.formatMessage(formMessages.required)},
            ],
          })(
            <DatePicker className={s.birthday} format={DATE_FORMAT}/>
          )}
        </Form.Item>
      </section>
    )

    const homeAddressSection = (
      <AddressSection
        header={intl.formatMessage(messages.homeAddress)}
        getFieldDecorator={getFieldDecorator}
        index={0}
        intl={intl}
        initialValues={initialValues}
      />
    )

    const companyAddressSection = (
      <AddressSection
        header={intl.formatMessage(messages.companyAddress)}
        getFieldDecorator={getFieldDecorator}
        index={1}
        intl={intl}
        initialValues={initialValues}
      />
    )

    const remindersSection = (
      <section className={s.section}>
        <h1 className={s.header}>{intl.formatMessage(messages.reminders)}</h1>
        <Reminders form={this.props.form} intl={intl} initialValues={initialValues}/>
      </section>
    )

    const groupsSection = (
      <section className={s.section}>
        <h1 className={s.header}>{intl.formatMessage(messages.groups)}</h1>
        <Groups form={this.props.form} intl={intl} initialValues={initialValues}/>
      </section>
    )

    return children({
      contactSection,
      birthdaySection,
      homeAddressSection,
      companyAddressSection,
      remindersSection,
      groupsSection,
    })
  }
}

export default injectIntl(withStyles(s)(ContactForm))