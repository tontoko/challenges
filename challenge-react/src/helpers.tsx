export const summaryDonations = (danations: number[]): number =>
  danations.reduce((accumulator, value) => accumulator + value);
