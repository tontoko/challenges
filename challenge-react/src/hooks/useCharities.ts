import { getCharities } from 'modules/charityModules';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'rootReducer';
import { Charity } from 'types/charity';

const useCharities = (): Charity[] => {
  const { charities } = useSelector((state: RootState) => state.charity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharities());
  }, [dispatch]);

  return charities;
};

export default useCharities;
