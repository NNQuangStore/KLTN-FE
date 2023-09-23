import { styled } from 'styled-components';
import Filter from '../../component/template/Filter';
import DataTable from '../../component/molecule/DataTable';
import ModalButton from '../../component/organism/ModalButton';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import FormLayout, { ActionFormStyled } from '../../component/organism/FormLayout';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { ColumnsType } from 'antd/es/table';
import ActionTable from '../../component/molecule/DataTable/ActionTables';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DatePicker, Form, Modal, TimePicker, message } from 'antd';
import InputText from '../../component/atom/Input/InputText';
import TextArea from 'antd/es/input/TextArea';
import InputSwitcher from '../../component/atom/Input/InputSwitcher';
import FormRow from '../../component/organism/FormLayout/FormRow';
import InputCheckbox from '../../component/atom/Input/InputCheckbox';
import ButtonOutline from '../../component/atom/Button/ButtonOutline';
import { useForm } from 'antd/es/form/Form';
import lesionSelectors from './services/selectors';
import lesionActions from './services/actions';
import { AxiosResponse } from 'axios';
import apisLesion from './services/apis';
import storage from '../../utils/sessionStorage';

const ReportLesionPage = () => {

  const [formData, setFormData] = useState<any>();

  const columns: ColumnsType<any>= [
    {
      title: 'Title',
      dataIndex: 'Title__c',
      key: 'Title__c',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'SentDay__c',
      key: 'SentDay__c',
      render: (value) => (dayjs(value).format('DD/MM/YYYY'))
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status__c',
      key: 'Status__c',
    },
    {
      title: 'Action',
      render: (item) => (
        <ActionTable actions={[
          {
            handle: () => setFormData(item),
            icon: <EditOutlined />,
            label: 'Edit',
            color: '#faad14'
          },
          {
            handle: () => undefined,
            icon: <DeleteOutlined />,
            label: 'Delete',
            color: '#f5222d'
          }
        ]}/>
      )
    }
    
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(lesionActions.getListLesion.fetch());
  },[]);

  const data = lesionSelectors.getLesionList();
  const [isDraff, setIsDraff] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [form] = useForm();

  console.log(data);
  

  const handleClose = () => {
    setOpen(false);
    setFormData(undefined);
  };

  const classId = storage.get('class_id');

  useEffect(() => {
    form.setFieldsValue({
      title: formData
    });
  },[formData]);

  const submit = async (values: any) => {
    console.log(values);
    
    try {
      const rest: AxiosResponse = await apisLesion.saveLesion({
        ...values,
        lessionID: formData ? formData.Id : undefined,
        sentDay: dayjs(values.setDay).format('YYYY-MM-DD'),
        sendTime: dayjs(values.time).get('hour'),
        sendMinute: dayjs(values.time).get('minute'),
        isAutoSent: !!values.isAutoSent,
        classID: classId,
        status: isDraff ? 'Draft' : undefined
      });
      console.log(rest);
      
      const data = rest.data.data;
      if(data) {
        setOpen(false);
        message.success('Thêm báo nài thành công');
      }
      
    } catch (error: any) {
      message.error('An error occurred. Please try again');
    } finally {
      handleClose();
      setIsDraff(false);
    }
      
  };

  return (
    <ReportLesionPageStyled>
      <Filter>
      <ButtonPrimary onClick={() => setOpen(true)} label='Add Lesion'/>
        <Modal footer={null}
          forceRender open={open} title={'Lesion'}>
          <FormLayout form={form} renderButton={() => <></>} onSubmit={submit}>
              <InputText rules={[
                {required: true}
              ]} label={'Title'} name={'title'} />
              <Form.Item rules={[
                {required: true}
              ]} label='Date sent' name='sentDay'>
                <DatePicker size='large' style={{width: '100%'}} />
              </Form.Item>
              <Form.Item rules={[
                {required: true}
              ]} label='Date sent' name='time'>
                <TimePicker format={'HH:mm'} size='large' style={{width: '100%'}} />
              </Form.Item>
              <Form.Item rules={[
                {required: true}
              ]} label='Content' name='content'>
                <TextArea rows={4}></TextArea>
              </Form.Item>
              {/* <FormRow valuePropName='checked' name={'isAutoSent'}> */}
                <InputCheckbox name={'isAutoSent'} labelCheckbox='Auto sent'/>
              {/* </FormRow> */}

              <ActionFormStyled justify={'center'} >
                <ButtonOutline onClick={() => {setIsDraff(true); form.submit();}} label='Lưu Nháp'/>
                <ButtonPrimary htmlType='submit' label='Lưu'/>
              </ActionFormStyled>
          </FormLayout>
        </Modal>
      </Filter>
      <DataTable bordered={false} columns={columns} dataSource={data}/>
    </ReportLesionPageStyled>
  );
};
export default ReportLesionPage;

const ReportLesionPageStyled = styled.div`
`;