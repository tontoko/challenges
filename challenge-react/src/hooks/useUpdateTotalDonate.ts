import { summaryDonations } from 'helpers';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Payment } from 'types/payment';
import { updateTotalDonate } from 'modules/donationModules';

const useUpdateTotalDonate = () => {
  const dispatch = useDispatch();

  const update = useCallback(() => {
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

  useEffect(() => {
    update();
  }, []);
};

export default useUpdateTotalDonate;
