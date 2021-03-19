import { Charity } from 'types/charity';
import { Payment } from 'types/payment';

export const summaryDonations = (danations: number[]): number =>
  danations.reduce((accumulator, value) => accumulator + value);

/**
 * Handle pay button
 * 
 * @param {*} The charity object
 * @param {*} amount The amount was selected
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${item.id}, "amount": ${amount}, "currency": "${item.currency}" }`,
    })
 */

// eslint-disable-next-line
export const handlePay = async (item: Charity, amount: number) => {
  alert('test');
};

export const fetchDonate = async (): Promise<Payment[]> => {
  const resp = await fetch('http://localhost:3001/payments');
  return await resp.json();
};

export const fetchCharities = async (): Promise<Charity[]> => {
  const resp = await fetch('http://localhost:3001/charities');
  return await resp.json();
};
