import { styled } from 'styled-components';
import Filter from '../../../component/template/Filter';
import DataTable from '../../../component/molecule/DataTable';
import { useEffect, useMemo, useState } from 'react';
import uiActions from '../../../services/UI/actions';
import { Form, Radio, message } from 'antd';
import ActionTable from '../../../component/molecule/DataTable/ActionTables';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { ClassType, TeacherType } from '../Class';
import { ColumnsType } from 'antd/es/table';
import apisClass from '../../ClassPage/services/apis';
import apisTeacher from './services/apis';
import ModalButton from '../../../component/organism/ModalButton';
import FormLayout from '../../../component/organism/FormLayout';
import InputText from '../../../component/atom/Input/InputText';
import InputSelect from '../../../component/atom/Input/InputSelect';
import InputDatePicker from '../../../component/atom/Input/InputDatePicker';
import InputTextPassword from '../../../component/atom/Input/InputPassword';
import InputPhone from '../../../component/atom/Input/InputPhone';
// import { bcryptEncode } from '../../../utils/unit';

const TeacherPage = () => {

  const navigate = useNavigate();
  const [gender, setGender] = useState<boolean>();
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

        <ModalButton 
          title={'Lớp học'}
          label='Thêm giáo viên'
        >
          <FormLayout<any>
              onSubmit={async (value) => {
                dispatch(uiActions.setLoadingPage(true));

                try {
                  await apisTeacher.saveTeacher({
                    ...value,
                    Phone__c: value.Phone__c.replace('-', ''),
                    Gender__c: gender,
                    BirthDay__c: value.BirthDay__c.format('YYYY-MM-DD'),
                  });

                } catch (e) {

                } finally {
                  dispatch(uiActions.setLoadingPage(false));
                }
              }}
            >
            <InputText name='UserName__c' label='Tên giáo viên'/>
            <InputPhone name={'Phone__c'} label='Số diện thoại'/>
            <InputText rules={[
              {required: true},
              {type: 'email', message: 'Email không đúng dịnh dạng'}
            ]} name='Email__c' label='Email'/>
            <Form.Item name={'BirthDay__c'} label='Sinh nhật'>
              <InputDatePicker />
            </Form.Item>

            <Form.Item label='Giới tính'>
              <Radio.Group  onChange={(e) => setGender(e.target.value)} value={gender}>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <InputTextPassword name={'Password__c'} label='Mật khẩu'/>
            {/* <Form.Item label='Lớp chủ nhiệm'>
              <InputSelect/>
            </Form.Item> */}
          </FormLayout>
        </ModalButton>

      </Filter>
      <div style={{margin: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={dataTeacher}/>
    </TeacherPageStyled>
  );

};

export default TeacherPage;

const TeacherPageStyled = styled.div`

`;