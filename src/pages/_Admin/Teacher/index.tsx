import { styled } from 'styled-components';
import Filter from '../../../component/template/Filter';
import DataTable from '../../../component/molecule/DataTable';
import { useEffect, useMemo, useState } from 'react';
import uiActions from '../../../services/UI/actions';
import { message } from 'antd';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { ClassType, TeacherType } from '../Class';
import { ColumnsType } from 'antd/es/table';
import apisClass from '../../ClassPage/services/apis';
import apisTeacher from './services/apis';

const TeacherPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [dataClass, setDataClass] = useState<ClassType[]>();
  const [dataTeacher, setDataTeacher] = useState<TeacherType[]>();

  // const data = [
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   },
  //   {
  //     MaHocSinh__c: '123',
  //     Name: 'Nhật Nam',
  //     birth__c: '2021/12/23',
  //     gender__c: true,
  //   }
  // ];

  const columns : ColumnsType<TeacherType> = [
    {
      title: 'Mã GV',
      dataIndex: 'MaGiaoVien__c',
      key: 'MaGiaoVien__c',
    },
    {
      title: 'Tên giáo viên',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Số diện thoại',
      render: (_, record: TeacherType) => {
        return record.User.Phone__c;
      }
    },
    {
      title: 'Email',
      render: (_, record: TeacherType) => {
        return record.User.Email__c;
      }
    },
    {
      title: 'Lớp chủ nhiệm hiện tại',
      render: (_, record: TeacherType) => {
        return dataClass?.find(o => o.GiaoVien__c === record.Id)?.Name;
      }
    },
    {
      title: 'Hành động',
      render: (item) => {
        return (
          <ActionTable actions={[
            {
              handle: () => navigate(item.Id),
              icon: <EyeOutlined />,
              label: 'Xem chi tiết',
              color: '#1890ff'
            },
          ]}/>
        );
      },
    },
  ];

  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisClass.getListClass({
        year: 2023,
      });

      const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataClass(res.data.data);
      }

      if(resTeacher?.data?.data) {
        setDataTeacher(resTeacher?.data?.data);
      }

    } catch(e) {
      message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const dataTable = useMemo(() => {

  //   if(!dataClass || !dataTeacher) return [];

  //   return dataClass.map(o => ({
  //     ...o,
  //     TeacherName__c: dataTeacher?.find(teacher => teacher.Id === o.GiaoVien__c)?.Name
  //   }));
  // }, [dataClass, dataTeacher]); 

  return (
    <TeacherPageStyled>
      <Filter>
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        {/* <InputSearchText /> */}
      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={dataTeacher}/>
    </TeacherPageStyled>
  );

};

export default TeacherPage;

const TeacherPageStyled = styled.div`

`;