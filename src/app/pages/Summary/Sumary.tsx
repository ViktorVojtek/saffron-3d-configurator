import React from 'react';
import { useHistory } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { Container, Col, Row } from 'react-awesome-styled-grid';
import { useModal, useTakeScreeshot } from '../../hooks';
import ButtonClose from '../../components/Button/ButtonClose';
import Form from '../../components/Form';
import Hr from '../../components/styled/Hr';
import Summary from '../../components/Summary';
import { StyledButtonWrapper, StyledImg } from './Summary.styled';

export default function SummaryPage(): JSX.Element {
  const history = useHistory();
  const { screenshots, deleteScreenshots } = useTakeScreeshot();
  const { Modal, show } = useModal({ containerId: 'app-modal-root' });

  function handleGoBack(): void {
    const path = '/';

    deleteScreenshots();
    history.push(path);
  }

  return(
    <>
      <Container fluid>
        <Row justify="flex-end">
          <Col xs={1} align="flex-end">
            <StyledButtonWrapper>
              <ButtonClose onClick={handleGoBack} />
            </StyledButtonWrapper>
          </Col>
        </Row>
        <Row>
          <Col order={{ xs: 2, sm: 1, md: 1, lg: 1 }} align="center">
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
            <h2>
              <Trans>Summary</Trans>
            </h2>
            <Hr />
            <Summary />

            <Form onSubmit={show} />
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
