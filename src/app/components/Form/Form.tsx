import React from 'react';
import { Formik, Form as FormBase } from 'formik';
import { t } from '@lingui/macro';
import { Col, Row } from 'react-awesome-styled-grid';
import * as Yup from 'yup';
import Button from '../Button';
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import { StyledButtonWrapper } from './Form.styled';

type Props = {
  onSubmit: Function;
};

const initValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  consentAccepted: false,
  dealerAccepted: false
};

export default function Form(props: Props) {
  const { onSubmit } = props;

  const schema = Yup.object({
    firstName: Yup.string()
      .max(15, t`Must be 15 characters or less`)
      .required(t`Required`),
    lastName: Yup.string()
      .max(20, t`Must be 20 characters or less`)
      .required(t`Required`),
    email: Yup.string().email(t`Invalid email address`).required(t`Required`),
    phone: Yup.string().optional(),
    message: Yup.string().optional(),
    consentAccepted: Yup.boolean().required(t`Required`)
    .oneOf([true], t`You must consent to the processing of personal data.`),
    dealerAccepted: Yup.boolean().optional()
  });

  return (
    <Formik
      initialValues={initValues}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log('FORM SUBMIT');
        console.log(JSON.stringify(values, null, 2));
        onSubmit();
      }}
    >
      <FormBase>
        <FormInput
          id="firstName"
          type="text"
          name="firstName"
          placeholder={t`First Name`}
        />

        <FormInput
          id="lastName"
          type="text"
          name="lastName"
          placeholder={t`Last Name`}
        />

        <FormInput
          id="email"
          type="email"
          name="email"
          placeholder={t`Email Address`}
        />

        <FormInput
          id="phone"
          type="text"
          name="phone"
          placeholder={t`Phone`}
        />

        <FormTextarea
          id="message"
          name="message"
          placeholder={t`Message`}
          rows={5}
        />

        <FormCheckbox
          id="consentAccepted"
          name="consentAccepted"
          label={t`I consent to the processing of personal data.`}
        />

        <FormCheckbox
          id="dealerAccepted"
          name="dealerAccepted"
          type="checkbox"
          label={t`I want a Saffron dealer to contact me.`}
        />
        <Row>
          <Col>
            <StyledButtonWrapper />
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </FormBase>
    </Formik>
  );
}
