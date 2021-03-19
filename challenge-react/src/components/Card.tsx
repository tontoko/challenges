import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Charity } from 'types/charity';
import Button from './Button';

type CardProps = {
  item: Charity;
  showOverlay: boolean;
  handleDonate(id: number): void;
  handlePay(item: Charity, selectedAmount: number): void;
  procceccing: boolean;
};

const Card: React.FC<CardProps> = ({
  item,
  showOverlay,
  handleDonate,
  handlePay,
  procceccing,
}) => {
  const [selectedAmount, setSelectedAmount] = useState(10);

  const payments = useMemo(
    () =>
      [10, 20, 50, 100, 500].map((amount, j) => (
        <label key={j}>
          <input
            type="radio"
            name="payment"
            checked={selectedAmount === amount}
            onChange={() => setSelectedAmount(amount)}
          />
          {amount}
        </label>
      )),
    [selectedAmount]
  );

  const cardPaymentOverlay = useCallback(
    (item: Charity) => (
      <CardPaymentOverlay>
        <CloseButton onClick={() => handleDonate(item.id)}>X</CloseButton>
        <p>{item.name}</p>
        <PaymentRadioBox>{payments}</PaymentRadioBox>
        <Button
          onClick={() => handlePay(item, selectedAmount)}
          disabled={procceccing}
        >
          Pay
        </Button>
      </CardPaymentOverlay>
    ),
    [handleDonate, handlePay, procceccing, payments, selectedAmount]
  );
  return (
    <CardContainer>
      {showOverlay && cardPaymentOverlay(item)}
      <CardImg bgImg={`public/images/${item.image}`} />
      <CardFooter>
        <p>{item.name}</p>
        <Button onClick={() => handleDonate(item.id)} disabled={procceccing}>
          Donate
        </Button>
      </CardFooter>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 3px 3px 0 lightgray;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  color: #555555;
  font-size: 14px;
  cursor: pointer;
`;

const CardImg = styled.div<{ bgImg: string }>`
  height: 300px;
  width: 100%;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-position: center;
`;

const CardFooter = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const CardPaymentOverlay = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
`;

const PaymentRadioBox = styled.div`
  margin: 20px 0;
`;

export default Card;
