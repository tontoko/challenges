import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTotalDonate } from 'modules/donationModules';
import { RootState } from 'rootReducer';

const useUpdateTotalDonate = (): { donate: number; procceccing: boolean } => {
  const dispatch = useDispatch();
  const { donate, procceccing } = useSelector(
    (state: RootState) => state.donation
  );

  useEffect(() => {
    dispatch(updateTotalDonate());
  }, [dispatch]);

  return { donate, procceccing };
};

export default useUpdateTotalDonate;
