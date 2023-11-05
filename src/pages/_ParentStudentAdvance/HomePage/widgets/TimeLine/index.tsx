import moment from 'moment';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getDayOfWeek } from '../../../../../utils/unit';
import { Divider, Timeline, TimelineItemProps } from 'antd';
import { hexToRGB } from '../../../../../utils/unit';
import { COLOR_DISABLE, COLOR_PRIMARY_LIGHT, COLOR_WHITE } from '../../../../../utils/variables/colors';
import InputDatePicker from '../../../../../component/atom/Input/InputDatePicker';
import apisTimetable from '../../../../TimeTablePage/services/apis';
import { groupBy } from 'lodash';
import { useAppDispatch } from '../../../../../store/hooks';
import { DetailType } from '../../../../TimeTablePage/services/type/timeTable';
import uiActions from '../../../../../services/UI/actions';

const TimeTableLine = () => {

  const [date, setDate] = useState(moment());
  const dispatch = useAppDispatch();

  const [dataTimeTable, setDataTimeTable] = useState<any[]>();


  console.log(dataTimeTable);
  
  const fetchApi = async () => {
    const res = await apisTimetable.getTimeTable({
      date: date.format('YYYY-MM-DD'),
      day: 'Monday'
    });
    
    const data = groupBy(res?.data?.Schedule?.detail, o => o.Lesson__c);

    console.log(res?.data);
    

    const dataTimeTable = Object.keys(data).map(key => ({
      index: Number(key.charAt(1)),
      data: (data[key] as DetailType[]).map(o => ({
        day_of_week: o.Day__c,
        lesson: o.Name
      }))
    }));
    

    setDataTimeTable(dataTimeTable ?? []);
  };

  useEffect(() => {
    dispatch(uiActions.setLoadingPage(true));
    try {

      fetchApi();
    } finally{
      dispatch(uiActions.setLoadingPage(false));
    }

  }, [date]);

  const lessonToday = [
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#2f54eb',
    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#722ed1',

    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#eb2f96',
    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Thời gian nghỉ trưa',
      color: 'gray',
    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#2f54eb',
    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#722ed1',

    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#eb2f96',
    },
    {
      timeStart: '8 giờ',
      timeEnd: '8 giờ',
      lesson: 'Chính tả',
      color: '#722ed1',
    },
  ];

  const itemTimeLine: TimelineItemProps[] = lessonToday.map(o => ({
    // label: o.timeStart,
    children: <CardTimeLine lesson={o.lesson} color={o.color} time={o.timeStart + ' - ' + o.timeEnd}/>,
    color: o.color,
  }));

  return (
    <TimeTableLineStyled>
      <div className='header'>
        <div className='title'>
          <h3>Tiết học trong ngày</h3>
          <p>{getDayOfWeek(date)}, {date.format('DD/MM/YYYY')}</p>
        </div>
        <InputDatePicker style={{
          borderRadius: '999px',
          padding: '1px 20px'
        }} size={'small'} />
      </div>
      <Divider  orientation='left' style={{fontWeight: 800, fontSize: '20px', color: 'gray'}}>7 giờ 30 phút</Divider>
      <TimeLineStyled items={itemTimeLine}/>
    </TimeTableLineStyled>
  );
};

export default TimeTableLine;

const TimeTableLineStyled = styled.div`
  width: 450px;
  padding: 8px 16px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
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
  }
`;

const TimeLineStyled = styled(Timeline)`
  transform: translate(0px ,25px);

`;



const CardTimeLine = ({lesson, time, color }:{lesson: string, time: string, color: string}) => {
  return (
    <CardTimeLineStyled $color={color}>
      <div className='circle'></div>
      <div>
        <p className='lesson'>{lesson}</p>
        <p className='time'>{time}</p>
      </div>
    </CardTimeLineStyled>
  );
};

const CardTimeLineStyled = styled.div<{ $color: string; }>`
  border-radius: 12px;
  /* width: 270px; */
  display: flex;
  background-color: ${props => hexToRGB(props.$color, 0.1)+')'};
  padding: 8px;
  align-items: center;
  gap: 12px;
  transform: translate(-5% ,-30%);
  margin-left: 30px;

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: ${props => hexToRGB(props.$color, 0.5)+')'};


  }

  .lesson {
    font-weight: 700;
    font-size: 14px;
    color: ${props => props.$color}
  }

  .time {
    font-weight: 600;
    font-size: 12px;
    color: ${props => hexToRGB(props.$color, 0.8)+')' }
    
  }
`;