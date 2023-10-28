import { styled } from 'styled-components';
import ColTimeTable from './ColTimeTable';
import moment from 'moment';

export type IDataTimeTable = {
  day_of_week: 'mon' | 'tue' | 'wed' | 'thu' | 'fri',
  lesson: string;
}

export  type ITimeTable = {
  index: number,
  data: IDataTimeTable[];
}

export const headerTableTime = [
  {
    value: 'mon',
    label: 'Thứ 2',
    color: '#ffec3d'
  },
  {
    value: 'tue',
    label: 'Thứ 3',
    color: '#73d13d'
  },
  {
    value: 'wed',
    label: 'Thứ 4',
    color: '#ffa940'

  },
  {
    value: 'thu',
    label: 'Thứ 5',
    color: '#4096ff'
  },
  {
    value: 'fri',
    label: 'Thứ 6',
    color: '#ff4d4f'
  },
];

const dataSource: (ITimeTable | null)[] = [
  {
    index: 1,
    data: [
      {
        day_of_week: 'mon',
        lesson: 'Tiếng việt',
      },
      {
        day_of_week: 'fri',
        lesson: 'Tiếng việt',
      },
    ]
  },
  {
    index: 2,
    data: [
      {
        day_of_week: 'tue',
        lesson: 'LS & DL',
      },
      {
        day_of_week: 'wed',
        lesson: 'Toán',
      },
    ]
  },
  null,
  {
    index: 3,
    data: [
      {
        day_of_week: 'fri',
        lesson: ' Khoa học',
      },
      {
        day_of_week: 'wed',
        lesson: 'Tiếng việt',
      },
    ]
  },
  {
    index: 4,
    data: [
      {
        day_of_week: 'mon',
        lesson: ' Tiếng việt',
      },
      {
        day_of_week: 'thu',
        lesson: 'LS & DL',
      },
    ]
  },
  
  null, null,
  {
    index: 5,
    data: [
      {
        day_of_week: 'wed',
        lesson: 'Khoa học',
      },
      {
        day_of_week: 'tue',
        lesson: 'Tiếng việt',
      },
    ]
  },
  {
    index: 6,
    data: [
      {
        day_of_week: 'fri',
        lesson: 'Toán',
      },
      {
        day_of_week: 'wed',
        lesson: 'Tiếng việt',
      },
    ]
  },
  {
    index: 7,
    data: [
      {
        day_of_week: 'mon',
        lesson: ' Tiếng việt',
      },
      {
        day_of_week: 'wed',
        lesson: 'LS & DL',
      },
    ]
  },
];

console.log(moment().get('day'));


const TimeTable = () => {

  

  return (
    <TimeTableStyled>
      <thead>
        <tr>
          <th className='sessions-days'>Buổi</th>
          <th>Tiết</th>
          {headerTableTime.map((o, index) => (
            <th  style={moment().get('day') === index ? {
              backgroundColor: o.color
            } : {}} key={index}>{o.label}</th>
          ))}
        </tr>
        </thead>
        <tbody>

        <tr>
          <td style={{
            backgroundColor: '#ffccc7'
          }} className='sessions-days' rowSpan={6}>Buổi sáng</td>
        </tr>
        {dataSource.map((o, index) => {
          switch(true) {
            case o === null && index === 2: 
              return (
              <tr>
                <td colSpan={6}>Giờ ra chơi</td>
              </tr>
              );
            case o === null && index === 5:
                return (
                  <tr>
                    <td style={{
                      backgroundColor: '#bae0ff'
                    }} className='sessions-days' colSpan={7}>NGHĨ TRƯA</td>
                  </tr>
                );
            case o === null && index === 6:
              return (
                <tr>
                  <td style={{
                    backgroundColor: '#ffccc7'
                  }} className='sessions-days' rowSpan={4}>Buổi chiều</td>
                </tr>
              );
            default: 
              return o !== null && (
                <tr className='lesson' key={index}>
                  <td className='lesson-index'>{o.index}</td>
                  <ColTimeTable data={o.data}/>
                </tr>
              );
          }
          
        })}
        </tbody>

      </TimeTableStyled>
  );
};

export default TimeTable;

const TimeTableStyled = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;

  }
  .sessions-days {
    width: 70px;
    font-size: 16px;
    font-weight: bold;
  }
  .lesson {
    .lesson-index {
      width: 45px;
      font-weight: bold;
    }

    .lesson-time {
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    } 
  }
`;