import React from 'react';
import { styled } from 'styled-components';

type Props = {
  children?: React.ReactNode;
  label?: string;
}

const FormBlock = ({
  children,
  label
} : Props) => {
  return (
    <FormBlockStyled>
      <h3>
        {label}
      </h3>
      {children}
    </FormBlockStyled> 
  );
};
export default FormBlock;

const FormBlockStyled = styled.div`
  width: 100%;
`;