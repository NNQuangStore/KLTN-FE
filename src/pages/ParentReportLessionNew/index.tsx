import { Card, Col, Empty, List, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import apisLessonParent from './service/apis';

const ParentReportSessionNewPage = () => {
  const day = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const [dayChoose, setDayChoose] = useState(dayjs(new Date).format('YYYY-MM-DD'));
  const reportData = [
    {
      date: '2023-10-02',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-10-03',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-10-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-10-05',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-10-06',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-10-07',
      note: 'Làm bài tập 1 sgk trang 54'
    },
  ];

  const getLesson = async () => {
    const res = await apisLessonParent.getListLessonParent();
    console.log(res);
  };

  useEffect(() => {
    getLesson();
  },[]);

  return (
    <ParentReportSessionNewPageStyled>
      <div className='parent-lesson'>
        <Row gutter={8}>
          {
            reportData.map((item, index) => {
              return (
                <Col key={index} span={4} onClick={() => {setDayChoose(item.date);}}>
                  <Card className={ (dayjs(item.date).get('day') === dayjs(dayChoose).get('day') ? 'active-card' : '') + ' card-header'}>
                    <p>{day[dayjs(item.date).get('day')]}</p>
                    <p>{dayjs(item.date).format('DD-MM-YYYY')}</p>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
        <br></br>
        <Row >
          <Col span={24}>
            <Card className='report-present'>
              <p>{reportData[0].date}</p>
              <p>{reportData[0].note}</p>
          </Card>
          </Col>
        </Row>
      </div>
    </ParentReportSessionNewPageStyled>
  );
};

  export default ParentReportSessionNewPage;

const ParentReportSessionNewPageStyled = styled.div`
display: flex;
justify-content: center;
.parent-lesson{
  width: 100%;
  min-width: 500px;
  max-width: 900px;
  .card-header{
    border: 2px solid white;
    .ant-card-body{
      padding: 8px;
      text-align: center;
    }
  }
  .card-header:hover{
    background-color: #9bcbd18f !important;
    border: 2px solid #9bcbd18f !important;
  }
  .active-card{
    background-color: #9bcbd1 !important;
    font-weight: 600 !important;
    border: 2px solid #d5b55a !important;
  }
  .report-present {
    width: 100%;
    min-height: 500px;
  }
}
`;