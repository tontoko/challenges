export const summaryDonations = (danations: number[]) =>
  danations.reduce((accumulator, value) => accumulator + value);
