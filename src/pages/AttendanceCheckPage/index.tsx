import { EyeOutlined } from '@ant-design/icons';
import DataTable from '../../component/molecule/DataTable';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import Filter from '../../component/template/Filter';
import { styled } from 'styled-components';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const AttendanceCheckPage = () => {
  const navigate = useNavigate();
  const dataSource = [
    {
      date: '2023-12-19',
      class_size: 23
    },
    {
      date: '2023-12-19',
      class_size: 23
    },
    {
      date: '2023-12-19',
      class_size: 23
    },
    {
      date: '2023-12-19',
      class_size: 23
    },
  ];

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'sĩ số',
      dataIndex: 'class_size',
      key: 'class_size',
    },
    {
      title: 'Có mặt',
      dataIndex: 'present',
      key: 'present',
    },
    {
      title: 'Vắng mặt',
      dataIndex: 'absent',
      key: 'absent',
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason', 
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => {
        return (
          <ActionTable actions={[
            {
              handle: () => undefined,
              icon: <EyeOutlined />,
              label: 'Xem chi tiết',
              color: '#2f54eb'
            },
          ]}/>
        );
      },
    },
  ];

  return (
    <AttendanceCheckPageStyled>
      {/* <Filter></Filter> */}
      <Button onClick={() => navigate('/attendance/create-today')}>Điểm danh hôm nay</Button>
      <DataTable columns={columns} dataSource={dataSource} />
    </AttendanceCheckPageStyled>
  );
};

export default AttendanceCheckPage;

const AttendanceCheckPageStyled = styled.div`

`;