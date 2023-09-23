import { Card, List, Modal } from 'antd';
import { styled } from 'styled-components';
import DataTable from '../../../../component/molecule/DataTable';
import { getDatesBetween } from '../../../../utils/unit';
import dayjs from 'dayjs';
import ActionTable from '../../../../component/molecule/DataTable/ActionTables';
import { EditOutlined } from '@ant-design/icons';

const ListAbsence = () => {

  const columns = [
    {
      title: 'Mã HS',
      dataIndex: 'student_code',
      key: 'student_code',
    },
    {
      title: 'Tên HS',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'date_from',
      key: 'date_from',
    },
    {
      title: 'Đến ngày',
      dataIndex: 'date_to',
      key: 'date_to',
    },
    {
      title: 'Số ngày nghỉ',
      dataIndex: 'num_of_absent',
      key: 'num_of_absent', 
    },
    {
      title: 'Lí do',
      dataIndex: 'reason',
      key: 'reason', 
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status', 
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
              icon: <EditOutlined />,
              label: 'Duyệt'
            },
          ]}/>
        );
      },
    },
  ];

  const data = [
    {
      student_code: '231412',
      student_name: 'Nguyễn Văn Long',
      date_from: '2023-04-12',
      date_to: '2023-04-13',
      num_of_absent: 2,
      reason: 'Xin nghỉ ốm',
      status: 'Chờ duyệt'
    },
    {
      student_code: '231412',
      student_name: 'Nguyễn Văn Long',
      date_from: '2023-04-12',
      date_to: '2023-04-13',
      num_of_absent: 2,
      reason: 'Xin nghỉ ốm',
      status: 'Chờ duyệt'
    }
  ];

  return (
    <ListAbsenceStyled>
      <DataTable bordered={false} columns={columns} dataSource={data}/>
      <Modal>
        
      </Modal>
    </ListAbsenceStyled>
  );
};

export default ListAbsence;

const ListAbsenceStyled = styled.div`

`;