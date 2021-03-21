import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick?(): void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => (
  <ButtonStyle onClick={onClick} disabled={disabled}>
    {children}
  </ButtonStyle>
);

const ButtonStyle = styled.button`
  padding: 5px 10px;
  border: 1px solid blue;
  border-radius: 2px;
  background-color: white;
  color: blue;
  text-align: center;
  cursor: pointer;
`;

export default Button;
