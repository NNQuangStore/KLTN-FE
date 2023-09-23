import { styled } from 'styled-components';
import ColTimeTable from './ColTimeTable';

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
    label: 'Thứ 2'
  },
  {
    value: 'tue',
    label: 'Thứ 3'
  },
  {
    value: 'wed',
    label: 'Thứ 4'
  },
  {
    value: 'thu',
    label: 'Thứ 5'
  },
  {
    value: 'fri',
    label: 'Thứ 6'
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
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
  null,
  {
    index: 3,
    data: [
      {
        day_of_week: 'tue',
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
  {
    index: 4,
    data: [
      {
        day_of_week: 'tue',
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
  
  null, null,
  {
    index: 5,
    data: [
      {
        day_of_week: 'tue',
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
  {
    index: 6,
    data: [
      {
        day_of_week: 'tue',
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
  {
    index: 7,
    data: [
      {
        day_of_week: 'tue',
        lesson: ' Nói',
      },
      {
        day_of_week: 'wed',
        lesson: 'Đọc',
      },
    ]
  },
];

const TimeTable = () => {

  

  return (
    <TimeTableStyled>
      <thead>
        <tr>
          <th className='sessions-days'>Buổi</th>
          <th>Tiết</th>
          {headerTableTime.map((o, index) => (
            <th key={index}>{o.label}</th>
          ))}
        </tr>
        </thead>
        <tbody>

        <tr>
          <td className='sessions-days' rowSpan={6}>Buổi sáng</td>
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
                    <td className='sessions-days' colSpan={7}>NGHĨ TRƯA</td>
                  </tr>
                );
            case o === null && index === 6:
              return (
                <tr>
                  <td className='sessions-days' rowSpan={4}>Buổi chiều</td>
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