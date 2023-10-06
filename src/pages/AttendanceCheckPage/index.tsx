import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../component/molecule/DataTable';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import Filter from '../../component/template/Filter';
import { styled } from 'styled-components';
import { Button, DatePicker, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useState } from 'react';
import { formatDate } from '@fullcalendar/core';
import dayjs from 'dayjs';

const AttendanceCheckPage = () => {
  const [size, setSize] = useState<SizeType>('middle');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const dataSource = [
    {
      date: '2023-12-19',
      present: 23,
      absent:23,
    },
    {
      date: '2023-12-19',
      present: 23,
      absent:23,
    },
    {
      date: '2023-12-19',
      present: 23,
      absent:23,
    },
    {
      date: '2023-12-19',
      present: 23,
      absent:23,
    },
  ];

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
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
      title: 'Thao tác',
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
  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };
  return (
    <AttendanceCheckPageStyled>
      {/* <Filter></Filter> */}
      <div style={{ position: 'relative' }}>
        <Space>
          <h4>Từ ngày</h4>
          <DatePicker
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          defaultValue={dayjs()}
          placeholder="Chọn ngày"
        />
        </Space>
        <Space style={{marginLeft:10}}>
          <h4>Đến ngày</h4>
          <DatePicker onChange={handleDateChange}
          format="YYYY-MM-DD"
          defaultValue={dayjs()}
          placeholder="Chọn ngày"/>
        </Space>
      </div>
      <div style={{ position: 'relative' }}>
        <Space>
          <h2>Sỉ số: 50</h2>
          <span
            className='mock-block'
            style={{ position: 'absolute', top: 10, right: 0 }}
          >
            <Button
              // onClick={showModal}
              onClick={() => navigate('/attendance/create-today')}
              type='primary'
              icon={<PlusOutlined />}
              size={size}
              style={{ marginLeft: 10 }}
            >
              Điểm danh hôm nay
            </Button>
          </span>
        </Space>
      </div>
      <DataTable columns={columns} dataSource={dataSource} />
    </AttendanceCheckPageStyled>
  );
};

export default AttendanceCheckPage;

const AttendanceCheckPageStyled = styled.div`

`;