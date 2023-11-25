import { styled } from 'styled-components';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { ColumnType, ColumnsType } from 'antd/es/table';
import { useAppDispatch } from '../../../store/hooks';
import { getGender } from '../../../utils/unit';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import studentActions from '../../StudentPage/services/actions';
import StudentSelectors from '../../StudentPage/services/selectors';
import storage from '../../../utils/sessionStorage';
import Filter from '../../../component/template/Filter';
import InputSearchText from '../../../component/atom/Input/InputSearch';
import DataTable from '../../../component/molecule/DataTable';
import { ClassType } from '../Class';
import uiActions from '../../../services/UI/actions';
import apisClass from '../../ClassPage/services/apis';
import { message } from 'antd';
import InputSelect from '../../../component/atom/Input/InputSelect';
import apisStudent from '../../StudentPage/services/apis';

const StudentAdminPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataClass, setDataClass] = useState<ClassType[]>();
  const [dataStudent, setDataStudent] = useState<any[]>();
  const [classFilter, setClassFilter] = useState<string>();

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

  const fetchData = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisClass.getListClass({
        year: 2023,
      });

      // const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataClass(res.data.data);
      }

      // if(resTeacher?.data?.data) {
      //   setDataTeacher(resTeacher?.data?.data);
      // }

    } catch(e) {
      message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  const classOption = useMemo(() => {
    return dataClass?.map(o => ({
      label: o.Name,
      value: o.Id,
    }));
  }, [dataClass]);

  useEffect(() => {
    fetchData();
  }, []);

  const columns : ColumnsType<any> = [
    {
      title: 'Mã HS',
      dataIndex: 'Ma_Hoc_Sinh__c',
      key: 'Ma_Hoc_Sinh__c',
    },
    {
      title: 'Tên HS',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'NgaySinh__c',
      key: 'NgaySinh__c',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender__c',
      key: 'gender__c',
      render: (value) => {
        return getGender(value);
      },
    },
    {
      title: ' ',
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


  const fetchStudent = async () => {
    try{
      dispatch(uiActions.setLoadingPage(true));

      const res = await apisStudent.getListStudentByClass(classFilter ?? classOption?.[0]?.value ?? '');

      // const resTeacher = await apisTeacher.getListTeacher();

      if(res?.data?.data) {
        setDataStudent(res.data.data.Student);
      }

      // if(resTeacher?.data?.data) {
      //   setDataTeacher(resTeacher?.data?.data);
      // }

    } catch(e) {
      message.error('Đã có lỗi xảy ra');
    } finally {
      dispatch(uiActions.setLoadingPage(false));

    }
  };

  useEffect(() => {
    if(!classOption || !classFilter) return;
    fetchStudent();
  }, [classFilter, classOption]);

  const data = StudentSelectors.getStudentList();
  const classId = storage.get('class_id');
  const className = storage.get('class_name');

  return (
    <StudentAdminPageStyled>
      <h1 style={{margin: '12px 0px'}}>Học sinh</h1>

      <Filter>
        {/* <InputSelect value={classId} options={[{
          value: classId,
          label: className,
        }]} /> */}
        <InputSearchText />
        <InputSelect defaultValue={classOption?.[0].value} onChange={value => setClassFilter(value)} options={classOption}/>
      </Filter>
      <div style={{margin: '12px'}}></div>

      <DataTable bordered={false} columns={columns} dataSource={dataStudent}/>
    </StudentAdminPageStyled>
  );
};

export default StudentAdminPage;

const StudentAdminPageStyled = styled.div`

`;