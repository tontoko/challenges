import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import useCharities from 'hooks/useCharities';
import useUpdateTotalDonate from 'hooks/useUpdateTotalDonate';

const App: React.FC = () => {
  const charities = useCharities();
  const [selectedAmount, setSelectedAmount] = useState(10);
  const { donate, message } = useSelector((state: RootState) => state.donation);

  useUpdateTotalDonate();

  const cards = useMemo(
    () =>
      charities.map((item, i) => {
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
              onClick={handlePay.call(
                self,
                item.id,
                selectedAmount,
                item.currency
              )}
            >
              Pay
            </button>
          </Card>
        );
      }),
    [charities]
  );

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
function handlePay(id: number, amount: string, currency: string) {}

export default App;
