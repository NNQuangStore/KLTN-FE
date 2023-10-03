import { Button, Card, Empty, List, Modal } from 'antd';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../store/hooks';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import { preventSelection } from '@fullcalendar/core/internal';

function renderEventContent(eventInfo:any) {
  
  
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}




const ParentReportSessionPage = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [reportData, setReportData] =useState( [
    {
      start: '2023-10-04T12:00:00',
      title: 'Làm bài tập 1 sgk trang 50'
    },
    {
      start: '2023-10-04',
      title: 'Làm bài tập 1 sgk trang 51'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 52'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 53'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 54'
    },
    {
      start: '2023-12-04',
      title: 'Làm bài tập 1 sgk trang 55'
    },
  ]);
  const [dataClick, setDataClick] = useState([]);
  const showModal = () => {
    setOpen(true);
    
   
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showModalDetail = (clickInfo:any) => {
    setOpenDetail(true);
    setDataClick(clickInfo.event.title);
  };
  const handleOkDetail = () => {
    setOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setOpenDetail(false);
  };
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(lesionActions.getListLesion.fetch());
  // },[]);
  // const reportData = lesionSelectors.getLesionList();

 
  
  
  return (
    reportData.length > 0 ? <ParentReportSessionPageStyled
    
     >
      <Card className='report-present' title={'Báo bài'} >
       
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'timeGridWeek'}
        headerToolbar={{
          start: 'today prev,next', // Replace "today" with "customToday", // will normally be on the left. if RTL, will be on the right
          center: 'title',
          end: '', // will normally be on the right. if RTL, will be on the left
        }}
        height={'90vh'}
        weekends={false}
        events={reportData}
        editable={false}
        selectable={true}
        eventContent={renderEventContent}
        eventClick={showModalDetail}
        select={()=>{
          showModal();
          
        }}
        locale={'vi'}
      />
      </Card>
      {/* <List grid={{ gutter: 16, column: 4 }} 
      dataSource={reportData.filter((o,index) => index !== 0 )}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.date}>
            <p>{item.note}</p>
          </Card>
        </List.Item>
      )}></List> */}
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        open={openDetail}
        title={dataClick}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </ParentReportSessionPageStyled> : <Empty description='Không có báo bài nào'/>
    
  );
};

  export default ParentReportSessionPage;

const ParentReportSessionPageStyled = styled.div`
  .report-present {
    width: 100%;
  }
  
`;