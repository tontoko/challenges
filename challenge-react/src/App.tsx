import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { summaryDonations } from './helpers';
import { RootState } from './rootReducer';
import { updateTotalDonate } from './modules/donationModules';

export type Charity = {
  id: number;
  name: string;
  image: string;
  currency: string;
};

export type Payment = {
  charitiesId: number;
  amount: number;
  currency: string;
  id: number;
};

const App: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const { donate, message } = useSelector((state: RootState) => state.donation);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((data: Charity[]) => {
        setCharities(data);
      });

    fetch('http://localhost:3001/payments')
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data: Payment[]) {
        dispatch(
          updateTotalDonate(summaryDonations(data.map((item) => item.amount)))
        );
      });
  }, []);

  const cards = charities.map((item, i) => {
    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <label key={j}>
        <input
          type="radio"
          name="payment"
          onClick={() => setSelectedAmount(amount)}
        />
        {amount}
      </label>
    ));

    return (
      <Card key={i}>
        <p>{item.name}</p>
        {payments}
        <button
          onClick={handlePay.call(self, item.id, selectedAmount, item.currency)}
        >
          Pay
        </button>
      </Card>
    );
  });

  return (
    <div>
      <h1>Tamboon React</h1>
      <p>All donations: {donate}</p>
      <MessageText>{message}</MessageText>
      {cards}
    </div>
  );
};

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const MessageText = styled.p`
  color: red;
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

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
function handlePay(id, amount, currency) {}

export default App;
