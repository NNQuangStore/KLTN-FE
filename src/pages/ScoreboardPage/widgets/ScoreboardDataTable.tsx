import { ColumnType, ColumnsType } from 'antd/es/table';
import DataTable from '../../../component/molecule/DataTable';
import CellEditableTable from '../../../component/molecule/DataTable/CellEditableTable';
import { useDispatch } from 'react-redux';
import scoreboardSelectors from '../service/selectors';
import { useColDataTable } from '../hook/useColDataTable';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useEffect, useMemo, useRef } from 'react';
import { IScoreboard } from '../service/types/scoreboard';
import scoreboardActions from '../service/actions';
import { ELesions, EQuality, ETalent } from './ButtonImport';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { COLOR_BLUE, COLOR_PRIMARY } from '../../../utils/variables/colors';
import { Evalution } from '../service/apis';

const ScoreboardDataTable = () => {

  const dataSource = scoreboardSelectors.getScoreboard();  

  const columnAttr: ColumnType<any> = {
    align: 'center',
  };

  const columnAttrPoint: ([col, index] : [string, number?]) => ColumnType<any> = ([col, index]) => {    
    return {
      ...columnAttr,
      width: 50,
      // render: (text: string, record) => {        
      //   return (
      //     <CellEditableTable col={[col, index]} row={record.studentCode} 
      //     useSetValue={useColDataTable}
      //     />
      //   );
      // }
    };
  };
  
  const getChildrenColumn = (title: string[], dataIndex: string) => {
    const childrenList: ColumnType<any>[] = title.map((s, index) => {
      
      return {
        title: s,
        // dataIndex: dataIndex,
        // key: `${dataIndex}_${title}`,
        children: [
          {
            title: 'Mức đạt được',
            dataIndex: `${dataIndex}_${s}_0`,
            key: `${dataIndex}_${s}_0`,
            ...columnAttrPoint([dataIndex, index])

          },
          {
            title: 'Điểm KTĐK',
            dataIndex: `${dataIndex}_${s}_1`,
            key: `${dataIndex}_${s}_1`,
            ...columnAttrPoint([dataIndex, index])


          },
          {
            title: 'Nhận xét',
            dataIndex: `${dataIndex}_${s}_2`,
            key: `${dataIndex}_${s}_2`,
            ...columnAttrPoint([dataIndex, index])
  
          }

        ],
    };});

    return childrenList;
  };

  const getChildrenColumnSimple = (titles: string[], dataIndex: string) => {
    return titles.map(s => { console.log(`${dataIndex}_${s}`);
    
      return {
      title: s,
      dataIndex: `${dataIndex}_${s}`,
      key: `${dataIndex}_${s}`
    } as ColumnType<any>;} );
  };
 
  const dataIndexLesion = 'lesion';
  const dataIndexTalent = 'talent';
  const dataIndexQuality = 'quality';

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
      // ...columnAttr
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      // ...columnAttr
    },
    {
      title: 'Các môn học và hoạt động giáo dục',
      ...columnAttr,
      children: getChildrenColumn(Object.values(ELesions), dataIndexLesion)
    },
    {
      title: 'Các năng lực, phẩm chất',
      ...columnAttr,
      children: [
        {
          title: 'Năng lực',
          children: getChildrenColumnSimple(Object.values(ETalent), dataIndexTalent)
        },
        {
          title: ' Phẩm chất',
          children: getChildrenColumnSimple(Object.values(EQuality), dataIndexQuality)
        }
      ]
    },
    {
      title: 'Hành động',
      // fixed: 'right'
      render: () => {
        return <ActionTable actions={[
          {
            handle: () => undefined,
            icon: <EyeOutlined />,
            label: 'Xem chi tiết',
            color: COLOR_BLUE
          },
          // {
          //   handle: () => undefined,
          //   icon: <DeleteOutlined />,
          //   label: 'Delete',
          //   color: COLOR_RED
          // }
        ]}/>;
      }
    }
  ];


  const data: IScoreboard[] = useMemo(() => dataSource?.data?.map((o, index) => { 
    const lesionIds = Object.keys(ELesions);
    const quanlityIds = Object.keys(EQuality);
    const talientIds = Object.keys(ETalent);
    const lesionList = {};


    lesionIds.forEach((s) => {
      //@ts-ignore
      lesionList[`${dataIndexLesion}_${ELesions[s]}_0`] = o.scores.find(e => e.subjectId === s)?.talent;
      //@ts-ignore
      lesionList[`${dataIndexLesion}_${ELesions[s]}_1`] = o.scores.find(e => e.subjectId === s)?.score;
      //@ts-ignore
      lesionList[`${dataIndexLesion}_${ELesions[s]}_2`] = o.scores.find(e => e.subjectId === s)?.evaluationComment;
    });

    quanlityIds.forEach((s, index) => {
      //@ts-ignore
      lesionList[`${dataIndexQuality}_${EQuality[s]}`] = o.scores.find(e => e.subjectId === 'PHAM_CHAT_'+(index + 1))?.talent;
    });

    talientIds.forEach((s, index) => {
      //@ts-ignore
      lesionList[`${dataIndexTalent}_${ETalent[s]}`] = o.scores.find(e => e.subjectId === 'NANG_LUC_'+(index + 1))?.talent;
    });

    return {
      studentCode: o.studentId,
      stt: index + 1,
      fullName: o.studentName,
      ...lesionList
    };
  }), [dataSource]); 

  return (
    <>
      <DataTable columns={columns} dataSource={data ?? []} />
    </>
  );
};

export default ScoreboardDataTable;