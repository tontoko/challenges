import { Charity } from 'types/charity';

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
