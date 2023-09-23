import { Card, Typography, DatePicker, Form, List, Input, Empty } from 'antd';
import { styled } from 'styled-components';
import FormLayout from '../../../../component/organism/FormLayout';
import InputSelectRange from '../../../../component/atom/Input/InputSelectRange';
import AvatarSidebar from '../../../../component/molecule/AvatarSidebar';
import FormRow from '../../../../component/organism/FormLayout/FormRow';
import FormBlock from '../../../../component/organism/FormLayout/FormBlock';
import InputSwitcher from '../../../../component/atom/Input/InputSwitcher';
import InputCheckbox from '../../../../component/atom/Input/InputCheckbox';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMAT, getDatesBetween } from '../../../../utils/unit';
import InputText from '../../../../component/atom/Input/InputText';

const { RangePicker } = DatePicker;

const { Text } = Typography;
const { TextArea } = Input;

const LeaveOfAbsence = () => {

  const [form] = useForm();
  const [listLesion, setListLesion] = useState<Dayjs[]>([]);

  // useEffect(() => {    
  //   setListLesion();
  // },[form.getFieldValue('time_absence')]);
  
  const handleRangPicker = (values: any) => {
    setListLesion(getDatesBetween(values[0], values[1]));
  };

  return (
    <LeaveOfAbsenceStyled>
      <Card style={{width: '30%'}} className='profile-avatar'>
        <AvatarSidebar collapsed={false} />
        <h3>About</h3>
        <p>Là một giáo viên có kiến thức chuyên môn vững vàng mà còn là một người mang trong mình niềm đam mê mãnh liệt với việc dạy và hướng dẫn học sinh.</p>
      </Card>
      <Card title='Xin nghỉ phép' style={{width: '80%', justifyContent:'center'}}>
        <FormLayout<any> 
          layout='horizontal'
          form={form}
          onSubmit={(values) => console.log(values)} >
            <FormBlock label='Thời gian nghỉ'>
              <Form.Item name={'time_absence'}>
                <RangePicker 
                    disabledDate={(current) => {
                    const customDate = dayjs().format('YYYY-MM-DD');
                    return current && current < dayjs(customDate, 'YYYY-MM-DD');
                  }} 
                  onChange={handleRangPicker} />
              </Form.Item>
            </FormBlock>
            {/* <FormBlock label='Danh sách buổi học'>
              {listLesion.length > 0 ? <div className='list-lesion'>
                {listLesion.map((o, index) => (
                  <>
                    <Form.Item initialValue={true} name={[index, 'lesion', 0]}>
                      <InputCheckbox key={index} labelCheckbox={`${o.format(DATE_FORMAT)} - Sáng`}/>
                    </Form.Item>
                    <Form.Item initialValue={true} name={[index, 'lesion', 1]}>
                      <InputCheckbox key={index} labelCheckbox={`${o.format(DATE_FORMAT)} - Chiều`}/>
                    </Form.Item>
                  </>
                ))}
              </div> : <Empty description='Không có buổi học nào được chọn'/>}
            </FormBlock> */}
            <FormBlock label='Lý do xin nghỉ'>
              <Form.Item >
                <TextArea rows={4} />
              </Form.Item>
            </FormBlock>
        </FormLayout>
      </Card>
    </LeaveOfAbsenceStyled>
  );
};

export default LeaveOfAbsence;

const LeaveOfAbsenceStyled = styled.div`
  display: flex;
  gap: 50px;
  .ant-card-head-title {
    display: flex;
    justify-content: center;
  }

  .list-lesion {
    height: 200px;
    overflow-y: scroll;
    .ant-form-item {
      margin-bottom: 0px;
    }
  }
`;