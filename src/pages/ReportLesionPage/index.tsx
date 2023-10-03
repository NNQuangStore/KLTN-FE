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
import dayjs, { Dayjs } from 'dayjs';
import { Button, DatePicker, Form, Modal, TimePicker, message } from 'antd';
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
import uiActions from '../../services/UI/actions';
import { io } from 'socket.io-client';
import { time } from 'console';
import { ReportLesion } from './services/types/reportLession';
import { format } from 'path';
import moment, { Moment } from 'moment';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonImport from '../../component/atom/Button/ButtonImport';



dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);


const ReportLesionPage = () => {

  const columns: ColumnsType<ReportLesion>= [
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
      render: (value) => {
        switch(value) {
          case 'Accepted':
            return 'Đã gửi';
          case 'Draft':
            return 'Lưu nháp';
          case 'Pending':
            return 'Đang gửi';
          default:
            return 'Đang gửi';
        }
      }
    },
    {
      title: 'Hành động',
      render: (item) => 
        item.Status__c !== 'Accepted' && (<ActionTable actions={[
          {
            handle: () => {setFormData(item); setOpen(true);},
            icon: <EditOutlined />,
            label: 'Chỉnh sửa',
            color: '#faad14'
          },
          {
            handle: async () => {
              const res = await apisLesion.deleteLesion({id: item.Id});              
              dispatch(lesionActions.getListLesion.fetch());
            },
            icon: <DeleteOutlined />,
            label: 'Xoá',
            color: '#f5222d'
          }
        ]}/>)
    }
  ];
  const classId = storage.get('class_id');
  const token = storage.get('token');



  const dispatch = useAppDispatch();
  const socket = io('https://slldt-server-867d33706c66.herokuapp.com');
  useEffect(() => {
    // socket.connect();
    dispatch(lesionActions.getListLesion.fetch());
    if(token && token !== ''){
      socket.emit('addTeacher', {senderId: token});
    }
    // return () => {
    //   socket.disconnect();
    // };
  },[]);

  const getWeekDate = (date: Moment) => {
    return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
  };
  const dataReportLesion = lesionSelectors.getLesionList();
  const [data, setData] = useState<ReportLesion[]>([]);
  const [isDraff, setIsDraff] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [timeActive, setTimeActive] = useState<boolean>(false);
  const [form] = useForm();
  const [formData, setFormData] = useState<any>();
  const [date, setDate] = useState<Moment[]>(getWeekDate(moment()));
  const [editorState, setEditorState] = useState('');


  useEffect(() => {
    setData(dataReportLesion.filter(o => moment(o.SentDay__c).isSameOrAfter(date[0]) && moment(o.SentDay__c).isSameOrBefore(date[1])));
  },[dataReportLesion]);

  const handleClose = () => {
    setOpen(false);
    setFormData(undefined);
  };

  useEffect(() => {
    if(!formData) return;
    
    form.setFieldsValue({
      title: formData.Title__c,
      sentDay: dayjs(formData.SentDay),
      time: dayjs().set('hour', formData.SendTime__c ?? 16).set('minute', formData.SendMinute__c),
      isAutoSent: formData.isAutoSent,
      lessionID: formData.Id,
      status: formData.status,
      content: formData.Content__c
    });
  },[formData]);

  useEffect(() => {    
    const dataSource = dataReportLesion.filter(o => moment(o.SentDay__c).isSameOrAfter(date[0]) && moment(o.SentDay__c).isSameOrBefore(date[1]));
    setData(dataSource);
  },[date]);

  const submit = async (values: any) => {
    console.log(values);
    
    try {
      const rest: AxiosResponse = await apisLesion.saveLesion([{
        ...values,
        lessonID: formData ? formData.Id : undefined,
        sentDay: dayjs(values.setDay).format('YYYY-MM-DD'),
        sendTime: dayjs(values.time).get('hour'),
        sendMinute: dayjs(values.time).get('minute'),
        isAutoSent: !!values.isAutoSent,
        classID: classId,
        status: isDraff ? 'Draft' : undefined,
        time: undefined
      }]);
      
      const data = rest.data.data;
      if(data) {
        if(data[0].Status__c === 'Accepted'){
          socket.emit('add-lesson-complete', {classId, lessonId: data[0].Id});
        }
        setOpen(false);
        dispatch(lesionActions.getListLesion.fetch());
        message.success('Lưu bài thành công');
      }
      
    } catch (error: any) {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      form.resetFields();
      handleClose();
      setIsDraff(false);
    }
      
  };

  const datePickerChange = (value: any) => {
    setDate(getWeekDate(moment(value?.format())));
  };

  return (
    <ReportLesionPageStyled>
      <Filter>
        <ButtonImport />
        <DatePicker onChange={datePickerChange} value={dayjs(date[0].format())} format='DD-MM-YYYY' defaultValue={dayjs()} picker='week' style={{backgroundColor: 'white'}} />
        <Button size='large' type='primary' onClick={() => setDate(getWeekDate(date[0].subtract(7, 'day')))}>Trước</Button>
        <Button onClick={() => setDate(getWeekDate(moment()))} size='large' type='primary'>Hiện tại</Button>
        <Button size='large' type='primary' onClick={() => setDate(getWeekDate(date[1].add(7, 'day')))}>Sau</Button>
        <ButtonPrimary onClick={() => setOpen(true)} label='Thêm bài học'/>
        
      </Filter>
      <div style={{height: '12px'}}></div>
      <DataTable bordered={false} columns={columns} dataSource={data}/>


      <Modal footer={null}
        onCancel={handleClose}
        forceRender open={open} title={'Báo bài'}>
        <FormLayout form={form} renderButton={() => <></>} onSubmit={submit}>
            <InputText rules={[
              {required: true}
            ]} label={'Tiêu đề'} name={'title'} />
            <Form.Item rules={[
              {required: true}
            ]} label='Ngày gửi' name='sentDay'>
              <DatePicker size='large' style={{width: '100%'}} placeholder='Chọn ngày gửi'/>
            </Form.Item>
            <InputCheckbox onChange={(e: any) => setTimeActive(e.target.checked)} name={'isAutoSent'} labelCheckbox='Tự động gửi'/>
            { timeActive ? <Form.Item rules={[
              {required: true}
            ]} label='Thời gian gửi' name='time'>
              <TimePicker format={'HH:mm'} size='large' style={{width: '100%'}} placeholder='Chọn thời gian' defaultValue={dayjs().set('hour', 16).set('minute', 0)}/>
            </Form.Item> : <></>}
            {/* <Form.Item rules={[
              {required: true}
            ]} label='Nội dung' name='content'> */}
            <Form.Item style={{border: '1px solid #d9d9d9', borderRadius: '2px'}}>
              <Editor
                // onEditorStateChange={this.onEditorStateChange}
              />
            </Form.Item>

            {/* </Form.Item> */}
            {/* <FormRow valuePropName='checked' name={'isAutoSent'}> */}
            {/* </FormRow> */}

            <ActionFormStyled justify={'center'} >
              <ButtonOutline onClick={() => {setIsDraff(true); form.submit();}} label='Lưu Nháp'/>
              <ButtonPrimary htmlType='submit' label={timeActive ? 'Lưu' : 'Gửi'}/>
            </ActionFormStyled>
        </FormLayout>
      </Modal>
    </ReportLesionPageStyled>
  );
};
export default ReportLesionPage;

const ReportLesionPageStyled = styled.div`

`;