import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import useCharities from 'hooks/useCharities';
import useUpdateTotalDonate from 'hooks/useUpdateTotalDonate';
import AppFooter from 'components/AppFooter';
import Card from 'components/Card';

const App: React.FC = () => {
  const charities = useCharities();
  const { donate, message } = useSelector((state: RootState) => state.donation);
  const [paymentOverlayState, setPaymentOverlayState] = useState<{
    [id: number]: boolean;
  }>();

  useUpdateTotalDonate();

  useEffect(() => {
    if (!charities) return;
    setPaymentOverlayState(
      Object.fromEntries(charities.map((charity) => [charity.id, false]))
    );
  }, [charities]);

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
          />
        );
      }),
    [charities, paymentOverlayState]
  );

  return (
    <Container>
      <AppTitle>Omise Tamboon React</AppTitle>
      {/* <MessageText>{message}</MessageText> */}
      <CardsContainer>{cards}</CardsContainer>
      <AppFooter donate={donate} />
    </Container>
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
