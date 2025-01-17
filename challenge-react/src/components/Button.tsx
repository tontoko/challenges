import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => <ButtonStyle {...props}>{children}</ButtonStyle>;

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
