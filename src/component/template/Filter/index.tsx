import React from 'react';
import RowH from '../../atom/Row/RowH';
import OBreadcrumb from '../../organism/BreadcrumbLayout';
import { styled } from 'styled-components';

interface Props {
  children?: React.ReactNode
}

const Filter = ({children}: Props) => {
  return (
    <FilterStyled justify={'space-between'} style={{marginBottom: '24px'}}>
        <OBreadcrumb/>
        <div className='options'>
          {children}
        </div>
    </FilterStyled>
  );
};

export default Filter;

const FilterStyled = styled(RowH)`
  .options {
    display: flex;
    & > * {
      margin-left: 8px;
    }
  }
`;