import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  donate: number;
};

const AppFooter: React.FC<FooterProps> = ({ donate }) => (
  <FooterContainer>
    <p>All donations: {donate}</p>
  </FooterContainer>
);

const FooterContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
  z-index: 100;
  background-color: white;
  padding: 0 60px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 0 -1px 2px 0 lightgray;
`;

export default AppFooter;
