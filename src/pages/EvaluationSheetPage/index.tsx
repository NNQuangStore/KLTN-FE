import { styled } from 'styled-components';
import { COLOR_PRIMARY } from '../../utils/variables/colors';

const EvaluationSheetPage = () => {
  // const classId = storage.get('class_id');

  return (
    <EvaluationSheetPageStyled>
      <h1>Trang bảng điểm</h1>
    </EvaluationSheetPageStyled>
  );
};

export default EvaluationSheetPage;

const EvaluationSheetPageStyled = styled.div`
  height: 100%;
  gap: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards {
    display: flex;
    justify-content: center;
    gap: 100px;

    .card-item {
      background-color: ${COLOR_PRIMARY};
      /* white-space: nowrap; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      width: 255px;
      cursor: pointer;
      p {
        font-size: 32px;
        font-weight: 600;
        color: white;
        text-align: center;
      }
    }
  }
`;