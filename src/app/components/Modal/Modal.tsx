import React, { ReactNode } from 'react';
import { Col, Row } from 'react-awesome-styled-grid';
import ButtonClose from '../Button/ButtonClose';
import {
  StyledBody, StyledContainer, StyledHead, StyledWrapper
} from './Modal.styled';

type Props = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  visible?: boolean;
}

export default function Modal(props: Props): JSX.Element | null {
  const { children, onClose, title, visible } = props;

  return (
    <StyledWrapper visible={visible} tabIndex={-1} onClick={onClose}>
      <StyledContainer>
        <StyledHead>
          <Row>
            <Col>&nbsp;</Col>
            {title && (
              <Col>{title}</Col>
            )}
            <Col align="flex-end">
              <ButtonClose onClick={onClose} />
            </Col>
          </Row>
        </StyledHead>
        <StyledBody>
          {children}
        </StyledBody>
      </StyledContainer>
    </StyledWrapper>
  );
}

Modal.defaultProps = {
  title: undefined,
  visible: false
};
