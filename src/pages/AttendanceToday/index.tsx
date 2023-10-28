import { styled } from 'styled-components';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Input, Radio, Space, Table, Tag } from 'antd';
import DataTable from '../../component/molecule/DataTable';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { ActionFormStyled } from '../../component/organism/FormLayout';
import ButtonOutline from '../../component/atom/Button/ButtonOutline';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import attendanceActions from '../Attendance/service/actions';
import attendanceSelectors from '../Attendance/service/selectors';
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate: string = new Date(dateString).toLocaleDateString('vi-Vi', options);

  return formattedDate;
}


interface DataType {
  maHS: string;
  name: string;
  vang: boolean;
  coPhep: boolean;
}



// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Doe',
//     age: 28,
//     status: null,
//   },
//   {
//     key: '2',
//     name: 'Jane Smith',
//     age: 24,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '3',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '4',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '5',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '6',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '7',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '8',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '9',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '10',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '11',
//     name: 'Anh',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '12',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '13',
//     name: 'Bob Johnson',
//     age: 32,
//     status: null,
//   },
//   {
//     key: '14',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
//   {
//     key: '15',
//     name: 'Bob Johnson',
//     age: 32,
//     status: <Tag color='blue'>Có phép</Tag>,
//   },
  
// ];

const AttendanceTodayPage = () => {
  const navigate = useNavigate();
  const dateStr: string = new Date().toISOString();
  const formattedDate: string = formatDate(dateStr);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<DataType[] | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attendanceActions.getAttendanceDetail.fetch({}));
  }, []);

  const attendanceDetail = attendanceSelectors.getAttendanceDetail();

  const handleRowSelection = (key: string) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
    console.log(newSelectedRowKeys);
  };

  const data: DataType[] = attendanceDetail.map(o => ({
    coPhep: o.CoPhep__c,
    maHS: o.MaHocSinh__c,
    name: o.Name,
    vang: o.VangMat__c
  }));

  const columns: ColumnsType<DataType> = [
    
    {
      title: 'Mã HS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên HS',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Vắng',
      dataIndex: 'select',
      key: 'select',
      render: (val, record) => {
        // Check if the status is not null before rendering the checkbox
        // if (record.coPhep === null) {
          return (
            <Checkbox
              defaultChecked={val}
              onChange={(value) => {
                dispatch(attendanceActions.checkAttendance({
                  isCheck: value.target.checked,
                  studentId: record.maHS
                }));
              }}
              // onChange={() => handleRowSelection(record.maHS)}
              // checked={selectedRowKeys.includes(record.maHS)}
            />
          );
        // } 
        // else {
        //   return (
        //     <Checkbox disabled />
        //   );
        // }
      },
    },
    {
      title: 'Trạng thái',
      rowSpan: 4,
      dataIndex: 'status',
      fixed: true,
      width: 300,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (!searchText) {
      setFilteredData(null);
      return;
    }

    const filtered = data.filter((item) =>
      item.name.includes(searchText)
    );
    setFilteredData(filtered);
  };

  return (
    <AttendanceTodayStyled  style={{ maxHeight: '600px' }}>
      {/* <Filter></Filter> */}
      <div>
        <Space>
          <h2>Điểm danh ngày:  {formattedDate}</h2> <span />
          <Input
          placeholder="Tìm kiếm theo tên"
          onChange={handleSearch}
          value={searchText}
        />
        </Space>
        
        <DataTable  style={{ height: '480px' }}  scroll={{ x: 300 }} 
      dataSource={filteredData || data}
      columns={columns}
    />
      </div>
      <br />
      <ActionFormStyled justify={'end'} >
              <ButtonOutline style={{color:'gray'}} label='Hủy' onClick={()=> navigate('/attendance')}/>
              <ButtonOutline style={{marginRight:10}}  label='Lưu Nháp'/>
              <ButtonPrimary htmlType='submit' label={'Lưu và gửi PH'}/>
            </ActionFormStyled>
    </AttendanceTodayStyled>
  );
};

export default AttendanceTodayPage;

const AttendanceTodayStyled = styled.div`
  
`;