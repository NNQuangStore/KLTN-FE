import { styled } from 'styled-components';
import TimeTable from './TimeTable';

const TimeTablePage = () => {


  return (
    <TimeTablePageStyled>
      <h3 style={{
        fontWeight: 700,
        fontSize: '46px',
        textAlign: 'center',
        marginBottom: '46px'
      }}>Thời khoá biểu</h3>
      <div className='card'>
        <TimeTable />
      </div>
    </TimeTablePageStyled>
  );
};

export default TimeTablePage;

const TimeTablePageStyled = styled.div`
  .card {
    border-radius: 12px;
    /* box-shadow: 3px 3px 20px lightgray; */
    padding: 16px 46px;
    max-width: 80%;
    margin: 0px auto;
  }
`;
