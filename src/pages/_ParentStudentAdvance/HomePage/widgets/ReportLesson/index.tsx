import { styled } from 'styled-components';
import CalendarSmallDays from './CalendarSmall';

const ParentStudentReportLesson = () => {
  return (
    <ReportLessonStyled>
      <div className='header'>
        <div className='title'>
          <h3>Báo bài trong tháng</h3>
          <p>01.10.2023 - 31.10.2023</p>
        </div>

      </div>
      <CalendarSmallDays />
    </ReportLessonStyled>
  );
};

const ReportLessonStyled = styled.div`

.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
    padding: 16px;
    h3 {
      font-weight: 800px;
      font-size: 18px;
      margin-bottom: 8px;
    }

    p {
      font-weight: 700;
      font-size: 14px;
      color: grey;
    }
  }`;

export default ParentStudentReportLesson;