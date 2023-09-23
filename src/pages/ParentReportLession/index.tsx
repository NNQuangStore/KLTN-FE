import { Card, Empty, List } from 'antd';
import { styled } from 'styled-components';

const ParentReportSessionPage = () => {
  const reportData = [
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
    {
      date: '2023-12-04',
      note: 'Làm bài tập 1 sgk trang 54'
    },
  ];

  return (
    reportData.length > 0 ? <ParentReportSessionPageStyled>
      <Card className='report-present' title={reportData[0].date}>
        {reportData[0].note}
      </Card>
      <List grid={{ gutter: 16, column: 4 }} 
      dataSource={reportData.filter((o,index) => index !== 0 )}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.date}>
            <p>{item.note}</p>
          </Card>
        </List.Item>
      )}></List>
    </ParentReportSessionPageStyled> : <Empty description='Không có báo bài nào'/>
  );
};

  export default ParentReportSessionPage;

const ParentReportSessionPageStyled = styled.div`
  .report-present {
    width: 100%;
  }
`;