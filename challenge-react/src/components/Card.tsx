import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Charity } from 'types/charity';
import Button from './Button';

type CardProps = {
  item: Charity;
  showOverlay: boolean;
};

const Card: React.FC<CardProps> = ({ item, showOverlay }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const payments = useMemo(
    () =>
      [10, 20, 50, 100, 500].map((amount, j) => (
        <label key={j}>
          <input
            type="radio"
            name="payment"
            onClick={() => setSelectedAmount(amount)}
          />
          {amount}
        </label>
      )),
    []
  );
  const cardPaymentOverlay = useCallback(
    (item: Charity) => (
      <CardPaymentOverlay>
        <CloseButton>X</CloseButton>
        <p>{item.name}</p>
        <PaymentRadioBox>{payments}</PaymentRadioBox>
        <Button
          onClick={() => handlePay(item.id, selectedAmount, item.currency)}
        >
          Pay
        </Button>
      </CardPaymentOverlay>
    ),
    [payments, selectedAmount]
  );
  return (
    <CardContainer>
      {showOverlay && cardPaymentOverlay(item)}
      <CardImg bgImg={`public/images/${item.image}`} />
      <CardFooter>
        <p>{item.name}</p>
        <Button>Donate</Button>
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

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handlePay(id: number, amount: number, currency: string) {
  alert('test');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}
