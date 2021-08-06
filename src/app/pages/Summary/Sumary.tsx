import React from 'react';
import { useHistory } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { Container, Col, Row } from 'react-awesome-styled-grid';
import { useLocale, useModal, useTakeScreeshot, useStore } from '../../hooks';
import Button from '../../components/Button';
import ButtonClose from '../../components/Button/ButtonClose';
import Form, { FormDataItem } from '../../components/Form';
import Hr from '../../components/styled/Hr';
import Input from '../../components/Input';
import Text from '../../components/styled/Text';
import { StyledImg } from './Summary.styled';
import * as data from '../../../assets/data.json';

type FormData = {
  name: FormDataItem;
  surname: FormDataItem;
  email: FormDataItem;
  phone: FormDataItem;
  message: FormDataItem;
  consentAccepted: boolean;
  dealerAccepted: boolean;
}

const formData: FormData = {
  name: {
    value: '',
    error: false
  },
  surname: {
    value: '',
    error: false
  },
  email: {
    value: '',
    error: false
  },
  phone: {
    value: '',
    error: false
  },
  message: {
    value: '',
    error: false
  },
  consentAccepted: false,
  dealerAccepted: false
};

export default function Summary(): JSX.Element {
  const history = useHistory();
  const locale = useLocale();
  const { screenshots, deleteScreenshots } = useTakeScreeshot();
  const { Modal, show } = useModal({ containerId: 'app-modal-root' });
  const [state] = useStore();

  function handleSubmit(): void {
    console.log('Submit Summary!');
    show();
  }

  function handleGoBack(): void {
    const path = '/';

    deleteScreenshots();
    history.push(path);
  }

  const { bedIdx, headIdx, legIdx, legMatIdx, matIdx, tuftIdx } = state;

  return(
    <>
      <Container fluid>
        <Row justify="flex-end">
          <Col xs={1} align="flex-end">
            <ButtonClose onClick={handleGoBack} />
          </Col>
        </Row>
        <Row>
          <Col order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
            {screenshots && screenshots.length > 0 && (
              screenshots.map((item, i) => (
                <StyledImg
                  src={item}
                  alt={t`Configured bed`}
                  key={`img-${i+1}-${new Date().getTime()}`}
                />
              ))
            )}
          </Col>
          <Col order={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <Form onSubmit={handleSubmit} initData={formData}>
              <Row>
                <Col>
                  <>
                    <h2>
                      <Trans>Summary</Trans>
                    </h2>
                    <Hr />
                    <h3>
                      <Trans>Ordered Product</Trans>
                    </h3>
                    <Text>
                      <Trans>Bed type: {data?.bed[bedIdx].title}</Trans>
                    </Text>
                    <Text>
                      <Trans>Bed material type: {data?.textures.thumbnail.material[matIdx].title}</Trans>
                    </Text>
                    <Text>
                      <Trans>Head type: {data?.head[headIdx as number || 0].title}</Trans>
                    </Text>
                    <Text>
                      <Trans>Stitching color type: {data?.textures.thumbnail.tuft[tuftIdx].title}</Trans>
                    </Text>
                    <Text>
                      <Trans>Leg type: {data?.leg[legIdx].title}</Trans>
                    </Text>
                    <Text>
                      <Trans>Leg material type: {data?.textures.thumbnail.leg[legMatIdx].title[locale]}</Trans>
                    </Text>
                  </>
                  <Row>
                    <Col>
                      <Hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Input
                        name="name"
                        errorMessage={t`Fill in your name`}
                        placeholder={t`Fill in your name`}
                      />
                      <Input
                        name="surname"
                        errorMessage={t`Fill in your surname`}
                        placeholder={t`Fill in your surname`}
                      />
                      <Input
                        name="email"
                        errorMessage={t`Fill in your email`}
                        placeholder={t`Fill in your email`}
                      />
                      <Input
                        name="phone"
                        placeholder={t`Fill in your phone number`}
                      />
                      <Input
                        name="message"
                        placeholder={t`Fill in your message`}
                        multiline
                        rows={5}
                      />
                      {/*
                      <Checkbox
                        name="consentAccepted"
                        label={<Trans>I consent to the processing of personal data.</Trans>}
                      />
                      <Checkbox
                        name="dealerAccepted"
                        label={<Trans>I want a Saffron dealer to contact me.</Trans>}
                      /> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Button type="submit">
                    <Trans>Send summary</Trans>
                  </Button>
                </Col>
              </Row>  
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal>
        <p>
          <Trans>Your data has been sucessfully send.</Trans>
        </p>
      </Modal>
    </>
  );
}
