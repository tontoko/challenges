import { Charity } from 'types/charity';
import { Payment } from 'types/payment';

export const summaryDonations = (danations: number[]): number =>
  danations.reduce((accumulator, value) => accumulator + value);

export const fetchDonate = async (): Promise<Payment[]> => {
  const resp = await fetch('http://localhost:3001/payments');
  return await resp.json();
};

/**
 * create donate
 * 
 * @param {*} The payment object
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${item.id}, "amount": ${amount}, "currency": "${item.currency}" }`,
    })
 */
export const createDonate = async (
  item: Omit<Payment, 'id'>
): Promise<Payment[]> => {
  const resp = await fetch('http://localhost:3001/payments', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await resp.json();
};

export const fetchCharities = async (): Promise<Charity[]> => {
  const resp = await fetch('http://localhost:3001/charities');
  return await resp.json();
};
