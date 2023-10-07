import { styled } from 'styled-components';
import Filter from '../../component/template/Filter';
import ButtonImportScore from './widgets/ButtonImport';
import ScoreboardDataTable from './widgets/ScoreboardDataTable';
import InputSelect from '../../component/atom/Input/InputSelect';
import { Evalution } from './service/apis';
import { useEffect } from 'react';
import scoreboardActions from './service/actions';
import { useDispatch } from 'react-redux';
import { BORDER_STYLED } from '../../utils/unit';
import scoreboardSelectors from './service/selectors';
import { Select } from 'antd';

const ScoreboardPage = () => {
  const dispatch = useDispatch();

  const options = Object.keys(Evalution).map((key) => ({
    value: key,
    label: Evalution[key as keyof typeof Evalution]
  }));

  const params = scoreboardSelectors.getParams();


  useEffect(() => {
    dispatch(scoreboardActions.getScoreboard.fetch({
      typeEvalution: params.evaluation
    }));
  }, []);

  const onChange = (val: keyof typeof Evalution) => {
    dispatch(scoreboardActions.setParam({
      evaluation: val
    }));
    dispatch(scoreboardActions.getScoreboard.fetch({
      typeEvalution: val
    }));
    
  };
  

  return (
    <ScoreboardPageStyled>
      <FilterStyled>
        <div></div>
        <div>
          <ButtonImportScore/>
          <InputSelect onChange={onChange} defaultValue={params.evaluation} style={{width: '150px'}} options={options} />
        </div>
      </FilterStyled>
      <ScoreboardDataTable/>
    </ScoreboardPageStyled>
  );
};

export default ScoreboardPage;

const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${BORDER_STYLED} !important;
  padding-bottom: 8px;
  & > div {
    display: flex;
    gap: 8px;
  }
  /* background-color: red; */
`;

const ScoreboardPageStyled = styled.div`
  background-color: white;
  padding: 16px;

`;

