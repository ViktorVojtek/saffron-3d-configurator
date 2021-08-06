import React, { useCallback } from 'react';
import usePortal from 'react-cool-portal';
import ModalBase from '../components/Modal';

export default function useModal(options = {}) {
  const { Portal, hide, isShow, ...rest } = usePortal({
    ...options,
    defaultShow: false,
    internalShowHide: false,
  });

  const Modal = useCallback(
    ({ children }) => (
      <Portal>
        <ModalBase onClose={hide} visible={isShow}>
          {children}
        </ModalBase>
      </Portal>
    ), [isShow]);

  return { Modal, isShow, ...rest };
}
