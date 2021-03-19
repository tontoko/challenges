import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTotalDonate } from 'modules/donationModules';
import { RootState } from 'rootReducer';

const useUpdateTotalDonate = (): number => {
  const dispatch = useDispatch();
  const { donate } = useSelector((state: RootState) => state.donation);

  useEffect(() => {
    dispatch(updateTotalDonate);
  }, [dispatch]);

  return donate;
};

export default useUpdateTotalDonate;
