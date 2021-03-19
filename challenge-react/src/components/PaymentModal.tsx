import { closeModal } from 'modules/modalModules';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'rootReducer';
import styled from 'styled-components';
import Button from './Button';

const PaymentModal: React.FC = () => {
  const dispatch = useDispatch();
  const { show, msg } = useSelector((state: RootState) => state.modal);

  if (!show) return <></>;
  return (
    <Overlay>
      <ModalContainer>
        <Message>{msg}</Message>
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
      </ModalContainer>
    </Overlay>
  );
};

export default PaymentModal;

const Overlay = styled.div`
  z-index: 1000;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: 300px;
  padding: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  box-shadow: 0 1px 1px 0 lightgray;
  border-radius: 8px;
`;
