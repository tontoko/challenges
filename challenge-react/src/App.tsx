import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import useCharities from 'hooks/useCharities';
import useUpdateTotalDonate from 'hooks/useUpdateTotalDonate';
import AppFooter from 'components/AppFooter';
import Card from 'components/Card';
import { handlePay } from 'helpers';
import { Charity } from 'types/charity';
import PaymentModal from 'components/PaymentModal';
import { showModal, showProcceccing } from 'modules/modalModules';

const App: React.FC = () => {
  const charities = useCharities();
  const { donate } = useSelector((state: RootState) => state.donation);
  const [paymentOverlayState, setPaymentOverlayState] = useState<{
    [id: number]: boolean;
  }>({});
  const [procceccing, setProcceccing] = useState(false);
  const dispatch = useDispatch();

  useUpdateTotalDonate();

  useEffect(() => {
    if (!charities) return;
    setPaymentOverlayState(
      Object.fromEntries(charities.map((charity) => [charity.id, false]))
    );
  }, [charities]);

  const toglePaymentOverlay = useCallback(
    (id: number) =>
      setPaymentOverlayState({
        ...paymentOverlayState,
        [id]: !paymentOverlayState[id],
      }),
    [paymentOverlayState]
  );

  const handleClickPay = useCallback(
    async (item: Charity, amount: number) => {
      try {
        setProcceccing(true);
        dispatch(showProcceccing());
        await handlePay(item, amount);
        toglePaymentOverlay(item.id);
        dispatch(showModal('payment succeeded, many thanks!'));
      } catch (e) {
        dispatch(showModal('something went wrong!'));
      } finally {
        setProcceccing(false);
      }
    },
    [dispatch, toglePaymentOverlay]
  );

  const cards = useMemo(
    () =>
      charities.map((item, i) => {
        return (
          <Card
            key={i}
            item={item}
            showOverlay={
              paymentOverlayState ? paymentOverlayState[item.id] : false
            }
            handleDonate={toglePaymentOverlay}
            handlePay={handleClickPay}
            procceccing={procceccing}
          />
        );
      }),
    [
      charities,
      paymentOverlayState,
      toglePaymentOverlay,
      handleClickPay,
      procceccing,
    ]
  );

  return (
    <>
      <PaymentModal />
      <Container>
        <AppTitle>Omise Tamboon React</AppTitle>
        <CardsContainer>{cards}</CardsContainer>
        <AppFooter donate={donate} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #505050;
  margin: 40px 0;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: 300px;
  grid-template-columns: repeat(auto-fill, 500px);
  justify-content: center;
`;

export default App;
