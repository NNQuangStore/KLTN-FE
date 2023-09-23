import { ColumnType, ColumnsType } from 'antd/es/table';
import DataTable from '../../../component/molecule/DataTable';
import CellEditableTable from '../../../component/molecule/DataTable/CellEditableTable';
import { useDispatch } from 'react-redux';
import scoreboardSelectors from '../service/selectors';
import { useColDataTable } from '../hook/useColDataTable';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useEffect, useRef } from 'react';
import { IScoreboard } from '../service/types/scoreboard';
import scoreboardActions from '../service/actions';

const ScoreboardDataTable = () => {

  const dispatch = useDispatch();

  const dataSource = scoreboardSelectors.getScoreboard();


  const columnAttr: ColumnType<any> = {
    align: 'center',
    
  };

  const columnAttrPoint: ([col, index] : [keyof IScoreboard, number?]) => ColumnType<any> = ([col, index]) => {    
    return {
      ...columnAttr,
      width: 50,
      render: (text: string, record) => {        
        return (
          <CellEditableTable col={[col, index]} row={record.studentCode} useSetValue={useColDataTable}/>
        );
      }
    };
  };

  const getChildrenColumn = (title: string[], dataIndex: keyof IScoreboard) => {
    const childrenList = title.map((o, index) => ({
        title: o,
        dataIndex: dataIndex,
        key: `${dataIndex}_${index}`,
        ...columnAttrPoint([dataIndex, index])
    }));

    return childrenList;
  };
 
  const columns: ColumnsType<IScoreboard>= [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      ...columnAttr
    },
    {
      title: 'Mã HS',
      dataIndex: 'studentCode',
      key: 'studentCode',
      ...columnAttr
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ...columnAttr
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      ...columnAttr
    },
    {
      title: 'Tiếng Việt',
      ...columnAttr,
      children: getChildrenColumn(['GK', 'GK', 'Đánh giá'], 'spokenExamScore')
    },
    {
      title: 'Toán',
      ...columnAttr,
      children: getChildrenColumn(['GK', 'GK', 'Đánh giá'], 'spokenExamScore')
    },
    {
      title: 'Ngoại ngữ',
      ...columnAttr,
      children: getChildrenColumn(['GK', 'GK', 'Đánh giá'], 'spokenExamScore')
    },
    {
      title: 'Tự phục vụ, tự quản',
      ...columnAttr,
      children: getChildrenColumn(['GK', 'GK', 'Đánh giá'], 'spokenExamScore')

    },
    {
      title: 'Điểm TBHK',
      dataIndex: 'finalScore',
      key: 'finalScore',
      ...columnAttr
    },
  ];

  return (
    <>
      <DataTable columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ScoreboardDataTable;