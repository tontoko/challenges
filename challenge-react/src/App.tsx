import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import AppFooter from 'components/AppFooter';
import Card from 'components/Card';
import { Charity } from 'types/charity';
import PaymentModal from 'components/PaymentModal';
import { showModal, showProcceccing } from 'modules/modalModules';
import useUpdateTotalDonate from 'hooks/useUpdateTotalDonate';
import useCharities from 'hooks/useCharities';
import { addDonate } from 'modules/donationModules';

const App: React.FC = () => {
  const { charities, loading } = useCharities();
  const [paymentOverlayState, setPaymentOverlayState] = useState<{
    [id: number]: boolean;
  }>({});
  const { donate, procceccing } = useUpdateTotalDonate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    setPaymentOverlayState(
      Object.fromEntries(charities.map((charity) => [charity.id, false]))
    );
  }, [charities, loading]);

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
        dispatch(showProcceccing());
        dispatch(
          addDonate({
            item: { charitiesId: item.id, amount, currency: item.currency },
          })
        );
        toglePaymentOverlay(item.id);
        dispatch(showModal('payment succeeded, many thanks!'));
      } catch (e) {
        dispatch(showModal('something went wrong!'));
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
            showOverlay={paymentOverlayState[item.id] || false}
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
    <Container>
      <PaymentModal />
      <AppTitle>Omise Tamboon React</AppTitle>
      <CardsContainer>{cards}</CardsContainer>
      <AppFooter donate={donate} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
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
