import { Modal, ModalProps } from 'antd';
import React, { useState } from 'react';
import ButtonPrimary from '../../atom/Button/ButtonPrimary';
import { styled } from 'styled-components';
import { useShowModal } from './hooks/useShowModal';

interface Props extends ModalProps {
  children: React.ReactNode;
  buttonRender?: React.ReactElement;
} 

const ModalButton = ({
  children, 
  buttonRender,
  ...props
}: Props) => {
  const [open, setOpen] = useShowModal(false);

  const onCancel = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  buttonRender =  buttonRender ? React.cloneElement(buttonRender, {onClick: onOpen}) : <ButtonPrimary onClick={onOpen} />;

  return (
    <>
      <ModalStyled
        maskClosable={false}
        open={open}
        onCancel={onCancel}
        // okButtonProps={{ style: { display: 'none' } }}
        width={500}
        footer={null}
        forceRender
        centered
        {...props}
      >
        {children}
      </ModalStyled>
      {buttonRender}
    </>
  );
};

export default ModalButton;

const ModalStyled = styled(Modal)`
  .ant-modal-title {
    font-size: 24px;
    text-align: center;
  }
`;